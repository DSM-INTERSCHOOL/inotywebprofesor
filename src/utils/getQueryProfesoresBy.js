import { PROFESORES_BY_CICLO_AND_NIVEL_AND_MODALIDAD_AND_GRADO_AND_GRUPO } from "../constants/graphql_queries/profesores_by_ciclo_by_nivel_by_modalidad_and_grado_and_grupo";
import { PROFESORES_BY_CICLO_AND_NIVEL_AND_MODALIDAD_AND_GRADO } from "../constants/graphql_queries/profesores_by_ciclo_and_nivel_and_modalidad_and_grado";
import { PROFESORES_BY_CICLO_AND_NIVEL_AND_MODALIDAD } from "../constants/graphql_queries/profesores_by_ciclo_and_nivel_and_modalidad";
import { PROFESORES_BY_CICLO_AND_NIVEL } from "../constants/graphql_queries/profesores_by_ciclo_and_nivel";
import { PROFESORES_BY_CICLO } from "../constants/graphql_queries/profesores_by_ciclo";
import { PROFESORES_BY_ESTATUS } from "../constants/graphql_queries/profesores_by_estatus";

export const getQueryProfesoresBy = ({ idCiclo, idNivel, idModalidad, idGrado, idGrupo, estatus }) => {
	let vars = {};
	let query;
	let metodo;


	if (idGrupo && idGrupo!=='') {
		query = PROFESORES_BY_CICLO_AND_NIVEL_AND_MODALIDAD_AND_GRADO_AND_GRUPO;
		vars = { idCiclo: idCiclo, idNivel: idNivel, idModalidad: idModalidad, idGrado: idGrado, idGrupo: idGrupo };
		metodo = 'profesoresByCicloAndNivelAndModalidadAndGradoAndGrupo';
	} else if (idGrado && idGrado!=='') {		
		query = PROFESORES_BY_CICLO_AND_NIVEL_AND_MODALIDAD_AND_GRADO;
		vars = { idCiclo: idCiclo, idNivel: idNivel, idModalidad: idModalidad, idGrado: idGrado };
		metodo = 'profesoresByCicloAndNivelAndModalidadAndGrado';
	} else if (idModalidad && idModalidad!=='') {
		query = PROFESORES_BY_CICLO_AND_NIVEL_AND_MODALIDAD;
		vars = { idCiclo: idCiclo, idNivel: idNivel, idModalidad: idModalidad };
		metodo = 'profesoresByCicloAndNivelAndModalidad';
	} else if (idNivel && idNivel!=='') {
		query = PROFESORES_BY_CICLO_AND_NIVEL;
		vars = { idCiclo: idCiclo, idNivel: idNivel };
		metodo = 'profesoresByCicloAndNivel';
	} else if (idCiclo && idCiclo!=='') {
		query = PROFESORES_BY_CICLO;
		vars = { idCiclo: idCiclo };
		metodo = 'profesoresByCiclo';
	} else if(estatus && estatus!==''){
		query = PROFESORES_BY_ESTATUS;
		vars = { estatus: estatus };
		metodo = 'profesoresByEstatus';
	}
	else {
		query = PROFESORES_BY_CICLO;
		vars = { idCiclo: '0' };
		metodo = 'profesoresByCiclo';
	}

    
    return {query,vars,metodo}
};
