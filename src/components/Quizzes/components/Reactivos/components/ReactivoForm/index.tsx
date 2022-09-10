import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Switch,
  TextField,
} from "@material-ui/core";
import React from "react";

import { useReactivosContext } from "../../context/ReactivosContext";
import { useReactivos } from "../../hooks/useReactivos";
import { useReactivoForm } from "./useReactivoForm";
import { TablaOpcionMultiple } from "./TablaOpcionMultiple";
import {
  EstatusReactivo,
  IReactivo,
} from "../../../../interfaces/reactivo.interface";
import { Alert } from "@material-ui/lab";

interface Props {
  onSubmit: (data: IReactivo) => void;
}

export const ReactivoForm: React.FC<Props> = ({ onSubmit }) => {
  const { handleClose } = useReactivos();
  const {
    openModal,
    reactivoRef,
    categoria,
    descripcionOpcion,
    dificultad,
    esOpcionCorrecta,
    esPrivado,
    estatusReactivo,
    margenValorNumerico,
    materia,
    mostrarPista,
    opcionesMultiple,
    opcionFalsoVerdadero,
    pista,
    pregunta,
    puntoOpcion,
    puntos,
    setCategoria,
    setDescripcionOpcion,
    setDificultad,
    setEsOpcionCorrecta,
    setEsPrivado,
    setEstatusReactivo,
    setMargenValorNumerico,
    setMateria,
    setMostrarPista,
    setPista,
    setPregunta,
    setPuntos,
    setPuntosOpcion,
    setSimilitudValorTextual,
    setTiempoMaximoRespuesta,
    setTipoReactivo,
    setValorNumericoCorrecto,
    setValorTextualCorrecto,
    similitudValorTextual,
    tiempoMaximoRespuesta,
    tipoReactivo,
    valorNumericoCorrecto,
    valorTextualCorrecto,
    errorMessage,
    errorOpcionMultipleMessage,
  } = useReactivosContext();
  const {
    handleAddOpcionMultiple,
    handleChangeOpcionFalsoVerdadero,
    handleDeleteOpcionMultiple,
    handleSubmit,
  } = useReactivoForm();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: 50,
        marginBottom: 50,
      }}
    >
      <Card style={{ width: 600 }}>
        <CardHeader
          title={reactivoRef.current ? "Edición reactivo" : "Nuevo reactivo"}
        />
        <Divider />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputLabel>Pregunta</InputLabel>
              <TextField
                value={pregunta}
                onChange={(e) => setPregunta(e.target.value)}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel>Tipo Reactivo</InputLabel>

              <Select
                value={tipoReactivo}
                variant="outlined"
                fullWidth
                onChange={(e: any) => setTipoReactivo(e.target.value)}
              >
                <MenuItem value="OPCION_MULTIPLE">Opción Multiple</MenuItem>
                <MenuItem value="FALSO_VERDADERO">Falso/Verdadero</MenuItem>
                <MenuItem value="VALOR_TEXTUAL">Valor Textual</MenuItem>
                <MenuItem value="VALOR_NUMERICO">Valor Numérico</MenuItem>
                <MenuItem value="ENSAYO">Ensayo</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6}>
              <InputLabel>Puntos</InputLabel>
              <TextField
                type="number"
                variant="outlined"
                fullWidth
                value={puntos}
                onChange={(e) => setPuntos(+e.target.value)}
              />
            </Grid>

            {tipoReactivo === "VALOR_TEXTUAL" && (
              <>
                <Grid item xs={8}>
                  <InputLabel>Valor textual correcto</InputLabel>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={valorTextualCorrecto}
                    onChange={(e) => {
                      setValorTextualCorrecto(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <InputLabel>Similitud valor textual</InputLabel>
                  <TextField
                    fullWidth
                    type="number"
                    variant="outlined"
                    value={similitudValorTextual}
                    onChange={(e) => setSimilitudValorTextual(+e.target.value)}
                  />
                </Grid>
              </>
            )}

            {tipoReactivo === "FALSO_VERDADERO" && (
              <>
                <Grid item xs={12}>
                  <RadioGroup
                    onChange={(e, value: any) => {
                      handleChangeOpcionFalsoVerdadero(value);
                    }}
                    value={opcionFalsoVerdadero}
                  >
                    <FormControlLabel
                      value="Verdadero"
                      control={<Radio />}
                      label="Es verdadero"
                    />
                    <FormControlLabel
                      value="Falso"
                      control={<Radio />}
                      label="Es falso"
                    />
                  </RadioGroup>
                </Grid>
                {/* <Grid>{JSON.stringify(opcionesVerdaderoFalso, null, 2)}</Grid> */}
              </>
            )}

            {tipoReactivo === "OPCION_MULTIPLE" && (
              <>
                <Grid item xs={12}>
                  <InputLabel>Descripción opción</InputLabel>

                  <TextField
                    fullWidth
                    variant="outlined"
                    value={descripcionOpcion}
                    onChange={(e) => {
                      setDescripcionOpcion(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>Puntos opción</InputLabel>
                  <TextField
                    fullWidth
                    type="number"
                    variant="outlined"
                    value={puntoOpcion}
                    onChange={(e) => {
                      setPuntosOpcion(+e.target.value);
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={3}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={esOpcionCorrecta}
                        onChange={(e, checked) => {
                          setEsOpcionCorrecta(checked);
                        }}
                      />
                    }
                    label="Es correcta"
                  />
                </Grid>
                <Grid
                  item
                  xs={3}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button fullWidth onClick={handleAddOpcionMultiple}>
                    Agregar
                  </Button>
                </Grid>
                {errorOpcionMultipleMessage && (
                  <Alert style={{ width: "100%" }} severity="warning">
                    {errorOpcionMultipleMessage}
                  </Alert>
                )}
                <Grid item xs={12}>
                  <TablaOpcionMultiple
                    opcionesMultiple={opcionesMultiple}
                    onDelete={handleDeleteOpcionMultiple}
                  />
                </Grid>
              </>
            )}

            {tipoReactivo === "VALOR_NUMERICO" && (
              <>
                <Grid item xs={6}>
                  <InputLabel>Valor numérico correcto</InputLabel>
                  <TextField
                    variant="outlined"
                    fullWidth
                    type="number"
                    value={valorNumericoCorrecto}
                    onChange={(e) => setValorNumericoCorrecto(+e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>Margen valor numérico</InputLabel>
                  <TextField
                    type="number"
                    variant="outlined"
                    fullWidth
                    value={margenValorNumerico}
                    onChange={(e) => setMargenValorNumerico(+e.target.value)}
                  />
                </Grid>
              </>
            )}

            <Grid item xs={12}>
              <InputLabel>Categoria</InputLabel>
              <TextField
                variant="outlined"
                fullWidth
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              />
            </Grid>

            <Grid item xs={8}>
              <InputLabel>Materia</InputLabel>
              <TextField
                variant="outlined"
                fullWidth
                value={materia}
                onChange={(e) => setMateria(e.target.value)}
              />
            </Grid>

            <Grid item xs={4}>
              <InputLabel>Nivel de dificultad</InputLabel>
              <Select
                value={dificultad}
                onChange={(e) => setDificultad(e.target.value as any)}
                variant="outlined"
                fullWidth
              >
                <MenuItem value="BAJA">Baja</MenuItem>
                <MenuItem value="MEDIA">Media</MenuItem>
                <MenuItem value="ALTA">Alta</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6}>
              <InputLabel>Estatus</InputLabel>
              <Select
                value={estatusReactivo}
                variant="outlined"
                fullWidth
                onChange={(e) =>
                  setEstatusReactivo(e.target.value as EstatusReactivo)
                }
              >
                <MenuItem value="ACTIVO">Activo</MenuItem>
                <MenuItem value="ELIMINADO">Eliminado</MenuItem>
                <MenuItem value="CANCELADO">Cancelado</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={3}>
              <InputLabel>Privado</InputLabel>
              <Switch
                checked={esPrivado}
                color="primary"
                onChange={(e, checked) => setEsPrivado(checked)}
              />
            </Grid>

            <Grid item xs={3}>
              <InputLabel>Mostrar pista</InputLabel>
              <Switch
                checked={mostrarPista}
                onChange={(e, checked) => setMostrarPista(checked)}
                color="primary"
              />
            </Grid>
            <Grid item xs={8}>
              <InputLabel>Pista</InputLabel>
              <TextField
                value={pista}
                onChange={(e) => setPista(e.target.value)}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <InputLabel>Tiempo de respuesta</InputLabel>
              <TextField
                type="number"
                value={tiempoMaximoRespuesta}
                onChange={(e) => setTiempoMaximoRespuesta(+e.target.value)}
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
        </CardContent>
        {errorMessage && (
          <Alert style={{ width: "100%" }} severity="warning">
            {errorMessage}
          </Alert>
        )}

        <Divider />
        <CardActions>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 10,
              width: "100%",
            }}
          >
            <Button
              size="small"
              variant="contained"
              color="secondary"
              onClick={handleClose}
            >
              Cerrar
            </Button>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => {
                handleSubmit(onSubmit);
              }}
            >
              Aceptar
            </Button>
          </div>
        </CardActions>
      </Card>
    </div>
  );
};
