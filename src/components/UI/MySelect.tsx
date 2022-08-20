import {
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import React from "react";

type Option = {
  value: any;
  text: string;
};

interface Props {
  label: string;
  error?: string;
  value: any;
  data: Option[];
  onChange: (value: any) => void;
}

export const MySelect: React.FC<Props> = ({
  label,
  error,
  value,
  data,
  onChange,
}) => {
  return (
    <>
      <InputLabel>{label}</InputLabel>
      <Select
        error={!!error}
        value={value}
        variant="outlined"
        fullWidth
        displayEmpty
        onChange={(e) => {
          onChange(e.target.value);
        }}
      >
        {data.map(({ value, text }) => (
          <MenuItem key={value} value={value}>
            {text}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText error>{error}</FormHelperText>
    </>
  );
};
