const express = require("express");
const cors = require("cors");
const http = require("http");
const mockPiezoData = require("../mockData/piezoData.json");
const mockEcgData = require("../mockData/ecgData.json");

// PiezoElectricSensor service
const piezoElectricSensorPort = 8000;

const mockPiezoElectricSensorApp = express();
mockPiezoElectricSensorApp.use(cors());

mockPiezoElectricSensorApp.get("/diagnosis", (req, res) => {
  const mockDiagnosis = {
    id: 1,
    pulseTypeID: 1,
    patientID: 1,
    piezoelectricRecordID: 1,
    dateTimeCreated: new Date(),
    dateTimeUpdated: new Date(),
  };
  res.send([mockDiagnosis]);
});

mockPiezoElectricSensorApp.get("/diagnosis/:id/records", (req, res) => {
  res.send(mockPiezoData);
});

const mockPiezoElectricSensorServer = http.createServer(
  mockPiezoElectricSensorApp
);

mockPiezoElectricSensorServer.listen(piezoElectricSensorPort, () => {
  console.log(
    `Piezeo sensor server started at localhost port ${piezoElectricSensorPort}`
  );
});

// ECG sensor service
const ecgSensorPort = 8080;

const mockEcgSensorApp = express();

mockEcgSensorApp.get("/record", (req, res) => {
  res.send(mockEcgData);
});

const mockEcgSensorServer = http.createServer(mockEcgSensorApp);

mockEcgSensorServer.listen(ecgSensorPort, () => {
  console.log(`Ecg sensor server started at localhost port ${ecgSensorPort}`);
});
