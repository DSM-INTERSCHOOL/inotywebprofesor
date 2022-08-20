import React from "react";
import { getUserLocalStorage } from "../../../../../../utils/getUserLocalStorage";
import {
  IOpcionMultiple,
  IReactivo,
  OpcionesVerdaderoFalso,
  OpcionFalsoVerdadero,
  ReactivoBase,
} from "../../../../interfaces/reactivo.interface";
import { useReactivosContext } from "../../context/ReactivosContext";

const defaultOpcionFalsoVerdadero: OpcionesVerdaderoFalso = [
  { esCorrecto: false, puntos: 0, opcion: "Falso" },
  { esCorrecto: false, puntos: 0, opcion: "Verdadero" },
];

export const useReactivoForm = () => {
  const {
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
  } = useReactivosContext();

  const handleChangeOpcionFalsoVerdadero = (opcion: OpcionFalsoVerdadero) => {
    const [opcionFalso, opcionVerdadero] = opcionesVerdaderoFalso;
    const esCorrecto = opcion === "Verdadero";
    setOpcionFalsoVerdadero(opcion);
    setOpcionesVerdaderoFalso([
      { ...opcionFalso, esCorrecto: !esCorrecto, puntos: 0 },
      { ...opcionVerdadero, esCorrecto: esCorrecto, puntos: puntos },
    ]);
  };

  const _validateAddOpcionMultiple = () => {
    if (descripcionOpcion.trim() === "") {
      throw new Error("Ingrese descripcion opción");
    }
    if (esOpcionCorrecta && puntoOpcion === 0) {
      throw new Error("Si la opción es correcta, ingrese puntos de opción");
    }
  };

  const handleAddOpcionMultiple = () => {
    try {
      setErrorOpcionMultipleMessage("");
      _validateAddOpcionMultiple();
      const newOpcionMultiple: IOpcionMultiple = {
        esCorrecto: esOpcionCorrecta,
        puntos: esOpcionCorrecta ? puntoOpcion : 0,
        opcion: descripcionOpcion,
      };
      const newOpcionesMulple: IOpcionMultiple[] = [
        ...opcionesMultiple,
        newOpcionMultiple,
      ];

      setOpcionesMultiple(newOpcionesMulple);
      setDescripcionOpcion("");
      setPuntosOpcion(0);
      setEsOpcionCorrecta(false);
    } catch (error: any) {
      setErrorOpcionMultipleMessage(error.message);
    }
  };

  const handleDeleteOpcionMultiple = (om: IOpcionMultiple) => {
    const newOpcionesMulple = opcionesMultiple.filter(
      (item) => item.opcion !== om.opcion
    );
    setOpcionesMultiple(newOpcionesMulple);
  };

  const _validateForm = () => {
    if (pregunta.trim() === "") {
      throw new Error("pregunta no puede ser vacia");
    }
    if (puntos === 0) {
      throw new Error("Puntos de reactivo debe ser mayor a cero");
    }
    if (categoria.trim() === "") {
      throw new Error("Ingrese Categoria");
    }
    if (materia.trim() === "") {
      throw new Error("ingrese materia");
    }
    if (mostrarPista && pista.trim() === "") {
      throw new Error(
        "Si se va a mostrar pista, ingrese descripción de pista."
      );
    }
    if (tipoReactivo === "OPCION_MULTIPLE") {
      const puntosOM = opcionesMultiple
        .map((om) => om.puntos)
        .reduce((cur, ac) => ac + cur, 0);

      if (opcionesMultiple.length < 2)
        throw new Error("Deben de existir al menos 2 opciones multiple");

      if (!opcionesMultiple.find((om) => om.esCorrecto)) {
        throw new Error("Al menos una opción debe ser correcta");
      }

      if (puntosOM !== puntos) {
        throw new Error(
          "Los puntos de opcion multiple no coincien con los puntos de reactivo"
        );
      }
    }
    if (tipoReactivo === "FALSO_VERDADERO") {
      if (!opcionesVerdaderoFalso.find((om) => om.esCorrecto)) {
        throw new Error("Al menos una opción debe ser correcta");
      }
    }
    if (
      tipoReactivo === "VALOR_TEXTUAL" &&
      valorTextualCorrecto.trim() === ""
    ) {
      throw new Error("El valor textual no puede ser vacio");
    }
  };

  const resetReactivoForm = () => {
    setCategoria("");
    setDificultad("MEDIA");
    setEsPrivado(false);
    setEstatusReactivo("ACTIVO");
    setMargenValorNumerico(0);
    setMateria("");
    setMostrarPista(false);
    setOpcionesMultiple([]);
    setOpcionesVerdaderoFalso(defaultOpcionFalsoVerdadero);
    setOpcionFalsoVerdadero(undefined);
    setPista("");
    setPregunta("");
    setPuntos(0);
    setSimilitudValorTextual(0);
    setTiempoMaximoRespuesta(0);
    setTipoReactivo("FALSO_VERDADERO");
    setValorNumericoCorrecto(0);
    setValorTextualCorrecto("");
  };

  const loadDefaultValues = () => {
    resetReactivoForm();
    setPregunta(reactivoRef.current?.pregunta!);
    setTipoReactivo(reactivoRef.current?.tipoReactivo!);
    setPuntos(reactivoRef.current?.puntos!);
    setCategoria(reactivoRef.current?.categoria!);
    setMateria(reactivoRef.current?.materia!);
    setDificultad(reactivoRef.current?.dificultad!);
    setEstatusReactivo(reactivoRef.current?.estatus!);
    setEsPrivado(reactivoRef.current?.isPrivado!);
    setMostrarPista(reactivoRef.current?.mostrarPista!);
    setPista(reactivoRef.current?.pista!);
    setTiempoMaximoRespuesta(reactivoRef.current?.tiempoMaximoRespuesta!);

    // setOpcionesMultiple([]);
    // setOpcionFalsoVerdadero(undefined);
    // setOpcionesVerdaderoFalso(defaultOpcionFalsoVerdadero);
    // setValorNumericoCorrecto(0);
    // setSimilitudValorTextual(0);
    // setValorNumericoCorrecto(0);
    // setMargenValorNumerico(0);

    if (reactivoRef.current?.tipoReactivo === "VALOR_TEXTUAL") {
      setValorTextualCorrecto(reactivoRef.current?.valorTextualCorrecto || "");
      setSimilitudValorTextual(reactivoRef.current?.similitudValorTextual || 0);
    }
    if (reactivoRef.current?.tipoReactivo === "FALSO_VERDADERO") {
      setOpcionesVerdaderoFalso(
        reactivoRef.current.opciones || opcionesVerdaderoFalso
      );
      setOpcionFalsoVerdadero(
        reactivoRef.current!.opciones.find((o) => o.esCorrecto)?.opcion
      );
    }
    if (reactivoRef.current?.tipoReactivo === "OPCION_MULTIPLE") {
      setOpcionesMultiple(reactivoRef.current.opciones);
    }
    if (reactivoRef.current?.tipoReactivo === "VALOR_NUMERICO") {
      setValorNumericoCorrecto(reactivoRef.current.valorNumericoCorrecto);
      setMargenValorNumerico(reactivoRef.current.valorNumericoCorrecto);
    }
  };

  const handleSubmit = (cb: (data: IReactivo) => void) => {
    try {
      const { idAccount, idUsuario, prefijo } = getUserLocalStorage()!;
      setErrorMessage("");
      setErrorOpcionMultipleMessage("");
      _validateForm();
      const reactivoBase: ReactivoBase = {
        id: !reactivoRef.current
          ? "_" + Math.random().toString(36).substr(2, 9)
          : reactivoRef.current.id,
        type: "reactivo",
        idAccount,
        materia: materia,
        categoria: categoria, 
        pregunta: pregunta,
        puntos: puntos,
        idUsuario: prefijo + idUsuario,
        isPrivado: esPrivado,
        dificultad: dificultad,
        tiempoMaximoRespuesta: tiempoMaximoRespuesta,
        pista: pista,
        mostrarPista: mostrarPista,
        tipoReactivo: tipoReactivo,
        estatus: estatusReactivo,
      };
      if (tipoReactivo === "OPCION_MULTIPLE") {
        const reactivo: IReactivo = {
          ...reactivoBase,
          tipoReactivo: "OPCION_MULTIPLE",
          opciones: opcionesMultiple,
        };
        cb(reactivo);
        return;
      }
      if (tipoReactivo === "FALSO_VERDADERO") {
        const reactivo: IReactivo = {
          ...reactivoBase,
          tipoReactivo: "FALSO_VERDADERO",
          opciones: opcionesVerdaderoFalso,
        };
        cb(reactivo);
        return;
      }

      if (tipoReactivo === "VALOR_TEXTUAL") {
        const reactivo: IReactivo = {
          ...reactivoBase,
          tipoReactivo: "VALOR_TEXTUAL",
          valorTextualCorrecto: valorTextualCorrecto,
          similitudValorTextual: similitudValorTextual,
        };
        cb(reactivo);
        return;
      }

      if (tipoReactivo === "VALOR_NUMERICO") {
        const reactivo: IReactivo = {
          ...reactivoBase,
          tipoReactivo: "VALOR_NUMERICO",
          valorNumericoCorrecto: valorNumericoCorrecto,
          margenValorNumerico: margenValorNumerico,
        };
        cb(reactivo);
        return;
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return {
    setOpcionFalsoVerdadero,
    handleChangeOpcionFalsoVerdadero,
    handleAddOpcionMultiple,
    handleDeleteOpcionMultiple,
    loadDefaultValues,
    resetReactivoForm,
    handleSubmit,
  };
};
