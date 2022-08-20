import React from "react";
import { useQuery } from "react-apollo";
import { IMateria } from "../components/Quizzes/interfaces/materia.interface";
import { MATERIAS_BY_PROFESOR_AND_CICLO } from "../constants/graphql_queries/materias_by_profesor_and_ciclo";

export const useGruposByProfesorMateria = (
  idProfesor: string,
  idCiclo: string,
  idMateria: string
) => {
  const { loading, error, data } = useQuery(MATERIAS_BY_PROFESOR_AND_CICLO, {
    variables: { idProfesor: idProfesor, idCiclo: idCiclo },
  });
  let grupos: string[] = [];
  if (!loading && !error) {
    const materias = data.materiasByIdCicloAndIdProfesor as IMateria[];

    const gruposMaterias = materias.filter((el) => {
      return el.idMateria === idMateria;
    });

    grupos = materias
      .filter((el) => {
        return el.idMateria === idMateria;
      })
      .reduce(function (acc, curr) {
        if (
          acc.length === 0 ||
          !acc.some((el) => el.idGrupo === curr.idGrupo)
        ) {
          acc.push(curr);
        }
        return acc;
      }, [] as IMateria[])
      .sort(function (a, b) {
        var nameA = a.idGrupo.toUpperCase();
        var nameB = b.idGrupo.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        return 0;
      })
      .map(({ idGrupo }) => idGrupo);
  }

  return {
    grupos,
  };
};
