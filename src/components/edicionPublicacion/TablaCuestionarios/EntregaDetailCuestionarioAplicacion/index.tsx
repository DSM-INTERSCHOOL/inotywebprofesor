import React from "react";
import "./EntregaDetail.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import moment from "moment";
import "moment/locale/es-us";
import { ICuestionario } from "../../../Quizzes/interfaces/cuestionario.interface";
import { CalificacionEnsayo } from "./CalificacionEnsayo";
import { useTableCuestionarios } from "../Hooks/useTableCuestionarios";
import { useTablaCuestionariosContext } from "../context/TablaCuestionariosContext";
import { Button } from "@material-ui/core";

interface Props {
  setShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
  cuestionario: ICuestionario;
}

export const EntregaDetailCuestionarioAplicacion: React.FC<Props> = ({
  setShowDetail,
  cuestionario,
}) => {
  const { calificarEnsayo } = useTableCuestionarios();
  const {
    entregaDetail,
    setEntregaDetail,
    indexCuestionario,
    listaCuestionarios,
    setIndexCuestionario,
  } = useTablaCuestionariosContext();

  React.useEffect(() => {
    setEntregaDetail(listaCuestionarios[indexCuestionario]);
  }, [indexCuestionario]);

  if (!entregaDetail) return null;

  const handleSiguiente = () => {
    if (listaCuestionarios.length - 1 === indexCuestionario) return;
    setIndexCuestionario((prev) => prev + 1);
  };

  const handleAtras = () => {
    if (indexCuestionario === 0) return;
    setIndexCuestionario((prev) => prev - 1);
  };

  return (
    <div>
      <ArrowBackIcon
        className="buttonBack"
        fontSize="large"
        color="primary"
        onClick={() => setShowDetail(false)}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <p>
          {indexCuestionario + 1} / {listaCuestionarios.length}
        </p>
        <div style={{ display: "flex", gap: 10 }}>
          <Button color="secondary" variant="contained" onClick={handleAtras}>
            Atras
          </Button>
          <Button color="primary" variant="contained" onClick={handleSiguiente}>
            Siguiente
          </Button>
        </div>
      </div>
      <h2>{cuestionario.descripcion}</h2>
      <div style={{ overflow: "auto", maxHeight: 480 }}>
        <div className="header">
          <div className="left">
            <p style={{ fontSize: 14, textAlign: "center" }}>
              Nombre del alumno:
            </p>
          </div>
          <div className="right">
            <b style={{ fontSize: 14, textAlign: "center" }}>
              {entregaDetail.nombreUsuario || "Alumno"}
            </b>
          </div>
        </div>

        <div className="header">
          <div className="left">
            <p style={{ fontSize: 14, textAlign: "center" }}>
              Fecha de entregaDetail:
            </p>
          </div>
          <div className="right">
            {/* <b style={{ fontSize: 14, textAlign: "center" }}>{entregaDetail.nombreCorto}</b> */}
            <p style={{ fontSize: 14, textAlign: "center" }}>
              {moment(entregaDetail.fechaModificacion).format(
                "MMMM Do YYYY, h:mm:ss a"
              )}
            </p>
          </div>
        </div>

        {/* <div
          style={{ paddingTop: 15 }}
          dangerouslySetInnerHTML={{ __html: entregaDetail.mostrarResultadoFinal }}
        /> */}
        <h4>Puntaje obtenido: {entregaDetail.totalPuntosObtenidos}</h4>
        <h4>Preguntas:</h4>

        {entregaDetail.reactivos.map((reactivo: any, i: number) => {
          return (
            <div style={{ marginLeft: 10 }}>
              <p style={{ fontSize: 15 }}>
                <b>{i + 1}.</b> {reactivo.pregunta}{" "}
                <i style={{ fontSize: 11, color: "#224B0C" }}>
                  {"("}Puntaje: {reactivo.puntos}
                  {")"}
                </i>
              </p>
              <div>
                <p style={{ fontSize: 13, color: "GrayText" }}>
                  Respuesta del alumno:
                </p>
                <p>{reactivo.respuesta}</p>
              </div>
              {reactivo.tipoReactivo === "ENSAYO" && (
                <CalificacionEnsayo
                  key={reactivo.id}
                  defaultValue={reactivo.puntosObtenidos}
                  onSave={(puntosObtenidos) => {
                    calificarEnsayo({
                      puntosObtenidosEnsayo: puntosObtenidos,
                      reactivo: reactivo as any,
                      idCuestionario: entregaDetail.idCuestionario,
                      idAplicacion: entregaDetail.id,
                    });
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
