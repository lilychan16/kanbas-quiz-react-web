import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./index.css";
import {
  FaCheckCircle,
  FaEllipsisV,
  FaPlusCircle,
  FaPlus,
  FaClipboard,
} from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import db from "../../Database";
import {
  addQuiz,
  deleteQuiz,
  updateQuiz,
  setQuiz,
  setQuizzes,
} from "./quizzesReducer";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../store";
import * as client from "./client";

function Quizzes() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const quizList = useSelector(
    (state: KanbasState) => state.quizzesReducer.quizzes
  ).filter((quiz) => quiz.course === courseId);

  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);

  const newQuizPage = () => {
    const newQuiz = {
      title: "New Quiz",
      type: "GRADED QUIZ",
      assignment_group: "QUIZZES",
      shuffle: true,
      time_limit: 20,
      multiple_attempts: false,
      show_correct_answers: "AFTER DEADLINE",
      one_question_at_a_time: true,
      webcam_required: false,
      lock_questions_after_answering: false,
      due_date: "2024-01-31",
      available_date: "2024-01-01",
      until_date: "2024-01-31",
      points: "100",
      questions: [],
    };
    client.createQuiz(courseId, newQuiz).then((quiz) => {
      console.log(quiz);
      dispatch(addQuiz(quiz));
    });
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/New`);
    console.log("Navigate to new quiz page");
  };

  // Use a state to store the correct quiz id to be deleted.
  // Otherwise, the deletion dialog Modal will use the wrong quiz id
  // (which is always the last quiz id in the quiz list executed).
  const [quizIdToDelete, setQuizIdToDelete] = useState(null);
  const [dialogShow, setDialogShow] = useState(false);

  const handleDialogClose = () => setDialogShow(false);

  const handleDeleteClick = (quizId: any) => {
    dispatch(setQuiz({ _id: quizId }));
    console.log(quiz);
    setQuizIdToDelete(quizId);
    setDialogShow(true);
  };

  const handleDeleteConfirmation = () => {
    client.deleteQuiz(quizIdToDelete).then((status) => {
      dispatch(deleteQuiz(quizIdToDelete));
      console.log(quizIdToDelete);
      handleDialogClose();
    });
  };

  useEffect(() => {
    client.findQuizzesForCourse(courseId).then((quizzes) => {
      dispatch(setQuizzes(quizzes));
      console.log(quizzes);
    });
  }, [courseId]);

  return (
    <div className="ms-3 col-lg-10">
      <div className="d-flex justify-content-between">
        <div className="me-2">
          <input
            type="text"
            className="form-control ms-1"
            placeholder="Search for Quiz"
            id="search-quiz"
          />
        </div>
        <div className="float-end">
          <button className="btn btn-danger me-1" onClick={newQuizPage}>
            <FaPlus /> Quiz
          </button>
          <button className="btn btn-secondary me-1 button-color button-size">
            <FaEllipsisV />
          </button>
        </div>
      </div>
      <hr />
      <ul className="list-group wd-modules">
        <li className="list-group-item">
          <div>
            <FaEllipsisV className="me-2" /> QUIZZES
          </div>
          <ul className="list-group">
            {quizList.map((quiz) => (
              <li className="list-group-item">
                <div className="d-flex justify-content-between">
                  <div>
                    <FaEllipsisV className="me-2" />
                    <FaClipboard className="me-4" style={{ color: "green" }} />
                    <Link
                      to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz.id}`}
                      className="quiz-setup"
                      onClick={() => dispatch(setQuiz(quiz))}
                    >
                      <b>{quiz.title}</b> <br />
                      <p className="due-info">
                        Week starting on {quiz.available_date} | <b>Due</b>{" "}
                        {quiz.due_date} at 11:59pm | {quiz.points}pts
                      </p>
                    </Link>
                  </div>
                  <div className="float-end">
                    <button
                      className="btn btn-danger"
                      style={{ height: "30px", fontSize: "14px" }}
                      onClick={() => handleDeleteClick(quiz._id)}
                    >
                      Delete
                    </button>
                    <FaCheckCircle className="ms-2 text-success" />
                    <FaEllipsisV className="ms-2" />
                  </div>
                  <Modal show={dialogShow} onHide={handleDialogClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Delete Quiz?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Do you want to delete this quiz?</Modal.Body>
                    <Modal.Footer>
                      <button
                        className="btn btn-danger"
                        onClick={handleDeleteConfirmation}
                      >
                        Yes
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={handleDialogClose}
                      >
                        Cancel
                      </button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default Quizzes;
