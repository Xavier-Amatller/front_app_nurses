export interface TipoDrenaje {
  id: number;
  tdre_desc: string;
}

export interface RegistroResponse {
  message: string;
  registro: {
    id: number;
    aux_id: string;
    pac_id: string;
    reg_fecha: string;
  };
}