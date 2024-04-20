import React, { useState } from "react";
import MultipleChoice from "./Editors/MultipleChoice";
import Blanks from "./Editors/Blanks";
import TrueFalse from "./Editors/TrueFalse";

function QuestionsList() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [editorType, setEditorType] = useState("MultipleChoice"); // Default editor

  const handleAddQuestion = () => {
    setShowEditor(true);
    setEditorType("MultipleChoice"); // Default to 'MultipleChoice' when adding a new question
  };

  const handleEditorTypeChange = (type: any) => {
    setEditorType(type);
  };

  const handleSaveQuestion = (newQuestion: any) => {
    setQuestions([...questions, newQuestion]);
    setShowEditor(false);
  };

  const renderEditor = () => {
    switch (editorType) {
      case "MultipleChoice":
        return (
          <MultipleChoice
            onSave={handleSaveQuestion}
            onCancel={() => setShowEditor(false)}
          />
        );
      case "Blanks":
        return (
          <Blanks
            onSave={handleSaveQuestion}
            onCancel={() => setShowEditor(false)}
          />
        );
      case "TrueFalse":
        return (
          <TrueFalse
            onSave={handleSaveQuestion}
            onCancel={() => setShowEditor(false)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {!showEditor && (
        <button className="btn btn-primary" onClick={handleAddQuestion}>
          + New Question
        </button>
      )}
      {showEditor && (
        <>
          <label className="me-2 mt-2" htmlFor="editorType">
            New Question Type:
          </label>
          <select
            name="editorType"
            value={editorType}
            onChange={(e) => handleEditorTypeChange(e.target.value)}
          >
            <option value="MultipleChoice">Multiple Choice</option>
            <option value="Blanks">Fill In The Blanks</option>
            <option value="TrueFalse">True/False</option>
          </select>
          {renderEditor()}
        </>
      )}
      {!showEditor && questions.length > 0 && (
        <div>
          {questions.map((question, index) => (
            <div key={index}>
              {/* Display the question here */}
              Question {index + 1}
              {/* You can render the MultipleChoice component here with question details if needed */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default QuestionsList;
