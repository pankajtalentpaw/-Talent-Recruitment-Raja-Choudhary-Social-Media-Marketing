import type { ButtonHTMLAttributes } from "react";
import { classNames } from "@/utils/classNames";

export function Button({
  className,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={classNames("cursor-pointer font-outfit", className)}
      {...props}
    />
  );
}
