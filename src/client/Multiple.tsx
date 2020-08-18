import React from "react";
import { Button } from "react-bootstrap";

let shuffle = (answers: any) => {
  return answers.sort(() => Math.random() - 0.5);
};
let choosenAnswer = "";
let updateAnswer = (event: any) => {
  choosenAnswer = event.target.value;
};
export const Multiple = (props: any) => {
  choosenAnswer = "";
  let answers = shuffle([props.correctAnswer, ...props.inCorrectAnswer]).map(
    (x: any) => (
      <div>
        <input type="radio" value={x} name={props.question} />
        {x}
      </div>
    )
  );
  return (
    <div>
      <div>{props.question}</div>
      <div onChange={updateAnswer}>{answers}</div>
      <Button
        variant="primary"
        onClick={() => props.nextQuestion(choosenAnswer == props.correctAnswer)}
      >
        Next
      </Button>
    </div>
  );
};
