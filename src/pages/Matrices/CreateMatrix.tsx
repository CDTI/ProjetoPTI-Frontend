// React
import { useEffect, useState } from "react";
// Types
import { TDisciplineMatrix } from "../../@types/Discipline";
// Controllers
import { MatrixController } from "../../api/MatrixController";
// Components

// Spinner
import ClipLoader from "react-spinners/ClipLoader";
import DisciplinesTable from "../../components/GetDisciplines/DisciplinesTable";

export default function CreateMatrix() {
  const [insertedDisciplines, setInsertedDisciplines] = useState<
    TDisciplineMatrix[]
  >([]);
  const [courseOfMatrix, setCourseOfMatrix] = useState("");
  const [isInserting, setIsInserting] = useState(false);
  const [file, setFile] = useState<File>();
  const [errorOnUpload, setErrorOnUpload] = useState(false);

  function handleUploadFile(e: any) {
    setFile(e.target.files[0]);
    setInsertedDisciplines([]);
  }
  async function handleStartUpload(e: any) {
    setIsInserting(true);
    const data = new FormData();
    if (file) {
      const fileName = file.name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[_]/g, "");
      data.append("file", file, fileName);
      await MatrixController.getInstance()
        .uploadMatrix(data)
        .then((res) => {
          if (Object.keys(res).length === 0) {
            setErrorOnUpload(true);
          }
          setInsertedDisciplines(res.disciplinas);
          setCourseOfMatrix(res.curso);
          setIsInserting(false);
        });
    }
  }

  useEffect(() => {
    if (errorOnUpload) {
      setInsertedDisciplines([]);
      setCourseOfMatrix("");
      setIsInserting(false);
      setErrorOnUpload(false);
    }
  }, [errorOnUpload]);

  return (
    <div className="w-full h-full px-8">
      <header className="flex items-center justify-between px-4">
        <h1 className="text-3xl text-center pt-8 font-semibold ">
          Upload de matriz curricular
        </h1>
        <div className="flex items-center gap-x-4">
          <button
            onClick={() => document.getElementById("inputfile")?.click()}
            className="w-[200px] bg-blue-500 mt-6 h-9 rounded-sm"
          >
            <h1 className="text-xl font-bold text-white ">Upload</h1>
            <input
              onChange={handleUploadFile}
              id="inputfile"
              className="mt-4"
              hidden
              type="file"
              accept=".csv"
            />
          </button>
        </div>
      </header>
      <main className="w-full h-full px-8 mt-4">
        {!file && !isInserting && (
          <p className="text-xl">
            Faça o upload de uma matriz curricular para começar.
          </p>
        )}
        {insertedDisciplines && file && insertedDisciplines?.length < 1 && (
          <div className="flex flex-col">
            <p className="text-xl">
              Matriz a ser inserida:{" "}
              <span className="font-bold">{file.name}</span>, deseja começar?
            </p>
            <button
              onClick={handleStartUpload}
              className="w-[300px] bg-blue-500 mt-6 h-9 rounded-sm"
            >
              <h1 className="text-xl font-bold text-white ">Iniciar</h1>
            </button>
          </div>
        )}
        {isInserting && file && (
          <div className="justify-center items-center flex mt-20 gap-x-8">
            <ClipLoader color="#3b82f6" loading={isInserting} size={90} />
            <p className="text-xl">Inserindo disciplinas...</p>
          </div>
        )}
        {insertedDisciplines && insertedDisciplines.length > 0 && !isInserting && (
          <div className="mt-4">
            <p className="mb-12">
              Essas foram as disciplinas inseridas ao curso de{" "}
              <span className="font-bold">{courseOfMatrix}.</span>
            </p>
            <DisciplinesTable
              disciplines={insertedDisciplines}
              isInsertedDisciplines={true}
              isFilterCollapsed
            />
          </div>
        )}
      </main>
    </div>
  );
}
