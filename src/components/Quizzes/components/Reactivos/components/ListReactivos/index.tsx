import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";
import useSWR, { useSWRConfig } from "swr";
import { IReactivo } from "../../../../interfaces/reactivo.interface";

import { useReactivosContext } from "../../context/ReactivosContext";
import { useReactivos } from "../../hooks/useReactivos";
import { useReactivosSWR } from "../../hooks/useReactivosSWR";

export const ListReactivos = () => {
  const { showNewReactivo, showEditReactivo } = useReactivos();

  const { listaReactivos, error, loadReactivosSWR } = useReactivosSWR();
  React.useEffect(() => {
    if (!listaReactivos) {
      loadReactivosSWR();
    }
  }, []);

  if (error) return <p>error: {JSON.stringify(error, null, 2)}</p>;
  if (!listaReactivos) return <p>"loading..."</p>;

  return (
    <Card style={{ width: "100%" }}>
      <CardHeader
        title={"Reactivos"}
        action={
          <Button
            variant="outlined"
            color="primary"
            onClick={() => showNewReactivo()}
          >
            Nuevo
          </Button>
        }
      />
      <Divider />
      <CardContent>
        {error && <p>{error.message}</p>}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Pregunta</TableCell>
              <TableCell align="right">Categoria</TableCell>
              <TableCell align="right">tipo</TableCell>
              <TableCell align="right">Materia</TableCell>
              <TableCell align="right">puntos</TableCell>
              <TableCell align="right">Editar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listaReactivos.map((r) => (
              <TableRow key={r.id}>
                <TableCell component="th" scope="row">
                  {r.pregunta}
                </TableCell>
                <TableCell align="right">{r.categoria}</TableCell>
                <TableCell align="right">{r.tipoReactivo}</TableCell>
                <TableCell align="right">{r.materia}</TableCell>
                <TableCell align="right">{r.puntos}</TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => {
                      showEditReactivo(r);
                    }}
                  >
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
