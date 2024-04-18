import React from "react";
import { NavLink, Routes, Route, useLocation } from "react-router-dom";
import MultipleChoice from "./Editors/MultipleChoice";
import QuizEditor from "./QuizEditor";

function Quizzes() {
  const location = useLocation();

  // Function to determine class name based on current location
  const getNavLinkClass = (path: any) => {
    return `nav-link ${location.pathname.includes(path) ? "active" : ""}`;
  };

  return (
    <div>
      <h1>Quizzes</h1>
      <nav className="nav nav-tabs mt-2">
        <NavLink
          to="EditDetails"
          className={() => getNavLinkClass("EditDetails")}
        >
          Details
        </NavLink>
        <NavLink
          to="MultipleChoice"
          className={() => getNavLinkClass("MultipleChoice")}
        >
          Questions
        </NavLink>
      </nav>

      <Routes>
        <Route path="EditDetails" element={<QuizEditor />} />
        <Route path="MultipleChoice" element={<MultipleChoice />} />
      </Routes>
    </div>
  );
}

export default Quizzes;
