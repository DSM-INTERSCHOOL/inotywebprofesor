import React from "react";
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { setTipoPublicacion } from "../store/actions/publicacionActions";

export const TipoPublicacionContainer = ({
  setErrorMessage,
  tipoUsuario,
  context,
}) => {
  const dispatch = useDispatch();
  const tipoPublicacion = useSelector(
    (state) => state.publicaciones.tipoPublicacion
  );

  const handleTipoPublicacion = (e) => {
    dispatch(setTipoPublicacion(e.target.value));
    if (e.target.value !== "") {
      setErrorMessage("");
    }
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup
        aria-label="Tipo de Publicación"
        name="tipoPublicacion"
        value={tipoPublicacion}
        onChange={handleTipoPublicacion}
        row={true}
      >
		
        <FormControlLabel value="avisos" control={<Radio />} label="Aviso" />
        <FormControlLabel value="tareas" control={<Radio />} label="Tarea" />
        {tipoUsuario === "USUARIO" && context !== "meta" && (
          <FormControlLabel
            value="eventos"
            control={<Radio />}
            label="Evento"
          />
        )}
      </RadioGroup>
    </FormControl>
  );
};
