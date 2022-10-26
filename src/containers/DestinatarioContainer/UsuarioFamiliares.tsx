import React from "react";
import { SelectTipoParentesco } from "../../components/SelectTipoParentesco";
import { UsuarioAlumnos } from "./UsuarioAlumnos";

interface Props {
  onChangeCiclo: () => void;
  onChangeNivel: () => void;
  onChangeModalidad: () => void;
  onChangeGrado: () => void;
  onChangeGrupo: () => void;
  onChangeMateria:  () => void;
  idUsuario: string;
}
export const UsuarioFamiliares: React.FC<Props> = ({
  onChangeCiclo,
  onChangeNivel,
  onChangeModalidad,
  onChangeMateria,
  onChangeGrado,
  onChangeGrupo,
  idUsuario,
}) => {
  return (
    <>
      <UsuarioAlumnos
        onChangeCiclo={onChangeCiclo}
        onChangeNivel={onChangeNivel}
        onChangeModalidad={onChangeModalidad}
        onChangeGrado={onChangeGrado}
        onChangeGrupo={onChangeGrupo}
        idUsuario={idUsuario}
        onChangeMateria={onChangeMateria}
      />
       <SelectTipoParentesco />
    </>
  );
};
