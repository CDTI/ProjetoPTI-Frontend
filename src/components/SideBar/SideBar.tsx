//Motion
import { motion } from "framer-motion";
//Icons
import { Atom, GraduationCap, MicrosoftExcelLogo } from "phosphor-react";
//Components
import SideBarItem from "./SideBarItem";

interface SideBarProps {
  isOpen: boolean;
}
export function SideBar({ isOpen }: SideBarProps) {
  const sideBarWidth = isOpen ? { width: "220px" } : { width: "0px" };
  const transition = { duration: 0.5, ease: [0, 0.71, 0.2, 1.01] };

  return (
    <div className="bg-white h-[calc(100vh-72px)]">
      <motion.div animate={sideBarWidth} transition={transition}>
        {isOpen &&
          subItems.map((item) => {
            return (
              <SideBarItem
                key={item.name}
                item={item.name}
                itemIcon={item.icon}
                subItems={item.subItems}
              />
            );
          })}
      </motion.div>
    </div>
  );
}

const subItems = [
  {
    name: "Disciplinas",
    icon: <Atom size={24} color="#003B71" />,
    subItems: [
      {
        name: "Inserir disciplina",
        path: "/create/discipline",
      },
      {
        name: "Buscar disciplina",
        path: "/get/discipline",
      },
    ],
  },
  {
    name: "Cursos",
    icon: <GraduationCap size={24} color="#003B71" />,
    subItems: [
      {
        name: "Inserir cursos",
        path: "/create/course",
      },
      {
        name: "Buscar curso",
        path: "/get/course",
      },
    ],
  },
  {
    name: "Matrizes",
    icon: <MicrosoftExcelLogo size={24} color="#003B71" />,
    subItems: [
      {
        name: "Inserir matrizes",
        path: "/create/matrix",
      },
      {
        name: "Buscar matriz",
        path: "/get/matrix",
      },
    ],
  },
];
