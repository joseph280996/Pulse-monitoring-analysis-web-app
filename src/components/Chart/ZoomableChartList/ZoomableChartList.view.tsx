import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import ZoomIn from "@mui/icons-material/ZoomIn";
import ZoomOut from "@mui/icons-material/ZoomOut";
import { CartesianGrid, LineChart, XAxis, YAxis } from "recharts";
import Grid from "@mui/material/Grid";
import { ZoomableChartViewPropsType } from "./ZoomableChartList.types";

function ZoomableChartListView({
  dataList,
  leftBound,
  rightBound,
  topBound,
  bottomBound,
  onZoom,
  zoomValue,
}: ZoomableChartViewPropsType) {
  return (
    <>
      {dataList.map((data: any[]) => {
        return (
          <Grid item xs={12}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="data"
                domain={[leftBound, rightBound]}
                type="number"
                allowDataOverflow
              />
              <YAxis
                dataKey="timestamp"
                domain={[bottomBound, topBound]}
                allowDataOverflow
              />
            </LineChart>
          </Grid>
        );
      })}
      <Grid item xs={12}>
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          <ZoomOut />
          <Slider aria-label="Volume" value={zoomValue} onChange={onZoom} />
          <ZoomIn />
        </Stack>
      </Grid>
    </>
  );
}

export default ZoomableChartListView;
