import { TDisciplineMatrix } from "./Discipline"

export type TMatrix = {
    id: number;
    ano: string;
    semestre: string;
    disciplinas: TDisciplineMatrix[];
}