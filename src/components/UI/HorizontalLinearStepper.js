import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { DestinatariosContainer } from "../../containers/DestinatarioContainer";
import { TipoPublicacionContainer } from "../../containers/TipoPublicacionContainer";
import { TextEditor } from "../TextEditor";
import { FileAttacher } from "./FileAttacher";
import { TipoDestinatarioContainer } from "../../containers/TipoDestinatarioContainer";
import {
  postPublicacion,
  uploadAttachmentsPublicacion,
} from "../../services/publicaciones";
import { useDispatch, useSelector } from "react-redux";
import { Filtros } from "./Filtros";
import { resetPublicacionState } from "../../store/actions/publicacionActions";
import { setToastMessage } from "../../store/actions/toastMessageActions";

import { setDestinatarios } from "../../store/actions/publicacionActions";

import { uploadFiles } from "../../services/uploads";
import { CircularProgress } from "@material-ui/core";
import { getUserLocalStorage } from "../../utils/getUserLocalStorage";
import { CustomTextEditor } from "./CustomTextEditor";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    "Tipo Publicación",
    "Tipo Destinatarios",
    "Selección Destinatarios",
    "Redacción",
    "Vigencia & Filtros",
    "Archivos Adjuntos",
  ];
}

export const HorizontalLinearStepper = ({ tipoUsuario }) => {
  const dispatch = useDispatch();
  const tipoDestinatario = useSelector(
    (state) => state.publicaciones.tipoDestinatario
  );
  const tipoPublicacion = useSelector(
    (state) => state.publicaciones.tipoPublicacion
  );
  const destinatarios = useSelector(
    (state) => state.publicaciones.destinatarios
  );
  const contenido = useSelector((state) => state.publicaciones.contenido);
  const filtros = useSelector((state) => state.publicaciones.filtros);
  const fileArray = useSelector((state) => state.publicaciones.fileArray);

  const ciclos = useSelector((state) => state.publicaciones.ciclos);
  const niveles = useSelector((state) => state.publicaciones.niveles);
  const modalidades = useSelector((state) => state.publicaciones.modalidades);
  const grados = useSelector((state) => state.publicaciones.grados);
  const grupos = useSelector((state) => state.publicaciones.grupos);
  const calificacionOptions = useSelector(
    (state) => state.publicaciones.calificacionOptions
  );

  const idMateria = useSelector((state) => state.publicaciones.idMateria);
  const descripcionMateria = useSelector(
    (state) => state.publicaciones.descripcionMateria
  );

  const [errorMessage, setErrorMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();
  const storage = getUserLocalStorage();

  const { prefijo } = getUserLocalStorage();

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <TipoPublicacionContainer
            setErrorMessage={setErrorMessage}
            tipoUsuario={tipoUsuario}
          />
        );
      case 1:
        return <TipoDestinatarioContainer tipoUsuario={tipoUsuario} />;
      case 2:
        return (
          <DestinatariosContainer
            //CELTA_DSM
            idUsuario={storage.idUsuario}
            tipoUsuario={tipoUsuario}
            tipoPublicacion={tipoPublicacion}
          />
        );
      case 3:
        return <TextEditor />;
      case 4:
        return <Filtros />;
      case 5:
        return <FileAttacher isRemote={false} />;
      default:
        return "Unknown step";
    }
  }

  const isStepOptional = (step) => {
    return false;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  function getListaDestinatariosPublicacion(prefijo, dest) {
    return new Promise(function (resolve, reject) {
      try {
        const listaDestinatarios = dest
          .filter((d) => d._selected)
          .map((e) => {
            const destinatario = {
              idUsuario: prefijo + "_" + e.id,
            };

            return destinatario;
          });

        resolve(listaDestinatarios);
      } catch (err) {
        reject(err);
      }
    });
  }

  const handleNext = async () => {
    try {
      setErrorMessage("");

      if (activeStep === 0 && tipoPublicacion === "") {
        dispatch(setToastMessage("El tipo de Publicación no puede ser vacio"));
      } else if (activeStep === 1 && tipoDestinatario === "") {
        dispatch(setToastMessage("El tipo de Destinatario no puede ser vacio"));
      } else if (activeStep === 2 && destinatarios.length === 0) {
        dispatch(setToastMessage("No existen destinatarios"));
      } else if (activeStep === 3 && contenido.tituloPublicacion === "") {
        dispatch(
          setToastMessage("El Título de la Publicación no puede ser vacio")
        );
      } else if (activeStep === 3 && contenido.cuerpoPublicacion === "") {
        dispatch(
          setToastMessage("El Cuerpo de la Publicación no puede ser vacio")
        );
      } else if (
        activeStep === 5 &&
        (filtros.fechaInicialPublicacion === "" ||
          filtros.fechaFinalPublicacion === "")
      ) {
        dispatch(
          setToastMessage(
            "La fecha Inicial/Final de la Publicación no pueden ser vacias"
          )
        );
      } else {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
          newSkipped = new Set(newSkipped.values());
          newSkipped.delete(activeStep);
        }

        setSkipped(newSkipped);

        if (activeStep === 1 && destinatarios.length > 0) {
          dispatch(setDestinatarios([]));
        }

        if (activeStep === steps.length - 1) {
          setLoading(true);

          const destinatariosPublicacion =
            await getListaDestinatariosPublicacion(prefijo, destinatarios);

          console.log(
            "destinatariosPublicacion",
            destinatariosPublicacion
          );


          let publicacion = {
            contenido: {
              ...calificacionOptions,
              autorizado: filtros.autorizado,
              aceptaComentarios: filtros.aceptaComentarios,
              tipoVisibilidadComentarios: "GRUPAL",
              titulo: contenido.titulo,
              type: tipoPublicacion.substring(0, tipoPublicacion.length - 1),
              tipoContenido: "Multipart",
              cuerpoContenido: contenido.cuerpo,
              fechaInicialPublicacion: filtros.fechaInicialPublicacion,
              fechaFinalPublicacion: filtros.fechaFinalPublicacion,
              vistas: 0,
              comentarios: 0,
              likes: 0,
              destinatarios: destinatariosPublicacion,
              cuerpos: [],
              adjuntos: [],
              alcance: {
                ciclos: ciclos,
                niveles: niveles,
                modalidades: modalidades,
                grados: grados,
                grupos: grupos,
              },
            },
          };

          if (tipoPublicacion === "eventos") {
            publicacion.contenido.fechaHoraEvento = filtros.fechaHoraEvento;
            publicacion.contenido.lugarEvento = filtros.lugarEvento;
          }

          if (tipoPublicacion === "tareas") {
            publicacion.contenido.fechaHoraEntrega = filtros.fechaHoraEntrega;

            publicacion.contenido.idMateria = idMateria;
            publicacion.contenido.nombreMateria = descripcionMateria;
          }

          if (fileArray.length > 0) {
            try {
              const uploadedFiles = await uploadFiles(fileArray);

              publicacion.contenido.adjuntos = uploadedFiles;
            } catch (err) {
              dispatch(setToastMessage(err.message));
              setLoading(false);
              return;
            }
          }

          console.log("publicacion", publicacion);

          postPublicacion(tipoPublicacion, publicacion)
            .then((res) => {
              setLoading(false);
              dispatch(setToastMessage("Publicación enviada", "success"));
              setActiveStep((prevActiveStep) => prevActiveStep + 1);
              clearState();
            })
            .catch((e) => {
              dispatch(setToastMessage(e.message));
              setLoading(false);
            });
        } else {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
    clearState();
  };

  const uploadAttachments = async (
    idAccount,
    headers,
    tipoPublicacion,
    idPublicacion
  ) => {
    try {
      await Promise.all(
        fileArray.map(async (file) => {
          try {
            let formData = new FormData();

            formData.append("attachment", file);
            formData.append("archivoEtiqueta", file.name);
            await uploadAttachmentsPublicacion(
              idAccount,
              headers,
              tipoPublicacion,
              idPublicacion,
              formData
            );
          } catch (err) {
            throw new Error(err);
          }
        })
      );
    } catch (err) {
      throw new Error(err);
    }
  };

  function clearState() {
    dispatch(resetPublicacionState());
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {loading && <CircularProgress />}
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              ¡Publicación Enviada!
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Nueva Publicación
            </Button>
          </div>
        ) : (
          <div>
            <p>{errorMessage}</p>
            {getStepContent(activeStep)}
            <div>
              <Button onClick={handleReset} className={classes.button}>
                Limpiar
              </Button>

              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Atrás
              </Button>
              {isStepOptional(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Saltar
                </Button>
              )}

              <Button
                variant="contained"
                color="primary"
                disabled={loading}
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? "Enviar" : "Siguiente"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
