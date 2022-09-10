const TIPO_REACTIVOS = [
  "OPCION_MULTIPLE",
  "FALSO_VERDADERO",
  "VALOR_TEXTUAL",
  "VALOR_NUMERICO",
  "ENSAYO",
] as const;
export type TipoReactivo = typeof TIPO_REACTIVOS[number];

const ESTATUS_REACTIVO = ["ACTIVO", "ELIMINADO", "CANCELADO"] as const;
export type EstatusReactivo = typeof ESTATUS_REACTIVO[number];

const DIFICULTAD_REACTIVO = ["BAJA", "MEDIA", "ALTA"] as const;
export type DificualReactivo = typeof DIFICULTAD_REACTIVO[number];

export interface ReactivoBase {
  id?: string;
  type: "reactivo";
  idAccount: string;
  materia: string;
  categoria: string;
  pregunta: string;
  puntos: number;
  idUsuario: string;
  isPrivado?: boolean;
  dificultad?: DificualReactivo;
  tiempoMaximoRespuesta?: number;
  pista?: string;
  mostrarPista: boolean;
  tipoReactivo: TipoReactivo;
  fechaCreacion?: string;
  estatus: EstatusReactivo;
  fechaModificacion?: string;
  index?: number;
  fijo?: boolean;

  //   textoPosicionOpcion?: string;
  //   posicionOpcion:
}

interface IReactivoOpcionMultiple extends ReactivoBase {
  tipoReactivo: "OPCION_MULTIPLE";
  opciones: IOpcionMultiple[];
}

export type OpcionesVerdaderoFalso = [
  IOpcionMultipleFalso,
  IOpcionMultipleVerdadero
];

interface IReactivoFalseVedadero extends ReactivoBase {
  tipoReactivo: "FALSO_VERDADERO";
  opciones: OpcionesVerdaderoFalso;
}

interface IReactivoValorContextual extends ReactivoBase {
  tipoReactivo: "VALOR_TEXTUAL";
  valorTextualCorrecto: string;
  similitudValorTextual?: number;
}

interface IReactivoValorNumerico extends ReactivoBase {
  tipoReactivo: "VALOR_NUMERICO";
  valorNumericoCorrecto: number;
  margenValorNumerico?: number;
}

interface IReactivoEnsayo extends ReactivoBase {
  tipoReactivo: "ENSAYO";
}

export type IReactivo =
  | IReactivoOpcionMultiple
  | IReactivoFalseVedadero
  | IReactivoValorContextual
  | IReactivoEnsayo
  | IReactivoValorNumerico;

export interface IOpcionMultiple {
  opcion: string;
  esCorrecto: boolean;
  puntos: number;
}

export type OpcionFalsoVerdadero = "Verdadero" | "Falso";

interface IOpcionMultipleVerdadero extends IOpcionMultiple {
  opcion: "Verdadero";
  esCorrecto: boolean;
}

interface IOpcionMultipleFalso extends IOpcionMultiple {
  opcion: "Falso";
  esCorrecto: boolean;
}
