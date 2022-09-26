//React
import { useEffect, useState } from "react";
//Types
import { TCourseSelect } from "../../@types/Course";
//Controllers
import { CourseController } from "../../api/CourseController";
import { DisciplineController } from "../../api/DisciplineController";
//Form
import { FormProvider, useForm } from "react-hook-form";
//Components
import MySelect from "../../components/MySelect";
import { MatrixController } from "../../api/MatrixController";

export type FormValues = {
  courses: string[];
};

export default function GetMatrices() {
  const [courses, setCourses] = useState<TCourseSelect[]>([]);
  const [matrixes, setMatrixes] = useState<TCourseSelect[]>([]);

  const formMethods = useForm<FormValues>({
    defaultValues: {
      courses: [],
    },
  });

  useEffect(() => {
    async function fetchCoursesForSelect() {
      await CourseController.getInstance()
        .getAllForSelect()
        .then((res) => setCourses(res));
    }
    fetchCoursesForSelect();
  }, []);

  async function handleSearchMatrixes() {
    await MatrixController.getInstance().getMatrixes(courses[0].nome).then(res => {
    }); 
  }

  return (
    <div className="w-full h-full px-8">
      <h1 className="text-3xl pt-8 pl-8 font-semibold ">
        Pesquise por uma matriz
      </h1>
      <FormProvider {...formMethods}>
        <div className="flex w-[420px]  gap-4 mt-4 ml-8">
          <MySelect
            placeHolder="Selecione apenas um curso"
            controllerProps={{
              name: "courses",
              control: formMethods.control,
            }}
            options={courses}
          />
          <div>
            <button className="mt-[8px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Pesquisar</button>
          </div>
        </div>
      </FormProvider>

    </div>
  )
}
