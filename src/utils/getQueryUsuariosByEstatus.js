import { USUARIOS_BY_ESTATUS } from "../constants/graphql_queries/usuarios_by_estatus";

export const getQueryUsuariosBy = ({ estatus }) => {
	let vars = {};
	let query;
	let metodo;

	
		query = USUARIOS_BY_ESTATUS;
		vars = { estatus: estatus };
		metodo = 'usuariosByEstatus';
	

    
    return {query,vars,metodo}
};
