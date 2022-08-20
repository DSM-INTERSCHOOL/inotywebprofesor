import { gql } from 'apollo-boost';

export const PROFESORES_BY_CICLO_AND_NIVEL_AND_MODALIDAD_AND_GRADO_AND_GRUPO = gql`

query profesoresByCicloAndNivelAndModalidadAndGradoAndGrupo($idCiclo: String!,$idNivel: String!,$idModalidad: String!,$idGrado: String!, $idGrupo: String!){
	profesoresByCicloAndNivelAndModalidadAndGradoAndGrupo(idCiclo: $idCiclo, idNivel: $idNivel,idModalidad: $idModalidad, idGrado: $idGrado, idGrupo: $idGrupo){        
        idPersona
        idProfesor
        nombreCompleto
	}
}
`;