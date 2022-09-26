//Types
import { TDiscipline, TDisciplineMatrix } from "../../@types/Discipline";

interface DisciplinesTableProps {
  disciplines: TDiscipline[] | TDisciplineMatrix[];
  isFilterCollapsed?: boolean;
  isInsertedDisciplines?: boolean;
}

export default function DisciplinesTable({
  disciplines,
  isFilterCollapsed = false,
  isInsertedDisciplines = false,
}: DisciplinesTableProps) {
  console.log(disciplines);
  const defaultThStyle =
    "p-[16px] font-medium text-left text-white bg-brandBlue sticky top-0 whitespace-nowrap";
  const defaultTdStyle = "leading-relaxed p-[16px] whitespace-nowrap";

  return (
    <div
      className={`flex-1 overflow-y-scroll ${
        isFilterCollapsed ? "max-h-[520px]" : "max-h-[620px]"
      }`}
    >
      <table className="m-auto w-[90%] border-collapse min-w-[600px]">
        <thead>
          <tr>
            <th
              className={`${defaultThStyle} w-[10%] rounded-tl-lg pl-[1.5rem]`}
            >
              Código
            </th>
            <th className={`${defaultThStyle} w-[40%]`}>Nome</th>
            <th className={`${defaultThStyle} w-[10%]`}>Hora aula</th>
            <th className={`${defaultThStyle} w-[10%]`}>Hora relógio</th>
            {!isInsertedDisciplines && (
              <th
                className={`${defaultThStyle} w-[30%] rounded-tr-lg pr-[1.5rem]`}
              >
                Cursos
              </th>
            )}
          
          </tr>
        </thead>
        <tbody>
          {disciplines &&
            (disciplines as TDiscipline[]).map((discipline, index) => (
              <tr
                key={discipline.codigo}
                className={index % 2 == 0 ? "bg-white" : "bg-background"}
              >
                <td className={`${defaultTdStyle} pl-[1.5rem]`}>
                  {discipline.codigo}
                </td>
                <td className={defaultTdStyle}>{discipline.nome}</td>
                <td className={defaultTdStyle}>{discipline.hora_aula}</td>
                <td className={defaultTdStyle}>{discipline.hora_relogio}</td>
                {!isInsertedDisciplines 
                    && (
                      <td className={`${defaultTdStyle} pr-[1.5rem] w-[30%]`}>
                        {discipline.cursos_da_disciplina.map((curso, index) => {
                          if (discipline.cursos_da_disciplina.length === index + 1) {
                            return (
                              <span key={curso.curso.nome}>{curso.curso.nome}</span>
                            );
                          } else {
                            return (
                              <span key={curso.curso.nome}>
                                {curso.curso.nome + ", "}
                              </span>
                            );
                          }
                        })}
                      </td>
                    ) 
                  }
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
