// React
import Select from "react-select";
import { useEffect, useState } from "react";
// Types
import { TCourseSelect } from "../../@types/Course";
import { TMatrix } from "../../@types/Matrix";
// Controllers
import { CourseController } from "../../api/CourseController";
import { MatrixController } from "../../api/MatrixController";
// Form
import { Controller, useForm } from "react-hook-form";
import Modal from "../../components/Modal";
import DisciplinesTable from "../../components/GetDisciplines/DisciplinesTable";
import { TDiscipline } from "../../@types/Discipline";

export type FormValues = {
  course: TCourseSelect;
};

export default function GetMatrices() {
  const [courses, setCourses] = useState<TCourseSelect[]>([]);
  const [matrixes, setMatrixes] = useState<TMatrix[]>([]);
  const [currentMatrixDisciplines, setCurrentMatrixDiscipliens] = useState<
    TDiscipline[]
  >([]);
  const [isOpen, setIsOpen] = useState(false);

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      course: {},
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

  const toggleModal = () => setIsOpen(!isOpen);

  async function handleSearchMatrixes(e: FormValues) {
    await MatrixController.getInstance()
      .getMatrixesOfCourse(e.course.value)
      .then((res) => {
        setMatrixes(res);
      });
  }
  async function handleOpenModal(matrixId: string) {
    await MatrixController.getInstance()
      .getDisciplines(matrixId)
      .then((res) => {
        setCurrentMatrixDiscipliens(res);
      });
    toggleModal();
  }

  return (
    <div className="w-full h-full px-8">
      <h1 className="text-3xl pt-8 pl-8 font-semibold ">
        Pesquise por uma matriz
      </h1>
      <form
        onSubmit={handleSubmit(handleSearchMatrixes)}
        className="flex w-[420px]  gap-4 mt-4 ml-8"
      >
        <Controller
          control={control}
          name="course"
          render={({ field }) => {
            return (
              <Select
                onChange={field.onChange}
                value={field.value}
                placeholder="Selecione um curso"
                className="w-[100%]"
                options={courses}
              />
            );
          }}
        />
        <div>
          <button
            type="submit"
            className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Pesquisar
          </button>
        </div>
      </form>
      <div className="flex flex-col gap-4 mt-8 ml-8">
        {matrixes &&
          matrixes.map((matrix) => (
            <button
              onClick={() => handleOpenModal(matrix.id)}
              className="bg-gray-100 border-[2px] border-transparent hover:border-brandBlue rounded-md p-2 flex self-start "
              key={matrix.id}
            >
              Matriz {matrix.ano} - {matrix.semestre}
            </button>
          ))}
      </div>
      <Modal isOpen={isOpen} toggleModal={toggleModal}>
        <DisciplinesTable
          disciplines={currentMatrixDisciplines}
          isInsertedDisciplines={true}
          isFilterCollapsed
        />
      </Modal>
    </div>
  );
}
