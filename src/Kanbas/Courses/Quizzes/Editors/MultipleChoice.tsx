import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate } from "react-router-dom";

function MultipleChoice() {
  console.log("Rendering Multiple Choice");
  const [questionTitle, setQuestionTitle] = useState("Capital Cities Quiz");
  const [points, setPoints] = useState(10);
  const [question, setQuestion] = useState(
    "<p>What is the capital of France?</p>"
  );
  const [choices, setChoices] = useState([
    { text: "Paris", isCorrect: true },
    { text: "London", isCorrect: false },
    { text: "Berlin", isCorrect: false },
    { text: "Madrid", isCorrect: false },
  ]);
  const navigate = useNavigate();

  const handleTitleChange = (e: any) => {
    setQuestionTitle(e.target.value);
  };

  const handlePointsChange = (e: any) => {
    setPoints(e.target.value);
  };

  const handleQuestionChange = (content: any) => {
    setQuestion(content);
  };

  const handleChoiceTextChange = (index: number, e: any) => {
    const newChoices = [...choices];
    newChoices[index].text = e.target.value;
    setChoices(newChoices);
  };

  const handleCorrectAnswerChange = (index: number) => {
    const newChoices = choices.map((choice, idx) => ({
      ...choice,
      isCorrect: idx === index,
    }));
    setChoices(newChoices);
  };

  const addChoice = () => {
    setChoices([...choices, { text: "", isCorrect: false }]);
  };

  const removeChoice = (index: number) => {
    const newChoices = choices.filter((_, i) => i !== index);
    setChoices(newChoices);
  };

  const handleSave = () => {
    // Here you would handle the API call to save the data
    console.log("Saved", { questionTitle, points, question, choices });
  };

  const handleCancel = () => {
    // Optional: Navigate to another route or simply clear the form
    navigate("/");
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
          type="number"
          placeholder="Points"
          value={points}
          onChange={handlePointsChange}
        />
      </div>
      <hr />
      <h5>Question:</h5>
      <Editor
        apiKey="0i3zt6aumj20bavirmshczszr45gz2oza5d9ru6x2y9ucv00"
        value={question}
        onEditorChange={handleQuestionChange}
      />
      <h5>Choices:</h5>
      {choices.map((choice, index) => (
        <div key={index}>
          <input
            type="text"
            value={choice.text}
            onChange={(e) => handleChoiceTextChange(index, e)}
            placeholder="Enter choice text"
          />
          <input
            type="radio"
            name="correctAnswer"
            checked={choice.isCorrect}
            onChange={() => handleCorrectAnswerChange(index)}
          />
          <label>Correct answer</label>
          <button onClick={() => removeChoice(index)}>Remove Choice</button>
        </div>
      ))}
      <button onClick={addChoice}>Add Choice</button>
      <br />
      <br />
      <button onClick={handleCancel}>Cancel</button>
      <button onClick={handleSave}>Save/Update Question</button>
    </div>
  );
}

export default MultipleChoice;
