import React from "react";
import Question from "./components/Question";
import { nanoid } from "nanoid";

function App() {
  const [hasStarted, setHasStarted] = React.useState(false);
  const [questionsArray, setQuestionsArray] = React.useState();
  const [isChecked, setIsChecked] = React.useState(false);
  const [isFetched, setIsFetched] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((data) => createObjArray(data.results))
      .then((objsArray) => {
        setError(null);
        setQuestionsArray(objsArray);
        setIsChecked(false);
      })
      //
      .catch((err) => {
        // console.log(err.message);
        setError(err);
      })
      .finally(() => {
        //setLoading(false);
        setIsFetched(true);
      });
  }

  function createObjArray(array) {
    return (
      array &&
      array.map((item) => {
        // Adding id to the existing objects (elements of the fetched array)
        return {
          ...item,
          id: nanoid(),
          correct_answer: convertCorrectAnswerToObj(item.correct_answer),
          incorrect_answers: convertIncorrectAnswersToObjs(
            item.incorrect_answers
          ),
          answers: shuffleArray([
            ...convertIncorrectAnswersToObjs(item.incorrect_answers),
            convertCorrectAnswerToObj(item.correct_answer),
          ]),
          // A collection of correct and incorrect answers created, then shuffled
        };
      })
    );
  }

  function convertCorrectAnswerToObj(correct_answer) {
    return {
      value: correct_answer,
      id: nanoid(),
      isHeld: false,
      isCorrect: true,
    };
  }

  function convertIncorrectAnswersToObjs(incorrect_answers_Array) {
    return incorrect_answers_Array.map((item) => {
      return {
        value: item,
        id: nanoid(),
        isHeld: false,
        isCorrect: false,
      };
    });
  }

  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  function answerClickHandler(answerId, questionId) {
    !isChecked &&
      setQuestionsArray((prevArray) => {
        return prevArray.map((question) => {
          return question.id === questionId
            ? {
                ...question,
                answers: question.answers.map((answer) => {
                  return answer.id === answerId
                    ? { ...answer, isHeld: true }
                    : { ...answer, isHeld: false };
                }),
              }
            : question;
        });
      });
  }

  const questionComponentsArray =
    questionsArray &&
    questionsArray.map((item) => {
      return (
        <Question
          key={item.id}
          question={item.question}
          answers={item.answers}
          id={item.id}
          clickHandler={answerClickHandler}
          isChecked={isChecked}
        />
      );
    });

  function checkAnswersButton() {
    setIsChecked(true);
  }

  function correctAnswersNum() {
    let num = 0;
    for (let i = 0; i < questionsArray.length; i++) {
      for (let j = 0; j < questionsArray[i].answers.length; j++) {
        const answer = questionsArray[i].answers[j];
        if (answer.isHeld && answer.isCorrect) {
          num++;
        }
      }
    }

    return num;
  }

  function playAgain() {
    setIsFetched(false);
    fetchData();
  }

  function startTheGame() {
    setHasStarted(true);
  }

  return (
    <main className='main-container'>
      <div className='upper-design'></div>
      <div className='lower-design'></div>

      {!hasStarted ? (
        <div className='init-page-container'>
          <h1>Quizzical</h1>
          <p>Take a quiz in different categories</p>
          <button className='button start-button' onClick={startTheGame}>
            Start quiz
          </button>
        </div>
      ) : (
        <div className='data-container'>
          <div> {questionsArray && questionComponentsArray}</div>
          {!isChecked ? (
            isFetched && (
              <button
                className='button check-button'
                onClick={checkAnswersButton}
              >
                Check answers
              </button>
            )
          ) : (
            <div className='score'>
              <p className='score-text'>
                You scored {correctAnswersNum()}/{questionsArray.length} correct
                answers.
              </p>
              <button className='button play-again-button' onClick={playAgain}>
                Play again
              </button>
            </div>
          )}
        </div>
      )}
    </main>
  );
}

export default App;
