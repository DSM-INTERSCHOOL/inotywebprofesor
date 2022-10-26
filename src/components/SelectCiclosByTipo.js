import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";

import { useQuery } from "@apollo/react-hooks";
import { CICLOS_BY_TIPO } from "../constants/graphql_queries/ciclos_by_tipo";
import { useDispatch, useSelector } from "react-redux";
import {
  setAlcance,
  setFilterListData,
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

export const SelectCiclosByTipo = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const filterListData = useSelector(
    (state) => state.publicaciones.filterListData
  );
  const alcance = useSelector((state) => state.publicaciones.alcance);

  const { loading, error, data } = useQuery(CICLOS_BY_TIPO, {
    variables: { tipo: props.tipo },
  });

  React.useEffect(() => {
    if (props.idCiclo === "") {
      dispatch(
        setAlcance({
          ciclos: [],
          niveles: [],
          modalidades: [],
          grados: [],
          grupos: [],
        })
      );
      return;
    }
    dispatch(
      setAlcance({
        ...alcance,
        ciclos: [props.idCiclo],
      })
    );
  }, [props.idCiclo]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
        <InputLabel>Ciclo</InputLabel>
        <Select
          variant="outlined"
          value={props.idCiclo}
          onChange={props.onChangeCiclo}
          fullWidth
        >
          <MenuItem value={""}>Seleccione</MenuItem>
          {data.ciclosByTipoCicloOrderByFechaInicioDesc.map(
            ({ idCiclo, descripcion }) => (
              <MenuItem key={idCiclo} value={idCiclo}>
                {idCiclo}
              </MenuItem>
            )
          )}
        </Select>
        <FormHelperText />
    </div>
  );
};
