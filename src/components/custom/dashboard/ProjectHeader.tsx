import React from "react";
import CreateProjectButton from "./CreateProjectButton";

const ProjectHeader = () => {
  return (
    <section className="w-full my-10">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="leading-10">
          <h1 className="text-3xl">Projects</h1>
          <p>Manage your website projects and start creating</p>
        </div>
        <CreateProjectButton />
      </div>
    </section>
  );
};

export default ProjectHeader;
