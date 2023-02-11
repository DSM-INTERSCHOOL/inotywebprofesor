import { PARENTESCOS_BY_CICLO_AND_NIVEL_AND_MODALIDAD_AND_GRADO_AND_GRUPO } from '../constants/graphql_queries/parentescos_by_ciclo_by_nivel_by_modalidad_and_grado_and_grupo';
import { PARENTESCOS_BY_CICLO_AND_NIVEL_AND_MODALIDAD_AND_GRADO } from '../constants/graphql_queries/parentescos_by_ciclo_and_nivel_and_modalidad_and_grado';
import { PARENTESCOS_BY_CICLO_AND_NIVEL_AND_MODALIDAD } from '../constants/graphql_queries/parentescos_by_ciclo_and_nivel_and_modalidad';
import { PARENTESCOS_BY_CICLO_AND_NIVEL } from '../constants/graphql_queries/parentescos_by_ciclo_and_nivel';
import { PARENTESCOS_BY_CICLO } from '../constants/graphql_queries/parentescos_by_ciclo';
import { PARENTESCOS_BY_PROFESOR_AND_CICLOS_AND_MATERIAS } from '../constants/graphql_queries/parentescos_by_profesor_and_ciclos_and_materias';
import { PARENTESCOS_BY_PROFESOR_AND_CICLOS_AND_MATERIAS_AND_GRUPOS } from '../constants/graphql_queries/parentescos_by_profesor_and_ciclos_and_materias_and_grupos';
import { PARENTESCOS_BY_PROFESOR_AND_CICLOS } from '../constants/graphql_queries/parentescos_by_profesor_and_ciclos';
import { PARENTESCOS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES_AND_GRADOS_AND_GRUPOS_AND_MATERIAS } from '../constants/graphql_queries/parentescos_by_ciclos_and_niveles_and_modalidades_and_grados_and_grupos_and_materias';
import { PARENTESCOS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES_AND_GRADOS_AND_MATERIAS } from '../constants/graphql_queries/parentescos_by_ciclos_and_niveles_and_modalidades_and_grados_and_materias';
import { PARENTESCOS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES_AND_MATERIAS } from '../constants/graphql_queries/parentescos_by_ciclos_and_niveles_and_modalidades_and_materias';
import { PARENTESCOS_BY_CICLOS_AND_NIVELES_AND_MATERIAS } from '../constants/graphql_queries/parentescos_by_ciclos_and_niveles_and_materias';

import { PARENTESCOS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES_AND_GRADOS_AND_GRUPOS } from '../constants/graphql_queries/parentescos_by_ciclos_and_niveles_and_modalidades_and_grados_and_grupos';
import { PARENTESCOS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES_AND_GRADOS } from '../constants/graphql_queries/parentescos_by_ciclos_and_niveles_and_modalidades_and_grados';
import { PARENTESCOS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES } from '../constants/graphql_queries/parentescos_by_ciclos_and_niveles_and_modalidades';
import { PARENTESCOS_BY_CICLOS_AND_NIVELES } from '../constants/graphql_queries/parentescos_by_ciclos_and_niveles';


import { closeToastMessage } from '../store/actions/toastMessageActions';


