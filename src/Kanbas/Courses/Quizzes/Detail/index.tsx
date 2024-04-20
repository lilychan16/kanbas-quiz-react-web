import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addQuiz, deleteQuiz, setQuiz, updateQuiz } from "../quizzesReducer";
import { FaEllipsisV, FaCheckCircle, FaPencilAlt, FaBan } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../../store";
import * as client from "../client";

function QuizDetail() {
    const {quizId} = useParams();
    const quiz = useSelector(
        (state: KanbasState) => state.quizzesReducer.quiz
    );
    const [published, setPublished] = useState(quiz.published);
    console.log(published);

    const { courseId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const quizEditPage = () => {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Edit`);
        console.log("Navigate to quiz edit page");
    };

    const quizPreviewPage = () => {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Preview`);
        console.log("Navigate to quiz preview page");
    };

    const handlePublishUnpublish = () => {
        const newPublished = !published;
        setPublished(newPublished);
        const updatedQuiz = { ...quiz, published: newPublished };
        dispatch(setQuiz(updatedQuiz));
        client.updateQuiz(updatedQuiz).then((status) => {
          dispatch(updateQuiz(updatedQuiz));
        });
    };

    return (
      <div className="ms-5 col-lg-8">
        <div className="d-flex justify-content-end">
          <button
            className={`btn ${
              published ? "btn-danger" : "btn-success"
            } me-1 button-size`}

            onClick={handlePublishUnpublish}
          >
            {published ? "Unpublish" : "Publish"}
          </button>
          <button 
            className="btn btn-secondary me-2 button-color button-size" 
            onClick={quizPreviewPage}>
            Preview
          </button>
          <button
            className="btn btn-secondary me-1 button-color button-size"
            onClick={quizEditPage}
          >
            <FaPencilAlt /> Edit
          </button>
          <button className="btn btn-secondary me-1 button-color button-size">
            <FaEllipsisV />
          </button>
        </div>
        <hr />
        <div>
          <h3>{quiz?.title}</h3>
          <br />
          <table>
            <thead></thead>
            <tbody>
              <tr>
                <td className="text-end">
                  <b>Quiz Type</b>
                </td>
                <td>&nbsp;&nbsp;&nbsp;</td>
                <td>{quiz?.type}</td>
              </tr>
              <tr>
                <td className="text-end">
                  <b>Points</b>
                </td>
                <td>&nbsp;&nbsp;&nbsp;</td>
                <td>{quiz?.points}</td>
              </tr>
              <tr>
                <td className="text-end">
                  <b>Assignment Group</b>
                </td>
                <td>&nbsp;&nbsp;&nbsp;</td>
                <td>{quiz?.assignment_group}</td>
              </tr>
              <tr>
                <td className="text-end">
                  <b>Shuffle Answers</b>
                </td>
                <td>&nbsp;&nbsp;&nbsp;</td>
                <td>{quiz?.shuffle === true ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td className="text-end">
                  <b>Time Limit</b>
                </td>
                <td>&nbsp;&nbsp;&nbsp;</td>
                <td>{quiz?.time_limit} Minutes</td>
              </tr>
              <tr>
                <td className="text-end">
                  <b>Multiple Attempts</b>
                </td>
                <td>&nbsp;&nbsp;&nbsp;</td>
                <td>{quiz?.multiple_attempts === true ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td className="text-end">
                  <b>Show Correct Answers</b>
                </td>
                <td>&nbsp;&nbsp;&nbsp;</td>
                <td>{quiz?.show_correct_answers}</td>
              </tr>
              <tr>
                <td className="text-end">
                  <b>Access Code</b>
                </td>
                <td>&nbsp;&nbsp;&nbsp;</td>
                <td>{quiz?.access_code}</td>
              </tr>
              <tr>
                <td className="text-end">
                  <b>One Question at a Time</b>
                </td>
                <td>&nbsp;&nbsp;&nbsp;</td>
                <td>{quiz?.one_question_at_a_time === true ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td className="text-end">
                  <b>Webcam Required</b>
                </td>
                <td>&nbsp;&nbsp;&nbsp;</td>
                <td>{quiz?.webcam_required === true ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td className="text-end">
                  <b>Lock Questions After Answering</b>
                </td>
                <td>&nbsp;&nbsp;&nbsp;</td>
                <td>
                  {quiz?.lock_questions_after_answering === true ? "Yes" : "No"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <br />
        <div>
          <table style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid lightgray" }}>
                <th style={{ width: "25%", paddingBottom: "5px" }}>Due</th>
                <th style={{ width: "25%", paddingBottom: "5px" }}>For</th>
                <th style={{ width: "35%", paddingBottom: "5px" }}>
                  Available from
                </th>
                <th style={{ width: "25%", paddingBottom: "5px" }}>Until</th>
              </tr>
            </thead>
            <tbody>
              <tr
                style={{
                  borderBottom: "1px solid lightgray",
                }}
              >
                <td style={{ paddingTop: "8px", paddingBottom: "8px" }}>
                  {quiz?.due_date}
                </td>
                <td style={{ paddingTop: "8px", paddingBottom: "8px" }}>
                  Everyone
                </td>
                <td style={{ paddingTop: "8px", paddingBottom: "8px" }}>
                  {quiz?.available_date}
                </td>
                <td style={{ paddingTop: "8px", paddingBottom: "8px" }}>
                  {quiz?.until_date}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default QuizDetail;