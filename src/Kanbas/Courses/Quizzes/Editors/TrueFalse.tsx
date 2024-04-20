import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";

interface TrueFalseProps {
  onSave: any;
  onCancel: any;
}

function TrueFalse({ onSave, onCancel }: TrueFalseProps) {
  const [questionTitle, setQuestionTitle] = useState("");
  const [points, setPoints] = useState(1);
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState<string[]>([]);

  const handleTitleChange = (e: any) => {
    setQuestionTitle(e.target.value);
  };

  const handlePointsChange = (e: any) => {
    setPoints(e.target.value);
  };

  const handleQuestionChange = (e: string) => {
    setQuestion(e);
  };

  const handleCorrectAnswerChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    setCorrectAnswer([value]);
  };

  const handleSave = () => {
    const newQuestion = {
      title: questionTitle,
      points: points,
      description: question,
      correctAnswer: correctAnswer,
    };
    onSave(newQuestion);
    console.log("Saved", { questionTitle, points, question, correctAnswer });
  };

  const handleCancel = () => {
    onCancel();
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
        <FormControl component="fieldset">
          <RadioGroup
            name="CorrectAnswer"
            value={correctAnswer}
            onChange={handleCorrectAnswerChange}
          >
            <FormControlLabel value="True" control={<Radio />} label="True" />
            <FormControlLabel value="False" control={<Radio />} label="False" />
          </RadioGroup>
        </FormControl>
        <br />
        {/*Button to cancel and save the question*/}
        <button className="btn btn-secondary me-2" onClick={handleCancel}>
          Cancel
        </button>
        <button className="btn btn-success" onClick={handleSave}>
          Update Question
        </button>
      </div>
    </div>
  );
}

export default TrueFalse;