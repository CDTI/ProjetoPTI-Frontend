//React
import { ReactElement, useState } from "react";
import { Link } from "react-router-dom";
//Icons
import { CaretDown, CaretUp } from "phosphor-react";
//Radix
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
// Collapsible
export const Collapsible = CollapsiblePrimitive.Root;
export const CollapsibleTrigger = CollapsiblePrimitive.Trigger;
export const CollapsibleContent = CollapsiblePrimitive.Content;

interface SideBarItem {
  item: string;
  itemIcon: ReactElement;
  subItems: {
    name: string;
    path: string;
  }[];
}

export default function SideBarItem({ item, subItems, itemIcon }: SideBarItem) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const triggerCollapsibleIcon = isCollapsed ? (
    <CaretUp size={18} color="#003B71" />
  ) : (
    <CaretDown size={18} color="#003B71" />
  );

  return (
    <Collapsible
      open={isCollapsed}
      onOpenChange={setIsCollapsed}
      className="flex flex-col my-8 "
    >
      <div className="flex gap-2 items-center justify-start w-[80%] mx-auto i">
        {itemIcon}
        <p className=" font-medium text-brandBlue ">{item}</p>
        <CollapsibleTrigger asChild className="ml-4">
          {triggerCollapsibleIcon}
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <div className="mt-2 ml-6">
          {subItems.map((item) => (
            <Link
              to={item.path}
              key={item.name}
              className="mb-2 mt-4 pl-4 text-gray-800 flex"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
