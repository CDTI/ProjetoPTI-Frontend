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
import { TCourse } from "../../@types/Course";
//Utils
import { filterCourses } from "../../utils/filterCourses";

interface DisciplinesFilter {
  courses: TCourse[];
  isFilterCollapsed: boolean;
  updateFilteredCourses: (newCourses: TCourse[]) => void;
  toggleFilterCollapsbile: () => void;
  resetFilter: () => void;
}

export default function CoursesFilter({
  isFilterCollapsed,
  toggleFilterCollapsbile,
  courses,
  updateFilteredCourses,
  resetFilter,
}: DisciplinesFilter) {
  const fName = useRef<HTMLInputElement>(null);
  const fMecCode = useRef<HTMLInputElement>(null);
  const fSiaaCode = useRef<HTMLInputElement>(null);
  const fCampus = useRef<HTMLInputElement>(null);

  const triggerCollapsibleIcon = isFilterCollapsed ? (
    <CaretDown size={18} color="#000" />
  ) : (
    <CaretUp size={18} color="#000" />
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const filteredCourses = filterCourses(
      courses,
      fName.current?.value, 
      fMecCode.current?.value, 
      fSiaaCode.current?.value, 
      fCampus.current?.value, 
    );
    if (filteredCourses) updateFilteredCourses(filteredCourses);
  };

  const handleResetFilter = () => {
    resetFilter();
    if (fName.current?.value) fName.current.value = "";
    if (fMecCode.current?.value) fMecCode.current.value = "";
    if (fSiaaCode.current?.value) fSiaaCode.current.value = "";
    if (fCampus.current?.value) fCampus.current.value = "";
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
              placeholder="Nome do curso"
              ref={fName}
            />
            <input
              className="w-1/2 p-2 text-sm pl-5 border-[1px] border-gray-300"
              placeholder="Código MEC"
              ref={fMecCode}
            />
            <input
              className="w-1/2 p-2 text-sm pl-3 border-[1px] border-gray-300"
              placeholder="Código SIAA"
              ref={fSiaaCode}
            />
            <input
              className="w-1/12 p-2 text-sm pl-3 border-[1px] border-gray-300"
              placeholder="Unidade"
              ref={fCampus}
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
