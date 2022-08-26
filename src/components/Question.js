import Answer from "./Answer";
import React from "react";
import { unEscape } from "../Utility";

export default function Question(props) {
  // props:
  //        key
  //        question
  //        answers
  //        questionId
  //        clickHandler
  //        isChecked

  const answerComponentsArray = props.answers.map((answer) => (
    <Answer
      key={answer.id}
      value={answer.value}
      isHeld={answer.isHeld}
      isCorrect={answer.isCorrect}
      clickHandler={() => props.clickHandler(answer.id, props.questionId)}
      isChecked={props.isChecked}
    />
  ));

  return (
    <div className='question'>
      <p className='question-text'>{unEscape(props.questionId)}</p>
      <div className='answers'>{answerComponentsArray}</div>
    </div>
  );
}
