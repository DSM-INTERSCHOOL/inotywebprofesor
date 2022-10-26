import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import { useQuery } from "@apollo/react-hooks";
import { MODALIDADES_BY_NIVEL } from "../constants/graphql_queries/modalidades_by_nivel";
import { useDispatch, useSelector } from "react-redux";
import {
  setAlcance,
  setModalidades,
} from "../store/actions/publicacionActions";
import { MenuItem, Select } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const SelectModalidadesByNivel = ({
  idNivel,
  idModalidad,
  onChangeModalidad,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { loading, error, data } = useQuery(MODALIDADES_BY_NIVEL, {
    variables: { idNivel: idNivel },
  });

  React.useEffect(() => {
    if (!data?.modalidadCarrerasByIdNivel) return;
    const modalidades =
      idModalidad === ""
        ? data.modalidadCarrerasByIdNivel.map((m) => m.idModalidadCarrera)
        : [idModalidad];
    dispatch(setModalidades(modalidades));
  }, [idModalidad, data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <InputLabel>Modalidad/Carrera</InputLabel>
      <Select
        fullWidth
        variant="outlined"
        value={idModalidad}
        onChange={onChangeModalidad}
        inputProps={{
          name: "idModalidad",
          id: "modalidad-native-label-placeholder",
        }}
      >
        <MenuItem value={""}>Todos</MenuItem>

        {data.modalidadCarrerasByIdNivel.map(
          ({ idModalidadCarrera, descripcion }) => (
            <MenuItem key={idModalidadCarrera} value={idModalidadCarrera}>
              {idModalidadCarrera + "  -  " + descripcion}
            </MenuItem>
          )
        )}
      </Select>
      <FormHelperText />
    </div>
  );
};
