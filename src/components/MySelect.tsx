import { CaretDown, X } from "phosphor-react";
import { useState } from "react";
import {
  useController,
  UseControllerProps,
  useFormContext,
} from "react-hook-form";
import IconButton from "./IconButton";

type OptionSelect = {
  nome: string;
  id: string;
};

interface MySelect {
  options: OptionSelect[];
  controllerProps: UseControllerProps<any>;
  label?: string;
  placeHolder: string;
}

export default function MySelect({ options, controllerProps, placeHolder, label }: MySelect) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { field } = useController(controllerProps);
  const { setValue } = useFormContext();

  function handleSelectCourse(course: string) {
    setValue(controllerProps.name, [...(field.value as string[]), course]);
    setIsCollapsed(false);
  }

  function handleRemoveCourse(course: string) {
    setValue(
      controllerProps.name,
      [...(field.value as string[])].filter((i) => i !== course)
    );
  }

  function courseAlreadySelected(course: string) {
    return (field.value as string[]).some((option) => option === course);
  }

  function handleBlur() {
    setTimeout(() => setIsCollapsed(!isCollapsed), 500);
  }
  return (
    <div className="flex flex-col justify-start  mb-2 w-full">
      <label>{label}</label>
      <div className="flex relative">
        <input
          {...field}
          autoComplete="off"
          onFocus={() => setIsCollapsed(!isCollapsed)}
          onBlur={handleBlur}
          className={`text-[0px] h-[40px] w-full rounded-[5px] outline-none border-[1px] border-[#B3B3B3] mt-2 p-1.5 pl-4 ${
            isCollapsed ? "border-[#2684ff] border-[2px]" : ""
          }`}
        />
        <div className="absolute top-[15px] left-3 flex h-[26px] items-center gap-x-1">
          {(field.value as string[]).length > 0 ? (
            (field.value as string[]).map((option) => (
              <div
                key={option}
                className="rounded-sm bg-[#e6e6e6] pl-[6px] h-[100%] w-[100%] flex items-center"
              >
                <p className="whitespace-nowrap text-sm mr-2 text-[#333333]">
                  {option}
                </p>
                <button
                  onClick={() => handleRemoveCourse(option)}
                  className="group cursor-pointer hover:bg-[#FFBDAD] hover:first h-[100%] flex items-center rounded-r-[2px] w-[20px] justify-center"
                >
                  <X
                    className="group-hover:text-[#DE350B] "
                    size={12}
                    weight="bold"
                  />
                </button>
              </div>
            ))
          ) : (
            <p
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="select-none text-md text-gray-400 pl-1"
            >
              {placeHolder}
            </p>
          )}
        </div>
        <div className="absolute right-[35px] top-[15px] h-6 w-[1px] bg-gray-300 ">
          <IconButton
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="pl-2 pt-[3.5px]"
            icon={<CaretDown size={18} color="gray" />}
          />
        </div>
      </div>
      {isCollapsed && (field.value as string[]).length < options.length && (
        <div className="shadow-lg w-full border-[1px] rounded-md border-gray-300 mt-2 flex flex-col">
          {options.map((option) => {
            if (!courseAlreadySelected(option.nome)) {
              return (
                <div
                  onClick={() => handleSelectCourse(option.nome)}
                  key={option.nome}
                  className="w-full p-2.5 hover:bg-selectHover"
                >
                  <p className="text">{option.nome}</p>
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
}
