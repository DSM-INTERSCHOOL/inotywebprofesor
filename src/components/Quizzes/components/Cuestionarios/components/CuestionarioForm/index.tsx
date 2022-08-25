import {
  Divider,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  FormHelperText,
  TextField,
} from "@material-ui/core";

import { Label } from "@material-ui/icons";
import React from "react";
import { json } from "stream/consumers";
import { useAuthContext } from "../../../../../../context/AuthContext";
import { useCiclos } from "../../../../../../hooks/useCiclos";
import { useDestinatarios } from "../../hooks/useDestinatarios";
import { useGruposByProfesorMateria } from "../../../../../../hooks/useGruposByProfesorMateria";
import { useMateriasProfesorCiclo } from "../../../../../../hooks/useMateriasProfesorCiclo";
import { MySelect } from "../../../../../UI/MySelect";
import { MySwitch } from "../../../../../UI/MySwitch";
import { MyTextField } from "../../../../../UI/MyTextField";
import {
  EstatusCuestionario,
  TipoPresentacion,
  TipoRegistroCalificacion,
} from "../../../../interfaces/cuestionario.interface";
import { useCuestionariosContext } from "../../context/CuestionariosContext";
import { SelectDestinatarios } from "../SelectDestinatarios";
import { IDestinatario } from "../../../../interfaces/destinatario.interface";
import { usePeriodos } from "../../hooks/usePeriodos";
import { useEvaluacionContinua } from "../../hooks/useEvaluacionContinua";
import { useAspecto } from "../../hooks/useAspecto";

