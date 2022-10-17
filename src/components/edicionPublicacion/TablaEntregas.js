import React, { useState } from 'react';
import {ListaEntrega} from "./ListaEntrega/index.tsx"
import {EntregaDetail} from "./EntregaDetail/index.tsx" 

export const TablaEntregas = ({idPublicacion, rows, onSaveCalificacion }) => {
	const [entregaDetail, setEntregaDetail] = useState();
	const [showDetail, setShowDetail] = useState(false);

	return (
		<div>
			{showDetail ?
				<EntregaDetail entrega={entregaDetail} setShowDetail={setShowDetail} onSaveCalificacion={onSaveCalificacion} />
			:
				<ListaEntrega entregas={rows} setEntregaDetail={setEntregaDetail} setShowDetail={setShowDetail} />
			}
		</div>
	);
};