export const getQueryParentescosBy = ({
	idCiclo,
	idNivel,
	idModalidad,
	idGrado,
	idGrupo,
	tipos,
	idProfesor,
	ciclos,
	niveles,
    modalidades,
    grados,
	grupos,
	materias,
	tipoUsuario,
	tipoPublicacion
}) => {
	let vars = {};
	let query;
	let metodo;


	if (tipoUsuario === 'USUARIO') {
		if (tipoPublicacion === 'tareas') {
			if (idGrupo !== '') {
				query = PARENTESCOS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES_AND_GRADOS_AND_GRUPOS_AND_MATERIAS;
				vars = {
					ciclos: ciclos,
					niveles: [ idNivel ],
					modalidades: [ idModalidad ],
					grados: [ idGrado ],
					grupos: [ idGrupo ],
					materias: materias,
					tipos: tipos
				};
				metodo = 'parentescosByCiclosAndNivelesAndModalidadesAndGradosAndGruposAndMaterias';
			} else if (idGrado !== '') {
				query = PARENTESCOS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES_AND_GRADOS_AND_MATERIAS;
				vars = {
					ciclos: ciclos,
					niveles: [ idNivel ],
					modalidades: [ idModalidad ],
					grados: [ idGrado ],
					materias: materias,
					tipos: tipos
				};
				metodo = 'parentescosByCiclosAndNivelesAndModalidadesAndGradosAndMaterias';
			} else if (idModalidad !== '') {
				query = PARENTESCOS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES_AND_MATERIAS;
				vars = {
					ciclos: ciclos,
					niveles: [ idNivel ],
					modalidades: [ idModalidad ],
					materias: materias,
					tipos: tipos
				};
				metodo = 'parentescosByCiclosAndNivelesAndModalidadesAndMaterias';
			} else if (idNivel !== '') {
				query = PARENTESCOS_BY_CICLOS_AND_NIVELES_AND_MATERIAS;
				vars = { ciclos: ciclos, niveles: [ idNivel ], materias: materias, tipos: tipos };
				metodo = 'parentescosByCiclosAndNivelesAndMaterias';
			} else if (idCiclo !== '') {
				query = PARENTESCOS_BY_CICLOS_AND_NIVELES_AND_MATERIAS;
				vars = { ciclos: [ '0' ], niveles: [ '0' ], tipos: tipos };
				metodo = 'parentescosByCiclosAndNivelesAndMaterias';
			} else {
				query = PARENTESCOS_BY_CICLOS_AND_NIVELES_AND_MATERIAS;
				vars = { ciclos: [ '0' ], niveles: [ '0' ], tipos: tipos };
				metodo = 'parentescosByCiclosAndNivelesAndMaterias';
			}
		} else {
			//diferente a tarea
			if (grupos.length > 0) {
				query = PARENTESCOS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES_AND_GRADOS_AND_GRUPOS;
				vars = {
					ciclos: ciclos,
					niveles: niveles,
					modalidades: modalidades,
					grados: grados,
					grupos: grupos,
					tipos: tipos
				};
				metodo = 'parentescosByCiclosAndNivelesAndModalidadesAndGradosAndGrupos';
			} else if (grados.length > 0) {
				query = PARENTESCOS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES_AND_GRADOS;
				vars = {
					ciclos: ciclos,
					niveles: niveles,
					modalidades: modalidades,
					grados: grados,				
					tipos: tipos
				};
				metodo = 'parentescosByCiclosAndNivelesAndModalidadesAndGrados';
			} else if (modalidades.length > 0) {
				query = PARENTESCOS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES;
				vars = {
					ciclos: ciclos,
					niveles: niveles,
					modalidades: modalidades,				
					tipos: tipos
				};
				metodo = 'parentescosByCiclosAndNivelesAndModalidades';
			} else if (niveles.length > 0) {
				query = PARENTESCOS_BY_CICLOS_AND_NIVELES;
				vars = {
					ciclos: ciclos,
					niveles: niveles,				
					tipos: tipos
				};
				metodo = 'parentescosByCiclosAndNiveles';
			} else if (idCiclo !== '') {
				query = PARENTESCOS_BY_CICLO;
				vars = { idCiclo: idCiclo, tipos: tipos };
				metodo = 'parentescosByCiclo';
			} else {
				query = PARENTESCOS_BY_CICLO;
				vars = { idCiclo: '0', tipos: tipos };
				metodo = 'parentescosByCiclo';
			}
		} //end dif tarea
	} else {
		if (materias.length > 0) {
			if (grupos.length > 0) {
				query = PARENTESCOS_BY_PROFESOR_AND_CICLOS_AND_MATERIAS_AND_GRUPOS;
				vars = { idProfesor: idProfesor, ciclos: ciclos, materias: materias, tipos: tipos, grupos: grupos };
				metodo = 'parentescosByIdProfesorAndCiclosAndMateriasAndGrupos';
			} else {
				query = PARENTESCOS_BY_PROFESOR_AND_CICLOS_AND_MATERIAS;
				vars = { idProfesor: idProfesor, ciclos: ciclos, materias: materias, tipos: tipos };
				metodo = 'parentescosByIdProfesorAndCiclosAndMaterias';
			}
		} else {
			query = PARENTESCOS_BY_PROFESOR_AND_CICLOS;
			vars = { idProfesor: idProfesor, ciclos: ciclos, tipos: tipos };
			metodo = 'parentescosByIdProfesorAndCiclos';
		}
	}

	/*
	if (!idProfesor || idProfesor===undefined || idProfesor === '') {
	if (idGrupo!=='') {
		query = PARENTESCOS_BY_CICLO_AND_NIVEL_AND_MODALIDAD_AND_GRADO_AND_GRUPO;
		vars = { idCiclo: idCiclo, idNivel: idNivel, idModalidad: idModalidad, idGrado: idGrado, idGrupo: idGrupo, tipos: tipos };
		metodo = 'parentescosByCicloAndNivelAndModalidadAndGradoAndGrupo';
	} else if (idGrado!=='') {		
		query = PARENTESCOS_BY_CICLO_AND_NIVEL_AND_MODALIDAD_AND_GRADO;
		vars = { idCiclo: idCiclo, idNivel: idNivel, idModalidad: idModalidad, idGrado: idGrado, tipos: tipos };
		metodo = 'parentescosByCicloAndNivelAndModalidadAndGrado';
	} else if (idModalidad!=='') {
		query = PARENTESCOS_BY_CICLO_AND_NIVEL_AND_MODALIDAD;
		vars = { idCiclo: idCiclo, idNivel: idNivel, idModalidad: idModalidad, tipos: tipos };
		metodo = 'parentescosByCicloAndNivelAndModalidad';
	} else if (idNivel!=='') {
		query = PARENTESCOS_BY_CICLO_AND_NIVEL;
		vars = { idCiclo: idCiclo, idNivel: idNivel, tipos: tipos };
		metodo = 'parentescosByCicloAndNivel';
	} else if (idCiclo!=='') {
		query = PARENTESCOS_BY_CICLO;
		vars = { idCiclo: idCiclo, tipos:tipos };
		metodo = 'parentescosByCiclo';
	} else {
		query = PARENTESCOS_BY_CICLO;
		vars = { idCiclo: '0', tipos:tipos };
		metodo = 'parentescosByCiclo';
	}
}else if (idProfesor !== '') {
	
		if (materias.length > 0) {
	
			if (grupos.length > 0) {
				query = PARENTESCOS_BY_PROFESOR_AND_CICLOS_AND_MATERIAS_AND_GRUPOS;			vars = { idProfesor: idProfesor, ciclos: ciclos, materias: materias, tipos: tipos, grupos:grupos };
				metodo = 'parentescosByIdProfesorAndCiclosAndMateriasAndGrupos';
			} else {
				query = PARENTESCOS_BY_PROFESOR_AND_CICLOS_AND_MATERIAS;
				vars = { idProfesor: idProfesor, ciclos: ciclos, materias: materias, tipos: tipos };
				metodo = 'parentescosByIdProfesorAndCiclosAndMaterias';
			}
		} else {
			
			query = PARENTESCOS_BY_PROFESOR_AND_CICLOS;
			vars = { idProfesor: idProfesor, ciclos: ciclos, tipos: tipos };
			metodo = 'parentescosByIdProfesorAndCiclos';
		}
	}
	*/

	//console.log('EXEC: ', { query, vars, metodo });
	return { query, vars, metodo };
};
