import React from "react";
import { IDestinatario } from "../../../../interfaces/destinatario.interface";

interface Props {
  destinatario: IDestinatario;
  onSelect: (destinatario: IDestinatario, checked: boolean) => void;
}
export const DestinatarioItem: React.FC<Props> = ({
  destinatario,
  onSelect,
}) => {
  const [checked, setChecked] = React.useState(destinatario._checked);

  React.useEffect(() => {
    setChecked(destinatario._checked);
  }, [destinatario._checked]);

  return (
    <div
      onClick={() => {
        const newChecked = !checked;
        setChecked(newChecked);
        onSelect(destinatario, newChecked);
      }}
      style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
    >
      <input type={"checkbox"} checked={checked} />
      <p>
        {destinatario.idAlumno} {destinatario.nombreCompleto}
      </p>
    </div>
  );
};
