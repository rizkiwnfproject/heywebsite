import React, { ReactNode } from "react";

interface FormGridRowProps {
  label: string;
  children: ReactNode;
  align?: "center" | "start";
}

const FormGridRow = ({
  label,
  children,
  align = "center",
}: FormGridRowProps) => {
  return (
    <>
      <div className={`grid grid-cols-6 items-${align} gap-2`}>
        <div className="col-span-2 font-semibold">{label}</div>
        <div className="col-span-4">{children}</div>
      </div>
    </>
  );
};

export default FormGridRow;
