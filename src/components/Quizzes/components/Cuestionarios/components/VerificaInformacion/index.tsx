import { Grid, InputLabel } from "@material-ui/core";
import React from "react";
import { useCuestionariosContext } from "../../context/CuestionariosContext";

export const VerificaInformacion = () => {
  const {
    atributoResultado,
    descripcion,
    destinatarios,
    estatus,
    fechaFinalVigencia,
    fechaInicialVigencia,
    idCicloResultado,
    idMateriaResultado,
    materia,
    mostrarResultadoFinal,
    periodoResultado,
    permiteRegresar,
    puntosTotales,
    reactivosTotales,
    selectedReactivos,
    tipoPresentacion,
    descargarCalificacion,
    tipoRegistroCalificacion,
    evaluacionContinuaRegistro,
    evaluacionContinuaAspecto,
    idGrupo,
  } = useCuestionariosContext();
  return (
    <Grid container spacing={2}>
      <Grid xs={6}>
        <Grid container>
          <Grid item xs={6}>
            <InputLabel>Descripción</InputLabel>
            <p>{descripcion}</p>
          </Grid>
          <Grid item xs={6}>
            <InputLabel>idCicloResultado</InputLabel>
            <p>{idCicloResultado}</p>
          </Grid>
          <Grid item xs={6}>
            <InputLabel>idMateriaResultado</InputLabel>
            <p>{idMateriaResultado}</p>
          </Grid>
          <Grid item xs={6}>
            <InputLabel>Materia</InputLabel>
            <p>{materia}</p>
          </Grid>
          <Grid item xs={6}>
            <InputLabel>Grupo</InputLabel>
            <p>{idGrupo}</p>
          </Grid>

          <Grid item xs={6}>
            <InputLabel>Fecha inicial vigencia</InputLabel>
            <p>{fechaInicialVigencia}</p>
          </Grid>

          <Grid item xs={6}>
            <InputLabel>Fecha final vigencia</InputLabel>
            <p>{fechaFinalVigencia}</p>
          </Grid>

          <Grid item xs={6}>
            <InputLabel>Reactivos totales</InputLabel>
            <p>{reactivosTotales}</p>
          </Grid>

          <Grid item xs={6}>
            <InputLabel>Puntos totales</InputLabel>
            <p>{puntosTotales}</p>
          </Grid>

          <Grid item xs={6}>
            <InputLabel>Tipo presentacióon</InputLabel>
            <p>{tipoPresentacion}</p>
          </Grid>
          <Grid item xs={6}>
            <InputLabel>Permite regresar</InputLabel>
            <p>{permiteRegresar ? "si" : "no"}</p>
          </Grid>
          <Grid item xs={6}>
            <InputLabel>Mostrar resultado final</InputLabel>
            <p>{mostrarResultadoFinal ? "si" : "no"}</p>
          </Grid>
          <Grid item xs={6}>
            <InputLabel>Estatus</InputLabel>
            <p>{estatus}</p>
          </Grid>

          <Grid item xs={6}>
            <InputLabel>Descargar Calificación</InputLabel>
            <p>{descargarCalificacion ? "si" : "no"}</p>
          </Grid>

          <Grid item xs={6}>
            <InputLabel>Tipo registro calificación</InputLabel>
            {tipoRegistroCalificacion}
          </Grid>

          <Grid item xs={6}>
            <InputLabel>Periodo resultado</InputLabel>
            <p>{periodoResultado}</p>
          </Grid>

          <Grid item xs={6}>
            <InputLabel>atributoResultado</InputLabel>
            <p>{atributoResultado}</p>
          </Grid>

          {tipoRegistroCalificacion === "EVALUACION_CONTINUA" && (
            <>
              <Grid item xs={6}>
                <InputLabel>Evaluación continua registro</InputLabel>
                {evaluacionContinuaRegistro}
              </Grid>
              <Grid item xs={6}>
                <InputLabel>Evaluación continua aspecto</InputLabel>
                {evaluacionContinuaAspecto}
              </Grid>
            </>
          )}
        </Grid>
      </Grid>

      <Grid xs={6}>
        <Grid container>
          <Grid xs={6}>
            <InputLabel>Reactivos cuestionario</InputLabel>
            {selectedReactivos.map((r) => {
              return <p>{r.pregunta}</p>;
            })}
          </Grid>
          <Grid xs={6}>
            <InputLabel>Destinatarios</InputLabel>
            {destinatarios
              .filter((d) => d._checked)
              .map((d) => {
                return <p key={d.idAlumno}>{d.nombreCompleto}</p>;
              })}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
