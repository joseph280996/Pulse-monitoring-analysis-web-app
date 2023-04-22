import { ZoomIn, ZoomOut } from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import { type ZoomableChartViewPropsType } from "./ZoomableChartList.types";
import { Slider, Stack } from "@mui/material";
import {
  type DomainTuple,
  VictoryChart,
  VictoryLine,
  VictoryZoomContainer,
} from "victory";

function ZoomableChartListView({
  dataList,
  onZoom,
  zoomDomain,
  zoomMin,
  zoomMax,
  zoomValue,
  zoomContainerProp,
}: ZoomableChartViewPropsType): JSX.Element {
  console.log(zoomDomain);
  return (
    <>
      {dataList.map((data: any[], idx) => {
        const firstTimeStamp = data[0].timeStamp;
        const dataToPlot = data.map(
          ({ timeStamp, data }: { timeStamp: number; data: number }) => {
            return { timeStamp: timeStamp - firstTimeStamp, data };
          }
        );
        return (
          <Grid item xs={12} key={idx}>
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
      <Grid item xs={12}>
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          <ZoomOut />
          <Slider
            value={zoomValue}
            min={zoomMin}
            max={zoomMax}
            onChange={(_, value) => {
              const currZoomDomain = zoomDomain.x ?? [zoomMin, zoomMax];
              const newDomain = {
                ...zoomDomain,
                x: [
                  (currZoomDomain[0] as number) + (value as number),
                  (currZoomDomain[1] as number) - (value as number),
                ] as DomainTuple,
              };
              onZoom(newDomain, zoomContainerProp);
            }}
          />
          <ZoomIn />
        </Stack>
      </Grid>
    </>
  );
}

export default ZoomableChartListView;
