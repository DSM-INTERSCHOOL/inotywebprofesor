export const sortByIdPersona = (a, b) => {
	let comparison = 0;

	if (a.idPersona > b.idPersona) {
		comparison = 1;
	} else if (a.idPersona < b.idPersona) {
		comparison = -1;
	}
	return comparison;
};


export const sortByNombreCompleto = (a, b) => {
    let comparacion = 0;
    if (a.nombreCompleto > b.nombreCompleto) {
        comparacion = 1;
    } else if (b.nombreCompleto > a.nombreCompleto) {
        comparacion = -1;
    }
    return comparacion;
};