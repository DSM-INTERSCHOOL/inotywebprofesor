import { ENROLLMENTS_BY_CICLO_AND_NIVEL_AND_MODALIDAD_AND_GRADO_AND_GRUPO } from "../constants/graphql_queries/enrollments_by_ciclo_and_nivel_and_modalidad_and_grado_and_grupo";
import { ENROLLMENTS_BY_CICLO_AND_NIVEL_AND_MODALIDAD_AND_GRADO } from "../constants/graphql_queries/enrollments_by_ciclo_and_nivel_and_modalidad_and_grado";
import { ENROLLMENTS_BY_CICLO_AND_NIVEL_AND_MODALIDAD } from "../constants/graphql_queries/enrollments_by_ciclo_and_nivel_and_modalidad";
import { ENROLLMENTS_BY_CICLO_AND_NIVEL } from "../constants/graphql_queries/enrollments_by_ciclo_and_nivel";
import { ENROLLMENTS_BY_CICLO } from "../constants/graphql_queries/enrollments_by_ciclo";
import { ENROLLMENTS_BY_CICLO_AND_GRUPO } from "../constants/graphql_queries/enrollments_by_ciclo_and_grupo";
import { ENROLLMENTS_BY_CICLO_PROFESOR_MATERIA } from "../constants/graphql_queries/enrollments_by_ciclo_profesor_materia";

export const getQueryEnrollmentsBy = ({
  idCiclo,
  idNivel,
  idModalidad,
  idGrado,
  idGrupo,
  idMateria,
  idProfesor,
}) => {
  let vars = {};
  let query;
  let metodo;

  if (idCiclo && idCiclo !== "" && idGrupo && idGrupo !== "") {
    query = ENROLLMENTS_BY_CICLO_AND_GRUPO;
    vars = { idCiclo: idCiclo, idGrupo: idGrupo };
    metodo = "grupoEnrollmentByCicloAndGrupo";
  } else if (idGrupo && idGrupo !== "") {
    query = ENROLLMENTS_BY_CICLO_AND_NIVEL_AND_MODALIDAD_AND_GRADO_AND_GRUPO;
    vars = {
      idCiclo: idCiclo,
      idNivel: idNivel,
      idModalidad: idModalidad,
      idGrado: idGrado,
      idGrupo: idGrupo,
    };
    metodo = "grupoEnrollmentByCicloAndNivelAndModalidadAndGradoAndGrupo";
  } else if (idGrado && idGrado !== "") {
    query = ENROLLMENTS_BY_CICLO_AND_NIVEL_AND_MODALIDAD_AND_GRADO;
    vars = {
      idCiclo: idCiclo,
      idNivel: idNivel,
      idModalidad: idModalidad,
      idGrado: idGrado,
    };
    metodo = "grupoEnrollmentByCicloAndNivelAndModalidadAndGrado";
  } else if (idModalidad && idModalidad !== "") {
    query = ENROLLMENTS_BY_CICLO_AND_NIVEL_AND_MODALIDAD;
    vars = { idCiclo: idCiclo, idNivel: idNivel, idModalidad: idModalidad };
    metodo = "grupoEnrollmentByCicloAndNivelAndModalidad";
  } else if (idNivel && idNivel !== "") {
    query = ENROLLMENTS_BY_CICLO_AND_NIVEL;
    vars = { idCiclo: idCiclo, idNivel: idNivel };
    metodo = "grupoEnrollmentByCicloAndNivel";
  } else if (idCiclo !== "" && idMateria !== "" && idProfesor !== "") {
    query = ENROLLMENTS_BY_CICLO_PROFESOR_MATERIA;
    vars = { idCiclo: idCiclo, idProfesor: idProfesor, idMateria: idMateria };
    metodo = "grupoEnrollmentByCicloAndProfesorAndMateria";
  } else {
    query = ENROLLMENTS_BY_CICLO;
    vars = { idCiclo: "0" };
    metodo = "grupoEnrollmentByCiclo";
  }

  //console.log('query', query)
  //	console.log('vars', vars)
  //	console.log('metodo', metodo)
//   console.log({ query, vars, metodo })

  return { query, vars, metodo };
};
