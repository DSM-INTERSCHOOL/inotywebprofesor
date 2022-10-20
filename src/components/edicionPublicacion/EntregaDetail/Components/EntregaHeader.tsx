import moment from 'moment';
import React from 'react'
import { EntregasContext } from '../../TablaEntregas';


export const EntregaHeader = () => {
    const { entregas, setEntregaDetail, index, setIndex, entregaDetail } =
    React.useContext(EntregasContext);
  return (
    <div>
          <div className="header">
          <div className="left">
            <p style={{ fontSize: 14, textAlign: "center" }}>
              Nombre del alumno:
            </p>
          </div>
          <div className="right">
            <b style={{ fontSize: 14, textAlign: "center" }}>
              {entregaDetail.nombreUsuario || "Alumno"}
            </b>
          </div>
        </div>

        <div className="header">
          <div className="left">
            <p style={{ fontSize: 14, textAlign: "center" }}>
              Fecha de entrega:
            </p>
          </div>
          <div className="right">
            {/* <b style={{ fontSize: 14, textAlign: "center" }}>{entrega.nombreCorto}</b> */}
            <p style={{ fontSize: 14, textAlign: "center" }}>
              {moment(entregaDetail.fechaHora).format(
                "MMMM Do YYYY, h:mm:ss a"
              )}
            </p>
          </div>
        </div>

    </div>
    
  )
}
