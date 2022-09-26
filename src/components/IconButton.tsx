//React
import { ButtonHTMLAttributes, ReactElement } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactElement;
}

export default function IconButton({ icon, ...props }: IconButtonProps) {
  return <button {...props}>{icon}</button>;
}
