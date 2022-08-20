import { Container, Modal } from "@material-ui/core";
import React from "react";
import { useReactivosContext } from "./context/ReactivosContext";
import { useReactivos } from "./hooks/useReactivos";
import { ListReactivos } from "./components/ListReactivos";
import { ReactivoForm } from "./components/ReactivoForm";
import { Layout } from "../../layout";

export const ReactivosContent = () => {
  const { createReactivo, updateReactivo, handleClose } = useReactivos();
  const { reactivoRef, openModal } = useReactivosContext();
  return (
    <Layout>
      <ListReactivos />
      <Modal
        open={openModal}
        onClose={handleClose}
        style={{ overflow: "auto" }}
      >
        <ReactivoForm
          onSubmit={(data) => {
            if (!reactivoRef.current) {
              createReactivo(data);
            } else {
              updateReactivo(data);
            }
          }}
        />
      </Modal>
    </Layout>
  );
};
