import { gql } from "apollo-boost";

export const ENROLLMENTS_BY_CICLO_AND_NIVEL_AND_MODALIDAD = gql`
  query GrupoEnrollmentByCicloAndNivelAndModalidad(
    $idCiclo: String!
    $idNivel: String!
    $idModalidad: String!
  ) {
    grupoEnrollmentByCicloAndNivelAndModalidad(
      idCiclo: $idCiclo
      idNivel: $idNivel
      idModalidad: $idModalidad
    ) {
      id
      idPersona
      nombre
      tipo
    }
  }
`;
