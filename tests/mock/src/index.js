const express = require("express");
const http = require("http");
const mockPiezoData = require("../mockData/piezoData.json");
const mockEcgData = require("../mockData/ecgData.json");
const mockDiagnoses = require("../mockData/diagnoses.json");
const mockPulseTypeData = require("../mockData/pulse-types.json");
const mockHandPositionData = require("../mockData/hand-position.json");
const { Server: WebSocketServer } = require("ws");

// PiezoElectricSensor service
const piezoElectricSensorPort = 8000;

const mockPiezoElectricSensorApp = express();

mockPiezoElectricSensorApp.get("/pulse-types", (req, res) => {
  res.send(mockPulseTypeData);
});

mockPiezoElectricSensorApp.get("/hand-position", (req, res) => {
  res.send(mockHandPositionData);
});

mockPiezoElectricSensorApp.get("/diagnosis/:id", (req, res) => {
  const diagnosisObject = {
    id: req.params.id,
    handPositionId: 1,
    pulseTypeId: 1,
    piezoElectricRecords: {
      data: mockPiezoData,
    },
    ecgRecords: {
      data: mockEcgData,
    },
  };

  res.send(diagnosisObject);
});

let currid = Math.max(...mockDiagnoses.map((diagnosis) => diagnosis.id));
let minid = Math.min(...mockDiagnoses.map((diagnosis) => diagnosis.id));

mockPiezoElectricSensorApp.get("/diagnosis", (req, res) => {
  while (
    mockDiagnoses.filter((diagnosis) => diagnosis.id == currid).length < 0
  ) {
    if (currid == 0) {
      return [];
    }
    currid -= 1;
    console.log(currid);
  }

  res.send(mockDiagnoses.filter((diagnosis) => diagnosis.id == currid)[0]);
  currid --;
});

const mockPiezoElectricSensorServer = http.createServer(
  mockPiezoElectricSensorApp
);

let shouldStopPiezoReadingLoop = false;
let piezoStore1 = [];
let piezoStore2 = [];
let piezoSendDataInterval = null;

const piezoWss = new WebSocketServer({ server: mockPiezoElectricSensorServer });
piezoWss.on("connection", (ws, req) => {
  ws.on("message", (rawMessage) => {
    const message = rawMessage.toString();
    const separatorIdx = message.indexOf(";");
    const [operation, data] = message.split(";");

    switch (operation) {
      case "start":
        piezoSendDataInterval = setInterval(() => {
          ws.send(
            JSON.stringify({
              recordedData: Array.from({ length: 20 }, () => ({
                timeStamp: Date.now(),
                data: Math.random(),
              })),
            })
          );
        }, 200);

        break;
      case "stop":
        clearInterval(piezoSendDataInterval);
        piezoSendDataInterval = null;
        break;
      case "resume":
        piezoSendDataInterval = setInterval(() => {
          ws.send(
            JSON.stringify({
              recordedData: Array.from({ length: 20 }, () => ({
                timeStamp: Date.now(),
                data: Math.random(),
              })),
            })
          );
        }, 200);
        break;
      case "pause":
        clearInterval(piezoSendDataInterval);
        piezoSendDataInterval = null;
        break;
    }
  });
});

piezoWss.on("close", () => {
  if (piezoSendDataInterval) {
    clearInterval(piezoSendDataInterval);
  }
  piezoSendDataInterval = null;
});

mockPiezoElectricSensorServer.listen(piezoElectricSensorPort, () => {
  console.log(
    `Piezeo sensor server started at localhost port ${piezoElectricSensorPort}`
  );
});

// ECG sensor service
const ecgSensorPort = 8080;

const mockEcgSensorApp = express();

const mockEcgSensorServer = http.createServer(mockEcgSensorApp);

const ecgWss = new WebSocketServer({ server: mockEcgSensorServer });

let shouldStopEcgReadingLoop = false;
let ecgStore1 = [];
let ecgStore2 = [];
let ecgSendDataInterval;

ecgWss.on("connection", (ws, req) => {
  ws.on("message", (rawMessage) => {
    const message = rawMessage.toString();
    const separatorIdx = message.indexOf(";");
    const [operation, data] = message.split(";");

    switch (operation) {
      case "start":
        ecgSendDataInterval = setInterval(() => {
          ws.send(
            JSON.stringify({
              recordedData: Array.from({ length: 20 }, () => ({
                timeStamp: Date.now(),
                data: Math.random(),
              })),
            })
          );
        }, 200);
      case "stop":
        clearInterval(ecgSendDataInterval);
        ecgSendDataInterval = null;
        break;
    }
  });
});

ecgWss.on("close", () => {
  shouldStopEcgReadingLoop = true;
  if (ecgSendDataInterval) {
    clearInterval(ecgSendDataInterval);
    ecgSendDataInterval = null;
  }
});

mockEcgSensorServer.listen(ecgSensorPort, () => {
  console.log(`Ecg sensor server started at localhost port ${ecgSensorPort}`);
});
