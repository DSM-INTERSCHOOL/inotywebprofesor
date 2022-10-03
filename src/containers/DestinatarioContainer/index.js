import React, { useState, useEffect } from "react";
import { SelectNivelesByIdUsuario } from "../../components/SelectNivelesByUsuario";
import { SelectMateriasByProfesorAndCiclo } from "../../components/SelectMateriasByProfesorAndCiclo";
import { SelectModalidadesByNivel } from "../../components/SelectModalidadesByNivel";
import { SelectGradosByModalidad } from "../../components/SelectGradosByModalidad";
import { SelectGruposByModalidadAndGrado } from "../../components/SelectGruposByModalidadAndGrado";
import { SelectCiclosByTipo } from "../../components/SelectCiclosByTipo";
import { ListaDestinatarios } from "../../components/UI/ListaDestinatarios";
import { Button, Box, Grid } from "@material-ui/core";

import { getQueryAlumnosBy } from "../../utils/getQueryAlumnosBy";
import { getQueryParentescosBy } from "../../utils/getQueryParentescosBy";
import { getQueryProfesoresBy } from "../../utils/getQueryProfesoresBy";
import { getQueryUsuariosBy } from "../../utils/getQueryUsuariosByEstatus";
import { getQueryEnrollmentsBy } from "../../utils/getQueryEnrollmentsBy";

import { useLazyQuery } from "react-apollo";
import { useDispatch, useSelector } from "react-redux";

import {
  setIdCiclo,
  setIdNivel,
  setIdModalidad,
  setIdGrado,
  setIdGrupo,
  setCiclos,
  setModalidades,
  setNiveles,
  setGrados,
  setGrupos,
  setDestinatarios,
  setIdMateria,
  setIdProfesor,
  setMaterias,
  setDescripcionMateria,
  setCalificacionOptionsAction,
} from "../../store/actions/publicacionActions";
import { SelectTipoParentesco } from "../../components/SelectTipoParentesco";
import { sortByNombreCompleto } from "../../utils/sortArray";
import { SelectGruposByProfesorAndMateria } from "../../components/SelectGruposByProfesorAndMateria";
import { SelectMateriasByInscripcion } from "../../components/SelectMateriasByInscripcion";
import { SectionDescargarCalificacion } from "./SectionDescargarCalificacion";
import { TablaDestinatarios } from "./TablaDestinatarios";
import { closeToastMessage } from "../../store/actions/toastMessageActions";

