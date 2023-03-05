import { useCallback, useState } from "react";
import { LineChart } from "recharts";

interface GetAxisDomainRequestType {
  data: any[];
  from: number;
  to: number;
  ref: string;
  offset: number;
}

const getAxisYDomain = ({
  data,
  from,
  to,
  ref,
  offset,
}: GetAxisDomainRequestType) => {
  const refData: any[] = data.slice(from - 1, to);
  let [bottom, top] = [refData[0][ref], refData[0][ref]];

  refData.forEach((datum) => {
    if (datum[ref] > top) top = datum[ref];
    if (datum[ref] < bottom) bottom = datum[ref];
  });

  return [(bottom | 0) - offset, (top | 0) + offset];
};

interface AnalysisViewPropsType {
  data: any[];
}

function AnalysisView({ data: initialData }: AnalysisViewPropsType) {
  const [left, setLeft] = useState<string>("dataMin");
  const [right, setRight] = useState<string>("dataMax");
  const [top, setTop] = useState<string>("dataMax+1");
  const [bottom, setBottom] = useState<string>("dataMax-1");
  const [refAreaLeft, setRefAreaLeft] = useState<string>("");
  const [refAreaRight, setRefAreaRight] = useState<string>("");
  const [data, setData] = useState<any[]>(initialData);

  const zoom = useCallback(() => {
    let [leftRef, rightRef] = [refAreaLeft, refAreaRight];
    if (leftRef === rightRef || rightRef === "") {
      setLeft("");
      setRight("");
      return;
    }

    if (leftRef > rightRef) {
      [leftRef, rightRef] = [refAreaRight, refAreaLeft];
    }

    const [newBottom, newTop] = getAxisYDomain({
      data,
      from: Number(refAreaLeft),
      to: Number(refAreaRight),
      ref: "data",
      offset: 1,
    });

    setRefAreaLeft("");
    setRefAreaRight("");
    setData((data) => data.slice());
    setLeft(refAreaLeft);
    setRight(refAreaRight);
    setBottom(newBottom.toString());
    setTop(newTop.toString());
  }, [data, refAreaRight, refAreaLeft]);

  return (
    <div>
      <LineChart
        onMouseDown={(e: any) => {
          setLeft(e.activeLabel);
        }}
        onMouseMove={(e: any) => {
          left && setRight(e.activeLabel);
        }}
        onMouseUp={zoom}
      />
    </div>
  );
}

export default AnalysisView;
