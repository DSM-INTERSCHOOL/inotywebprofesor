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

interface Props {
  reactivos: IReactivo[];
}

export const ReactivosDisponibles: React.FC<Props> = ({ reactivos }) => {
  const { setSelectedReactivos, selectedReactivos, activeStep, setActiveStep } =
    useCuestionariosContext();

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontSize: 10 }}>Pregunta</TableCell>
            <TableCell style={{ fontSize: 10 }}>Categoria</TableCell>
            <TableCell style={{ fontSize: 10 }}>Materia</TableCell>
            <TableCell style={{ fontSize: 10 }}>Puntos</TableCell>
            <TableCell style={{ fontSize: 10 }}>Agregar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reactivos.map((reactivo) => {
            if (selectedReactivos.some((r) => r.id === reactivo.id)) {
              return null;
            }
            return (
              <TableRow key={reactivo.id}>
                <TableCell style={{ minWidth: 150, fontSize: 12 }}>
                  <span style={{ fontWeight: "bold" }}>
                    {reactivo.pregunta}
                  </span>
                  <br />
                  <span style={{ fontSize: 10 }}>{reactivo.tipoReactivo}</span>
                </TableCell>
                <TableCell style={{ fontSize: 10 }}>
                  {reactivo.categoria}
                </TableCell>
                <TableCell style={{ fontSize: 10 }}>
                  {reactivo.materia}
                </TableCell>
                <TableCell>{reactivo.puntos}</TableCell>
                <TableCell>
                  <button
                    onClick={() => {
                      reactivo.fijo = false;
                      setSelectedReactivos([...selectedReactivos, reactivo]);
                    }}
                  >
                    Agregar
                  </button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
