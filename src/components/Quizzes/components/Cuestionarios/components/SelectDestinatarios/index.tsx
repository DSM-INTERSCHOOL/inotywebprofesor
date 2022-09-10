import React from "react";
import { IDestinatario } from "../../../../interfaces/destinatario.interface";
import { useCuestionariosContext } from "../../context/CuestionariosContext";
import { useDestinatarios } from "../../hooks/useDestinatarios";
import { DestinatarioItem } from "./DestinatarioItem";

export const SelectDestinatarios = () => {
  const { destinatarios, setDestinatarios } = useCuestionariosContext();
  const [selectAll, setSelectAll] = React.useState(false);

  const handleClickDestinatario = React.useCallback(
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

  React.useEffect(() => {
    const newDestinatarios = destinatarios.map((d) => {
      d._checked = selectAll;

      return d;
    });
    setDestinatarios(newDestinatarios);
  }, [selectAll]);

  return (
    <div style={{ maxHeight: 600 }}>
      <p>Selected: {destinatarios.filter((d) => d._checked).length}</p>
      <p
        style={{ cursor: "pointer" }}
        onClick={() => setSelectAll((prev) => !prev)}
      >
        <input type="checkbox" checked={selectAll} />
        Select all
      </p>
      {/* <pre>{JSON.stringify(destinatarios, null, 2)}</pre> */}
      {destinatarios.map((d) => (
        <DestinatarioItem
          destinatario={d}
          key={d.idAlumno}
          onSelect={handleClickDestinatario}
        />
      ))}
    </div>
  );
};
