import { Button, TextField } from "@material-ui/core";
import React, { useRef, useState } from "react";

interface Props {
  defaultValue: number;
  onSave: (calif: number) => void;
}

export const CalificacionEnsayo: React.FC<Props> = ({
  defaultValue,
  onSave,
}) => {
  const calificacion = useRef<any>();
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <TextField
        type="number"
        variant="outlined"
        placeholder="puntos obtenidos"
        defaultValue={defaultValue}
        inputRef={calificacion}
      />
      <Button
        variant="outlined"
        color="primary"
        onClick={() => {
          onSave(+calificacion.current.value);
        }}
      >
        Guardar
      </Button>
    </div>
  );
};
