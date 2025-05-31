import React from "react";
import { useNavigate } from "react-router-dom";

const Heading = ({ heading, subHeading, buttonName, link }) => {
    const navigation = useNavigate();
  return (
    <header className="flex justify-between flex-wrap items-center mb-6">
      <h1 className="text-2xl font-semibold text-secondary">
      {heading} <span className="text-[#FD4960]">{subHeading}</span>{" "}
      </h1>
      {buttonName && <button
        className="bg-rose p-3 py-2 rounded-lg"
        onClick={() => navigation(link)}
      >
        {buttonName}
      </button>}
    </header>
  );
};

export default Heading;