export const CuestionarioForm = () => {
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
    // destinatarios,
    setDestinatarios,
    estatus,
    setEstatus,
    idGrupo,
    setIdGrupo,
    descargarCalificacion,
    setDescargarCalificacion,
    tipoRegistroCalificacion,
    setTipoRegistroCalificacion,
    evaluacionContinuaRegistro,
    setEvaluacionContinuaRegistro,
    evaluacionContinuaAspecto,
    setEvaluacionContinuaAspecto,
    errors,
    destinatarios,
  } = useCuestionariosContext();
  const { idProfesor } = useAuthContext();
  const { ciclos, loading } = useCiclos();
  const { materias } = useMateriasProfesorCiclo(idProfesor, idCicloResultado);
  const { grupos } = useGruposByProfesorMateria(
    idProfesor,
    idCicloResultado,
    idMateriaResultado
  );
  const { error, data } = useDestinatarios();
  const { periodos } = usePeriodos(idCicloResultado);
  const { evaluacionContinuaRegistro: listEvaluacionCotinuaRegistro } =
    useEvaluacionContinua();
  const { aspectos } = useAspecto({
    periodo: +periodoResultado,
    idCiclo: idCicloResultado,
    idGrupo: idGrupo,
    idMateria: idMateriaResultado,
  });

  React.useEffect(() => {
    setDestinatarios(
      [...data].map((d) => {
        d._checked = true;
        return d;
      })
    );
  }, [data]);

  React.useEffect(() => {
    if (periodos.length === 0) {
      setPeriodoResultado("");
    }
    if (periodos.length === 1) {
      setPeriodoResultado(periodos[0].periodo);
    }
  }, [periodos]);

  React.useEffect(() => {
    if (aspectos.length === 0) {
      setEvaluacionContinuaAspecto("");
    }
  }, [aspectos]);

  React.useEffect(() => {
    if (listEvaluacionCotinuaRegistro.length === 1) {
      setEvaluacionContinuaRegistro(
        listEvaluacionCotinuaRegistro[0].numeroRegistro
      );
    }
  }, [listEvaluacionCotinuaRegistro]);

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      {/* <pre>{JSON.stringify(errors, null, 2)}</pre> */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MyTextField
            label="Descripción"
            value={descripcion}
            error={errors.descripcion}
            onChange={(value) => {
              setDescripcion(value);
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <MySelect
            label="IdCiclo"
            value={idCicloResultado}
            error={errors.idCicloResultado}
            onChange={(value) => setIdCicloResultado(value)}
            data={[
              { text: "Seleccione", value: "" },
              ...ciclos.map((c) => ({ text: c.idCiclo, value: c.idCiclo })),
            ]}
          />
        </Grid>
        <Grid item xs={4}>
          <MySelect
            label="Materia"
            value={idMateriaResultado}
            error={errors.idMateriaResultado}
            onChange={(value) => {
              setIdMateriaResultado(value);
              setMateria(
                materias.find((m) => m.idMateria === value)?.descripcion!
              );
            }}
            data={[
              { text: "Seleccione", value: "" },
              ...materias.map((m) => ({
                text: `${m.idMateria}  -  ${m.descripcion}`,
                value: m.idMateria,
              })),
            ]}
          />
        </Grid>
        <Grid item xs={4}>
          <MySelect
            label="Grupo"
            value={idGrupo}
            onChange={(value) => setIdGrupo(value)}
            data={[
              { text: "Todos", value: "" },
              ...grupos.map((g) => ({
                text: g,
                value: g,
              })),
            ]}
          />
        </Grid>

        <Grid item xs={4}>
          <MyTextField
            label="Fecha inicial Vigencia"
            type="date"
            error={errors.fechaInicialVigencia}
            value={fechaInicialVigencia}
            onChange={setFechaInicialVigencia}
          />
        </Grid>
        <Grid item xs={4}>
          <MyTextField
            label="Fecha Final Vigencia"
            type="date"
            error={errors.fechaFinalVigencia}
            value={fechaFinalVigencia}
            onChange={setFechaFinalVigencia}
          />
        </Grid>

        <Grid item xs={4}>
          <MyTextField
            label="Reactivos totales"
            type="number"
            error={errors.reactivosTotales}
            value={reactivosTotales}
            onChange={setReactivosTotales}
          />
        </Grid>

        <Grid item xs={4}>
          <MyTextField
            label="Puntos totales"
            type="number"
            error={errors.puntosTotales}
            value={puntosTotales}
            onChange={setPuntosTotales}
          />
        </Grid>

        <Grid item xs={4}>
          <MySelect
            label="Tipo presentación"
            value={tipoPresentacion}
            onChange={setTipoPresentacion}
            data={[
              { value: "ORDEN_FIJO", text: "Orden fijo" },
              { value: "ORDEN_ALEATORIO", text: "Orden Aleatorio" },
            ]}
          />
        </Grid>

        <Grid item xs={2}>
          <MySwitch
            label="Permite regresar"
            value={permiteRegresar}
            onChange={setPermiteRegresar}
          />
        </Grid>
        <Grid item xs={2}>
          <MySwitch
            label="Mostrar resultado final"
            value={mostrarResultadoFinal}
            onChange={setMostrarResultadoFinal}
          />
        </Grid>

        <Grid item xs={4}>
          <MySelect
            value={estatus}
            onChange={setEstatus}
            label="Estatus"
            data={[
              { value: "ACTIVO", text: "Activo" },
              { value: "CANCELADO", text: "Cancelado" },
              { value: "ELIMINADO", text: "Eliminado" },
            ]}
          />
        </Grid>
      </Grid>
      <Divider style={{ marginTop: 30, marginBottom: 30 }} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MySwitch
            label="Descargar calificación"
            value={descargarCalificacion}
            onChange={setDescargarCalificacion}
          />
        </Grid>

        {descargarCalificacion && (
          <>
            <Grid item xs={4}>
              <MySelect
                value={tipoRegistroCalificacion}
                label="Tipo registro calificación"
                onChange={setTipoRegistroCalificacion}
                data={[
                  { value: "MATERIA", text: "Materia" },
                  { value: "EVALUACION_CONTINUA", text: "Evaluación Continua" },
                ]}
              />
            </Grid>
            <Grid item xs={4}>
              <MySelect
                error={errors.periodoResultado}
                value={periodoResultado}
                label="Periodo resultado"
                onChange={setPeriodoResultado}
                data={[
                  { value: "", text: "Seleccione" },
                  ...periodos.map((p) => ({
                    value: p.periodo,
                    text: p.descripcion,
                  })),
                ]}
              />
            </Grid>
            {tipoRegistroCalificacion === "MATERIA" && (
              <Grid item xs={4}>
                {/* SOLO CUANDO TIPO REGISTRO ES "MATERIA" */}

                <MySelect
                  error={errors.atributoResultado}
                  value={atributoResultado}
                  onChange={setAtributoResultado}
                  label="Atributo Resultado"
                  data={[
                    { value: "Calificacion", text: "Calificación" },
                    { value: "Aspecto1", text: "Aspecto 1" },
                    { value: "Aspecto2", text: "Aspecto 2" },
                  ]}
                />
              </Grid>
            )}

            {tipoRegistroCalificacion === "EVALUACION_CONTINUA" && (
              <>
                <Grid item xs={4}>
                  <MySelect
                    label="Evaluación continua aspecto"
                    value={evaluacionContinuaAspecto}
                    onChange={setEvaluacionContinuaAspecto}
                    error={errors.evaluacionContinuaAspecto}
                    data={[
                      { value: "", text: "Seleccione" },
                      ...aspectos.map((a) => ({
                        value: a.idAspecto,
                        text: a.nombreAspecto,
                      })),
                    ]}
                  />
                </Grid>
                <Grid item xs={4}>
                  <MySelect
                    label="Evaluación continua registro"
                    value={evaluacionContinuaRegistro}
                    onChange={setEvaluacionContinuaRegistro}
                    error={errors.evaluacionContinuaRegistro}
                    data={listEvaluacionCotinuaRegistro.map((e) => ({
                      text: e.descripcion,
                      value: e.numeroRegistro,
                    }))}
                  />
                </Grid>
              </>
            )}
          </>
        )}
      </Grid>
    </>
  );
};
