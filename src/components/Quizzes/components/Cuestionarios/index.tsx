import { Button, Card, CardActions, CardContent } from "@material-ui/core";
import React, { useState } from "react";
import { IReactivo } from "../../interfaces/reactivo.interface";
import { Layout } from "../../layout";
import { CuestionarioForm } from "./components/CuestionarioForm";
import { CuestionarioSteps } from "./components/CuestionarioSteps";
import { SelectReactivos } from "./components/SelectReactivos";
import { VerificaInformacion } from "./components/VerificaInformacion";
import { useCuestionariosContext } from "./context/CuestionariosContext";
import toast from "react-hot-toast";
import { useCuestionarios } from "./hooks/useCuestionarios";
import { SelectDestinatarios } from "./components/SelectDestinatarios";

export const Cuestionarios = () => {
  const { setSelectedReactivos, selectedReactivos, activeStep, setActiveStep } =
    useCuestionariosContext();

  const {
    handleDetallesCuestionarios,
    handleSelectDestinatarios,
    handleSelectReactivos,
    onSelectReactivo,
    handleCreateCuestionario
  } = useCuestionarios();

 

  return (
    <Layout>
      <Card style={{ marginBottom: 70 }}>
        <CuestionarioSteps activeStep={activeStep} />
        <CardContent style={{ minHeight: 500, overflow: "auto" }}>
          {activeStep === 0 && <CuestionarioForm />}
          {activeStep === 1 && <SelectDestinatarios />}
          {activeStep === 2 && <SelectReactivos onChange={onSelectReactivo} />}
          {activeStep === 3 && <VerificaInformacion />}
        </CardContent>
        <CardActions
          style={{
            height: 80,
            display: "flex",
            justifyContent: "flex-end",
            gap: 20,
            alignItems: "center",
          }}
        >
          {activeStep > 0 && (
            <Button
              variant="contained"
              onClick={() => {
                setActiveStep(activeStep - 1);
              }}
            >
              Atras
            </Button>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              if (activeStep === 0) {
                handleDetallesCuestionarios();
                return;
              }

              if (activeStep === 1) {
                handleSelectDestinatarios();
              }

              if (activeStep === 2) {
                handleSelectReactivos();
              }

              if(activeStep === 3) {
                handleCreateCuestionario();
                return
              }
              // setActiveStep(activeStep + 1);
            }}
          >
            {activeStep === 3 ? "Finalizar" : "Siguiente"}
          </Button>
        </CardActions>
      </Card>
    </Layout>
  );
};
