import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

interface BlanksProps {
  onSave: any;
  onCancel: any;
}

function Blanks({ onSave, onCancel }: BlanksProps) {
  const [questionTitle, setQuestionTitle] = useState("");
  const [points, setPoints] = useState(1);
  const [question, setQuestion] = useState("");
  const [blanks, setBlanks] = useState([{ answer: "" }]); // Each blank has one answer

  const handleTitleChange = (e: any) => {
    setQuestionTitle(e.target.value);
  };

  const handlePointsChange = (e: any) => {
    setPoints(e.target.value);
  };

  const handleQuestionChange = (e: string) => {
    setQuestion(e);
  };

  const handleAnswerChange = (index: number, e: any) => {
    const newBlanks = [...blanks];
    newBlanks[index].answer = e.target.value;
    setBlanks(newBlanks);
  };

  const addBlank = () => {
    setBlanks([...blanks, { answer: "" }]);
  };

  const removeBlank = (index: number) => {
    const newBlanks = blanks.filter((_, i) => i !== index);
    setBlanks(newBlanks);
  };

  const handleSave = () => {
    const newQuestion = {
      title: questionTitle,
      points: points,
      description: question,
      answers: blanks.map((blank) => blank.answer),
    };
    onSave(newQuestion);
    console.log("Saved", { questionTitle, points, question, blanks });
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div>
      <h1>Blanks</h1>
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
          Enter your question text with blanks, then define correct answers for
          each blank. <br /> Students will see the question followed by a small
          text box to type their answer. <br /> Example questions with their
          corresponding blanks:
          <br />2 + 2 = __1__
          <br />4 + 4 = __2__
        </h6>
        <h5>Question:</h5>
        <Editor
          apiKey="e1ioznczok5yus73u6oqwh6dbb6gszw6rln4i87qmz9y4hc2"
          value={question}
          onEditorChange={handleQuestionChange}
        />
        <br />
        <h5>Answers:</h5>
        {blanks.map((blank, index) => (
          <div key={index}>
            <label>{`Answer for Blank ${index + 1}: `}</label>
            <input
              className="ms-2 me-2"
              type="text"
              value={blank.answer}
              onChange={(e) => handleAnswerChange(index, e)}
              placeholder="Enter a correct answer"
            />
            <button
              className="btn btn-danger mb-2"
              onClick={() => removeBlank(index)}
            >
              Remove Blank
            </button>
          </div>
        ))}
        <button className="btn btn-primary" onClick={addBlank}>
          Add Blank
        </button>
        <br />
        <br />
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

export default Blanks;
