import React, { useState } from "react";
import "./index.css";
import { modules } from "../../Database";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle, FaPlus } from "react-icons/fa";
import { useParams } from "react-router";

function ModuleList() {
  const { courseId } = useParams();
  const modulesList = modules.filter((module) => module.course === courseId);
  const [selectedModule, setSelectedModule] = useState(modulesList[0]);
  
  return (
    <div className="ms-3 col-lg-10">
      <div className="d-flex justify-content-end">
        <button className="btn btn-secondary me-1 button-color">
          Collapse All
        </button>
        <button className="btn btn-secondary me-1 button-color">
          View Progress
        </button>
        <select className="me-1 button-color dropdown">
          <option>Publish All</option>
          <option>Unpublish All</option>
        </select>
        <button className="btn btn-danger me-1 plus-icon">
          <FaPlus /> Module
        </button>
        <button className="btn btn-secondary me-1 button-color">
          <FaEllipsisV />
        </button>
      </div>
      <hr />
      <ul className="list-group wd-modules">
        {modulesList.map((module) => (
          <li
            className="list-group-item"
            onClick={() => setSelectedModule(module)}
          >
            <div>
              <FaEllipsisV className="me-2" />
              {module.name}
              <span className="float-end">
                <FaCheckCircle className="text-success" />
                <FaPlusCircle className="ms-2" />
                <FaEllipsisV className="ms-2" />
              </span>
            </div>
            {selectedModule._id === module._id && (
              <ul className="list-group">
                {module.lessons?.map((lesson) => (
                  <li className="list-group-item">
                    <FaEllipsisV className="me-4" />
                    {lesson.name}
                    <span className="float-end">
                      <FaCheckCircle className="text-success" />
                      <FaEllipsisV className="ms-2" />
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ModuleList;
