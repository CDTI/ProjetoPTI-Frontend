export type TDiscipline = {
  serie: string;
  codigo: string;
  nome: string;
  hora_aula: number;
  hora_relogio: number;
};

export type TDisciplineCreate = {
  codigo: string;
  nome: string;
  hora_aula: number;
  hora_relogio: number;
  cursos_codigos: string[];
};

export type TDisciplineCourses = {
  curso: {
    codigo_mec: string;
    nome: string;
  };
};

export type TDisciplineMatrix = {
  serie: string;
  codigo: string;
  nome: string;
  hora_aula: number;
  hora_relogio: number;
};
