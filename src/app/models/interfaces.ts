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

export interface TipoTextura {
  id: number;
  ttex_desc: string;
}

export interface TipoDieta {
  id: number;
  tdie_desc: string;
}

export interface Habitacion {
  id: number;
  hab_id: number;
  hab_obs: string | null;
  paciente: Paciente | null;
}

export interface Paciente {
  pac_alergias: string;
  pac_antecedentes: string;
  pac_apellidos: string;
  pac_direccion_completa: string;
  pac_edad: number;
  pac_fecha_ingreso: string;
  pac_fecha_nacimiento: string;
  pac_id: number;
  pac_lengua_materna: string;
  pac_nombre: string;
  pac_nombre_cuidador: string;
  pac_num_historial: number;
  pac_telefono_cuidador: string;
}
export interface Constantes {
  ta_sistolica: number | null;
  ta_diastolica: number | null;
  frequencia_respiratoria: number | null;
  pulso: number | null;
  temperatura: number | null;
  saturacion_oxigeno: number | null;
  talla: number | null;
  diuresis: number | null;
  deposiciones: string | null;
  stp: string | null;
}

export interface Drenajes {
  dre_debito: string | null;
  tdre_desc: string | null;
}

export interface Movilizaciones {
  mov_ajuda_deambulacion: boolean | null;
  mov_ajuda_descripcion: string | null;
  mov_cambios: string | null;
  mov_decubitos: string | null;
  mov_sedestacion: boolean | null;
}

export interface Diagnostico {
  dia_diagnostico: string | null;
  dia_motivo: string | null;
}

export interface HistoryData {
  reg_timestamp?: string;
  reg_fecha?: string | null;
  reg_hora?: string | null;
  cv?: {
    cv_pulso?: number | string;
    cv_ta_sistolica?: number | string;
    cv_ta_diastolica?: number | string;
    cv_saturacion_oxigeno?: number | string;
    cv_temperatura?: number | string;
    cv_frequencia_respiratoria?: number | string;
    cv_talla?: number | string;
    cv_diuresis?: number | string;
    cv_deposiciones?: string;
    cv_stp?: string;
  };
  dre?: {
    dre_debito?: string;
    tdre_desc?: string;
  };
  mov?: {
    mov_ajuda_deambulacion?: boolean;
    mov_ajuda_descripcion?: string;
    mov_cambios?: string;
    mov_decubitos?: string;
    mov_sedestacion?: boolean;
  };
  dia?: {
    dia_diagnostico?: string;
    dia_motivo?: string;
  };
}




