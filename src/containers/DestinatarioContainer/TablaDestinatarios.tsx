import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

interface IDestinatario {
  id: string;
  nombreCompleto: string;
  tipo: string;
  _selected: boolean;
}

interface Props {
  destinatarios: IDestinatario[];
  onSelectDestinatario: (checked: boolean, id: string) => void;
  onSelectAll: (checked: boolean) => void;
}

export const TablaDestinatarios: React.FC<Props> = ({
  destinatarios,
  onSelectDestinatario,
  onSelectAll,
}) => {
  return (
    <>
      <TableContainer component={Paper} style={{maxHeight:600}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <input
                  type={"checkbox"}
                  defaultChecked={true}
                  onChange={(e: any) => {
                    onSelectAll(e.target.checked);
                  }}
                />
                Seleccionar
              </TableCell>
              <TableCell align="left">Id</TableCell>
              <TableCell align="left">Nombre completo</TableCell>
              <TableCell align="left">Tipo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ height: 400, overflow: "auto" }}>
            {destinatarios.map(({ id, nombreCompleto, _selected, tipo }) => (
              <TableRow key={id}>
                <TableCell component="th" scope="row">
                  <input
                    type={"checkbox"}
                    defaultChecked={_selected}
                    checked={_selected}
                    onChange={(e: any) => {
                      onSelectDestinatario(e.target.checked, id);
                    }}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {id}
                </TableCell>
                <TableCell>{nombreCompleto}</TableCell>
                <TableCell>{tipo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
