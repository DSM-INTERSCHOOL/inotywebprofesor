import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useAspecto } from "../../components/Quizzes/components/Cuestionarios/hooks/useAspecto";
import { useEvaluacionContinua } from "../../components/Quizzes/components/Cuestionarios/hooks/useEvaluacionContinua";
import { usePeriodos } from "../../components/Quizzes/components/Cuestionarios/hooks/usePeriodos";
import { TipoRegistroCalificacion } from "../../components/Quizzes/interfaces/cuestionario.interface";
import { MySelect } from "../../components/UI/MySelect";
import { MySwitch } from "../../components/UI/MySwitch";

interface Props {
  idCiclo: string;
  idGrupo: string;
  idMateria: string;
}

export const SectionDescargarCalificacion: React.FC<Props> = ({
  idCiclo,
  idGrupo,
  idMateria,
}) => {
  const [descargarCalificacion, setDescargarCalificacion] = useState(false);
  const [tipoRegistroCalificacion, setTipoRegistroCalificacion] =
    useState<TipoRegistroCalificacion>("EVALUACION_CONTINUA");
  const [periodoResultado, setPeriodoResultado] = useState("");
  const [atributoResultado, setAtributoResultado] = useState("");
  const [evaluacionContinuaRegistro, setEvaluacionContinuaRegistro] =
    useState(0);

  const [evaluacionContinuaAspecto, setEvaluacionContinuaAspecto] =
    React.useState("");
  const { evaluacionContinuaRegistro: listEvaluacionCotinuaRegistro } =
    useEvaluacionContinua();

  const { periodos } = usePeriodos(idCiclo);

  const { aspectos } = useAspecto({
    periodo: +periodoResultado,
    idCiclo,
    idGrupo,
    idMateria,
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <MySwitch
          label="Descargar calificación"
          value={descargarCalificacion}
          onChange={() => {}}
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
  );
};
