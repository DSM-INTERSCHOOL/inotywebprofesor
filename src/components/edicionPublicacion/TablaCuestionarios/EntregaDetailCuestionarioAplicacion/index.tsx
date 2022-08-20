import React from "react";
import { ICuestionarioAplicado } from "../interfaces/CuestionarioAplicado.interface";
import "./EntregaDetail.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import moment from "moment";
import "moment/locale/es-us";

interface Props {
  entrega?: ICuestionarioAplicado;
  setShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EntregaDetailCuestionarioAplicacion: React.FC<Props> = ({
  entrega,
  setShowDetail,
}) => {
  if (!entrega) return null;

  return (
    <div>
      <ArrowBackIcon
        className="buttonBack"
        fontSize="large"
        color="primary"
        onClick={() => setShowDetail(false)}
      />
      <h1>Detalles de la entrega</h1>
      <div style={{ overflow: "auto", maxHeight: 480 }}>
        <div className="header">
          <div className="left">
            <p style={{ fontSize: 14, textAlign: "center" }}>
              Nombre del alumno:
            </p>
          </div>
          <div className="right">
            <b style={{ fontSize: 14, textAlign: "center" }}>
              {entrega.nombreUsuario || "Alumno"}
            </b>
          </div>
        </div>

        <div className="header">
          <div className="left">
            <p style={{ fontSize: 14, textAlign: "center" }}>
              Fecha de entrega:
            </p>
          </div>
          <div className="right">
            {/* <b style={{ fontSize: 14, textAlign: "center" }}>{entrega.nombreCorto}</b> */}
            <p style={{ fontSize: 14, textAlign: "center" }}>
              {moment(entrega.fechaModificacion).format(
                "MMMM Do YYYY, h:mm:ss a"
              )}
            </p>
          </div>
        </div>

        {/* <div
          style={{ paddingTop: 15 }}
          dangerouslySetInnerHTML={{ __html: entrega.mostrarResultadoFinal }}
        /> */}
        <h4>Puntaje obtenido: {entrega.totalPuntosObtenidos}</h4>
        <h4>Preguntas:</h4>
        {}
        {entrega.reactivos.map((el, i) => {
          return (
            <div style={{ marginLeft: 10 }}>
              <p style={{ fontSize: 15 }}>
                <b>{i + 1}.</b> {el.pregunta}{" "}
                <i style={{ fontSize: 11, color: "#224B0C" }}>
                  {"("}Puntaje: {el.puntos}
                  {")"}
                </i>
              </p>
              <div>
                <p style={{ paddingLeft: 25, fontSize: 13, color: "GrayText" }}>
                  Respuesta del alumno:{" "}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
