import React from "react";
import { useCuestionariosContext } from "../context/CuestionariosContext";
import toast, { Toaster } from "react-hot-toast";

import moment from "moment";
import { IReactivo } from "../../../interfaces/reactivo.interface";
import axios from "axios";
import { getUserLocalStorage } from "../../../../../utils/getUserLocalStorage";
export const useCuestionarios = () => {
  const { idUsuarioConPrefijo, idAccount, tokenAut, prefijo } = getUserLocalStorage()!;
  const {
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
    autorizado
  } = useCuestionariosContext();

  const handleDetallesCuestionarios = () => {
    let newErrors = {};
    setErrors({});
    if (descripcion.trim() === "") {
      newErrors = { ...newErrors, descripcion: "Campo requerido" };
    }
    if (idMateriaResultado.trim() === "") {
      newErrors = { ...newErrors, idMateriaResultado: "Campo requerido" };
    }
    if (idCicloResultado.trim() === "") {
      newErrors = { ...newErrors, idCicloResultado: "Campo requerido" };
    }
    if (fechaInicialVigencia.trim() === "") {
      newErrors = { ...newErrors, fechaInicialVigencia: "Campo requerido" };
    }
    if (fechaFinalVigencia.trim() === "") {
      newErrors = { ...newErrors, fechaFinalVigencia: "Campo requerido" };
    }
    if (
      fechaInicialVigencia &&
      fechaFinalVigencia &&
      moment(fechaFinalVigencia).isBefore(fechaInicialVigencia)
    ) {
      newErrors = {
        ...newErrors,
        fechaFinalVigencia: "Fecha final debe ser postoerior a fecha inicial",
      };
    }
    if (reactivosTotales <= 0) {
      newErrors = {
        ...newErrors,
        reactivosTotales: "Reactivos totales no puede ser cero.",
      };
    }
    if (puntosTotales <= 0) {
      newErrors = {
        ...newErrors,
        puntosTotales: "Puntos totales no puede ser cero.",
      };
    }

    if (descargarCalificacion) {
      if (
        tipoRegistroCalificacion === "MATERIA" &&
        atributoResultado.trim() === ""
      ) {
        newErrors = {
          ...newErrors,
          atributoResultado: "Campo requerido",
        };
      }
      if (periodoResultado.trim() === "") {
        newErrors = {
          ...newErrors,
          periodoResultado: "Campo requerido",
        };
      }
      if (
        evaluacionContinuaRegistro <= 0 &&
        tipoRegistroCalificacion === "EVALUACION_CONTINUA"
      ) {
        newErrors = {
          ...newErrors,
          evaluacionContinuaRegistro: "Campo no puede ser cero.",
        };
      }
      if (
        evaluacionContinuaAspecto.trim() === "" &&
        tipoRegistroCalificacion === "EVALUACION_CONTINUA"
      ) {
        newErrors = {
          ...newErrors,
          evaluacionContinuaAspecto: "Campo requerido.",
        };
      }
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      toast.error("Hay campos registrados que no son válidos.");
      return;
    }

    console.log({tipoRegistroCalificacion, evaluacionContinuaRegistro, evaluacionContinuaAspecto})

     
    setActiveStep((prev) => prev + 1);
  };

  const handleSelectDestinatarios = () => {
    const hasDestinatarioSelected = destinatarios.find((d) => d._checked);
    if (!hasDestinatarioSelected) {
      toast.error("Selecciona al menos un destinatario");
      return;
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleSelectReactivos = () => {
    const pTotales = selectedReactivos
      .map((sr) => sr.puntos)
      .reduce((ac, cur) => ac + cur, 0);

    if (reactivosTotales !== selectedReactivos.length) {
      toast.error(`Los reactivos deben ser ${reactivosTotales}}`);
      return;
    }

    if (pTotales !== puntosTotales) {
      toast.error(`Los puntos totales deben ser ${puntosTotales}`);
      return;
    }

    if (selectedReactivos.length === 0) {
      toast.error("Selecciona al menos un reactivo");
      return;
    }
    setActiveStep((prev) => prev + 1);
  };

  const onSelectReactivo = (checked: boolean, reactivo: IReactivo) => {
    if (checked) {
      reactivo.fijo = false;
      setSelectedReactivos([...selectedReactivos, reactivo]);
    } else {
      setSelectedReactivos(
        selectedReactivos.filter((r) => r.id !== reactivo.id)
      );
    }
  };

  const _resetForm = () => {
    setDescripcion("");
    setIdCicloResultado("");
    setIdMateriaResultado("");
    setMateria("");
    setIdGrupo("");
    setFechaInicialVigencia("");
    setFechaFinalVigencia("");
    setReactivosTotales(0);
    setPuntosTotales(0);
    setTipoPresentacion("ORDEN_FIJO");
    setPermiteRegresar(false);
    setMostrarResultadoFinal(false);
    setEstatus("ACTIVO");
    setDescargarCalificacion(false);
    setTipoRegistroCalificacion("MATERIA");
    setPeriodoResultado("");
    setAtributoResultado("");
    setEvaluacionContinuaAspecto("");
    setEvaluacionContinuaRegistro(0);
    setActiveStep(0);
    setSelectedReactivos([]);
  };

  const handleCreateCuestionario = async () => {
    try {
      const newDdestinatarios = destinatarios
        .filter((d) => d._checked)
        .map((d) => ({ idUsuario: `${prefijo}_${d.idAlumno}` }));

      const tiempoMaximoCuestionario = selectedReactivos
        .map((s) => s.tiempoMaximoRespuesta || 0)
        .reduce((ac, cur) => {
          return ac + cur;
        }, 0);

      const newReactivos = selectedReactivos.map((r, index) => {
        return {
          ...r,
          index,
        };
      });
      const createCuestionarioDto = {
        descripcion: descripcion,
        materia: materia,
        fechaInicialVigencia: fechaInicialVigencia,
        fechaFinalVigencia: fechaFinalVigencia,
        puntosTotales: puntosTotales,
        reactivosTotales: reactivosTotales,
        permiteRegresar: permiteRegresar,
        mostrarResultadoFinal: mostrarResultadoFinal,
        tipoPresentacion: tipoPresentacion,
        idMateriaResultado: idMateriaResultado,
        idCicloResultado: idCicloResultado,
        periodoResultado: periodoResultado,
        atributoResultado: atributoResultado,
        destinatarios: newDdestinatarios,
        reactivos: newReactivos,
        idUsuario: idUsuarioConPrefijo,
        estatus: estatus,
        tiempoMaximoCuestionario: tiempoMaximoCuestionario,
        evaluacionContinuaAspecto,
        evaluacionContinuaRegistro,
        autorizado: autorizado
          };

      console.log("createDto", createCuestionarioDto);
      const url = `${process.env.REACT_APP_API_URL}/${idAccount}/cuestionarios`;
      const res = await axios.post(url, createCuestionarioDto, {
        headers: {
          idUsuario: idUsuarioConPrefijo,
          tokenAut: tokenAut,
        },
      });

      console.log(res.data);

      toast.success(res.data.detail);

      _resetForm();
    } catch (error: any) {
      console.log("error", error);
      toast.error(JSON.stringify(error.response.data || "") || error.message);
    }
  };

  return {
    handleDetallesCuestionarios,
    handleSelectDestinatarios,
    handleSelectReactivos,
    onSelectReactivo,
    handleCreateCuestionario,
  };
};
