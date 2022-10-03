import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import { useQuery } from "@apollo/react-hooks";
import { NIVELES_BY_USUARIO } from "../constants/graphql_queries/niveles_by_usuario";
import { useDispatch, useSelector } from "react-redux";
import { setAlcance, setNiveles } from "../store/actions/publicacionActions";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const SelectNivelesByIdUsuario = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { loading, error, data } = useQuery(NIVELES_BY_USUARIO, {
    variables: { idUsuario: props.idUsuario },
  });

  React.useEffect(() => {
    if (!data?.nivelesByIdUsuario) return;
    const niveles =
      props.idNivel === ""
        ? data.nivelesByIdUsuario.map((n) => n.idNivel)
        : [props.idNivel];
		console.log('niveles', niveles)
    dispatch(setNiveles(niveles));
  }, [props.idNivel, data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel shrink htmlFor="age-native-label-placeholder">
          Nivel
        </InputLabel>
        <NativeSelect
          value={props.idNivel}
          onChange={(e) => {
            props.onChangeNivel(e, data.nivelesByIdUsuario)
          }}
          inputProps={{
            name: "idNivel",
            id: "nivel-native-label-placeholder",
          }}
        >
          <option value={""}>Todos</option>

          {data.nivelesByIdUsuario.map(({ idNivel, descripcion }) => (
            <option key={idNivel} value={idNivel}>
              {idNivel + "  -  " + descripcion}
            </option>
          ))}
        </NativeSelect>
        <FormHelperText />
      </FormControl>
    </div>
  );
};
