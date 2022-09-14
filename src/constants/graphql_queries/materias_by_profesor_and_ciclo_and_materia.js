import { gql } from "apollo-boost";

export const MATERIAS_BY_PROFESOR_AND_CICLO_AND_MATERIA = gql`
  query MateriasByIdCicloAndIdProfesorAndIdMateria(
    $idProfesor: String!
    $idCiclo: String!
    $idMateria: String!
  ) {
    materiasByIdCicloAndIdProfesorAndIdMateria(
      idProfesor: $idProfesor
      idCiclo: $idCiclo
      idMateria: $idMateria
    ) {
      idMateria
      tipo
      idCiclo
      idProfesor
      idGrupo
      descripcionCiclo
      descripcion
    }
  }
`;
