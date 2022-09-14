import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextEditor } from "../../TextEditor";
import { Filtros } from "../../UI/Filtros";
import { FileAttacher } from "../../UI/FileAttacher";
import { Button } from "@material-ui/core";
import { resetPublicacionState } from "../../../store/actions/publicacionActions";
import { putPublicacion } from "../../../services/publicaciones";
import { uploadFiles } from "../../../services/uploads";

export const DetallePublicacion = ({ onUpdate, rows, setTableRows }) => {
  const dispatch = useDispatch();
  const tipoPublicacion = useSelector(
    (state) => state.publicaciones.tipoPublicacion
  );
  const idPublicacion = useSelector(
    (state) => state.publicaciones.idPublicacion
  );
  const contenido = useSelector((state) => state.publicaciones.contenido);
  const filtros = useSelector((state) => state.publicaciones.filtros);
  const fileArray = useSelector((state) => state.publicaciones.fileArray);

  function clearState() {
    dispatch(resetPublicacionState());
  }

  const handleButtonUpdate = async () => {
    let publicacion = {
      aceptaComentarios: filtros.aceptaComentarios,
      titulo: contenido.titulo,
      cuerpoContenido: contenido.cuerpo,
      fechaInicialPublicacion: filtros.fechaInicialPublicacion,
      fechaFinalPublicacion: filtros.fechaFinalPublicacion,
    };

    if (tipoPublicacion === "eventos") {
      publicacion.fechaHoraEvento = filtros.fechaHoraEvento;
      publicacion.lugarEvento = filtros.lugarEvento;
    }

    if (tipoPublicacion === "tareas") {
      publicacion.fechaHoraEntrega = filtros.fechaHoraEntrega;
    }
    console.log("publicacion to update", publicacion);

    if (fileArray.length > 0) {
      try {
        const filesToUpload = fileArray.filter((file) => {
          return file.nuevo === true;
        });

        // console.log('filesToUpload', filesToUpload)

        let adjuntos = fileArray
          .filter((file) => {
            return file.nuevo === false;
          })
          .map((f) => {
            return f.fileObject;
          });

        //console.log('adjuntos 1', adjuntos);

        const uploadedFiles = await uploadFiles(filesToUpload);

        adjuntos = adjuntos.concat(uploadedFiles);

        //console.log('adjuntos 2', adjuntos);

        publicacion.adjuntos = adjuntos;
      } catch (err) {
        //  dispatch(setToastMessage(err.message));
        // setLoading(false);
        console.log("error al subir archivo", err);
        return;
      }
    }

    await putPublicacion(idPublicacion, tipoPublicacion, publicacion)
      .then((res) => {
        //console.log('res', res);

        const index = rows.findIndex((element) => {
          return element.id === idPublicacion;
        });

        rows[index] = res;

        setTableRows(rows);

        //setLoading(false);

        // dispatch(setToastMessage('Publicación modificada con éxito', 'success'));
        console.log("con éxito");

        clearState();
        onUpdate();
      })
      .catch((e) => {
        // dispatch(setToastMessage(e.message));
        //setLoading(false);
        console.log("e.message", e.message);
      });
  };

  return (
    <div style={{ overflow: "auto" , height: 600 }}>
      <TextEditor />
      <Filtros />
      <FileAttacher
        idPublicacion={idPublicacion}
        isRemote={true}
        tipoPublicacion={tipoPublicacion}
      />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleButtonUpdate}
        >
          Actualizar
        </Button>
      </div>
    </div>
  );
};
