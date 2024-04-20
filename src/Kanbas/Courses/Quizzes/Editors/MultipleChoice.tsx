import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

interface Choice {
  text: string;
  _id?: string; // Optional, as new choices might not have an ID initially
}

interface MultipleChoiceProps {
  onSave: (newQuestion: any) => void;
  onCancel: () => void;
}

function MultipleChoice({ onSave, onCancel }: MultipleChoiceProps) {
  const [questionTitle, setQuestionTitle] = useState("");
  const [points, setPoints] = useState(1);
  const [question, setQuestion] = useState("");
  const [choices, setChoices] = useState<Choice[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<string>("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionTitle(e.target.value);
  };

  const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPoints(Number(e.target.value));
  };

  const handleQuestionChange = (content: string) => {
    setQuestion(content);
  };

  const handleChoiceTextChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newChoices = [...choices];
    newChoices[index].text = e.target.value;
    setChoices(newChoices);
  };

  const handleCorrectAnswerChange = (choiceText: string) => {
    setCorrectAnswer(choiceText);
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
      question_content: question,
      choices: choices.map((choice) => ({ content: choice.text })),
      answers: [{ content: correctAnswer }],
      type: "MULTIPLE CHOICES",
    };
    onSave(newQuestion);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div>
      <h1>Multiple Choice Question Editor</h1>
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
      <Editor
        apiKey="0i3zt6aumj20bavirmshczszr45gz2oza5d9ru6x2y9ucv00"
        value={question}
        onEditorChange={handleQuestionChange}
      />
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
            checked={correctAnswer === choice.text}
            onChange={() => handleCorrectAnswerChange(choice.text)}
          />
          <button onClick={() => removeChoice(index)}>Remove</button>
        </div>
      ))}
      <button className="btn btn-primary" onClick={addChoice}>
        Add Choice
      </button>
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
