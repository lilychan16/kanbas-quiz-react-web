import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { RadioGroup, Radio } from "react-radio-group";
import "./TrueFalse.css";
import { useNavigate } from "react-router-dom";

interface TrueFalseProps {
  onSave: any;
  onCancel: any;
}

function TrueFalse({ onSave, onCancel }: TrueFalseProps) {
  const [questionTitle, setQuestionTitle] = useState("");
  const [points, setPoints] = useState();
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const navigate = useNavigate();

  const handleTitleChange = (e: any) => {
    setQuestionTitle(e.target.value);
  };

  const handlePointsChange = (e: any) => {
    setPoints(e.target.value);
  };

  const handleQuestionChange = (e: any) => {
    setQuestion(e.target.value);
  };

  const handleCorrectAnswerChange = (e: any) => {
    setCorrectAnswer(e.target.value);
  };

  const handleSave = () => {
    // Here you would handle the API call to save the data
    console.log("Saved", { questionTitle, points, question });
  };

  const handleCancel = () => {
    // Optional: Navigate to another route or simply clear the form
    navigate("/");
  };

  return (
    <div>
      <h1>TrueFalse</h1>
      {/*Top bar with question title, question type, and points*/}
      <div>
        <input
          className="me-2"
          type="text"
          placeholder="Question Title"
          value={questionTitle}
          onChange={handleTitleChange}
        />
        <input
          className="float-end"
          type="number"
          placeholder="Points"
          value={points}
          onChange={handlePointsChange}
        />
        <label className="float-end me-2" htmlFor="Points">
          Points:
        </label>
      </div>
      <hr />
      <div>
        <h6>
          Enter your question text, then select if True or False is the correct
          answer.
        </h6>
        <h5>Question:</h5>
        {/*TinyMCE Editor*/}
        <Editor
          apiKey="e1ioznczok5yus73u6oqwh6dbb6gszw6rln4i87qmz9y4hc2"
          value={question}
          onEditorChange={handleQuestionChange}
        />
        <br />
        {/*Radio Buttons for the correct answer*/}
        <h5>The Correct Answer:</h5>
        <RadioGroup
          name="CorrectAnswer"
          className="radio-button-group"
          onChange={handleCorrectAnswerChange}
        >
          <label>
            <Radio value="True" />
            True
          </label>
          <br />
          <label>
            <Radio value="False" />
            False
          </label>
        </RadioGroup>
        <br />
        {/*Button to cancel and save the question*/}
        <button className="btn btn-secondary me-2">Cancel</button>
        <button className="btn btn-success">Update Question</button>
      </div>
    </div>
  );
}

export default TrueFalse;
