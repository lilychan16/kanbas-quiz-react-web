import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

interface MultipleChoiceProps {
  onSave: any;
  onCancel: any;
}

function MultipleChoice({ onSave, onCancel }: MultipleChoiceProps) {
  console.log("Rendering Multiple Choice");
  const [questionTitle, setQuestionTitle] = useState("Capital Cities Quiz");
  const [points, setPoints] = useState(1);
  const [question, setQuestion] = useState(
    "<p>What is the capital of France?</p>",
  );
  const [choices, setChoices] = useState([
    { text: "Paris" },
    { text: "London" },
    { text: "Berlin" },
    { text: "Madrid" },
  ]);
  const [correctAnswer, setCorrectAnswer] = useState<string[]>([]);

  const handleTitleChange = (e: any) => {
    setQuestionTitle(e.target.value);
  };

  const handlePointsChange = (e: any) => {
    setPoints(e.target.value);
  };

  const handleQuestionChange = (content: string) => {
    setQuestion(content);
  };

  const handleChoiceTextChange = (index: number, e: any) => {
    const newChoices = [...choices];
    newChoices[index].text = e.target.value;
    setChoices(newChoices);
  };

  const handleCorrectAnswerChange = (e: string) => {
    setCorrectAnswer([e]);
  };

  const addChoice = () => {
    setChoices([...choices, { text: "" }]);
  };

  const removeChoice = (index: number) => {
    const newChoices = choices.filter((_, i) => i !== index);
    setChoices(newChoices);
  };

  const handleSave = () => {
    const newQuestion = {
      title: questionTitle,
      points: points,
      description: question,
      choices: choices.map((choice) => choice.text),
      correctAnswer: correctAnswer,
    };
    onSave(newQuestion);
    console.log("Saved", {
      questionTitle,
      points,
      question,
      choices,
      correctAnswer,
    });
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div>
      <h1>Multiple Choice Question Editor</h1>
      <div>
        <input
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
      <h5>Question:</h5>
      <Editor
        apiKey="0i3zt6aumj20bavirmshczszr45gz2oza5d9ru6x2y9ucv00"
        value={question}
        onEditorChange={handleQuestionChange}
      />
      <br />
      <h5>Choices:</h5>
      {choices.map((choice, index) => (
        <div key={index}>
          <input
            className="me-2"
            type="text"
            value={choice.text}
            onChange={(e) => handleChoiceTextChange(index, e)}
            placeholder="Enter choice text"
          />
          <input
            className="me-1"
            type="radio"
            name="correctAnswer"
            id={`correctAnswer-${index}`}
            onChange={() => handleCorrectAnswerChange(choice.text)}
          />
          <label className="me-2" htmlFor={`correctAnswer-${index}`}>
            Correct answer
          </label>
          <button
            className="btn btn-danger mb-2"
            onClick={() => removeChoice(index)}
          >
            Remove Choice
          </button>
        </div>
      ))}
      <button className="btn btn-primary" onClick={addChoice}>
        Add Choice
      </button>
      <br />
      <br />
      {/*Button to cancel and save the question*/}
      <button className="btn btn-secondary me-2" onClick={handleCancel}>
        Cancel
      </button>
      <button className="btn btn-success" onClick={handleSave}>
        Update Question
      </button>
    </div>
  );
}

export default MultipleChoice;
