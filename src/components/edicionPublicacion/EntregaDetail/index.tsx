import React from "react";
import { IEntrega } from "../ListaEntrega/Entrega.interface";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import "./EntregaDetail.css";
import { DetalleEntrega } from "../containers/DetalleEntrega";
import moment from "moment";
import { Utils } from "../../../utils/Utils";
import { IconButton } from "@mui/material";
import ImageContainer from "./Components/ImageContainer";
import VideoContainer from "./Components/VideoContainer";
import DownloadIcon from "@mui/icons-material/Download";

interface Props {
  entrega?: IEntrega;
  setShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EntregaDetail: React.FC<Props> = ({ entrega, setShowDetail }) => {
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
      <div style={{ overflow: "auto", height: 480 }}>
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
              {moment(entrega.fechaHora).format("MMMM Do YYYY, h:mm:ss a")}
            </p>
          </div>
        </div>
        <div
          style={{ paddingTop: 15 }}
          dangerouslySetInnerHTML={{ __html: entrega.textoEntrega }}
        />

        {entrega.adjuntos.length >= 1 ? (
          <div>
            <div>
              <h4>Archivos adjuntos:</h4>
              {entrega.adjuntos.map((el) => {
                if (Utils.getMimeType(el.location).includes("image")) {
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                        border: "thin solid #607EAA",
                        borderRadius: 5,
                      }}
                      key={el.id}
                    >
                      <ImageContainer
                        url={el.location}
                        fileName={el.originalName}
                      />
                      <IconButton
                        href={el.location}
                        download={el.originalName}
                        target="_blank"
                      >
                        <DownloadIcon color="primary" fontSize="medium" />
                      </IconButton>
                    </div>
                  );
                }

                if (Utils.getMimeType(el.location).includes("video")) {
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                        border: "thin solid #607EAA",
                        borderRadius: 5,
                      }}
                      key={el.id}
                    >
                      <VideoContainer
                        url={el.location}
                        fileName={el.originalName}
                      />

                      <IconButton
                        href={el.location}
                        download={el.originalName}
                        target="_blank"
                      >
                        <DownloadIcon color="primary" fontSize="medium" />
                      </IconButton>
                    </div>
                  );
                }

                if (Utils.getMimeType(el.location).includes("pdf")) {
                  const extension = el.location.split(".").pop();
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                        border: "thin solid #607EAA",
                        borderRadius: 5,
                      }}
                      key={el.id}
                    >
                      <IconButton
                        href={el.location}
                        download={el.originalName}
                        target="_blank"
                      >
                        <p className="selectFile">
                          {el.originalName || `Archivo.${extension}`}
                        </p>
                      </IconButton>

                      <IconButton
                        href={el.location}
                        download={el.originalName}
                        target="_blank"
                      >
                        <DownloadIcon color="primary" fontSize="medium" />
                      </IconButton>
                    </div>
                  );
                }

                if (!Utils.getMimeType(el.location).includes("pdf")) {
                  const extension = el.location.split(".").pop();
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                        border: "thin solid #607EAA",
                        borderRadius: 5,
                      }}
                      key={el.id}
                    >
                      <IconButton
                        href={el.location}
                        download={el.originalName}
                        target="_blank"
                      >
                        <p className="selectFile">
                          {el.originalName || `Archivo.${extension}`}
                        </p>
                      </IconButton>

                      <IconButton
                        href={el.location}
                        download={el.originalName}
                        target="_blank"
                      >
                        <DownloadIcon color="primary" fontSize="medium" />
                      </IconButton>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        ) : (
          <p>
            <i style={{ color: "GrayText" }}>"Sin archivos adjuntos"</i>
          </p>
        )}

        <DetalleEntrega entrega={entrega} />
      </div>
    </div>
  );
};
