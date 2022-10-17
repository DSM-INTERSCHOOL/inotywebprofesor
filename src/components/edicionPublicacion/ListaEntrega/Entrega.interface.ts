export interface IEntrega {
  adjuntos: Adjunto[];
  calificacion: string;
  comentario: string;
  estatus: string;
  fechaHora: string;
  fechaModificacion: string;
  id: string;
  idPublicacion: string;
  idUsuario: string;
  nombreCorto: string;
  nombreUsuario: string;
  textoEntrega: string;
  type: string;
  foto: string;
}

export interface Adjunto {
  id: string;
  location: string;
  originalName: string;
}
