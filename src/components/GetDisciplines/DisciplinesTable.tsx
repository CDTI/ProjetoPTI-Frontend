// Types
import { TDiscipline } from "../../@types/Discipline";

interface DisciplinesTableProps {
  disciplines: TDiscipline[];
  isFilterCollapsed?: boolean;
  isInsertedDisciplines?: boolean;
}

export default function DisciplinesTable({
  disciplines,
  isFilterCollapsed = false,
  isInsertedDisciplines = false,
}: DisciplinesTableProps) {
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
            <th className={`${defaultThStyle} w-[10%]`}>Série</th>
            <th className={`${defaultThStyle} w-[40%]`}>Nome</th>
            <th className={`${defaultThStyle} w-[10%]`}>Hora aula</th>
            <th className={`${defaultThStyle} w-[10%]`}>Hora relógio</th>
          </tr>
        </thead>
        <tbody>
          {disciplines &&
            disciplines.map((discipline, index) => (
              <tr
                key={discipline.codigo}
                className={index % 2 === 0 ? "bg-white" : "bg-background"}
              >
                <td className={`${defaultTdStyle} pl-[1.5rem]`}>
                  {discipline.codigo}
                </td>
                <td className={defaultTdStyle}>{discipline.serie}</td>
                <td className={defaultTdStyle}>{discipline.nome}</td>
                <td className={defaultTdStyle}>{discipline.hora_aula}</td>
                <td className={defaultTdStyle}>{discipline.hora_relogio}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
