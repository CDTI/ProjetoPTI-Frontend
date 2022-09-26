//React
import { useEffect, useState } from "react";
//Types
import { TCourseCreate } from "../../@types/Course";
import { TCampus } from "../../@types/Campus";
//Controllers
import { CourseController } from "../../api/CourseController";
import { CampusController } from "../../api/CampusController";
//Form
import { FormProvider, useForm } from "react-hook-form";
//Components
import MySelect from "../../components/MySelect";


export type FormValues = {
  name: string;
  mec_code: string;
  siaa_code: string;
  campus: string[];
};

export default function CreateCourse() {
  const [campus, setCampus] = useState<TCampus[]>([]);

  const formMethods = useForm<FormValues>({
    defaultValues: {
      name: "",
      mec_code: "",
      siaa_code: "",
      campus: [],
    },
  });

  useEffect(() => {
    async function fetchAllCampus() {
      await CampusController.getInstance()
        .getAll()
        .then((res) => setCampus(res));
    }
    fetchAllCampus();
  }, []);

  async function createNewCourse(e: FormValues) {
    const course : TCourseCreate = {
      codigo_mec: e.mec_code,
      codigo_siaa: e.siaa_code,
      nome: e.name,
      unidades: e.campus
    }
    await CourseController.getInstance().create(course)
  } 

  return (
    <FormProvider  {...formMethods}>
      <div className="w-full h-full px-8">
        <h1 className="text-3xl text-center pt-8 font-semibold ">
          Cadastrar disciplina
        </h1>
        <form onSubmit={formMethods.handleSubmit(createNewCourse)} className="max-w-[720px] m-auto mt-8">
          <div className="flex flex-col justify-start">
            <label>Nome do curso</label>
            <input
              {...formMethods.register("name")}
              placeholder="Entre com o nome do curso"
              className="rounded-[5px] outline-none border-[1px] border-[#B3B3B3] mt-2 p-1.5 pl-4"
            />
          </div>
          <div className="flex flex-col justify-start mt-4">
            <MySelect
              label="Unidades"
              placeHolder="Selecione ao menos uma unidade"
              options={campus}
              controllerProps={{
                name: "campus",
                control: formMethods.control,
              }}
            />
          </div>
          <div className="flex w-full gap-4">
            <div className="w-1/2 flex flex-col justify-start mt-4">
              <label>Codigo MEC</label>
              <input
                {...formMethods.register("mec_code")}
                type="number"
                placeholder="Entre com o código MEC"
                className="rounded-[5px] outline-none border-[1px] border-[#B3B3B3] mt-2 p-1.5 pl-4"
              />
            </div>
            <div className="w-1/2 flex flex-col justify-start mt-4">
              <label>Codigo SIAA</label>
              <input
                {...formMethods.register("siaa_code")}
                type="number"
                placeholder="Entre com o código SIAA"
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
