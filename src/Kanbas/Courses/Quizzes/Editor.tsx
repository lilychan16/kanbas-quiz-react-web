import React from "react";
import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import MultipleChoice from "./Editors/MultipleChoice";
import QuizEditor from "./QuizEditor";
import { useSelector } from "react-redux";
import { KanbasState } from "../../store";
import { FaCheckCircle, FaBan } from "react-icons/fa";

function Editor() {
  const quizData = useSelector(
    (state: KanbasState) => state.quizzesReducer.quiz
  );
  console.log(quizData);
  return (
    <div>
      <div className="d-flex justify-content-end align-items-center mb-3">
        <h3 className="me-3">Points: {quizData.points}</h3>
        <h3 style={{ color: quizData.published ? "green" : "grey" }}>
          {quizData.published ? (
            <>
              <FaCheckCircle /> published
            </>
          ) : (
            <>
              <FaBan /> Not published
            </>
          )}
        </h3>
      </div>
      <hr />
      <nav className="nav nav-tabs mt-2">
        <NavLink
          to="EditDetails"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Details
        </NavLink>
        <NavLink
          to="MultipleChoice"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Questions
        </NavLink>
      </nav>

      <Routes>
        <Route index element={<Navigate replace to="EditDetails" />} />
        <Route path="EditDetails" element={<QuizEditor />} />
        <Route path="MultipleChoice" element={<MultipleChoice />} />
      </Routes>
    </div>
  );
}

export default Editor;
