import classNames from "classnames";
import { ReactElement } from "react";
import usePulseTypes from "../../../hooks/usePulseTypes";
import LoadingSpinner from "../../LoadingSpinner";
import Option from "../../Option";
import Select from "../Select";
import "./PulseTypeSelect.scss";
import { PulseTypeSelectProps } from "./PulseTypeSelect.types";

function PulseTypeSelect({
  className,
  onChange,
  value,
  name,
  onBlur,
}: PulseTypeSelectProps): ReactElement {
  const { pulseTypes, error } = usePulseTypes();
  if (error) {
    return <LoadingSpinner />;
  }
  return (
    <div className={classNames("PulseTypeSelect", className)}>
      <Select name={name} value={value} onBlur={onBlur} onChange={onChange}>
        {(pulseTypes || []).map((pulseType) => {
          return (
            <Option value={pulseType.id} key={pulseType.id}>
              {pulseType.name}
            </Option>
          );
        })}
      </Select>
    </div>
  );
}

PulseTypeSelect.defaultProps = {
  className: "",
  name: null,
};

export default PulseTypeSelect;
