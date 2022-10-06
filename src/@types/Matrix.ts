import { TDisciplineMatrix } from "./Discipline";

export type TMatrix = {
  id: string;
  ano: string;
  semestre: string;
  curso: string;
};

export type TUploadedMatrix = {
  id: number;
  ano: string;
  semestre: string;
  curso: string;
  disciplinas: TDisciplineMatrix[];
};
