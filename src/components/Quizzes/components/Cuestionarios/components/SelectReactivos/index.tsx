import {
  Badge,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
} from "@material-ui/core";
import React from "react";
import { IReactivo } from "../../../../interfaces/reactivo.interface";
import { useReactivosContext } from "../../../Reactivos/context/ReactivosContext";
import { useReactivosSWR } from "../../../Reactivos/hooks/useReactivosSWR";
import { useCuestionariosContext } from "../../context/CuestionariosContext";
import { ReactivosDisponibles } from "./ReactivosDisponibles";
import { ReactivosSeleccionados } from "./ReactivosSeleccionados";

interface Props {
  onChange: (checked: boolean, reactivo: IReactivo) => void;
}

export const SelectReactivos: React.FC<Props> = ({ onChange }) => {
  const { listaReactivos, loadReactivosSWR } = useReactivosSWR();
  const { selectedReactivos, searchText, setSearchText } =
    useCuestionariosContext();

  React.useEffect(() => {
    if (!listaReactivos) {
      loadReactivosSWR();
    }
  }, []);

  if (!listaReactivos) return <p>loading...</p>;

  let listAvailableReactivos = listaReactivos.filter((r) =>
    r.pregunta.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        <input
          type={"search"}
          value={searchText}
          placeholder="Buscar reactivo"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Grid>

      <Grid item md={6}>
        <InputLabel style={{ marginBottom: 20 }}>
          Reactivos disponibles
        </InputLabel>

        <ReactivosDisponibles reactivos={listAvailableReactivos} />
      </Grid>
      <Grid item md={6}>
        <InputLabel style={{ marginBottom: 20 }}>
          Reactivos seleccioniados
          <Badge
            style={{ marginLeft: 15 }}
            badgeContent={selectedReactivos.length}
            color="secondary"
          />
        </InputLabel>

        <ReactivosSeleccionados />
      </Grid>
    </Grid>
  );
};
