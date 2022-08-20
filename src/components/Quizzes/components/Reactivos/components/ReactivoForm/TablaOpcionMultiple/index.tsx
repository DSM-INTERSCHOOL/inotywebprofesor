import {
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { IOpcionMultiple } from "../../../../../interfaces/reactivo.interface";

interface Props {
  opcionesMultiple: IOpcionMultiple[];
  onDelete : (om: IOpcionMultiple) => void
}

export const TablaOpcionMultiple: React.FC<Props> = ({ opcionesMultiple, onDelete }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Descripcion Opción</TableCell>
            <TableCell>Punto</TableCell>
            <TableCell>Es correcta</TableCell>
            <TableCell>Eliminar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {opcionesMultiple.map((om) => (
            <TableRow key={om.opcion}>
              <TableCell component="th" scope="row">
                {om.opcion}
              </TableCell>
              <TableCell>{om.puntos}</TableCell>
              <TableCell>{<Checkbox checked={om.esCorrecto}  />}</TableCell>
              <TableCell>
                <IconButton onClick={() => onDelete(om)}>
                  <DeleteOutlineIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
