import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import { useQuery } from "@apollo/react-hooks";
// import { MATERIAS_BY_PROFESOR_AND_CICLO } from '../constants/graphql_queries/materias_by_profesor_and_ciclo';
import { MATERIAS_BY_PROFESOR_AND_CICLO_AND_MATERIA } from "../constants/graphql_queries/materias_by_profesor_and_ciclo_and_materia";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const SelectGruposByProfesorAndMateria = ({
  idProfesor,
  idCiclo,
  idMateria,
  idGrupo,
  onChangeGrupo,
}) => {
  const classes = useStyles();

  const { loading, error, data } = useQuery(
    MATERIAS_BY_PROFESOR_AND_CICLO_AND_MATERIA,
    {
      variables: {
        idProfesor: idProfesor,
        idCiclo: idCiclo,
        idMateria: idMateria,
      },
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel shrink htmlFor="age-native-label-placeholder">
          Grupo
        </InputLabel>
        <NativeSelect
          value={idGrupo}
          onChange={onChangeGrupo}
          inputProps={{
            name: "idGrupo",
            id: "grupo-native-label-placeholder",
          }}
        >
          <option value={""}>Todos</option>

          {data.materiasByIdCicloAndIdProfesorAndIdMateria
            .filter((el) => {
              return el.idMateria === idMateria;
            })
            .reduce(function (acc, curr) {
              if (
                acc.length === 0 ||
                !acc.some((el) => el.idGrupo === curr.idGrupo)
              ) {
                acc.push(curr);
              }
              return acc;
            }, [])
            .sort(function (a, b) {
              var nameA = a.idGrupo.toUpperCase(); // ignore upper and lowercase
              var nameB = b.idGrupo.toUpperCase(); // ignore upper and lowercase
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }

              // names must be equal
              return 0;
            })
            .map(({ idGrupo }) => (
              <option key={idGrupo} value={idGrupo}>
                {idGrupo}
              </option>
            ))}
        </NativeSelect>
        <FormHelperText />
      </FormControl>
    </div>
  );
};
