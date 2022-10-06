// React
import { useEffect, useState } from "react";
// Types
import { TCourseSelect } from "../../@types/Course";
// Controllers
import { CourseController } from "../../api/CourseController";
import { DisciplineController } from "../../api/DisciplineController";
// Form
import { FormProvider, useForm } from "react-hook-form";
// Components
import MySelect from "../../components/MySelect";

export type FormValues = {
  courses: string[];
  name: string;
  code: string;
  classHour: number;
  clockHour: number;
};

export default function CreateDiscipline() {
  const [courses, setCourses] = useState<TCourseSelect[]>([]);

  const formMethods = useForm<FormValues>({
    defaultValues: {
      courses: [],
      name: "",
      code: "",
      classHour: 0,
      clockHour: 0,
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

  async function handleCreateDisciplineSubmit(e: FormValues) {
    const coursesCodes: string[] = [];
    courses.forEach((course) => {
      e.courses.forEach((selectedCourse) => {
        if (selectedCourse === course.nome) coursesCodes.push(course.id);
      });
    });
    await DisciplineController.getInstance().create({
      nome: e.name.toUpperCase(),
      codigo: e.code,
      hora_aula: e.classHour,
      hora_relogio: e.clockHour,
      cursos_codigos: coursesCodes,
    });
  }

  return (
    <FormProvider {...formMethods}>
      <div className="w-full h-full px-8">
        <h1 className="text-3xl text-center pt-8 font-semibold ">
          Cadastrar disciplina
        </h1>
        <form
          onSubmit={formMethods.handleSubmit(handleCreateDisciplineSubmit)}
          className="max-w-[720px] m-auto mt-8"
        >
          <div className="flex flex-col justify-start">
            <label>Nome da disciplina</label>
            <input
              {...formMethods.register("name")}
              placeholder="Entre com o nome da disciplina"
              className="rounded-[5px] outline-none border-[1px] border-[#B3B3B3] mt-2 p-1.5 pl-4"
            />
          </div>
          <div className="flex flex-col justify-start mt-4">
            <label>Código da disciplina</label>
            <input
              {...formMethods.register("code")}
              placeholder="Entre com o código da disciplina"
              className="rounded-[5px] outline-none border-[1px] border-[#B3B3B3] mt-2 p-1.5 pl-4"
            />
          </div>
          <div className="flex flex-col justify-start mt-4">
            <MySelect
              placeHolder="Selecione ao menos um curso"
              label="Cursos"
              controllerProps={{
                name: "courses",
                control: formMethods.control,
              }}
              options={courses}
            />
          </div>
          <div className="flex w-full gap-4">
            <div className="w-1/2 flex flex-col justify-start mt-4">
              <label>Hora relógio</label>
              <input
                {...formMethods.register("classHour", { valueAsNumber: true })}
                type="number"
                placeholder="Entre com a quantidade de horas aula"
                className="rounded-[5px] outline-none border-[1px] border-[#B3B3B3] mt-2 p-1.5 pl-4"
              />
            </div>
            <div className="w-1/2 flex flex-col justify-start mt-4">
              <label>Hora aula</label>
              <input
                {...formMethods.register("clockHour", { valueAsNumber: true })}
                type="number"
                placeholder="Entre com a quantidade de horas relógio"
                className="rounded-[5px] outline-none border-[1px] border-[#B3B3B3] mt-2 p-1.5 pl-4"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-8 font-semibold tracking-wide w-full h-10  bg-blue-500 text-white"
          >
            <p className="text-white font-bold">Criar disciplina</p>
          </button>
        </form>
      </div>
    </FormProvider>
  );
}
