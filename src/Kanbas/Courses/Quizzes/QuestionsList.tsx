import React, { useState } from "react";
import MultipleChoice from "./Editors/MultipleChoice";

function QuestionsList() {
  const [questions, setQuestions] = useState([]);
  const [showMultipleChoiceEditor, setShowMultipleChoiceEditor] =
    useState(false);

  const handleAddQuestion = () => {
    setShowMultipleChoiceEditor(true); // When button is clicked, show the MultipleChoice editor
  };

  const handleSaveQuestion = () => {
    setShowMultipleChoiceEditor(false); // After saving, hide the editor again
  };

  return (
    <div>
      {!showMultipleChoiceEditor && (
        <button className="btn btn-primary" onClick={handleAddQuestion}>
          + New Question
        </button>
      )}

      {showMultipleChoiceEditor ? (
        <MultipleChoice
          onSave={handleSaveQuestion}
          onCancel={() => setShowMultipleChoiceEditor(false)}
        />
      ) : (
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