export const DestinatariosContainer = ({
  idUsuario,
  tipoUsuario,
  tipoPublicacion,
}) => {
  const dispatch = useDispatch();

  const idCiclo = useSelector((state) => state.publicaciones.idCiclo);
  const idNivel = useSelector((state) => state.publicaciones.idNivel);
  const idModalidad = useSelector((state) => state.publicaciones.idModalidad);
  const idGrado = useSelector((state) => state.publicaciones.idGrado);
  const idGrupo = useSelector((state) => state.publicaciones.idGrupo);
  const idMateria = useSelector((state) => state.publicaciones.idMateria);
  const alcance = useSelector((state) => state.publicaciones.alcance);
  const filterListData = useSelector(
    (state) => state.publicaciones.filterListData
  );

  const descripcionMateria = useSelector(
    (state) => state.publicaciones.descripcionMateria
  );

  const calificacionOptions = useSelector(
    (state) => state.publicaciones.calificacionOptions
  );

  const idProfesor = useSelector((state) => state.publicaciones.idProfesor);

  const ciclos = useSelector((state) => state.publicaciones.ciclos);
  const niveles = useSelector((state) => state.publicaciones.niveles);
  const modalidades = useSelector((state) => state.publicaciones.modalidades);
  const grados = useSelector((state) => state.publicaciones.grados);
  const grupos = useSelector((state) => state.publicaciones.grupos);
  const materias = useSelector((state) => state.publicaciones.materias);

  const destinatarios = useSelector(
    (state) => state.publicaciones.destinatarios
  );

  const tipoDestinatario = useSelector(
    (state) => state.publicaciones.tipoDestinatario
  );

  const parentescos = useSelector(
    (state) => state.publicaciones.tipoParentescos
  );

  const [rows, setRows] = useState([]);

  const {
    query: queryAlumno,
    vars: varsAlumno,
    metodo: metodoAlumno,
  } = getQueryAlumnosBy({
    ciclos,
    niveles,
    modalidades,
    grados,
    grupos,
    idProfesor,
    materias,
    tipoUsuario,
    tipoPublicacion,
  });
  const [
    executeQueryAlumnos,
    { loading: loadingAlumno, error: errorAlumno, data: dataAlumno },
  ] = useLazyQuery(queryAlumno, {
    variables: varsAlumno,
    fetchPolicy: "no-cache",
  });

  const {
    query: queryParentesco,
    vars: varsParentesco,
    metodo: metodoParentesco,
  } = getQueryParentescosBy({
    idCiclo,
    idNivel,
    idModalidad,
    idGrado,
    idGrupo,
    tipos: parentescos.filter((p) => p.checked).map((p) => p.tipo),
    idProfesor,
    ciclos,
    grupos,
    materias,
    tipoUsuario,
    tipoPublicacion,
  });
  const [
    executeQueryParentescos,
    {
      loading: loadingParentesco,
      error: errorParentesco,
      data: dataParentesco,
    },
  ] = useLazyQuery(queryParentesco, {
    variables: varsParentesco,
    fetchPolicy: "no-cache",
  });

  const {
    query: queryProfesor,
    vars: varsProfesor,
    metodo: metodoProfesor,
  } = getQueryProfesoresBy({
    idCiclo,
    idNivel,
    idModalidad,
    idGrado,
    idGrupo,
  });
  const [
    executeQueryProfesores,
    { loading: loadingProfesor, error: errorProfesor, data: dataProfesor },
  ] = useLazyQuery(queryProfesor, {
    variables: varsProfesor,
    fetchPolicy: "no-cache",
  });

  const {
    query: queryUsuario,
    vars: varsUsuario,
    metodo: metodoUsuario,
  } = getQueryUsuariosBy({ estatus: "ACTIVO" });
  const [
    executeQueryUsuarios,
    { loading: loadingUsuario, error: errorUsuario, data: dataUsuario },
  ] = useLazyQuery(queryUsuario, {
    variables: varsUsuario,
    fetchPolicy: "no-cache",
  });

  const {
    query: queryEnrollment,
    vars: varsEnrollment,
    metodo: metodoEnrollment,
  } = getQueryEnrollmentsBy({
    idCiclo,
    idNivel,
    idModalidad,
    idGrado,
    idGrupo,
    idMateria,
    idProfesor,
  });
  // console.log('queryEnrollment', queryEnrollment)
  const [
    executeQueryEnrollments,
    {
      loading: loadingEnrollment,
      error: errorEnrollment,
      data: dataEnrollment,
    },
  ] = useLazyQuery(queryEnrollment, {
    variables: varsEnrollment,
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (tipoDestinatario === "ALUMNOS") {
      let listaAlumnos = [];
      let listaAcademicos = [];

      if (dataAlumno && dataAlumno[metodoAlumno]) {
        listaAlumnos = dataAlumno[metodoAlumno].map((p) => {
          return {
            id: p.idAlumno,
            nombreCompleto: p.nombreCompleto,
            tipo: "ALUMNO",
            _selected: true,
          };
        });
      }

      if (dataEnrollment && dataEnrollment[metodoEnrollment]) {
        listaAcademicos = dataEnrollment[metodoEnrollment].map((p) => {
          return {
            id: p.id,
            nombreCompleto: p.nombre,
            tipo: "ACADEMICO",
            idPersona: p.idPersona,
            _selected: true,
          };
        });
      }

      let listaConcatDestinatarios = [...listaAlumnos, ...listaAcademicos];

      setRows(listaConcatDestinatarios);
      dispatch(setDestinatarios(listaConcatDestinatarios));
    }

    if (tipoDestinatario === "FAMILIARES") {
      let listaFamiliares = [];
      let listaAcademicos = [];

      if (dataParentesco && dataParentesco[metodoParentesco]) {
        listaFamiliares = dataParentesco[metodoParentesco].map((p) => {
          return {
            id: p.familiar.idFamiliar,
            nombreCompleto: p.familiar.nombreCompleto,
            tipo: "FAMILIAR",
          };
        });
      }

      if (dataEnrollment && dataEnrollment[metodoEnrollment]) {
        listaAcademicos = dataEnrollment[metodoEnrollment].map((p) => {
          return {
            id: p.id,
            nombreCompleto: p.nombre,
            tipo: "ACADEMICO",
            idPersona: p.idPersona,
            _selected: true,
          };
        });
      }

      let listaConcatDestinatarios = [...listaFamiliares, ...listaAcademicos];

      setRows(listaConcatDestinatarios);
      dispatch(setDestinatarios(listaConcatDestinatarios));
    }

    if (tipoDestinatario === "PROFESORES") {
      if (dataProfesor && dataProfesor[metodoProfesor]) {
        let listaConcatDestinatarios = dataProfesor[metodoProfesor].map((p) => {
          return {
            id: p.idProfesor,
            nombreCompleto: p.nombreCompleto,
            tipo: "PROFESOR",
            _selected: true,
          };
        });

        setRows(listaConcatDestinatarios);
        dispatch(setDestinatarios(listaConcatDestinatarios));
      }
    }

    if (tipoDestinatario === "USUARIOS") {
      if (dataUsuario && dataUsuario[metodoUsuario]) {
        let listaConcatDestinatarios = dataUsuario[metodoUsuario].map((p) => {
          return {
            id: p.idUsuario,
            nombreCompleto: p.nombreCompleto,
            tipo: "PROFESOR",
            _selected: true,
          };
        });
        setRows(listaConcatDestinatarios);
        dispatch(setDestinatarios(listaConcatDestinatarios));
      }
    }

    if (tipoDestinatario === "ALUMNOS & FAMILIARES") {
      let listaAlumnos = [];
      let listaFamiliares = [];
      let listaAcademicos = [];

      if (dataAlumno && dataAlumno[metodoAlumno]) {
        listaAlumnos = dataAlumno[metodoAlumno].map((p) => {
          return {
            id: p.idAlumno,
            nombreCompleto: p.nombreCompleto,
            tipo: "ALUMNO",
            idPersona: p.idPersona,
          };
        });
      }

      if (dataEnrollment && dataEnrollment[metodoEnrollment]) {
        listaAcademicos = dataEnrollment[metodoEnrollment].map((p) => {
          return {
            id: p.id,
            nombreCompleto: p.nombre,
            tipo: "ACADEMICO",
            idPersona: p.idPersona,
          };
        });
      }

      if (dataParentesco && dataParentesco[metodoParentesco]) {
        listaFamiliares = dataParentesco[metodoParentesco].map((p) => {
          return {
            id: p.familiar.idFamiliar,
            nombreCompleto: p.familiar.nombreCompleto,
            tipo: "FAMILIAR",
            idPersona: p.persona.idPersona,
            _selected: true,
          };
        });
      }

      let alumnoFamilia = listaAlumnos.map((a) => {
        a.familiares = listaFamiliares
          .filter((f) => f.idPersona === a.idPersona)
          .sort(sortByNombreCompleto);
        return a;
      });

      let listaConcatDestinatarios = [];

      alumnoFamilia.forEach((af) => {
        listaConcatDestinatarios = [
          ...listaConcatDestinatarios,
          af,
          ...af.familiares,
        ];
      });

      listaConcatDestinatarios = [
        ...listaConcatDestinatarios,
        ...listaAcademicos,
      ];

      setRows(listaConcatDestinatarios);
      dispatch(setDestinatarios(listaConcatDestinatarios));
    }
  }, [
    dataAlumno,
    dataParentesco,
    dataProfesor,
    dataUsuario,
    parentescos,
    dataEnrollment,
  ]);

  useEffect(() => {
    if (tipoDestinatario === "USUARIOS") {
      handleMostrar();
    }
  }, []);

  const handleChangeCiclo = (e) => {
    dispatch(setIdCiclo(e.target.value));
    dispatch(setIdNivel(""));
    dispatch(setIdModalidad(""));
    dispatch(setIdGrado(""));
    dispatch(setIdGrupo(""));

    if (tipoUsuario === "PROFESOR") {
      dispatch(setIdProfesor(idUsuario));
    }
    dispatch(setIdMateria(""));
    dispatch(setDescripcionMateria(""));

    if (e.target.value !== "") {
      dispatch(setCiclos([e.target.value]));
    } else {
      dispatch(setCiclos([]));
    }
    // dispatch(setNiveles([]));
    dispatch(setModalidades([]));
    dispatch(setGrados([]));
    dispatch(setGrupos([]));
    dispatch(setMaterias([]));

    dispatch(setDestinatarios([]));

    setRows([]);
  };

  const handleChangeNivel = (e) => {
    dispatch(setIdNivel(e.target.value));
    dispatch(setIdModalidad(""));
    dispatch(setIdGrado(""));
    dispatch(setIdGrupo(""));
    dispatch(setIdMateria(""));
    dispatch(setDescripcionMateria(""));
    dispatch(setIdProfesor(""));

    // if (e.target.value !== "") {
    //   dispatch(setNiveles([e.target.value]));
    // } else {
    //    dispatch(setNiveles([]));
    // }
    dispatch(setModalidades([]));
    dispatch(setGrados([]));
    dispatch(setGrupos([]));
    dispatch(setMaterias([]));

    dispatch(setDestinatarios([]));
    setRows([]);
  };

  const handleChangeModalidad = (e) => {
    dispatch(setIdModalidad(e.target.value));
    dispatch(setIdGrado(""));
    dispatch(setIdGrupo(""));
    dispatch(setIdMateria(""));
    dispatch(setDescripcionMateria(""));
    dispatch(setIdProfesor(""));

    if (e.target.value !== "") {
      dispatch(setModalidades([e.target.value]));
    } else {
      dispatch(setModalidades([]));
    }
    dispatch(setGrados([]));
    dispatch(setGrupos([]));
    dispatch(setMaterias([]));

    dispatch(setDestinatarios([]));
    setRows([]);
  };
  const handleChangeGrado = (e) => {
    dispatch(setIdGrado(e.target.value));
    dispatch(setIdGrupo(""));
    dispatch(setIdMateria(""));
    dispatch(setDescripcionMateria(""));
    dispatch(setIdProfesor(""));

    if (e.target.value !== "") {
      dispatch(setGrados([e.target.value]));
    } else {
      dispatch(setGrados([]));
    }
    dispatch(setGrupos([]));
    dispatch(setMaterias([]));
    dispatch(setDestinatarios([]));

    setRows([]);
  };

  const handleChangeGrupo = ({ value, list, defaultValue }) => {
    dispatch(setIdGrupo(value));
    if (value !== "") {
      dispatch(setGrupos([value]));
    } else if (defaultValue === "todos") {
      dispatch(setGrupos([...list]));
    } else {
      dispatch(setGrupos([]));
    }
    dispatch(setDestinatarios([]));
    setRows([]);
  };

  const handleMostrar = () => {
    console.log("handleMostrar->", tipoDestinatario);
    console.log("idCiclo", idCiclo);
    console.log(typeof idCiclo);
    if (idCiclo === "0") {
      console.log("Entro en if");
      alert("Seleccione ciclo");
      return;
    }
    if (tipoPublicacion === "tareas" && materias.length === 0) {
      alert("Seleccione materia");
      return;
    }
    if (tipoDestinatario === "ALUMNOS") {
      console.log("en handlemostrar");
      executeQueryAlumnos();
      executeQueryEnrollments();
    } else if (tipoDestinatario === "FAMILIARES") {
      executeQueryParentescos();
      executeQueryEnrollments();
    } else if (tipoDestinatario === "PROFESORES") {
      executeQueryProfesores();
    } else if (tipoDestinatario === "USUARIOS") {
      executeQueryUsuarios();
    } else if (tipoDestinatario === "ALUMNOS & FAMILIARES") {
      executeQueryAlumnos();
      executeQueryParentescos();
      executeQueryEnrollments();
    }
  };

  const handleChangeMateria = (e) => {
    if (e.target.value !== "") {
      var index = e.nativeEvent.target.selectedIndex;

      dispatch(setIdMateria(e.target.value));
      dispatch(setMaterias([e.target.value]));
      var pos = e.nativeEvent.target[index].text.indexOf(":");
      if (pos > 0) {
        dispatch(
          setDescripcionMateria(
            e.nativeEvent.target[index].text.substring(pos + 1)
          )
        );
      } else {
        dispatch(setDescripcionMateria(e.nativeEvent.target[index].text));
      }
    } else {
      dispatch(setIdMateria(""));
      dispatch(setDescripcionMateria(""));
      dispatch(setMaterias([]));
    }

    if (tipoUsuario === "PROFESOR") {
      dispatch(setIdProfesor(idUsuario));
    }

    dispatch(setDestinatarios([]));

    console.log("handleChangeMateria", idProfesor);
    console.log("idUsuario", idUsuario);

    setRows([]);
  };

  if (loadingAlumno) return <p>Cargando Alumnos...</p>;
  if (errorAlumno) return <p>Error :({errorAlumno.message}</p>;

  if (loadingParentesco) return <p>Cargando Familiares...</p>;
  if (errorParentesco) return <p>Error :({errorParentesco.message}</p>;

  if (loadingProfesor) return <p>Cargando Profesores...</p>;
  if (errorProfesor) return <p>Error :({errorProfesor.message}</p>;

  if (loadingUsuario) return <p>Cargando Profesores...</p>;
  if (errorUsuario) return <p>Error :({errorUsuario.message}</p>;

  if (loadingEnrollment) return <p>Cargando Académicos...</p>;
  if (errorEnrollment) return <p>Error :({errorEnrollment.message}</p>;

  return (
    <div>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p>{tipoDestinatario}</p>
              <p>{idUsuario}</p>
              {tipoDestinatario !== "USUARIOS" && (
                <div>
                  {tipoUsuario === "USUARIO" && (
                    <div>
                      <SelectCiclosByTipo
                        tipo={"NORMAL"}
                        idCiclo={idCiclo}
                        onChangeCiclo={handleChangeCiclo}
                      />
                      <SelectNivelesByIdUsuario
                        idUsuario={idUsuario}
                        idNivel={idNivel}
                        onChangeNivel={handleChangeNivel}
                      />
                      <SelectModalidadesByNivel
                        idNivel={idNivel}
                        idModalidad={idModalidad}
                        onChangeModalidad={handleChangeModalidad}
                      />
                      <SelectGradosByModalidad
                        idModalidad={idModalidad}
                        idGrado={idGrado}
                        onChangeGrado={handleChangeGrado}
                      />
                      <SelectGruposByModalidadAndGrado
                        idModalidad={idModalidad}
                        idGrado={idGrado}
                        idGrupo={idGrupo}
                        onChangeGrupo={handleChangeGrupo}
                      />
                    </div>
                  )}

                  {tipoUsuario === "USUARIO" &&
                    tipoPublicacion === "tareas" && (
                      <div>
                        {idGrado !== "" && (
                          <SelectMateriasByInscripcion
                            idMateria={idMateria}
                            ciclos={ciclos}
                            niveles={niveles}
                            modalidades={modalidades}
                            grados={grados}
                            grupos={grupos}
                            onChangeMateria={handleChangeMateria}
                          />
                        )}
                      </div>
                    )}

                  {tipoUsuario === "PROFESOR" && (
                    <div>
                      <SelectCiclosByTipo
                        tipo={"NORMAL"}
                        idCiclo={idCiclo}
                        onChangeCiclo={handleChangeCiclo}
                      />
                      <SelectMateriasByProfesorAndCiclo
                        idMateria={idMateria}
                        idProfesor={idUsuario}
                        idCiclo={idCiclo}
                        onChangeMateria={handleChangeMateria}
                        tipoPublicacion={tipoPublicacion}
                      />

                      <SelectGruposByProfesorAndMateria
                        idProfesor={idUsuario}
                        idMateria={idMateria}
                        idGrupo={idGrupo}
                        idCiclo={idCiclo}
                        onChangeGrupo={handleChangeGrupo}
                      />
                      <SectionDescargarCalificacion
                        idCiclo={idCiclo}
                        idGrupo={idGrupo}
                        idMateria={idMateria}
                        defaultValues={calificacionOptions}
                        onChange={(calificacionOptions) => {
                          dispatch(
                            setCalificacionOptionsAction(calificacionOptions)
                          );
                        }}
                      />
                      {/* {JSON.stringify(calificacionOptions, null, 2)} */}
                    </div>
                  )}
                </div>
              )}

              {(tipoDestinatario === "FAMILIARES" ||
                tipoDestinatario === "ALUMNOS & FAMILIARES") && (
                <>
                  <SelectTipoParentesco />
                </>
              )}

              {tipoDestinatario !== "USUARIOS" && (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleMostrar}
                  style={{ margintTop: 15, marginBottom: 15 }}
                >
                  Mostrar
                </Button>
              )}
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            {/* <pre>{JSON.stringify(destinatarios, null, 2)}</pre> */}
            {
              // <div style={{ width: 300, background: "pink", overflow: "auto" }}>
              //   <pre>
              //     {JSON.stringify(
              //       {
              //         alcance: {
              //           ciclos,
              //           niveles,
              //           modalidades,
              //           grados,
              //           grupos,
              //         },
              //       },
              //       null,
              //       2
              //     )}
              //   </pre>
              // </div>
            }
            {
              <TablaDestinatarios
                destinatarios={destinatarios}
                onSelectAll={(checked) => {
                  const newDestintarios = destinatarios.map((d) => {
                    d._selected = checked;

                    return d;
                  });
                  dispatch(setDestinatarios(newDestintarios));
                }}
                onSelectDestinatario={(checked, id) => {
                  const newDestintarios = destinatarios.map((d) => {
                    if (d.id === id) {
                      d._selected = checked;
                    }
                    return d;
                  });
                  dispatch(setDestinatarios(newDestintarios));
                }}
              />
            }
            {/* {destinatarios.length > 0 && (
              <ListaDestinatarios rows={destinatarios} />
            )} */}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
