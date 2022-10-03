import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";

import { getQueryMateriasBy } from "../utils/getQueryMateriasByInscripcion";
import { useQuery } from "react-apollo";
import { useDispatch, useSelector } from "react-redux";
import {
  setGrados,
  setModalidades,
  setNiveles,
} from "../store/actions/publicacionActions";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const SelectMateriasByInscripcion = ({
  idMateria,
  ciclos,
  niveles,
  modalidades,
  grados,
  grupos,
  onChangeMateria,
}) => {
  const classes = useStyles();

  const idGrupo = useSelector((state) => state.publicaciones.idGrupo);

  const {
    query: queryMateria,
    vars: varsMateria,
    metodo: metodoMateria,
  } = getQueryMateriasBy({
    ciclos,
    niveles,
    modalidades,
    grados,
    grupos,
    idGrupo,
  });

  const dispatch = useDispatch();

  const { loading, error, data } = useQuery(queryMateria, {
    variables: varsMateria,
  });

  React.useEffect(() => {
    let materias = data?.[metodoMateria];
    if (!materias || idMateria === "") return;

    // let newNiveles = materias
    //   .filter((e) => e.idMateria === idMateria)
    //   .map((e) => e.idNivel);
    let newModalidades = materias
      .filter((e) => e.idMateria === idMateria)
      .map((e) => e.idModalidad);
    let newGrados = materias
      .filter((e) => e.idMateria === idMateria)
      .map((e) => e.idGrado);
    // dispatch(setNiveles(newNiveles));
    dispatch(setModalidades(newModalidades));
    dispatch(setGrados(newGrados));
  }, [idMateria]);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log("error", error);
    return <p>Error :(</p>;
  }

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel shrink htmlFor="age-native-label-placeholder">
          Materia
        </InputLabel>
        {/* <pre>{JSON.stringify(data[metodoMateria], null, 2)}</pre> */}

        <NativeSelect
          value={idMateria}
          onChange={onChangeMateria}
          inputProps={{
            name: "idMateria",
            id: "materia-native-label-placeholder",
          }}
        >
          <option value={""}>Seleccione</option>
          {data[metodoMateria].map(({ idMateria, descripcion }) => (
            <option key={idMateria} value={idMateria}>
              {idMateria + ":" + descripcion}
            </option>
          ))}
        </NativeSelect>
        <FormHelperText />
      </FormControl>
    </div>
  );
};
