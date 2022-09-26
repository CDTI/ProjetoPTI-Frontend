import React, { ButtonHTMLAttributes } from "react";
import { InputHTMLAttributes } from "react";
import Select from "react-select";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Form() {}

Form.Container = function Container({ ...props }) {
  return (
    <form {...props} className="max-w-[720px] m-auto mt-8 ">
      {props.children}
    </form>
  );
};

Form.InputContainer = function InputContainer({ ...props }) {
  const isRequired = props.isRequired !== undefined ? props.isRequired : false;

  return (
    <div
      className={`${
        props.class ? props.class : ""
      } flex flex-col justify-start mb-4`}
    >
      <span>
        {isRequired && <span className="pr-1 text-red-600">*</span>}
        {props.label}
      </span>
      {props.children}
    </div>
  );
};

Form.Input = function Input({ ...props }: InputProps) {
  return (
    <input
      {...props}
      className="focus:border-[#2684ff] focus:border-[2px] rounded-[5px] outline-none border-[1px] border-[#B3B3B3] mt-2 p-1.5 pl-4"
    />
  );
};

Form.DoubleInputContainer = function DoubleInputContainer({ ...props }) {
  return <div className="flex w-full gap-4 mt-4">{props.children}</div>;
};

Form.Select = React.forwardRef((props: any, ref: any) => {
  const isRequired = props.isRequired !== undefined ? props.isRequired : false;
  return (
    <div className="flex flex-col justify-start">
      <span>
        {isRequired && <span className="pr-1 text-red-600">*</span>}
        {props.label}
      </span>
      <Select ref={ref} options={props.options} className="mt-3" isMulti />
    </div>
  );
});

Form.Submit = function Submit({ ...props }: ButtonProps) {
  return (
    <button className="mt-4 font-semibold tracking-wide w-full h-10  bg-blue-500 text-white">
      <p className="text-white font-bold">{props.children}</p>
    </button>
  );
};
