import Answer from "./Answer";
import React from "react";
import { unEscape } from "../Utility";

export default function Question(props) {
  // props:
  //        key
  //        question
  //        answers
  //        id
  //        clickHandler
  //        isChecked

  const answerComponentsArray = props.answers.map((item) => (
    <Answer
      key={item.id}
      value={item.value}
      isHeld={item.isHeld}
      isCorrect={item.isCorrect}
      clickHandler={() => props.clickHandler(item.id, props.id)}
      isChecked={props.isChecked}
    />
  ));

  return (
    <div className='question'>
      <p className='question-text'>{unEscape(props.question)}</p>
      <div className='answers'>{answerComponentsArray}</div>
    </div>
  );
}
