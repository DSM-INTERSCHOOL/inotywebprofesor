import { ALUMNOS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES_AND_GRADOS_AND_GRUPOS } from "../constants/graphql_queries/alumnos_by_ciclos_and_niveles_and_modalidades_and_grados_and_grupos";
import { ALUMNOS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES_AND_GRADOS } from "../constants/graphql_queries/alumnos_by_ciclos_and_niveles_and_modalidades_and_grados";
import { ALUMNOS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES } from "../constants/graphql_queries/alumnos_by_ciclos_and_niveles_and_modalidades";
import { ALUMNOS_BY_CICLOS_AND_NIVELES } from "../constants/graphql_queries/alumnos_by_ciclos_and_niveles";
import { ALUMNOS_BY_CICLOS } from "../constants/graphql_queries/alumnos_by_ciclos";
import { ALUMNOS_BY_PROFESOR_AND_CICLOS_AND_MATERIAS } from "../constants/graphql_queries/alumnos_by_profesor_and_ciclos_and_materias";
import { ALUMNOS_BY_PROFESOR_AND_CICLOS } from "../constants/graphql_queries/alumnos_by_profesor_and_ciclos";
import { ALUMNOS_BY_PROFESOR_AND_CICLOS_AND_MATERIAS_AND_GRUPOS } from "../constants/graphql_queries/alumnos_by_profesor_and_ciclos_and_materias_and_grupos";
import { ALUMNOS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES_AND_GRADOS_AND_GRUPOS_AND_MATERIAS } from "../constants/graphql_queries/alumnos_by_ciclos_and_niveles_and_modalidades_and_grados_and_grupos_and_materias";
import { ALUMNOS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES_AND_GRADOS_AND_MATERIAS } from "../constants/graphql_queries/alumnos_by_ciclos_and_niveles_and_modalidades_and_grados_and_materias";
import { ALUMNOS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES_AND_MATERIAS } from "../constants/graphql_queries/alumnos_by_ciclos_and_niveles_and_modalidades_and_materias";
import { ALUMNOS_BY_CICLOS_AND_NIVELES_AND_MATERIAS } from "../constants/graphql_queries/alumnos_by_ciclos_and_niveles_and_materias";

