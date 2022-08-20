import React from "react";
import { useQuery } from "react-apollo";
import { IMateria } from "../components/Quizzes/interfaces/materia.interface";
import { MATERIAS_BY_PROFESOR_AND_CICLO } from "../constants/graphql_queries/materias_by_profesor_and_ciclo";

export const useMateriasProfesorCiclo = (
  idProfesor: string,
  idCiclo: string
) => {
  const { loading, error, data } = useQuery(MATERIAS_BY_PROFESOR_AND_CICLO, {
    variables: { idProfesor: idProfesor, idCiclo: idCiclo },
  });

  let materias: IMateria[] = [];

  if (!loading) {
    materias = data.materiasByIdCicloAndIdProfesor;
  }

  return {
    materias,
  };
};
