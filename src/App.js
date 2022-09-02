import React from "react";
import "./App.css";

import { ApolloProvider } from "@apollo/react-hooks";
import { PublicacionPage } from "./pages/PublicacionPage";
import { EdicionPublicacionPage } from "./pages/EdicionPublicacionPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { WelcomePage } from "./pages/WelcomePage";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import toast, { Toaster } from "react-hot-toast";

import { rootReducer } from "./store/reducers/rootReducer";
import { ToastMessage } from "./components/toastMessage/ToastMessage";
import { PublicacionProfesorPage } from "./pages/PublicacionProfesorPage";
import { EdicionPublicacionProfesorPage } from "./pages/EdicionPublicacionProfesorPage";
import { Reactivos } from "./components/Quizzes/components/Reactivos";
import { Cuestionarios } from "./components/Quizzes/components/Cuestionarios";
import { CuestionariosProvider } from "./components/Quizzes/components/Cuestionarios/context/CuestionariosContext";
import { AuthProvider } from "./context/AuthContext";
import { AppRouter } from "./AppRouter";
import { getApolloClient } from "./config/config";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idAccount = urlParams.get("idAccount");
const idUsuario = urlParams.get("idUsuario");
const tokenAuth = urlParams.get("tokenAuth");
const prefijo = urlParams.get("prefijo");
const graphql = urlParams.get("graphql");

const store = createStore(rootReducer, applyMiddleware(thunk));

let userLoggedIn = {
  withParams: false,
  idAccount: "3",
  idUsuarioConPrefijo: "CNH_P1CARO",
  idUsuario: "P1CARO",
  tokenAut: "ELGUERAP1CARO",
  prefijo: "CNH",
  graphql: "http://colegioheroes.interschool.mx:9191/graphql",
};

if (idAccount && idUsuario && tokenAuth && prefijo && graphql) {
  userLoggedIn = {
    idAccount,
    idUsuarioConPrefijo: `${prefijo}_${idUsuario}`,
    idUsuario,
    tokenAut: tokenAuth,
    prefijo,
    graphql,
  };
} else {
  console.log(
    "inicio de sesion sin autenicacion, datos por defecto",
    userLoggedIn
  );
}

const apolloClient = getApolloClient(userLoggedIn.graphql);

localStorage.setItem("inoty-user", JSON.stringify(userLoggedIn));

function App() {
  return (
    // <React.StrictMode>
    <Provider store={store}>
      <ToastMessage />
      <Toaster position="top-right" />
      {/* <pre>{JSON.stringify(userLoggedIn, null, 2)}</pre> */}
      <ApolloProvider client={apolloClient}>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </ApolloProvider>
    </Provider>
    // </React.StrictMode>
  );
}

export default App;
