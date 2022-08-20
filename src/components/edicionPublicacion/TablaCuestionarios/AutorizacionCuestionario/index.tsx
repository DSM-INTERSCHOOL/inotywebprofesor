import React from "react";
import { FormGroup, Switch } from "@material-ui/core";
import { FormControlLabel } from "@mui/material";

interface Props {
  value: string;
}

export const ChecBoxAutorizacionCuestionario: React.FC<Props> = ({ value }) => {

  const handleClick = () => {
	console.log(value);
	
  };

  return (
    <FormGroup style={{ width: 40 }}>
      <FormControlLabel control={<Switch size="small" />} label="" onClick={handleClick} />
    </FormGroup>
  );
};
