import React from "react";
import { Button } from "react-bootstrap";

let shuffle = (answers: any) => {
  return answers.sort(() => Math.random() - 0.5);
};
let choosenAnswer = "";
let updateAnswer = (event: any) => {
  choosenAnswer = event.target.value;
};
export const Boolean = (props: any) => {
  choosenAnswer = "";
  let answers = shuffle([props.correctAnswer, ...props.inCorrectAnswer]).map(
    (x: any) => (
      <div style={{ padding: 10, fontSize: 16 }}>
        <input id={x} type="radio" value={x} name={props.question} />
        {x}
      </div>
    )
  );
  return (
    <div>
      <div style={{ minWidth: 600, maxWidth: 600, padding: 20, fontSize: 20 }}>
        {props.quesNum}- {props.question}
      </div>
      <div onChange={updateAnswer} style={{ minHeight: 200 }}>
        {answers}
      </div>
      <Button
        variant="primary"
        onClick={() => props.nextQuestion(choosenAnswer == props.correctAnswer)}
        style={{ width: 100, marginLeft: 20 }}
      >
        Next
      </Button>
    </div>
  );
};
