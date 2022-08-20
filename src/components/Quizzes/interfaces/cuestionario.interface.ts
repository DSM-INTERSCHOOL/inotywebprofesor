import { IDestinatario } from "./destinatario.interface";
import { IReactivo } from "./reactivo.interface";

export type TipoRegistroCalificacion = 'MATERIA'|'EVALUACION_CONTINUA'

export interface ICuestionario {
  atributoResultado?: string;
  descargarCalificacion: boolean;
  descripcion: string;
  destinatarios: IDestinatario[];
  estatus: EstatusCuestionario;
  
  evaluacionContinuaAspecto:string; // mostrar cuando es evaluacion continua
  evaluacionContinuaRegistro: number; 
  fechaCreacion?: string;
  fechaFinalVigencia: string; 
  fechaInicialVigencia: string;
  fechaModificacion?: string;
  id?: string;
  idAccount: string;
  idCicloResultado?: string;
  idMateriaResultado?: string;
  idUsuario: string;
  materia: string;
  mostrarResultadoFinal: boolean;
  periodoResultado?: string;
  permiteRegresar: boolean;
  puntosTotales: number;
  reactivos: IReactivo[];
  reactivosTotales: number;
  tipoPresentacion: TipoPresentacion; // (evaluacion continua -> mostrar evaluacionContinuaAspecto, periodoResultado y evaluacionContinuaRegistro
                                      // materia -> mostar periodoResultado y atributoResultado
  tipoRegistroCalificacion: TipoRegistroCalificacion
  type: "cuestionario";
}

export type TipoPresentacion = "ORDEN_FIJO" | "ORDEN_ALEATORIO";
export type EstatusCuestionario = "ACTIVO" | "CANCELADO" | "ELIMINADO";
