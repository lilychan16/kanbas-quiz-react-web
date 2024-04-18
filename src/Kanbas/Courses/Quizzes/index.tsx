import { Link } from "react-router-dom";
import { Route, Routes } from "react-router";
import MultipleChoice from "./Editors/MultipleChoice";

function Quizzes() {
  return (
    <div>
      <h1>Quizzes</h1>
      <Link to="MultipleChoice">Create Multiple Choice Question</Link>
      <Routes>
        <Route path="MultipleChoice" element={<MultipleChoice />} />
      </Routes>
    </div>
  );
}

export default Quizzes;
