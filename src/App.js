import React from "react";
import Question from "./components/Question";
import { nanoid } from "nanoid";

function App() {
  const [dataArray, setDataArray] = React.useState([]);

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((response) => response.json())
      .then((data) => setDataArray(data.results));
  }, []);

  const questionsArray = dataArray.map((item) => {
    // Adding id to the existing objects (elements of the fetched array)
    return {
      ...item,
      id: nanoid(),
    };
  });

  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  const questionComponentsArray = questionsArray.map((item) => {
    return (
      <Question
        key={item.id}
        question={item.question}
        answers={shuffleArray([...item.incorrect_answers, item.correct_answer])}
        correct_answer={item.correct_answer}
        incorrect_answers={item.incorrect_answers}
        id={item.id}
      />
    );
  });

  return (
    <main className='main-container'>
      <div> {questionComponentsArray}</div>

      <button className='check-button'>Check answers</button>
    </main>
  );
}

export default App;
