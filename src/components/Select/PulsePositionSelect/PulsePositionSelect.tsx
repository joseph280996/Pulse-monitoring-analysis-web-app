import classNames from "classnames";
import { ReactElement } from "react";
import usePulsePositions from "../../../hooks/usePulsePositions";
import { PulsePosition } from "../../../models/PulsePosition";
import Option from "../../Option";
import Select from "../Select";
import "./PulsePositionSelect.scss";
import { PulsePositionProps } from "./PulsePositionSelect.types";

const PulsePositionSelect = ({
  className,
  onPositionChange,
  label,
  ...selectProps
}: PulsePositionProps): ReactElement => {
  const { pulsePositions } = usePulsePositions();
  return (
    <div className={classNames("PulsePositionSelect", className)}>
      {label && (
        <label
          className="PulsePositionSelect-label"
          htmlFor="pulsePositionSelect"
        >
          {label}
        </label>
      )}
      <Select
        id="pulsePositionSelect"
        {...selectProps}
        onChange={onPositionChange}
      >
        {pulsePositions.map((position: PulsePosition) => (
          <Option key={position.id} value={position.id}>
            {position.name}
          </Option>
        ))}
      </Select>
    </div>
  );
};

PulsePositionSelect.defaultProps = {
  className: null,
  name: null,
  required: false,
  onBlur: null,
  label: null,
};

export default PulsePositionSelect;
