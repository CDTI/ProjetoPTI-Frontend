import { TCourse } from "../@types/Course";
import { TDiscipline, TDisciplineCourses } from "../@types/Discipline";

export function filterCourses(
  courses: TCourse[],
  fName?: string, 
  fMecCode?: string, 
  fSiaaCode?: string, 
  fCampus?: string,
): TCourse[] | undefined {
  const serializedCourses : TCourse[] | undefined = courses?.filter((course) => {
    if (fName && course.nome.includes(fName)) {
      return course;
    }
    if (fMecCode && course.codigo_mec.includes(fMecCode)) {
      return course;
    }
    if (fSiaaCode && course.codigo_siaa.includes(fSiaaCode)) {
      return course;
    }
    if (fCampus && course.unidades.includes(fCampus)) {
      return course;
    }
  });
  return serializedCourses;
}