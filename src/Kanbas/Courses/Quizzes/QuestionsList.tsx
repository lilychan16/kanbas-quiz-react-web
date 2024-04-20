import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../store";
import { updateQuiz as updateQuizRedux } from "../Quizzes/quizzesReducer";
import { updateQuiz as updateQuizAPI } from "./client";
import MultipleChoice from "./Editors/MultipleChoice";
import Blanks from "./Editors/Blanks";
import TrueFalse from "./Editors/TrueFalse";
import "./QuestionsList.css";

function QuestionsList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);

  const [quizData, setQuizData] = useState(quiz);
  const [showEditor, setShowEditor] = useState(false);
  const [editorType, setEditorType] = useState("MULTIPLE CHOICES");
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  useEffect(() => {
    setQuizData(quiz);
  }, [quiz]);

  const handleSelectQuestion = (question: any, type: string) => {
    setSelectedQuestion(question);
    setEditorType(type);
    setShowEditor(true);
    console.log("Selected", question, type, showEditor);
  };

  const handleSaveNewQuestion = (newQuestion: any) => {
    const updatedQuestions = [...quizData.questions, newQuestion];
    const totalPoints = calculateTotalPoints(updatedQuestions);
    setQuizData({
      ...quizData,
      questions: updatedQuestions,
      points: totalPoints,
    });
    setShowEditor(false);
    setSelectedQuestion(null);
  };

  const handleUpdateQuestion = (updatedQuestion: any) => {
    const updatedQuestions = quizData.questions.map((q: any) => {
      if (q._id === updatedQuestion._id) {
        return updatedQuestion;
      }
      return q;
    });
    const totalPoints = calculateTotalPoints(updatedQuestions);
    setQuizData({
      ...quizData,
      questions: updatedQuestions,
      points: totalPoints,
    });
    setShowEditor(false);
    setSelectedQuestion(null);
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

  const handleEditorCancel = () => {
    setSelectedQuestion(null);
    setShowEditor(false);
  };

  const handleEditorTypeChange = (e: any) => {
    setSelectedQuestion(null);
    setEditorType(e.target.value);
  };

  const calculateTotalPoints = (questions: any) => {
    return questions.reduce(
      (accumulator: number, question: any) => accumulator + question.points,
      0,
    );
  };

  const renderEditor = () => {
    switch (editorType) {
      case "MULTIPLE CHOICES":
        return (
          <MultipleChoice
            question={selectedQuestion}
            onSave={handleSaveNewQuestion}
            onUpdate={handleUpdateQuestion}
            onCancel={handleEditorCancel}
          />
        );
      case "FILL IN BLANKS":
        return (
          <Blanks
            question={selectedQuestion}
            onSave={handleSaveNewQuestion}
            onUpdate={handleUpdateQuestion}
            onCancel={handleEditorCancel}
          />
        );
      case "TRUE OR FALSE":
        return (
          <TrueFalse
            question={selectedQuestion}
            onSave={handleSaveNewQuestion}
            onUpdate={handleUpdateQuestion}
            onCancel={handleEditorCancel}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <br />
      <div>
        {quizData.questions.map((question: any, index: any) => (
          <div
            key={question.id || index}
            onClick={() => handleSelectQuestion(question, question.type)}
            className="quiz-question-link"
          >
            Question {index + 1}: {question.title} - {question.type}
          </div>
        ))}
      </div>
      {!showEditor && (
        <button
          className="btn btn-secondary"
          onClick={() => {
            setEditorType("MULTIPLE CHOICES");
            setShowEditor(true);
          }}
        >
          + New Question
        </button>
      )}
      {showEditor && (
        <>
          <label className="me-2 mt-2" htmlFor="editorType">
            Question Type:
          </label>
          <select
            name="editorType"
            value={editorType}
            onChange={handleEditorTypeChange}
          >
            <option value="MULTIPLE CHOICES">Multiple Choice</option>
            <option value="FILL IN BLANKS">Fill In The Blanks</option>
            <option value="TRUE OR FALSE">True/False</option>
          </select>
          {renderEditor()}{" "}
        </>
      )}
      <hr />
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
      <hr />
    </div>
  );
}

export default QuestionsList;
