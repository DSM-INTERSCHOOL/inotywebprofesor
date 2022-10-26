import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import { useQuery } from "@apollo/react-hooks";
import { GRADOS_BY_MODALIDAD } from "../constants/graphql_queries/grados_by_modalidad";
import { setGrados } from "../store/actions/publicacionActions";
import { useDispatch } from "react-redux";
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

export const SelectGradosByModalidad = ({
  idModalidad,
  idGrado,
  onChangeGrado,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { loading, error, data } = useQuery(GRADOS_BY_MODALIDAD, {
    variables: { idModalidadCarrera: idModalidad },
  });

  React.useEffect(() => {
    if (!data?.gradosByIdModalidadCarrera) return;
    const grados =
      idGrado === ""
        ? data.gradosByIdModalidadCarrera.map((m) => m.idGrado)
        : [idGrado];
    dispatch(setGrados(grados));
  }, [idGrado, data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <InputLabel>Grado</InputLabel>
      <Select
        fullWidth
        variant="outlined"
        value={idGrado}
        onChange={onChangeGrado}
        inputProps={{
          name: "idGrado",
          id: "grado-native-label-placeholder",
        }}
      >
        <MenuItem value={""}>Todos</MenuItem>

        {data.gradosByIdModalidadCarrera.map(({ idGrado }) => (
          <MenuItem key={idGrado} value={idGrado}>
            {idGrado}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText />
    </div>
  );
};
