import { IconButton } from "@material-ui/core";
import React from "react";
import { Utils } from "../../../../utils/Utils";
import { EntregasContext } from "../../TablaEntregas";
import DownloadIcon from "@mui/icons-material/Download";
import ImageContainer from "./ImageContainer";
import VideoContainer from "./VideoContainer";

export const EntregaAdjuntos = () => {
  const { entregaDetail, setShowDetail } = React.useContext(EntregasContext);

  if (entregaDetail.adjuntos.length === 0) {
    return (
      <p>
        <i style={{ color: "GrayText" }}>"Sin archivos adjuntos"</i>
      </p>
    );
  }

  return (
    <div>
      <div>
        <h4>Archivos adjuntos:</h4>
        {entregaDetail.adjuntos.map((el: any) => {
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
                  marginBottom:10
                }}
                key={el.id}
              >
                <ImageContainer url={el.location} fileName={el.originalName} />
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
                  marginBottom:10

                }}
                key={el.id}
              >
                <VideoContainer url={el.location} fileName={el.originalName} />

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
                  marginBottom:10

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
                  marginBottom:10

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
  );
};
