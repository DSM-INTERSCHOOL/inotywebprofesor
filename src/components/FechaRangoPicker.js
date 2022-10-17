import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export const FechaRangoPicker = ({
  fechaInicial,
  fechaFinal,
  onChangeFechaInicial,
  onChangeFechaFinal,
}) => {
  const classes = useStyles();
  return (
    <div>
      <form className={classes.container} noValidate>
        <div>
          <h4>Fecha Inicial</h4>
          <TextField
            id="fechaInicial"
            type="datetime-local"
            value={fechaInicial}
            defaultValue={fechaInicial}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onChangeFechaInicial}
          />
        </div>
        <div>
          <h4>Fecha Final</h4>

          <TextField
            id="fechaFinal"
            type="datetime-local"
            value={fechaFinal}
            defaultValue={fechaFinal}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onChangeFechaFinal}
          />
        </div>
      </form>
    </div>
  );
};
