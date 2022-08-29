import React from "react";
import "./App.css";

import { ApolloProvider } from "@apollo/react-hooks";
import { client } from "./config/config";
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

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idAccount = urlParams.get("idAccount");
const idUsuario = urlParams.get("idUsuario");
const tokenAuth = urlParams.get("tokenAuth");
const prefijo = urlParams.get("prefijo");

const store = createStore(rootReducer, applyMiddleware(thunk));

// const userLoggedIn = {
//   idAccount: "3",
//   idUsuario: "P1CARO",
//   tokenAut: "ELGUERAP1CARO",
//   prefijo: "CNH_"
// };

let userLoggedIn = {};

if (idAccount && idUsuario && tokenAuth && prefijo) {
  userLoggedIn = {
    idAccount,
    idUsuarioConPrefijo: `${prefijo}_${idUsuario}`,
    idUsuario,
    tokenAut: tokenAuth,
    prefijo,
  };
} else {
  userLoggedIn = {
    withParams: false, 
    idAccount: "5",
    idUsuarioConPrefijo: "CELTA_3857",
    idUsuario: '3857',
    tokenAut: "CELTA123",
    prefijo: "CELTA",
  };
}

localStorage.setItem("inoty-user", JSON.stringify(userLoggedIn));

function App() {
  return (
    // <React.StrictMode>
    <Provider store={store}>
      <ToastMessage />
      <Toaster position="top-right" />
      {/* <pre>{JSON.stringify(userLoggedIn, null, 2)}</pre> */}
      <ApolloProvider client={client}>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </ApolloProvider>
    </Provider>
    // </React.StrictMode>
  );
}

export default App;
