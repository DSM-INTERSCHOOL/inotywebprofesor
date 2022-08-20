import React from 'react';

export const WelcomePage = () => {
	return (
		<div>
			<h1>WelcomePage Page Page Page Page</h1>

			<form method="POST" action="http://192.241.142.230:3434/leads">
				<input type="hidden" id="custId" name="idCiclo" value="20-21" />
				<input type="hidden" id="custId" name="idNivel" value="PRC" />
				<input type="hidden" id="custId" name="idModalidad" value="PRCC" />
				<input type="hidden" id="custId" name="idCampanaCRM" value="3487" />
				<input type="hidden" id="custId" name="idCampanaLanding" value="11S1S" />
				<input type="hidden" id="custId" name="idMedioLanding" value="69S" />
				<input type="hidden" id="custId" name="idFuenteLanding" value="S5S8S" />
				<input id="txt_nombre" name="nombre" />
				<input id="txt_nombre" name="apellido_paterno" />
				<input id="txt_nombre" name="apellido_materno" />
				<input id="txt_nombre" name="email" />
				<input id="txt_nombre" name="telefono" />

				<input type="submit" />
			</form>
		</div>
	);
};
