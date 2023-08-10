import { ZoomIn, ZoomOut } from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import { type ZoomableChartViewPropsType } from "./ZoomableChartList.types";
import { Slider, Stack } from "@mui/material";
import {
  // type DomainTuple,
  VictoryChart,
  VictoryLine,
  VictoryZoomContainer,
} from "victory";
import RecordSession from "../../../models/RecordSession";
import RecordInstance from "../../../models/RecordInstance";
import "./ZoomableChartList.css";

function ZoomableChartListView({
  dataLists,
  // onZoom,
  zoomDomain,
  zoomMin,
  zoomMax,
  // zoomValue,
  zoomContainerProp,
}: ZoomableChartViewPropsType): JSX.Element {
  return (
    <Grid container>
      {dataLists.map((dataList: RecordSession, index: number) => {
        const firstTimeStamp = (dataList.records as RecordInstance[])[0]
          .timeStamp;
        const dataToPlot = (dataList.records as RecordInstance[]).map(
          (record: RecordInstance) => {
            return {
              timeStamp: record.timeStamp - firstTimeStamp,
              data: record.data,
            };
          }
        );

        console.log(index + "_" + zoomDomain.x + "_" + zoomDomain.y);

        return (
          <Grid
            item
            xs={12}
            key={`${dataList.diagnosisId}_${dataList.recordTypeId}`}
          >
            <VictoryChart
              scale={{ x: "linear" }}
              width={1800}
              height={500}
              containerComponent={
                <VictoryZoomContainer {...zoomContainerProp} />
              }
            >
              <VictoryLine
                x="timeStamp"
                y="data"
                style={{ data: { stroke: "tomato" } }}
                data={dataToPlot}
              />
            </VictoryChart>
          </Grid>
        );
      })}
      <Grid item xs={12} container>
        <Grid item container direction="column" alignItems="center">
          <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
            <ZoomOut />
            <Slider
              className="slider"
              defaultValue={0}
              step={zoomMax / 10}
              marks
              min={zoomMin}
              max={zoomMax}
            />
            <ZoomIn />
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ZoomableChartListView;
