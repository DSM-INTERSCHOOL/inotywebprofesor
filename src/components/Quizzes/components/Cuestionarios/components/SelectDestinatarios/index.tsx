import React from "react";
import { IDestinatario } from "../../../../interfaces/destinatario.interface";
import { useCuestionariosContext } from "../../context/CuestionariosContext";
import { useDestinatarios } from "../../hooks/useDestinatarios";
import { DestinatarioItem } from "./DestinatarioItem";

export const SelectDestinatarios = () => {
  const { destinatarios, setDestinatarios } = useCuestionariosContext();

  
  const handle = React.useCallback(
    (destinatario: IDestinatario, checked: boolean) => {
      const newDestinatarios = destinatarios.map((d) => {
        if (d.idAlumno === destinatario.idAlumno) {
          d._checked = checked;
        }
        return d;
      });
      setDestinatarios(newDestinatarios);
    },
    [destinatarios]
  );
  return (
    <>
      <p>Selected: {destinatarios.filter((d) => d._checked).length}</p>
      {destinatarios.map((d) => (
        <DestinatarioItem
          destinatario={d}
          key={d.idAlumno}
          onSelect={handle}
        />
      ))}
    </>
  );
};
