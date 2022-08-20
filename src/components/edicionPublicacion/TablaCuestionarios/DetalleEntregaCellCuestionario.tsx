import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { CuestionarioEntregas } from "./CuestionarioEntregas";

interface Props {
  cuestionariosEntrega: any;
}

const useStyles = makeStyles((theme) => ({
  detalle: {
    color: "blue",
    "&:hover": { cursor: "pointer" },
  },
  paper: {
    position: "absolute",
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 0,
  },
}));

export const DetalleEntregaCellCuestionarioAplicacion: React.FC<Props> = ({
  cuestionariosEntrega,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <span className={classes.detalle} onClick={() => setOpen(true)}>
        {cuestionariosEntrega.length}
      </span>

      <Modal
        style={{
          outline: 0,
          border: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={{ outline: 0 }} className={classes.paper}>
          <CuestionarioEntregas
            cuestionariosEntrega={cuestionariosEntrega}
          />
        </div>
      </Modal>
    </div>
  );
};
