import axios from "axios";
import { getUserLocalStorage } from "../utils/getUserLocalStorage";

export const postPublicacion = async (tipoPublicacion, data) => {
  try {
    const base_url = process.env.REACT_APP_API_URL;
    const { idAccount, tokenAut, idUsuario } = await getUserLocalStorage();

    const url = `${base_url}/${idAccount}/publicaciones/${tipoPublicacion}`;

    const result = await axios({
      method: "post",
      url: url,
      headers: { idUsuario, tokenAut },
      data: data,
    });
    //console.log('result-data', result.data);
    return result.data;
  } catch (err) {
    if (err.response && err.response.data && err.response.data.detail) {
      throw new Error(err.response.data.detail);
    } else {
      throw new Error(err);
    }
  }
};

export const putPublicacion = async (id, tipoPublicacion, publicacion) => {
  try {
    const base_url = process.env.REACT_APP_API_URL;
    const { idUsuario, tokenAut, idAccount } = await getUserLocalStorage();

    const url = `${base_url}/${idAccount}/publicaciones/${id}/${tipoPublicacion}`;

    const result = await axios({
      method: "put",
      url: url,
      headers: {
        idUsuario,
        tokenAut,
      },
      data: publicacion,
    });
    //console.log('result-data', result.data);
    return result.data;
  } catch (err) {
    if (err.response && err.response.data && err.response.data.detail) {
      throw new Error(err.response.data.detail);
    } else {
      throw new Error(err);
    }
  }
};

//router.route('/v1/cuentas/:idAccount/publicaciones/:id/:type(comentarios|likes|vistas|entregas|confirmaciones)/:idContenedor').put(publicacionController.actualizaContenedor);
export const updateAutorizacionPublicacion = async (id, filtros) => {
  try {
    const { idUsuario, tokenAut, idAccount } = await getUserLocalStorage();
    const base_url = process.env.REACT_APP_API_URL;

    const params = filtros;
    //console.log('params', params)

    const url = `${base_url}/${idAccount}/publicaciones/${id}/autorizacion`;

    const result = await axios({
      method: "put",
      url: url,
      headers: {
        idUsuario,
        tokenAut,
      },
      params: params,
    });

    return result.data;
  } catch (err) {
    if (err.response && err.response.data && err.response.data.detail) {
      throw new Error(err.response.data.detail);
    } else {
      throw new Error(err);
    }
  }
};

export const deleteAdjuntoPublicacion = async (
  idPublicacion,
  idAdjunto,
  tipoPublicacion
) => {
  try {
    const base_url = process.env.REACT_APP_API_URL;
    const { tokenAut, idUsuario, idAccount } = await getUserLocalStorage();
    const url = `${base_url}/${idAccount}/publicaciones/${idPublicacion}/${tipoPublicacion}/adjuntos/${idAdjunto}`;

    const result = await axios({
      method: "delete",
      url: url,
      headers: {
        tokenAut,
        idUsuario,
      },
    });

    return result.data;
  } catch (err) {
    if (err.response && err.response.data && err.response.data.detail) {
      throw new Error(err.response.data.detail);
    } else {
      throw new Error(err);
    }
  }
};

export const updateEstatusPublicacion = async (id, filtros) => {
  try {
    const base_url = process.env.REACT_APP_API_URL;
    const { idAccount, tokenAut, idUsuario } = await getUserLocalStorage();

    const params = filtros;
    //console.log('params', params)

    const url = `${base_url}/${idAccount}/publicaciones/${id}/estatus`;

    const result = await axios({
      method: "put",
      url: url,
      headers: { idUsuario, tokenAut },
      params: params,
    });

    return result.data;
  } catch (err) {
    if (err.response && err.response.data && err.response.data.detail) {
      throw new Error(err.response.data.detail);
    } else {
      throw new Error(err);
    }
  }
};

