import React, { useRef, useState } from "react";
import {
  DificualReactivo,
  EstatusReactivo,
  IOpcionMultiple,
  IReactivo,
  OpcionesVerdaderoFalso,
  OpcionFalsoVerdadero,
  TipoReactivo,
} from "../../../interfaces/reactivo.interface";

export const defaultOpcionFalsoVerdadero: OpcionesVerdaderoFalso = [
  { esCorrecto: false, puntos: 0, opcion: "Falso" },
  { esCorrecto: false, puntos: 0, opcion: "Verdadero" },
];

const useReactivosContextValue = () => {
  const [openModal, setOpenModal] = useState(false);
  const reactivoRef = useRef<IReactivo>();
  const [pregunta, setPregunta] = useState("");
  const [puntos, setPuntos] = useState<number>(0);

  const [tipoReactivo, setTipoReactivo] =
    useState<TipoReactivo>("FALSO_VERDADERO");
  const [opcionesMultiple, setOpcionesMultiple] = useState<IOpcionMultiple[]>(
    []
  );
  const [opcionesVerdaderoFalso, setOpcionesVerdaderoFalso] =
    useState<OpcionesVerdaderoFalso>(defaultOpcionFalsoVerdadero);

  const [descripcionOpcion, setDescripcionOpcion] = useState("");
  const [puntoOpcion, setPuntosOpcion] = useState(0);
  const [esOpcionCorrecta, setEsOpcionCorrecta] = useState(false);

  const [opcionFalsoVerdadero, setOpcionFalsoVerdadero] =
    useState<OpcionFalsoVerdadero>();

  const [valorTextualCorrecto, setValorTextualCorrecto] = useState("");
  const [similitudValorTextual, setSimilitudValorTextual] = useState(0);

  const [valorNumericoCorrecto, setValorNumericoCorrecto] = useState(0);
  const [margenValorNumerico, setMargenValorNumerico] = useState(0);

  const [categoria, setCategoria] = useState("");
  const [materia, setMateria] = useState("");

  const [dificultad, setDificultad] = useState<DificualReactivo>("BAJA");
  const [estatusReactivo, setEstatusReactivo] =
    useState<EstatusReactivo>("ACTIVO");
  const [esPrivado, setEsPrivado] = useState(false);
  const [mostrarPista, setMostrarPista] = useState(false);
  const [pista, setPista] = useState("");
  const [tiempoMaximoRespuesta, setTiempoMaximoRespuesta] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorOpcionMultipleMessage, setErrorOpcionMultipleMessage] =
    useState("");

  const value = {
    openModal,
    setOpenModal,
    reactivoRef,

    pregunta,
    setPregunta,
    puntos,
    setPuntos,
    tipoReactivo,
    setTipoReactivo,
    opcionesMultiple,
    setOpcionesMultiple,
    opcionFalsoVerdadero,
    setOpcionFalsoVerdadero,
    opcionesVerdaderoFalso,
    setOpcionesVerdaderoFalso,
    descripcionOpcion,
    setDescripcionOpcion,
    puntoOpcion,
    setPuntosOpcion,
    valorTextualCorrecto,
    setValorTextualCorrecto,
    esOpcionCorrecta,
    setEsOpcionCorrecta,
    similitudValorTextual,
    setSimilitudValorTextual,
    valorNumericoCorrecto,
    setValorNumericoCorrecto,
    margenValorNumerico,
    setMargenValorNumerico,
    categoria,
    setCategoria,
    materia,
    setMateria,
    dificultad,
    setDificultad,
    estatusReactivo,
    setEstatusReactivo,
    esPrivado,
    setEsPrivado,
    mostrarPista,
    setMostrarPista,
    pista,
    setPista,
    tiempoMaximoRespuesta,
    setTiempoMaximoRespuesta,
    errorMessage,
    setErrorMessage,
    errorOpcionMultipleMessage,
    setErrorOpcionMultipleMessage,
  };

  return { value };
};

export const Context = React.createContext({});

export const ReactivosProvider: React.FC<any> = ({ children }) => {
  const { value } = useReactivosContextValue();

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useReactivosContext = () => {
  const { value } = useReactivosContextValue();
  const context = React.useContext(Context) as typeof value;

  return context;
};
