import React from "react";
import { FormGroup, Switch } from "@material-ui/core";
import { FormControlLabel } from "@mui/material";

interface Props {
  checked: boolean;
  onChange : (checked:boolean)=>void
}

export const ChecBoxAutorizacionCuestionario: React.FC<Props> = ({ checked, onChange }) => {

  const [selected, setSelected] = React.useState(checked)

  const handleClick = () => {
    const newSelected = !selected
    setSelected(newSelected)
    onChange(newSelected)
	
  };

  return (
    <FormGroup style={{ width: 40 }}>
      <FormControlLabel  control={<Switch size="small" checked={selected}/>} label="" onClick={handleClick} />
    </FormGroup>
  );
};
