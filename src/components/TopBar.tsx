// Icons
import { List, UserCircle } from "phosphor-react";
import IconButton from "./IconButton";

interface TopBarProps {
  toggleSideBar: () => void;
}
export function TopBar({ toggleSideBar }: TopBarProps) {
  return (
    <div className="flex items-center justify-between w-full h-[72px] bg-brandBlue px-12">
      <IconButton
        onClick={toggleSideBar}
        icon={<List size={32} color="#fff" />}
      />
      <p className="font-sans text-2xl line font-bold leading-none tracking-widest text-white">
        Projeto PTI
      </p>
      <IconButton icon={<UserCircle size={32} color="#fff" />} />
    </div>
  );
}