export const getQueryAlumnosBy = ({
  ciclos,
  niveles,
  modalidades,
  grados,
  grupos,
  idProfesor,
  materias,
  tipoUsuario,
  tipoPublicacion,
}) => {
  let vars = {};
  let query;
  let metodo;

  if (tipoUsuario === "USUARIO") {
    if (tipoPublicacion === "tareas") {
      //es tarea
      if (grupos.length > 0) {
        query =
          ALUMNOS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES_AND_GRADOS_AND_GRUPOS_AND_MATERIAS;
        vars = {
          ciclos: ciclos,
          niveles: niveles,
          modalidades: modalidades,
          grados: grados,
          grupos: grupos,
          materias: materias,
        };
        metodo =
          "alumnosByCiclosAndNivelesAndModalidadesAndGradosAndGruposAndMaterias";
      } else if (grados.length > 0) {
        query =
          ALUMNOS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES_AND_GRADOS_AND_MATERIAS;
        vars = {
          ciclos: ciclos,
          niveles: niveles,
          modalidades: modalidades,
          grados: grados,
          materias: materias,
        };
        metodo = "alumnosByCiclosAndNivelesAndModalidadesAndGradosAndMaterias";
      } else if (modalidades.length > 0) {
        query = ALUMNOS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES_AND_MATERIAS;
        vars = {
          ciclos: ciclos,
          niveles: niveles,
          modalidades: modalidades,
          materias: materias,
        };
        metodo = "alumnosByCiclosAndNivelesAndModalidadesAndMaterias";
      } else if (niveles.length > 0) {
        query = ALUMNOS_BY_CICLOS_AND_NIVELES_AND_MATERIAS;
        vars = { ciclos: ciclos, niveles: niveles, materias: materias };
        metodo = "alumnosByCiclosAndNivelesAndMaterias";
      } else {
        query = ALUMNOS_BY_CICLOS;
        vars = { ciclos: ["0"] };
        metodo = "alumnosByCiclos";
      }
    } else {
      //es diferente a tarea
      if (grupos.length > 0) {
        query =
          ALUMNOS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES_AND_GRADOS_AND_GRUPOS;
        vars = {
          ciclos: ciclos,
          niveles: niveles,
          modalidades: modalidades,
          grados: grados,
          grupos: grupos,
        };
        metodo = "alumnosByCiclosAndNivelesAndModalidadesAndGradosAndGrupos";
      } else if (grados.length > 0) {
        query = ALUMNOS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES_AND_GRADOS;
        vars = {
          ciclos: ciclos,
          niveles: niveles,
          modalidades: modalidades,
          grados: grados,
        };
        metodo = "alumnosByCiclosAndNivelesAndModalidadesAndGrados";
      } else if (modalidades.length > 0) {
        query = ALUMNOS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES;
        vars = { ciclos: ciclos, niveles: niveles, modalidades: modalidades };
        metodo = "alumnosByCiclosAndNivelesAndModalidades";
      } else if (niveles.length > 0) {
        query = ALUMNOS_BY_CICLOS_AND_NIVELES;
        vars = { ciclos: ciclos, niveles: niveles };
        metodo = "alumnosByCiclosAndNiveles";
      } else if (ciclos.length > 0) {
        query = ALUMNOS_BY_CICLOS;
        vars = { ciclos: ciclos };
        metodo = "alumnosByCiclos";
      } else {
        query = ALUMNOS_BY_CICLOS;
        vars = { ciclos: "0" };
        metodo = "alumnosByCiclos";
      }
    }
  }

  if (tipoUsuario === "PROFESOR") {
    if (
      tipoPublicacion === "tareas" ||
      tipoPublicacion === "cuestionarios" ||
      tipoPublicacion === "avisos"
    ) {
      if (grupos.length > 0) {
        query = ALUMNOS_BY_PROFESOR_AND_CICLOS_AND_MATERIAS_AND_GRUPOS;
        vars = {
          idProfesor: idProfesor,
          ciclos: ciclos,
          materias: materias,
          grupos: grupos,
        };
        metodo = "alumnosByIdProfesorAndCiclosAndMateriasAndGrupos";
      } else if (materias.length > 0) {
        query = ALUMNOS_BY_PROFESOR_AND_CICLOS_AND_MATERIAS;
        vars = { idProfesor: idProfesor, ciclos: ciclos, materias: materias };
        metodo = "alumnosByIdProfesorAndCiclosAndMaterias";
      } else if (ciclos.length > 0) {
        query = ALUMNOS_BY_PROFESOR_AND_CICLOS;
        vars = { idProfesor: idProfesor, ciclos: ciclos };
        metodo = "alumnosByIdProfesorAndCiclos";
      }
    }
  }

  /*

	if ((!idProfesor || idProfesor === undefined || idProfesor === '') && (materias.length===0)) {
		if (grupos.length > 0) {
			query = ALUMNOS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES_AND_GRADOS_AND_GRUPOS;
			vars = { ciclos: ciclos, niveles: niveles, modalidades: modalidades, grados: grados, grupos: grupos };
			metodo = 'alumnosByCiclosAndNivelesAndModalidadesAndGradosAndGrupos';
		} else if (grados.length > 0) {
			query = ALUMNOS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES_AND_GRADOS;
			vars = { ciclos: ciclos, niveles: niveles, modalidades: modalidades, grados: grados };
			metodo = 'alumnosByCiclosAndNivelesAndModalidadesAndGrados';
		} else if (modalidades.length > 0) {
			query = ALUMNOS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES;
			vars = { ciclos: ciclos, niveles: niveles, modalidades: modalidades };
			metodo = 'alumnosByCiclosAndNivelesAndModalidades';
		} else if (niveles.length > 0) {
			query = ALUMNOS_BY_CICLOS_AND_NIVELES;
			vars = { ciclos: ciclos, niveles: niveles };
			metodo = 'alumnosByCiclosAndNiveles';
		} else if (ciclos.length > 0) {
			query = ALUMNOS_BY_CICLOS;
			vars = { ciclos: ciclos };
			metodo = 'alumnosByCiclos';
		} else {
			query = ALUMNOS_BY_CICLOS;
			vars = { ciclos: '0' };
			metodo = 'alumnosByCiclos';
		}
	} else if (idProfesor !== '') {
		if (materias.length > 0) {
			if (grupos.length > 0) {
				query = ALUMNOS_BY_PROFESOR_AND_CICLOS_AND_MATERIAS_AND_GRUPOS;
				vars = { idProfesor: idProfesor, ciclos: ciclos, materias: materias, grupos: grupos };
				metodo = 'alumnosByIdProfesorAndCiclosAndMateriasAndGrupos';
			} else {
				query = ALUMNOS_BY_PROFESOR_AND_CICLOS_AND_MATERIAS;
				vars = { idProfesor: idProfesor, ciclos: ciclos, materias: materias };
				metodo = 'alumnosByIdProfesorAndCiclosAndMaterias';
			}
		} else {
			query = ALUMNOS_BY_PROFESOR_AND_CICLOS;
			vars = { idProfesor: idProfesor, ciclos: ciclos };
			metodo = 'alumnosByIdProfesorAndCiclos';
		}
	} else if (materias.length > 0) {
		console.log('materias.length',materias.length)		;
		if (grupos.length > 0) {
			query = ALUMNOS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES_AND_GRADOS_AND_GRUPOS_AND_MATERIAS;
			vars = { ciclos: ciclos, niveles: niveles, modalidades: modalidades, grados: grados, grupos: grupos, materias: materias };
			metodo = 'alumnosByCiclosAndNivelesAndModalidadesAndGradosAndGruposAndMaterias';
		} else if (grados.length > 0) {
			query = ALUMNOS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES_AND_GRADOS_AND_MATERIAS;
			vars = { ciclos: ciclos, niveles: niveles, modalidades: modalidades, grados: grados, materias: materias };
			metodo = 'alumnosByCiclosAndNivelesAndModalidadesAndGradosAndMaterias';
		} else if (modalidades.length > 0) {
			query = ALUMNOS_BY_CICLOS_AND_NIVELES_AND_MODALIDADES_AND_MATERIAS;
			vars = { ciclos: ciclos, niveles: niveles, modalidades: modalidades, materias: materias };
			metodo = 'alumnosByCiclosAndNivelesAndModalidadesAndMaterias';
		} else if (niveles.length > 0) {
			query = ALUMNOS_BY_CICLOS_AND_NIVELES_AND_MATERIAS;
			vars = { ciclos: ciclos, niveles: niveles, materias: materias };
			metodo = 'alumnosByCiclosAndNivelesAndMaterias';
		} else {
			query = ALUMNOS_BY_CICLOS;
			vars = { ciclos: '0' };
			metodo = 'alumnosByCiclos';
		}
	}

	*/

  	//console.log('exec', { query, vars, metodo });

  return { query, vars, metodo };
};
