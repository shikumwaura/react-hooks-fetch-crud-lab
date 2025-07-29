import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  // GET /questions - Fetch all questions when component mounts
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  // POST /questions - Add new question
  function handleAddQuestion(newQuestion) {
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    })
      .then((response) => response.json())
      .then((data) => {
        setQuestions([...questions, data]);
        setPage("List"); // Navigate back to list after adding
      })
      .catch((error) => console.error("Error adding question:", error));
  }

  // DELETE /questions/:id - Delete question
  function handleDeleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setQuestions(questions.filter((question) => question.id !== id));
      })
      .catch((error) => console.error("Error deleting question:", error));
  }

  // PATCH /questions/:id - Update question's correct answer
  function handleUpdateQuestion(id, correctIndex) {
    // Update state immediately for better UX
    setQuestions(
      questions.map((question) =>
        question.id === id ? { ...question, correctIndex } : question
      )
    );

    // Then send to server
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((response) => response.json())
      .then((updatedQuestion) => {
        // Update with server response in case there are differences
        setQuestions(
          questions.map((question) =>
            question.id === id ? updatedQuestion : question
          )
        );
      })
      .catch((error) => {
        console.error("Error updating question:", error);
        // Revert on error - refetch or handle error state
      });
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateQuestion={handleUpdateQuestion}
        />
      )}
    </main>
  );
}

export default App;