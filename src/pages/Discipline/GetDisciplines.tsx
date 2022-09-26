//React
import { useEffect, useState } from "react";
//Types
import { TDiscipline } from "../../@types/Discipline";
//Controllers
import { DisciplineController } from "../../api/DisciplineController";
//Components
import DisciplinesFilter from "../../components/GetDisciplines/DisciplinesFilter";
import DisciplinesTable from "../../components/GetDisciplines/DisciplinesTable";

export default function GetDisciplines() {
  const [disciplines, setDisciplines] = useState<TDiscipline[]>([]);
  const [filteredDisciplines, setFilteredDisciplines] = useState<TDiscipline[]>(
    []
  );
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(false);

  const updateFilteredDisciplines = (newDisciplines: TDiscipline[]) => {
    setFilteredDisciplines(newDisciplines);
  };
  const resetFilter = () => setFilteredDisciplines([]);

  const toggleFilterCollapsbile = () =>
    setIsFilterCollapsed(!isFilterCollapsed);

  useEffect(() => {
    async function getDisciplines() {
      await DisciplineController.getInstance()
        .getAll()
        .then((res) => setDisciplines(res));
    }
    getDisciplines();
  }, []);

  return (
    <div className="overflow-hidden">
      <h1 className="text-3xl pl-8 pt-8 font-semibold ">
        Lista das disciplinas
      </h1>

      <DisciplinesFilter
        updateFilteredDisciplines={updateFilteredDisciplines}
        disciplines={disciplines}
        resetFilter={resetFilter}
        isFilterCollapsed={isFilterCollapsed}
        toggleFilterCollapsbile={toggleFilterCollapsbile}
      />
      <DisciplinesTable
        disciplines={
          filteredDisciplines.length > 0 ? filteredDisciplines : disciplines
        }
        isFilterCollapsed={isFilterCollapsed}
      />
    </div>
  );
}
