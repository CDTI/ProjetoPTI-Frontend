//React
import { Routes, Route } from "react-router-dom";
//Laouts
import DefaultLayout from "../layouts/DefaultLayout";
//Components
import { Home } from "../pages/Home";
import CreateCourse from "../pages/Courses/CreateCourse";
import GetCourses from "../pages/Courses/GetCourses";
import CreateDiscipline from "../pages/Discipline/CreateDiscipline";
import GetDisciplines from "../pages/Discipline/GetDisciplines";
import CreateMatrix from "../pages/Matrices/CreateMatrix";
import GetMatrices from "../pages/Matrices/GetMatrices";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route element={<Home />} path="/" />
        <Route element={<CreateCourse />} path="/create/course" />
        <Route element={<CreateMatrix />} path="/create/matrix" />
        <Route element={<CreateDiscipline />} path="/create/discipline" />

        <Route element={<GetCourses />} path="/get/course" />
        <Route element={<GetMatrices />} path="/get/matrix" />
        <Route element={<GetDisciplines />} path="/get/discipline" />
      </Route>
    </Routes>
  );
}
