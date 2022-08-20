import React from "react";
import { useLazyQuery, useQuery } from "react-apollo";
import { useCuestionariosContext } from "../context/CuestionariosContext";
import { ALUMNOS_BY_PROFESOR_AND_CICLOS } from "../../../../../constants/graphql_queries/alumnos_by_profesor_and_ciclos";
import { ALUMNOS_BY_PROFESOR_AND_CICLOS_AND_MATERIAS } from "../../../../../constants/graphql_queries/alumnos_by_profesor_and_ciclos_and_materias";
import { ALUMNOS_BY_PROFESOR_AND_CICLOS_AND_MATERIAS_AND_GRUPOS } from "../../../../../constants/graphql_queries/alumnos_by_profesor_and_ciclos_and_materias_and_grupos";
import { getQueryAlumnosBy } from "../../../../../utils/getQueryAlumnosBy";
import {
  getUserLocalStorage,
  UserLocalStorage,
} from "../../../../../utils/getUserLocalStorage";

interface Args {
  ciclos: string[];
  idProfesor: string;
  grupos: string[];
  materias: string[];
}

const getQuery = ({ grupos, ciclos, idProfesor, materias }: Args) => {
  let vars = {};
  let query;
  let metodo;
  if (ciclos.length > 0 && materias?.length > 0 && grupos?.length > 0) {
    query = ALUMNOS_BY_PROFESOR_AND_CICLOS_AND_MATERIAS_AND_GRUPOS;
    vars = {
      idProfesor: idProfesor,
      ciclos: ciclos,
      materias: materias,
      grupos: grupos,
    };
    metodo = "alumnosByIdProfesorAndCiclosAndMateriasAndGrupos";
    return { query, vars, metodo };
  }

  if (ciclos.length > 0 && materias.length > 0) {
    query = ALUMNOS_BY_PROFESOR_AND_CICLOS_AND_MATERIAS;
    vars = { idProfesor: idProfesor, ciclos: ciclos, materias: materias };
    metodo = "alumnosByIdProfesorAndCiclosAndMaterias";
    return { query, vars, metodo };
  }

  if (ciclos.length > 0) {
    query = ALUMNOS_BY_PROFESOR_AND_CICLOS;
    vars = { idProfesor: idProfesor, ciclos: ciclos };
    metodo = "alumnosByIdProfesorAndCiclos";
    return { query, vars, metodo };
  }

  query = ALUMNOS_BY_PROFESOR_AND_CICLOS;
  vars = { idProfesor: idProfesor, ciclos: [] };
  metodo = "alumnosByIdProfesorAndCiclos";
  return { query, vars, metodo };
};

export const useDestinatarios = () => {
  const tipoUsuario = "PROFESOR";
  const tipoPublicacion = "cuestionarios";
  const { idCicloResultado, idGrupo, idMateriaResultado } =
    useCuestionariosContext();
  const { idUsuario } = getUserLocalStorage() as UserLocalStorage;
  const {
    query: queryAlumno,
    vars: varsAlumno,
    metodo: metodoAlumno,
  } = getQuery({
    ciclos: idCicloResultado ? [idCicloResultado] : [],
    materias: idMateriaResultado ? [idMateriaResultado] : [],
    grupos: idGrupo ? [idGrupo] : [],
    idProfesor: idUsuario,
  });

  const { loading, error, data } = useQuery(queryAlumno!, {
    variables: varsAlumno,
    fetchPolicy: "no-cache",
  });

  let destinatarios = [];
  if (!loading && !error) {
    for (let key in data) {
      destinatarios = data[key];
    }
  }

  return {
    loading,
    error,
    data: destinatarios,
  };
};