export const getPublicacion = async (tipoPublicacion, filtros) => {
  try {
    const base_url = process.env.REACT_APP_API_URL;

    const params = filtros;
    //console.log('params', params)
    const { idAccount, tokenAut, idUsuario } = await getUserLocalStorage();

    const url = `${base_url}/${idAccount}/publicaciones/${tipoPublicacion}`;

    const result = await axios({
      method: "get",
      url: url,
      headers: { idUsuario, tokenAut },
      params: params,
    });

    return result.data;
  } catch (err) {
    if (err.response && err.response.data && err.response.data.detail) {
      throw new Error(err.response.data.detail);
    } else {
      throw new Error(err);
    }
  }
};

export const getDestinatariosByIdPublicacion = async (id) => {
  try {
    const base_url = process.env.REACT_APP_API_URL;
    const { idAccount, tokenAut, idUsuario } = await getUserLocalStorage();

    const url = `${base_url}/${idAccount}/publicaciones/${id}/destinatarios`;

    const result = await axios({
      method: "get",
      url: url,
      headers: { idUsuario, tokenAut },
    });

    return result.data;
  } catch (err) {
    if (err.response && err.response.data && err.response.data.detail) {
      throw new Error(err.response.data.detail);
    } else {
      throw new Error(err);
    }
  }
};

export const deleteDestinatariosPublicacion = async (
  idPublicacion,
  destinatarios
) => {
  try {
    const base_url = process.env.REACT_APP_API_URL;

    const url = `${base_url}/${idAccount}/publicaciones/${idPublicacion}/destinatarios/`;
    const { idAccount, tokenAut, idUsuario } = await getUserLocalStorage();

    const result = await axios({
      method: "delete",
      url: url,
      headers: { idUsuario, tokenAut },
      data: destinatarios,
    });

    return result.data;
  } catch (err) {
    if (err.response && err.response.data && err.response.data.detail) {
      throw new Error(err.response.data.detail);
    } else {
      throw new Error(err);
    }
  }
};

export const getContenedorByIdPublicacion = async (id, contenedor) => {
  try {
    const base_url = process.env.REACT_APP_API_URL;
    const { idAccount, tokenAut, idUsuario } = await getUserLocalStorage();

    const url = `${base_url}/${idAccount}/publicaciones/${id}/${contenedor}`;

    const result = await axios({
      method: "get",
      url: url,
      headers: { idUsuario, tokenAut },
    });

    return result.data;
  } catch (err) {
    if (err.response && err.response.data && err.response.data.detail) {
      throw new Error(err.response.data.detail);
    } else {
      throw new Error(err);
    }
  }
};

export const uploadAttachmentsPublicacion = async (
  tipoPublicacion,
  idPublicacion,
  data
) => {
  try {
    const { idAccount, tokenAut, idUsuario } = await getUserLocalStorage();

    const base_url = process.env.REACT_APP_API_URL;
    const url = `${base_url}/${idAccount}/publicaciones/${idPublicacion}/${tipoPublicacion}/adjuntos`;
    const result = await axios({
      method: "post",
      url: url,
      headers: {
        tokenAut,
        idUsuario,
      },
      data: data,
    });

    return result.data;
  } catch (err) {
    if (err.response && err.response.data && err.response.data.detail) {
      throw new Error(err.response.data.detail);
    } else {
      throw new Error(err);
    }
  }
};

export const putContenedor = async (
  idPublicacion,
  idContenedor,
  tipoContenedor,
  contenedor
) => {
  try {
    const base_url = process.env.REACT_APP_API_URL;

    const url = `${base_url}/${idAccount}/publicaciones/${idPublicacion}/${tipoContenedor}/${idContenedor}`;
    const { idAccount, tokenAut, idUsuario } = await getUserLocalStorage();

    const data = {
      contenido: contenedor,
    };

    const result = await axios({
      method: "put",
      url: url,
      headers: {
        idUsuario,
        tokenAut,
      },
      data: data,
    });

    return result.data;
  } catch (err) {
    if (err.response && err.response.data && err.response.data.detail) {
      throw new Error(err.response.data.detail);
    } else {
      throw new Error(err);
    }
  }
};
