import { Grid } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SelectCiclosByTipo } from "../../components/SelectCiclosByTipo";
import { SelectGruposByProfesorAndMateria } from "../../components/SelectGruposByProfesorAndMateria";
import { SelectMateriasByProfesorAndCiclo } from "../../components/SelectMateriasByProfesorAndCiclo";
import { setCalificacionOptionsAction } from "../../store/actions/publicacionActions";
import { SectionDescargarCalificacion } from "./SectionDescargarCalificacion";

interface Props {
  onChangeCiclo: () => void;
  onChangeMateria: () => void;
  onChangeGrupo: () => void;
  idUsuario: string;
  tipoPublicacion: string;
}

export const ProfesorAlumnos: React.FC<Props> = ({
  onChangeCiclo,
  onChangeGrupo,
  idUsuario,
  tipoPublicacion,
  onChangeMateria,
}) => {
  const idMateria = useSelector((state: any) => state.publicaciones.idMateria);
  const idGrupo = useSelector((state: any) => state.publicaciones.idGrupo);

  const idCiclo = useSelector((state: any) => state.publicaciones.idCiclo);
  const calificacionOptions = useSelector(
    (state: any) => state.publicaciones.calificacionOptions
  );

  const dispatch = useDispatch();

  return (
    <>
      {/* <h4>Profesor Alumno</h4> */}
      <Grid container spacing={2}>
        <Grid item md={12}>
          <SelectCiclosByTipo
            tipo={"NORMAL"}
            idCiclo={idCiclo}
            onChangeCiclo={onChangeCiclo}
          />
        </Grid>
        <Grid item md={12}>
          <SelectMateriasByProfesorAndCiclo
            idMateria={idMateria}
            idProfesor={idUsuario}
            idCiclo={idCiclo}
            onChangeMateria={onChangeMateria}
            tipoPublicacion={tipoPublicacion}
          />
        </Grid>
        <Grid item md={12}>
          <SelectGruposByProfesorAndMateria
            idProfesor={idUsuario}
            idMateria={idMateria}
            idGrupo={idGrupo}
            idCiclo={idCiclo}
            onChangeGrupo={onChangeGrupo}
          />
        </Grid>
        <Grid item md={12}>
          <SectionDescargarCalificacion
            idCiclo={idCiclo}
            idGrupo={idGrupo}
            idMateria={idMateria}
            defaultValues={calificacionOptions}
            onChange={(calificacionOptions) => {
              dispatch(setCalificacionOptionsAction(calificacionOptions));
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};
