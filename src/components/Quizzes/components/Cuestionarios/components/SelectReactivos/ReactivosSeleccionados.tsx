import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";
import { IReactivo } from "../../../../interfaces/reactivo.interface";
import { useCuestionariosContext } from "../../context/CuestionariosContext";

export const ReactivosSeleccionados = () => {
  const { setSelectedReactivos, selectedReactivos } = useCuestionariosContext();

  const handleCheckFijo = (reactivo: IReactivo, checked: boolean) => {
    const newSelectedReactivos = selectedReactivos.map((r) => {
      if (r.id === reactivo.id) {
        r.fijo = checked;
      }
      return r;
    });
    setSelectedReactivos(newSelectedReactivos);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontSize: 10 }}>Pregunta</TableCell>
              <TableCell style={{ fontSize: 10 }}>Categoria</TableCell>
              <TableCell style={{ fontSize: 10 }}>Materia</TableCell>
              <TableCell style={{ fontSize: 10 }}>Puntos</TableCell>
              <TableCell style={{ fontSize: 10 }}>Fijo</TableCell>
              <TableCell style={{ fontSize: 10 }}>Quitar </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedReactivos.map((reactivo) => {
              return (
                <TableRow key={reactivo.id}>
                  <TableCell style={{ minWidth: 150, fontSize: 12 }}>
                    <span style={{ fontWeight: "bold" }}>
                      {reactivo.pregunta}
                    </span>
                    <br />
                    <span style={{ fontSize: 10 }}>
                      {reactivo.tipoReactivo}
                    </span>
                  </TableCell>
                  <TableCell style={{ fontSize: 10 }}>
                    {reactivo.categoria}
                  </TableCell>
                  <TableCell style={{ fontSize: 10 }}>
                    {reactivo.materia}
                  </TableCell>
                  <TableCell>{reactivo.puntos}</TableCell>
                  <TableCell>
                    <input
                      type={"checkbox"}
                      checked={reactivo.fijo}
                      onClick={(e: any) => {
                        handleCheckFijo(reactivo, e.target.checked);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => {
                        setSelectedReactivos(
                          selectedReactivos.filter((r) => r.id !== reactivo.id)
                        );
                      }}
                    >
                      Quitar
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
