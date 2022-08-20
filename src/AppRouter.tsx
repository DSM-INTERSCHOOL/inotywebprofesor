import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Cuestionarios } from "./components/Quizzes/components/Cuestionarios";
import { CuestionariosProvider } from "./components/Quizzes/components/Cuestionarios/context/CuestionariosContext";
import { Reactivos } from "./components/Quizzes/components/Reactivos";
import { AuthContext, useAuthContext } from "./context/AuthContext";
import { EdicionPublicacionPage } from "./pages/EdicionPublicacionPage";
import { EdicionPublicacionProfesorPage } from "./pages/EdicionPublicacionProfesorPage";
import { PublicacionPage } from "./pages/PublicacionPage";
import { PublicacionProfesorPage } from "./pages/PublicacionProfesorPage";
import { WelcomePage } from "./pages/WelcomePage";
import { getUserLocalStorage } from "./utils/getUserLocalStorage";

export const AppRouter = () => {
  const isUserRef = React.useRef(false);
  const { setIdProfesor } = useAuthContext();

  const data = getUserLocalStorage();
  React.useEffect(() => {
    if (data) {
      setIdProfesor(data.idUsuario);
    }
  }, []);
  isUserRef.current = !!data;

  if (!isUserRef.current) {
    return <h2>User is not loggedIn</h2>;
  }
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={WelcomePage} />
        <Route exact path="/publicaciones" component={PublicacionPage} />
        <Route
          exact
          path="/publicaciones/edicion"
          component={EdicionPublicacionPage}
        />
        <Route
          exact
          path="/profesor/publicaciones"
          component={PublicacionProfesorPage}
        />
        <Route exact path="/profesor/reactivos" component={Reactivos} />

        <Route
          exact
          path="/profesor/publicaciones/edicion"
          component={EdicionPublicacionProfesorPage}
        />
      </Switch>
      <Switch>
        <CuestionariosProvider>
          <Route
            exact
            path="/profesor/cuestionarios"
            component={Cuestionarios}
          />
        </CuestionariosProvider>
      </Switch>
    </BrowserRouter>
  );
};
