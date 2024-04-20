import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../store";
import { updateQuiz as updateQuizRedux } from "../Quizzes/quizzesReducer";
import { updateQuiz as updateQuizAPI } from "./client";
import MultipleChoice from "./Editors/MultipleChoice";
import Blanks from "./Editors/Blanks";
import TrueFalse from "./Editors/TrueFalse";

function QuestionsList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);

  const [quizData, setQuizData] = useState(quiz);
  const [showEditor, setShowEditor] = useState(false);
  const [editorType, setEditorType] = useState("MultipleChoice");

  useEffect(() => {
    setQuizData(quiz);
  }, [quiz]);

  const handleSaveQuestion = (newQuestion: any) => {
    const updatedQuestions = [...quizData.questions, newQuestion];
    setQuizData({ ...quizData, questions: updatedQuestions });
    setShowEditor(false);
  };

  const handleSave = async () => {
    try {
      const updatedQuiz = await updateQuizAPI(quizData);
      dispatch(updateQuizRedux(updatedQuiz));
      navigate(`/Kanbas/Courses/${quiz.course}/Quizzes`);
    } catch (error) {
      console.error("Error updating quiz:", error);
    }
  };

  const handleSaveAndPublish = async () => {
    try {
      const updatedQuizData = { ...quizData, published: true };
      const updatedQuiz = await updateQuizAPI(updatedQuizData);
      dispatch(updateQuizRedux(updatedQuiz));
      navigate(`/Kanbas/Courses/${quiz.course}/Quizzes`);
    } catch (error) {
      console.error("Error updating quiz and publish:", error);
    }
  };

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${quiz.course}/Quizzes`);
  };

  const handleEditorTypeChange = (e: any) => {
    setEditorType(e.target.value);
  };

  const renderEditor = () => {
    switch (editorType) {
      case "MultipleChoice":
        return (
          <MultipleChoice
            onSave={handleSaveQuestion}
            onCancel={() => setShowEditor(false)}
          />
        );
      case "Blanks":
        return (
          <Blanks
            onSave={handleSaveQuestion}
            onCancel={() => setShowEditor(false)}
          />
        );
      case "TrueFalse":
        return (
          <TrueFalse
            onSave={handleSaveQuestion}
            onCancel={() => setShowEditor(false)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {!showEditor && (
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditorType("MultipleChoice");
            setShowEditor(true);
          }}
        >
          + New Question
        </button>
      )}
      {showEditor && (
        <>
          <label className="me-2 mt-2" htmlFor="editorType">
            New Question Type:
          </label>
          <select
            name="editorType"
            value={editorType}
            onChange={handleEditorTypeChange}
          >
            <option value="MultipleChoice">Multiple Choice</option>
            <option value="Blanks">Fill In The Blanks</option>
            <option value="TrueFalse">True/False</option>
          </select>
          {renderEditor()}{" "}
        </>
      )}
      <div>
        {quizData.questions.map((question: any, index: any) => (
          <div key={index}>
            Question {index + 1}: {question.title} - {question.type}
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-end gap-1">
        <button
          type="button"
          onClick={handleCancel}
          className="btn btn-secondary"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSaveAndPublish}
          className="btn btn-secondary"
        >
          Save & Publish
        </button>
        <button type="button" onClick={handleSave} className="btn btn-danger">
          Save
        </button>
      </div>
    </div>
  );
}

export default QuestionsList;
