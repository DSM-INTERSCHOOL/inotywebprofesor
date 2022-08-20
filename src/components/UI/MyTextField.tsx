import { FormHelperText, InputLabel, TextField } from "@material-ui/core";

import React from "react";

interface Props {
  label: string;
  error?: string;
  value: any;
  onChange: (value: any) => void;
  type?: "text" | "date" | "number";
}

export const MyTextField: React.FC<Props> = ({
  label,
  error,
  value,
  onChange,
  type = "text",
}) => {
  return (
    <>
      <InputLabel>{label}</InputLabel>
      <TextField
        type={type}
        error={!!error}
        value={value}
        onChange={(e) => {
          if (type === "number") {
            onChange(+e.target.value);
          } else {
            onChange(e.target.value);
          }
        }}
        variant="outlined"
        fullWidth
      />
      <FormHelperText error>{error}</FormHelperText>
    </>
  );
};
