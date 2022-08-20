import { InputLabel, Switch } from "@material-ui/core";
import React from "react";

interface Props {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export const MySwitch: React.FC<Props> = ({ label, value, onChange }) => {
  return (
    <>
      <InputLabel>{label}</InputLabel>
      <Switch
        color="primary"
        checked={value}
        onChange={(e, checked) => {
          onChange(checked);
        }}
      />
    </>
  );
};
