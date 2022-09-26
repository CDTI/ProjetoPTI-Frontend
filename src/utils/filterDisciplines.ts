import { TDiscipline, TDisciplineCourses } from "../@types/Discipline";

const uniqueCourse = (
  filteredCourse: string,
  disciplineCourses: TDisciplineCourses[]
) => {
  if (
    disciplineCourses.length === 1 &&
    disciplineCourses[0].curso.nome === filteredCourse
  ) {
    return true;
  } else {
    return false;
  }
};

export function filterDisciplines(
  fName?: string, 
  fCode?: string, 
  fCurso?: string, 
  fClassHour?: number, 
  fClockHour?: number, 
  disciplines?: TDiscipline[]
): TDiscipline[] | undefined {
  const serializedDisciplines : TDiscipline[] | undefined = disciplines?.filter((disc) => {
    if (
      fName &&
      disc.nome.includes(fName.toLocaleUpperCase())
    ) {
      return disc;
    }
    if (fCode && disc.nome.includes(fCode)) {
      return disc;
    }
    if (
      fCurso &&
      uniqueCourse(fCurso, disc.cursos_da_disciplina)
    ) {
      return disc;
    }
    if (
      fClassHour &&
      Number(fClassHour === disc.hora_aula)
    ) {
      return disc;
    }
    if (
      fClockHour &&
      Number(fClockHour === disc.hora_relogio)
    ) {
      return disc;
    }
  });
  return serializedDisciplines;
}