//React
import { FormEvent, useRef } from "react";
//Radix
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
//Icons
import { CaretDown, CaretUp, Trash } from "phosphor-react";
//Types
import { TDiscipline } from "../../@types/Discipline";
//Utils
import { filterDisciplines } from "../../utils/filterDisciplines";

interface DisciplinesFilter {
  disciplines: TDiscipline[];
  isFilterCollapsed: boolean;
  updateFilteredDisciplines: (newDisciplines: TDiscipline[]) => void;
  toggleFilterCollapsbile: () => void;
  resetFilter: () => void;
}

export default function DisciplinesFilter({
  isFilterCollapsed,
  toggleFilterCollapsbile,
  disciplines,
  updateFilteredDisciplines,
  resetFilter,
}: DisciplinesFilter) {
  const fName = useRef<HTMLInputElement>(null);
  const fCode = useRef<HTMLInputElement>(null);
  const fCurso = useRef<HTMLInputElement>(null);
  const fClassHour = useRef<HTMLInputElement>(null);
  const fClockHour = useRef<HTMLInputElement>(null);

  const triggerCollapsibleIcon = isFilterCollapsed ? (
    <CaretDown size={18} color="#000" />
  ) : (
    <CaretUp size={18} color="#000" />
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const filteredDisciplines = filterDisciplines(
      fName.current?.value,
      fCode.current?.value,
      fCurso.current?.value,
      Number(fClassHour.current?.value),
      Number(fClockHour.current?.value),
      disciplines
    );
    if (filteredDisciplines) updateFilteredDisciplines(filteredDisciplines);
  };

  const handleResetFilter = () => {
    resetFilter();
    if (fName.current?.value) fName.current.value = "";
    if (fCode.current?.value) fCode.current.value = "";
    if (fClassHour.current?.value) fClassHour.current.value = "";
    if (fClockHour.current?.value) fClockHour.current.value = "";
    if (fCurso.current?.value) fCurso.current.value = "";
  };

  return (
    <Collapsible
      open={isFilterCollapsed}
      onOpenChange={toggleFilterCollapsbile}
      className="mt-6 mb-6 p-4 w-[90%]  bg-background m-auto"
    >
      <div className="flex items-center justify-between ">
        <p className="text-lg">Filtros</p>
        <CollapsibleTrigger asChild className="ml-4 ">
          {triggerCollapsibleIcon}
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4 ">
          <div className="mb-4 w-full flex gap-4">
            <input
              className="w-1/2 p-2 text-sm pl-5 border-[1px] border-gray-300"
              placeholder="Nome da disciplina"
              ref={fName}
            />
            <input
              className="w-1/2 p-2 text-sm pl-5 border-[1px] border-gray-300"
              placeholder="Nome do curso"
              ref={fCurso}
            />
            <input
              className="w-1/2 p-2 text-sm pl-5 border-[1px] border-gray-300"
              placeholder="Código da disciplina"
              ref={fCode}
            />
            <input
              className="w-1/12 p-2 text-sm pl-3 border-[1px] border-gray-300"
              placeholder="Hora relógio"
              ref={fClockHour}
            />
            <input
              className="w-1/12 p-2 text-sm pl-3 border-[1px] border-gray-300"
              placeholder="Hora aula"
              ref={fClassHour}
            />
          </div>
          <button type="submit" hidden />
        </form>
        <button
          onClick={handleResetFilter}
          className="font-semibold tracking-wide w-full h-10  bg-blue-500 text-white"
        >
          <div className="flex justify-center items-center gap-2">
            <Trash size={20} weight="fill" />
            <p>Remover filtro</p>
          </div>
        </button>
      </CollapsibleContent>
    </Collapsible>
  );
}
