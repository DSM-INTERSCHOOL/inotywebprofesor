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
  onChange: (data: DescargarCalificacionData) => void;
  defaultValues: DescargarCalificacionData;
}

interface DescargarCalificacionData {
  descargarCalificacion: boolean;
  tipoRegistroCalificacion: TipoRegistroCalificacion;
  periodoResultado: string;
  atributoResultado: string;
  evaluacionContinuaRegistro: number;
  evaluacionContinuaAspecto: string;
}

export const SectionDescargarCalificacion: React.FC<Props> = ({
  idCiclo,
  idGrupo,
  idMateria,
  onChange,
  defaultValues,
}) => {
  const [descargarCalificacion, setDescargarCalificacion] = useState(
    defaultValues.descargarCalificacion
  );
  const [tipoRegistroCalificacion, setTipoRegistroCalificacion] =
    useState<TipoRegistroCalificacion>(defaultValues.tipoRegistroCalificacion);
  const [periodoResultado, setPeriodoResultado] = useState(
    defaultValues.periodoResultado
  );
  const [atributoResultado, setAtributoResultado] = useState(
    defaultValues.atributoResultado
  );
  const [evaluacionContinuaRegistro, setEvaluacionContinuaRegistro] = useState(
    defaultValues.evaluacionContinuaRegistro
  );


  const [evaluacionContinuaAspecto, setEvaluacionContinuaAspecto] =
    React.useState(defaultValues.evaluacionContinuaAspecto);

    
  const { evaluacionContinuaRegistro: listEvaluacionCotinuaRegistro } =
    useEvaluacionContinua({
      idAspecto: evaluacionContinuaAspecto,
      idCiclo: idCiclo,
      idGrupo: idGrupo,
      idMateria: idMateria,
      periodo: +periodoResultado,
    });

  const { periodos } = usePeriodos(idCiclo);

  const { aspectos } = useAspecto({
    periodo: +periodoResultado,
    idCiclo,
    idGrupo,
    idMateria,
  });


  const handleChange = () => {
    onChange({
      descargarCalificacion,
      tipoRegistroCalificacion,
      periodoResultado,
      atributoResultado,
      evaluacionContinuaRegistro,
      evaluacionContinuaAspecto,
    });
  };


  React.useEffect(() => {
    handleChange();
  }, [
    descargarCalificacion,
    tipoRegistroCalificacion,
    periodoResultado,
    atributoResultado,
    evaluacionContinuaRegistro,
    evaluacionContinuaAspecto,
  ]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <MySwitch
          label="Descargar calificación"
          value={descargarCalificacion}
          onChange={(checked) => {
            setDescargarCalificacion(checked);
          }}
        />
      </Grid>

      {descargarCalificacion && (
        <>
          <Grid item xs={4}>
            <MySelect
              value={tipoRegistroCalificacion}
              label="Tipo registro calificación"
              onChange={(value) => {
                setTipoRegistroCalificacion(value);
              }}
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
              onChange={(value) => {
                setPeriodoResultado(value);
              }}
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
                onChange={(value) => {
                  setAtributoResultado(value);
                }}
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
                  onChange={(value) => {
                    setEvaluacionContinuaAspecto(value);
                  }}
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
                  onChange={(value) => {
                    setEvaluacionContinuaRegistro(value);
                  }}
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
