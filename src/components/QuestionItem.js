import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDeleteClick() {
    onDeleteQuestion(id);
  }

  function handleCorrectAnswerChange(event) {
    const newCorrectIndex = parseInt(event.target.value);
    onUpdateQuestion(id, newCorrectIndex);
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select
          value={correctIndex}
          onChange={handleCorrectAnswerChange}
        >
          {answers.map((answer, index) => (
            <option key={index} value={index}>
              {answer}
            </option>
          ))}
        </select>
      </label>
      <ul>
        {answers.map((answer, index) => (
          <li key={index}>
            <strong>{index === correctIndex ? "✓" : ""}</strong> {answer}
          </li>
        ))}
      </ul>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;