import { MATERIAS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES_AND_GRADOS_AND_GRUPOS } from '../constants/graphql_queries/materias_by_ciclos_and_niveles_and_modalidades_and_grados_and_grupos';
import { MATERIAS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES_AND_GRADOS } from '../constants/graphql_queries/materias_by_ciclos_and_niveles_and_modalidades_and_grados';
import { MATERIAS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES } from '../constants/graphql_queries/materias_by_ciclos_and_niveles_and_modalidades';
import { MATERIAS_BY_CICLOS_AND_NIVELES } from '../constants/graphql_queries/materias_by_ciclos_and_niveles';

export const getQueryMateriasBy = ({ ciclos, niveles, modalidades, grados, grupos}) => {
	let vars = {};
	let query;
	let metodo;	
	
	
		if (grupos.length > 0) {
			query = MATERIAS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES_AND_GRADOS_AND_GRUPOS;
			vars = { ciclos: ciclos, niveles: niveles, modalidades: modalidades, grados: grados, grupos: grupos };
			metodo = 'materiasByCiclosAndNivelesAndModalidadesAndGradosAndGrupos';
		} else if (grados.length > 0) {
			query = MATERIAS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES_AND_GRADOS;
			vars = { ciclos: ciclos, niveles: niveles, modalidades: modalidades, grados: grados };
			metodo = 'materiasByCiclosAndNivelesAndModalidadesAndGrados';
		} else if (modalidades.length > 0) {
			query = MATERIAS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES;
			vars = { ciclos: ciclos, niveles: niveles, modalidades: modalidades };
			metodo = 'materiasByCiclosAndNivelesAndModalidades';
		} else if (niveles.length > 0) {
			query = MATERIAS_BY_CICLOS_AND_NIVELES;
			vars = { ciclos: ciclos, niveles: niveles };
			metodo = 'materiasByCiclosAndNiveles';
		} else{
			query = MATERIAS_BY_CICLOS_AND_NIVELES;
			vars = { ciclos: ciclos, niveles: niveles };	
					metodo = 'materiasByCiclosAndNiveles';

		}


	
	return { query, vars, metodo };
};
