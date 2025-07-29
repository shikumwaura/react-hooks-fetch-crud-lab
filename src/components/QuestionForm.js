import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  });

  function handleChange(event) {
    const { name, value } = event.target;
    
    if (name === "correctIndex") {
      setFormData({
        ...formData,
        [name]: parseInt(value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  }

  function handleAnswerChange(index, value) {
    const newAnswers = [...formData.answers];
    newAnswers[index] = value;
    setFormData({
      ...formData,
      answers: newAnswers,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    
    // Call the parent function to add the question
    onAddQuestion(formData);
    
    // Reset form
    setFormData({
      prompt: "",
      answers: ["", "", "", ""],
      correctIndex: 0,
    });
  }

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
            required
          />
        </label>
        
        <label>
          Answer 1:
          <input
            type="text"
            value={formData.answers[0]}
            onChange={(e) => handleAnswerChange(0, e.target.value)}
            required
          />
        </label>
        
        <label>
          Answer 2:
          <input
            type="text"
            value={formData.answers[1]}
            onChange={(e) => handleAnswerChange(1, e.target.value)}
            required
          />
        </label>
        
        <label>
          Answer 3:
          <input
            type="text"
            value={formData.answers[2]}
            onChange={(e) => handleAnswerChange(2, e.target.value)}
            required
          />
        </label>
        
        <label>
          Answer 4:
          <input
            type="text"
            value={formData.answers[3]}
            onChange={(e) => handleAnswerChange(3, e.target.value)}
            required
          />
        </label>
        
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
          >
            <option value="0">Answer 1</option>
            <option value="1">Answer 2</option>
            <option value="2">Answer 3</option>
            <option value="3">Answer 4</option>
          </select>
        </label>
        
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;