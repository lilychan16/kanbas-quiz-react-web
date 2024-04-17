import { Link } from "react-router-dom";
import { Route, Routes } from "react-router";
import TrueFalse from "./Editors/TrueFalse";
import Blanks from "./Editors/Blanks";

function quizzes() {
  return (
    <div>
      <h1>Quizzes</h1>
      <Link to="TrueFalse">True/False Quiz</Link>
      <br />
      <Link to="Blanks">Blanks</Link>

      <Routes>
        <Route path="TrueFalse" element={<TrueFalse />} />
        <Route path="Blanks" element={<Blanks />} />
      </Routes>
    </div>
  );
}

export default quizzes;
