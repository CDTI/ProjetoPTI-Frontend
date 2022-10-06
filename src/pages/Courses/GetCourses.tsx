// React
import { useEffect, useState } from "react";
// Types
import { TCourse } from "../../@types/Course";
// Controllers
import { CourseController } from "../../api/CourseController";
// Components
import CoursesFilter from "../../components/GetCourses/CoursesFilter";
import CoursesTable from "../../components/GetCourses/CoursesTable";

export default function GetDisciplines() {
  const [courses, setCourses] = useState<TCourse[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<TCourse[]>([]);
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(false);

  useEffect(() => {
    async function getCourses() {
      await CourseController.getInstance()
        .getAll()
        .then((res) => setCourses(res));
    }
    getCourses();
  }, []);

  const resetFilter = () => setFilteredCourses([]);
  const updateFilteredCourses = (newCourses: TCourse[]) => {
    setFilteredCourses(newCourses);
  };
  const toggleFilterCollapsbile = () =>
    setIsFilterCollapsed(!isFilterCollapsed);

  return (
    <div className="overflow-hidden">
      <h1 className="text-3xl pl-8 pt-8 font-semibold ">Lista dos cursos</h1>
      <CoursesFilter
        courses={courses}
        updateFilteredCourses={updateFilteredCourses}
        isFilterCollapsed={isFilterCollapsed}
        resetFilter={resetFilter}
        toggleFilterCollapsbile={toggleFilterCollapsbile}
      />
      <CoursesTable
        courses={filteredCourses.length > 0 ? filteredCourses : courses}
        isFilterCollapsed={isFilterCollapsed}
      />
    </div>
  );
}
