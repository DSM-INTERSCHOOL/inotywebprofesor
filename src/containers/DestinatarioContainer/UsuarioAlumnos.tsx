import { Grid } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { SelectCiclosByTipo } from "../../components/SelectCiclosByTipo";
import { SelectGradosByModalidad } from "../../components/SelectGradosByModalidad";
import { SelectGruposByModalidadAndGrado } from "../../components/SelectGruposByModalidadAndGrado";
import { SelectMateriasByInscripcion } from "../../components/SelectMateriasByInscripcion";
import { SelectModalidadesByNivel } from "../../components/SelectModalidadesByNivel";
import { SelectNivelesByIdUsuario } from "../../components/SelectNivelesByUsuario";

interface Props {
  onChangeCiclo: () => void;
  onChangeNivel: () => void;
  onChangeModalidad: () => void;
  onChangeGrado: () => void;
  onChangeGrupo: () => void;
  onChangeMateria: () => void;
  idUsuario: string;
}
export const UsuarioAlumnos: React.FC<Props> = ({
  onChangeCiclo,
  idUsuario,
  onChangeNivel,
  onChangeModalidad,
  onChangeGrado,
  onChangeGrupo,
  onChangeMateria,
}) => {
  const idMateria = useSelector((state: any) => state.publicaciones.idMateria);
  const idGrupo = useSelector((state: any) => state.publicaciones.idGrupo);
  const idNivel = useSelector((state: any) => state.publicaciones.idNivel);
  const idModalidad = useSelector(
    (state: any) => state.publicaciones.idModalidad
  );
  const idGrado = useSelector((state: any) => state.publicaciones.idGrado);
  const idCiclo = useSelector((state: any) => state.publicaciones.idCiclo);
  const ciclos = useSelector((state: any) => state.publicaciones.ciclos);
  const niveles = useSelector((state: any) => state.publicaciones.niveles);
  const modalidades = useSelector((state:any) => state.publicaciones.modalidades);
  const grados = useSelector((state: any) => state.publicaciones.grados);
  const grupos = useSelector((state: any) => state.publicaciones.grupos);
  const materias = useSelector((state: any) => state.publicaciones.materias);


  const calificacionOptions = useSelector(
    (state: any) => state.publicaciones.calificacionOptions
  );
  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        <SelectCiclosByTipo
          tipo={"NORMAL"}
          idCiclo={idCiclo}
          onChangeCiclo={onChangeCiclo}
        />

        <SelectNivelesByIdUsuario
          idUsuario={idUsuario}
          idNivel={idNivel}
          onChangeNivel={onChangeNivel}
        />

        <SelectModalidadesByNivel
          idNivel={idNivel}
          idModalidad={idModalidad}
          onChangeModalidad={onChangeModalidad}
        />
        <SelectGradosByModalidad
          idModalidad={idModalidad}
          idGrado={idGrado}
          onChangeGrado={onChangeGrado}
        />

        <SelectGruposByModalidadAndGrado
          idModalidad={idModalidad}
          idGrado={idGrado}
          idGrupo={idGrupo}
          onChangeGrupo={onChangeGrupo}
        />

        <SelectMateriasByInscripcion
          idMateria={idMateria}
          ciclos={ciclos}
          niveles={niveles}
          modalidades={modalidades}
          grados={grados}
          grupos={grupos}
          onChangeMateria={onChangeMateria}
        />
      </Grid>
    </Grid>
  );
};
