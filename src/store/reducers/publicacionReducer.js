import {
  ADD_FILE,
  DELETE_FILE,
  SET_FILES,
  SET_IDPUBLICACION,
  SET_IDCICLO,
  SET_IDNIVEL,
  SET_IDMODALIDAD,
  SET_IDGRADO,
  SET_IDGRUPO,
  SET_CONTENIDO,
  SET_CICLOS,
  SET_MODALIDADES,
  SET_NIVELES,
  SET_GRADOS,
  SET_GRUPOS,
  SET_DESTINATARIOS,
  SET_TIPOPUBLICACION,
  SET_TIPODESTINATARIO,
  SET_FILTROS,
  RESET_PUBLICACION_STATE,
  SET_TIPO_PARENTESCOS,
  SET_IDACCOUNT,
  SET_PUBLICACION_REQUIERE_AUTORIZACION,
  SET_DESCRIPCIONMATERIA,
  SET_IDMATERIA,
  SET_IDPROFESOR,
  SET_MATERIAS,
  SET_CALIFICATION_OPTIONS,
} from "../actions/publicacionActions";

const initialState = {
  ciclos: [],
  niveles: [],
  modalidades: [],
  grados: [],
  grupos: [],
  materias: [],
  idPublicacion: "",
  idCiclo: "0",
  idNivel: "",
  idModalidad: "",
  idGrado: "",
  idGrupo: "",
  idMateria: "",
  descripcionMateria: "",
  idAccount: "1",
  publicacionRequiereAutorizacion: true,
  contenido: {
    titulo: "",
    cuerpo: "",
  },
  calificacionOptions: {
    descargarCalificacion: false,
    tipoRegistroCalificacion: "",
    periodoResultado: "",
    atributoResultado: "",
    evaluacionContinuaRegistro: 0,
    evaluacionContinuaAspecto: "",
  },
  filtros: {
    aceptaComentarios: true,
    fechaInicialPublicacion: "",
    fechaFinalPublicacion: "",
    tipoVisibilidadComentarios: "GRUPAL",
    fechaHoraEvento: "",
    lugarEvento: "",
    fechaHoraEntrega: "",
    autorizado: false,
  },

  fileArray: [],
  destinatarios: [],
  tipoPublicacion: "",
  tipoDestinatario: "",
  tipoParentescos: [],
};

export const publicacionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FILE:
      //	console.log('reducer', action.file);
      return {
        ...state,
        fileArray: [...state.fileArray, action.file],
      };
    case DELETE_FILE:
      //	console.log('reducer delete', action.file);
      return {
        ...state,
        fileArray: state.fileArray.filter((f) => {
          return f.fileObject.name !== action.file.fileObject.name;
        }),
      };

    case SET_FILES:
      //	console.log('SET FILES', action.file);
      return {
        ...state,
        fileArray: action.file,
      };

    case SET_IDPUBLICACION:
      return {
        ...state,
        idPublicacion: action.idPublicacion,
      };
    case SET_IDCICLO:
      return {
        ...state,
        idCiclo: action.idCiclo,
      };
    case SET_IDACCOUNT:
      return {
        ...state,
        idAccount: action.idAccount,
      };

    case SET_PUBLICACION_REQUIERE_AUTORIZACION:
      return {
        ...state,
        publicacionRequiereAutorizacion: action.publicacionRequiereAutorizacion,
      };

    case SET_IDNIVEL:
      return {
        ...state,
        idNivel: action.idNivel,
      };
    case SET_IDMODALIDAD:
      return {
        ...state,
        idModalidad: action.idModalidad,
      };
    case SET_IDGRADO:
      return {
        ...state,
        idGrado: action.idGrado,
      };
    case SET_IDGRUPO:
      return {
        ...state,
        idGrupo: action.idGrupo,
      };

    case SET_IDPROFESOR:
      return {
        ...state,
        idProfesor: action.idProfesor,
      };

    case SET_IDMATERIA:
      return {
        ...state,
        idMateria: action.idMateria,
      };

    case SET_DESCRIPCIONMATERIA:
      return {
        ...state,
        descripcionMateria: action.descripcionMateria,
      };

    case SET_CICLOS:
      return {
        ...state,
        ciclos: action.ciclos,
      };
    case SET_NIVELES:
      return {
        ...state,
        niveles: action.niveles,
      };
    case SET_MODALIDADES:
      return {
        ...state,
        modalidades: action.modalidades,
      };
    case SET_GRADOS:
      return {
        ...state,
        grados: action.grados,
      };
    case SET_GRUPOS:
      return {
        ...state,
        grupos: action.grupos,
      };

    case SET_MATERIAS:
      return {
        ...state,
        materias: action.materias,
      };

    case SET_CONTENIDO:
      return {
        ...state,
        contenido: action.contenido,
      };

    case SET_DESTINATARIOS:
      return {
        ...state,
        destinatarios: action.destinatarios,
      };

    case SET_TIPOPUBLICACION:
      return {
        ...state,
        tipoPublicacion: action.tipoPublicacion,
      };

    case SET_TIPODESTINATARIO:
      return {
        ...state,
        tipoDestinatario: action.tipoDestinatario,
      };

    case SET_FILTROS:
      return {
        ...state,
        filtros: action.filtros,
      };

    case RESET_PUBLICACION_STATE:
      return initialState;

    case SET_TIPO_PARENTESCOS:
      return {
        ...state,
        tipoParentescos: action.parentescos,
      };

    case SET_CALIFICATION_OPTIONS:
      return {
        ...state,
        calificacionOptions: { ...action.calificacionOptions },
      };

    default:
      return state;
  }
};
