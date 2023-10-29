import * as React from "react";
import { Label } from "reactstrap";

import Styled from "./InputLable.module.scss";

export interface InpuLableProps {
  significant: boolean;
  lableText?: string;
  className?: string;
}

const InpuLable: React.FC<InpuLableProps> = ({
  significant,
  lableText,
  className,
}) => {
  return (
    <>
      <Label
        for="InputHelp"
        className={`${Styled["input-margin"]} ${className}`}
      >
        {lableText}
      </Label>
      {significant && (
        <small className="text-muted">
          <i className="danger"> * </i>
        </small>
      )}
    </>
  );
};

export { InpuLable };
