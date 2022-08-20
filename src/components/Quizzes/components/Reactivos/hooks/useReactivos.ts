import { IReactivo } from "../../../interfaces/reactivo.interface";
import { useReactivoForm } from "../components/ReactivoForm/useReactivoForm";
import { useReactivosContext } from "../context/ReactivosContext";
import { useReactivosSWR } from "./useReactivosSWR";

export const useReactivos = () => {
  const { createReactivosSWR, updateReactivoSWR } = useReactivosSWR();

  const { setOpenModal, reactivoRef } = useReactivosContext();
  const { loadDefaultValues, resetReactivoForm } = useReactivoForm();
  const handleClose = () => {
    setOpenModal(false);
  };

  const showNewReactivo = () => {
    reactivoRef.current = undefined;
    setOpenModal(true);
    resetReactivoForm();
  };

  const showEditReactivo = (reactivo: IReactivo) => {
    reactivoRef.current = reactivo;
    setOpenModal(true);
    loadDefaultValues();
  };

  const createReactivo = async (reactivo: IReactivo) => {
    try {
      handleClose();
      createReactivosSWR(reactivo);
    } catch (error: any) {
      console.log("error", error.response.data);
    }
  };

  const updateReactivo = async (reactivo: IReactivo) => {
    try {
      handleClose();
      updateReactivoSWR(reactivo);
    } catch (error: any) {
      console.log("error", error.response.data);
    }
  };

  return {
    showEditReactivo,
    showNewReactivo,
    handleClose,
    createReactivo,
    updateReactivo,
  };
};
