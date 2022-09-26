export type TDiscipline = {
  codigo: string;
  nome: string;
  hora_aula: number;
  hora_relogio: number;
  cursos_da_disciplina: TDisciplineCourses[];
}


export type TDisciplineCreate = {
  codigo: string;
  nome: string;
  hora_aula: number;
  hora_relogio: number;
  cursos_codigos: string[];
}

export type TDisciplineCourses = {
  curso: {
    codigo_mec: string;
    nome: string;
  }
}

export type TDisciplineMatrix = {
  codigo: string;
  nome: string;
  hora_aula: number;
  hora_relogio: number;
}