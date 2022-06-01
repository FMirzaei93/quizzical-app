import Answer from "./Answer";
import { nanoid } from "nanoid";
import React from "react";

export default function Question(props) {
  //

  const [answersArray, setAnswersArray] = React.useState(
    props.answers.map((item) => ({
      value: item,
      id: nanoid(),
      isHeld: false,
    }))
  );

  function answerClickHandler(id) {
    setAnswersArray((prevArray) => {
      return prevArray.map((item) => {
        return item.id === id
          ? { ...item, isHeld: true }
          : { ...item, isHeld: false };
      });
    });
  }

  const answerComponentsArray = answersArray.map((item) => {
    return (
      <Answer
        key={item.id}
        value={item.value}
        isHeld={item.isHeld}
        id={item.id}
        clickHandler={() => answerClickHandler(item.id)}
      />
    );
  });

  return (
    <div className='question'>
      <p className='question-text'>{props.question}</p>
      <div className='answers'>{answerComponentsArray}</div>
    </div>
  );
}
