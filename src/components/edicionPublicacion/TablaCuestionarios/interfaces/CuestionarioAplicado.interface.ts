// Generated by https://quicktype.io

export interface ICuestionarioAplicado {
    atributoResultado:        string;
    descripcionCuestionario:  string;
    estatus:                  string;
    fechaCreacion:            string;
    fechaFinalVigencia:       string;
    fechaInicialVigencia:     string;
    fechaModificacion:        string;
    id:                       string;
    idAccount:                string;
    idCicloResultado:         string;
    idCuestionario:           string;
    idMateriaResultado:       string;
    idUsuario:                string;
    materia:                  string;
    mostrarResultadoFinal:    boolean;
    nombreCorto:              string;
    nombreUsuario:            string;
    periodoResultado:         string;
    permiteRegresar:          boolean;
    puntosTotales:            number;
    reactivos:                Reactivo[];
    reactivosTotales:         number;
    tiempoMaximoCuestionario: number;
    tipoPresentacion:         string;
    tipoUsuario:              string;
    totalPuntosObtenidos:     number;
    type:                     string;
    ultimoReactivoRespondido: number;
}

export interface Reactivo {
    categoria:              string;
    dificultad:             string;
    duracionRespuesta:      number;
    estatus:                string;
    fechaCreacion:          string;
    fechaModificacion:      string;
    fechaRespuesta:         string;
    fijo:                   boolean;
    id:                     string;
    idAccount:              string;
    idUsuario:              string;
    index:                  number;
    isPrivado:              boolean;
    materia:                string;
    mostrarPista:           boolean;
    opciones?:              Opcion[];
    pista:                  string;
    pregunta:               string;
    puntos:                 number;
    puntosObtenidos:        number;
    respuesta:              string[] | number | string;
    tiempoMaximoRespuesta:  number;
    tipoReactivo:           string;
    type:                   string;
    margenValorNumerico?:   number;
    valorNumericoCorrecto?: number;
    similitudValorTextual?: number;
    valorTextualCorrecto?:  string;
}

export interface Opcion {
    esCorrecto: boolean;
    opcion:     string;
    puntos:     number;
}