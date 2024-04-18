import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../store";
import { updateQuiz } from "../Quizzes/quizzesReducer";
import { Editor } from "@tinymce/tinymce-react";

function QuizDetail() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);

  // Single state object to handle all quiz fields
  const [quizData, setQuizData] = useState(quiz);

  // Update local state when the Redux state changes
  useEffect(() => {
    setQuizData(quiz);
  }, [quiz]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setQuizData((prevData: any) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    dispatch(updateQuiz({ ...quizData }));
    navigate("/quiz-details");
  };

  const handleSaveAndPublish = () => {
    dispatch(updateQuiz({ ...quizData, published: true }));
    navigate("/quiz-list");
  };

  const handleCancel = () => {
    navigate("/quiz-list");
  };

  return (
    <form>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={quizData.title}
          onChange={handleChange}
        />
      </label>
      <label>
        Description:
        <Editor
          apiKey="0i3zt6aumj20bavirmshczszr45gz2oza5d9ru6x2y9ucv00"
          initialValue={quizData.description}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
          }}
          onEditorChange={(content) =>
            setQuizData((prevData: any) => ({
              ...prevData,
              description: content,
            }))
          }
        />
      </label>
      <label>
        Quiz Type:
        <select name="quizType" value={quizData.type} onChange={handleChange}>
          <option value="gradedQuiz">Graded Quiz</option>
          <option value="practiceQuiz">Practice Quiz</option>
          <option value="gradedSurvey">Graded Survey</option>
          <option value="ungradedSurvey">Ungraded Survey</option>
        </select>
      </label>
      <label>
        Points:
        <input
          type="number"
          name="points"
          value={quizData.points}
          onChange={handleChange}
        />
      </label>
      <label>
        Assignment Group:
        <select
          name="assignmentGroup"
          value={quizData.assignment_group}
          onChange={handleChange}
        >
          <option value="quizzes">Quizzes</option>
          <option value="exams">Exams</option>
          <option value="assignments">Assignments</option>
          <option value="project">Project</option>
        </select>
      </label>
      <label>
        Shuffle Answers:
        <input
          type="checkbox"
          name="shuffleAnswers"
          checked={quizData.shuffle}
          onChange={handleChange}
        />
      </label>
      <label>
        Time Limit:
        <input
          type="number"
          name="timeLimit"
          value={quizData.time_limit}
          onChange={handleChange}
        />
      </label>
      <label>
        Multiple Attempts:
        <input
          type="checkbox"
          name="multipleAttempts"
          checked={quizData.multiple_attempts}
          onChange={handleChange}
        />
      </label>
      <label>
        Show Correct Answers:
        <input
          type="checkbox"
          name="showCorrectAnswers"
          checked={quizData.show_correct_answers}
          onChange={handleChange}
        />
      </label>
      <label>
        Access Code:
        <input
          type="text"
          name="accessCode"
          value={quizData.access_code}
          onChange={handleChange}
        />
      </label>
      <label>
        One Question at a Time:
        <input
          type="checkbox"
          name="oneQuestionAtATime"
          checked={quizData.one_question_at_a_time}
          onChange={handleChange}
        />
      </label>
      <label>
        Webcam Required:
        <input
          type="checkbox"
          name="webcamRequired"
          checked={quizData.webcam_required}
          onChange={handleChange}
        />
      </label>
      <label>
        Lock Questions After Answering:
        <input
          type="checkbox"
          name="lockQuestionsAfterAnswering"
          checked={quizData.lock_questions_after_answering}
          onChange={handleChange}
        />
      </label>
      <label>
        Available date:
        <input
          type="date"
          name="availableDate"
          value={quizData.available_date}
          onChange={handleChange}
        />
      </label>
      <label>
        Until date:
        <input
          type="date"
          name="untilDate"
          value={quizData.until_date}
          onChange={handleChange}
        />
      </label>
      <button type="button" onClick={handleSave}>
        Save
      </button>
      <button type="button" onClick={handleSaveAndPublish}>
        Save and Publish
      </button>
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
}

export default QuizDetail;
