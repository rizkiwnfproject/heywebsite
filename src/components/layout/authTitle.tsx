import React from "react";

interface AuthTitleProps {
  title: string;
  subtitle: string;
}

const AuthTitle = ({ title, subtitle }: AuthTitleProps) => {
  return (
    <>
      <div className="title flex flex-col gap-1">
        <h1 className="font-bold text-[32px] leading-[48px] ">{title}</h1>
        <p className="font-medium text-sm md:text-lg leading-[27px] ">
          {subtitle}
        </p>
      </div>
    </>
  );
};

export default AuthTitle;
