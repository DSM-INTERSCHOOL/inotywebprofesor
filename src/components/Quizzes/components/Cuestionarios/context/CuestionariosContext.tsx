import React, { useState } from "react";
import { ICiclo } from "../../../interfaces/ciclo.interface";
import {
  EstatusCuestionario,
  TipoPresentacion,
  TipoRegistroCalificacion,
} from "../../../interfaces/cuestionario.interface";
import { IDestinatario } from "../../../interfaces/destinatario.interface";
import { IReactivo } from "../../../interfaces/reactivo.interface";

const useCuestionariosContextValue = () => {
  const [selectedReactivos, setSelectedReactivos] = useState<IReactivo[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [descripcion, setDescripcion] = useState("");
  const [materia, setMateria] = useState("");
  const [idMateriaResultado, setIdMateriaResultado] = useState("");
  const [idCicloResultado, setIdCicloResultado] = useState("");
  const [periodoResultado, setPeriodoResultado] = useState("");
  const [atributoResultado, setAtributoResultado] = useState("");
  const [fechaInicialVigencia, setFechaInicialVigencia] = useState("");
  const [fechaFinalVigencia, setFechaFinalVigencia] = useState("");
  const [reactivosTotales, setReactivosTotales] = useState(0);
  const [puntosTotales, setPuntosTotales] = useState(0);
  const [permiteRegresar, setPermiteRegresar] = useState(false);
  const [mostrarResultadoFinal, setMostrarResultadoFinal] = useState(false);
  const [tipoPresentacion, setTipoPresentacion] =
    useState<TipoPresentacion>("ORDEN_FIJO");
  const [destinatarios, setDestinatarios] = useState<IDestinatario[]>([]);
  const [estatus, setEstatus] = useState<EstatusCuestionario>("ACTIVO");
  const [ciclos, setCiclos] = useState<ICiclo[]>([]);
  const [idGrupo, setIdGrupo] = useState<string>("");
  const [descargarCalificacion, setDescargarCalificacion] =
    useState<boolean>(false);
  const [tipoRegistroCalificacion, setTipoRegistroCalificacion] =
    useState<TipoRegistroCalificacion>("EVALUACION_CONTINUA");
  const [evaluacionContinuaRegistro, setEvaluacionContinuaRegistro] =
    useState(0);

  const [evaluacionContinuaAspecto, setEvaluacionContinuaAspecto] =
    React.useState("");

  const [searchText, setSearchText] = React.useState("");

  const [errors, setErrors] = React.useState<any>({});

  const [autorizado, setAutorizado] = React.useState(true)

  const value = {
    selectedReactivos,
    setSelectedReactivos,
    activeStep,
    setActiveStep,
    descripcion,
    setDescripcion,
    materia,
    setMateria,
    idMateriaResultado,
    setIdMateriaResultado,
    idCicloResultado,
    setIdCicloResultado,
    periodoResultado,
    setPeriodoResultado,
    atributoResultado,
    setAtributoResultado,
    fechaInicialVigencia,
    setFechaInicialVigencia,
    fechaFinalVigencia,
    setFechaFinalVigencia,
    reactivosTotales,
    setReactivosTotales,
    puntosTotales,
    setPuntosTotales,
    permiteRegresar,
    setPermiteRegresar,
    mostrarResultadoFinal,
    setMostrarResultadoFinal,
    tipoPresentacion,
    setTipoPresentacion,
    destinatarios,
    setDestinatarios,
    estatus,
    setEstatus,
    ciclos,
    setCiclos,
    idGrupo,
    setIdGrupo,
    descargarCalificacion,
    setDescargarCalificacion,
    tipoRegistroCalificacion,
    setTipoRegistroCalificacion,
    evaluacionContinuaRegistro,
    setEvaluacionContinuaRegistro,
    errors,
    setErrors,
    searchText,
    setSearchText,
    evaluacionContinuaAspecto,
    setEvaluacionContinuaAspecto,
    autorizado,
    setAutorizado
  };

  return { value };
};

export const Context = React.createContext({});

export const CuestionariosProvider: React.FC<any> = ({ children }) => {
  const { value } = useCuestionariosContextValue();

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useCuestionariosContext = () => {
  const { value } = useCuestionariosContextValue();
  const context = React.useContext(Context) as typeof value;

  return context;
};
