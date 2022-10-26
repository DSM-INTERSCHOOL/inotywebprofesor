import { Grid } from "@material-ui/core";
import React from "react";
import { SelectTipoParentesco } from "../../components/SelectTipoParentesco";
import { ProfesorAlumnos } from "./ProfesorAlumnos";

interface Props {
  onChangeCiclo: () => void;
  onChangeMateria: () => void;
  onChangeGrupo: () => void;
  idUsuario: string;
  tipoPublicacion: string;
}

export const ProfesorFamiliares: React.FC<Props> = ({
  onChangeCiclo,
  onChangeMateria,
  onChangeGrupo,
  idUsuario,
  tipoPublicacion,
}) => {
  return (
    <>
      <ProfesorAlumnos
        onChangeCiclo={onChangeCiclo}
        onChangeMateria={onChangeMateria}
        onChangeGrupo={onChangeGrupo}
        idUsuario={idUsuario}
        tipoPublicacion={tipoPublicacion}
      />
      <Grid container spacing={2}>
        <Grid item md={12}>
        <SelectTipoParentesco />
        </Grid>
      </Grid>
    </>
  );
};
