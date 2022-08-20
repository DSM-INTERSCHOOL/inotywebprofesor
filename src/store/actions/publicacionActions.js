export const ADD_FILE = 'ADD_FILE';
export const DELETE_FILE = 'DELETE_FILE';
export const SET_FILES = 'SET_FILES';

export const SET_IDPUBLICACION ='SET_IDPUBLICACION';

export const SET_CICLOS ='SET_CICLOS';
export const SET_NIVELES ='SET_NIVELES';
export const SET_MODALIDADES ='SET_MODALIDADES';
export const SET_GRADOS ='SET_GRADOS';
export const SET_GRUPOS ='SET_GRUPOS';

export const SET_MATERIAS ='SET_MATERIAS';


export const SET_IDCICLO ='SET_CICLO';
export const SET_IDNIVEL ='SET_NIVEL';
export const SET_IDMODALIDAD ='SET_MODALIDAD';
export const SET_IDGRADO ='SET_GRADO';
export const SET_IDGRUPO ='SET_GRUPO';

export const SET_IDMATERIA='SET_IDMATERIA';

export const SET_DESCRIPCIONMATERIA='SET_DESCRIPCIONMATERIA';


export const SET_IDPROFESOR='SET_IDPROFESOR';


export const SET_IDACCOUNT ='SET_IDACCOUNT';

export const SET_PUBLICACION_REQUIERE_AUTORIZACION ='SET_PUBLICACION_REQUIERE_AUTORIZACION';



export const SET_CONTENIDO ='SET_CONTENIDO';

export const SET_DESTINATARIOS = 'SET_DESTINATARIOS';

export const SET_FILTROS ='SET_FILTROS';

export const SET_TIPOPUBLICACION ='SET_TIPOPUBLICACION';

export const SET_TIPODESTINATARIO ='SET_TIPODESTINATARIO';

export const RESET_PUBLICACION_STATE = 'RESET_PUBLICACION_STATE';

export const SET_TIPO_PARENTESCOS = 'SET_TIPO_PARENTESCOS';


export const addFile = (file) => {
	console.log('addFile value',file);
	return { type: ADD_FILE, file: file };
};

export const deleteFile = (file) => {
	console.log('delete file value',file);
	return { type: DELETE_FILE, file: file };
};

export const setFiles = (file) => {
	console.log('setting files',file);
	return { type: SET_FILES, file: file };
};

export const setIdPublicacion = (idPublicacion) => {	
	return { type: SET_IDPUBLICACION, idPublicacion: idPublicacion };
};

export const setIdCiclo = (idCiclo) => {	
	return { type: SET_IDCICLO, idCiclo: idCiclo };
};

export const setIdAccount = (idAccount) => {	
	return { type: SET_IDACCOUNT, idAccount: idAccount };
};


export const setPublicacionRequiereAutorizacion = (publicacionRequiereAutorizacion) => {	
	return { type: SET_PUBLICACION_REQUIERE_AUTORIZACION, publicacionRequiereAutorizacion: publicacionRequiereAutorizacion };
};



export const setIdNivel = (idNivel) => {	
	return { type: SET_IDNIVEL, idNivel: idNivel };
};

export const setIdModalidad = (idModalidad) => {	
	return { type: SET_IDMODALIDAD, idModalidad: idModalidad };
};

export const setIdGrado = (idGrado) => {	
	return { type: SET_IDGRADO, idGrado: idGrado };
};

export const setIdGrupo = (idGrupo) => {		
	return { type: SET_IDGRUPO, idGrupo: idGrupo };
};

export const setIdMateria = (idMateria) => {		
	return { type: SET_IDMATERIA, idMateria: idMateria };
};

export const setDescripcionMateria = (descripcionMateria) => {		
	return { type: SET_DESCRIPCIONMATERIA, descripcionMateria: descripcionMateria };
};

export const setIdProfesor = (idProfesor) => {		
	return { type: SET_IDPROFESOR, idProfesor: idProfesor };
};

export const setCiclos = (ciclos) => {	
	return { type: SET_CICLOS, ciclos: ciclos };
};

export const setMaterias = (materias) => {	
	return { type: SET_MATERIAS, materias: materias };
};

export const setNiveles = (niveles) => {	
	return { type: SET_NIVELES, niveles: niveles };
};

export const setModalidades = (modalidades) => {	
	return { type: SET_MODALIDADES, modalidades: modalidades };
};

export const setGrados = (grados) => {	
	return { type: SET_GRADOS, grados: grados };
};

export const setGrupos = (grupos) => {		
	return { type: SET_GRUPOS, grupos: grupos };
};


export const setContenido = (contenido) => {	
	return { type: SET_CONTENIDO, contenido: contenido };
};


export const setDestinatarios = (destinatarios) => {	
	return { type: SET_DESTINATARIOS, destinatarios: destinatarios };
};


export const setTipoPublicacion = (tipoPublicacion) => {		
	return { type: SET_TIPOPUBLICACION, tipoPublicacion: tipoPublicacion };
};

export const setTipoDestinatario = (tipoDestinatario) => {		
	return { type: SET_TIPODESTINATARIO, tipoDestinatario: tipoDestinatario };
};


export const setFiltros = (filtros) => {		
	return { type: SET_FILTROS, filtros: filtros };
};

export const resetPublicacionState = () =>{
	return {type: RESET_PUBLICACION_STATE};
};

export const setTipoParentescos = (parentescos) => {
	
	return { type: SET_TIPO_PARENTESCOS, parentescos: parentescos };
};




