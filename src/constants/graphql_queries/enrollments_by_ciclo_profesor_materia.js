import { gql } from "apollo-boost";

export const ENROLLMENTS_BY_CICLO_PROFESOR_MATERIA = gql`
  query GrupoEnrollmentByCicloAndProfesorAndMateria(
    $idCiclo: String!
    $idProfesor: String!
    $idMateria: String!
  ) {
    grupoEnrollmentByCicloAndProfesorAndMateria(
      idCiclo: $idCiclo
      idMateria: $idMateria
      idProfesor: $idProfesor
    ) {
      id
      idPersona
      nombre
      tipo
    }
  }
`;
