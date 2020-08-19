import React from "react";
import { Button } from "react-bootstrap";

let shuffle = (answers: any) => {
  return answers.sort(() => Math.random() - 0.5);
};
let choosenAnswer = "";
let updateAnswer = (event: any) => {
  choosenAnswer = event.target.value;
};
export const TextQues = (props: any) => {
  choosenAnswer = "";
  return (
    <div>
      <div style={{ minWidth: 600, maxWidth: 600, padding: 20, fontSize: 20 }}>
        {props.quesNum}- {props.question}
      </div>
      <div
        style={{
          padding: 10,
          fontSize: 18,
          textAlign: "center",
          minHeight: 200,
        }}
      >
        <input
          type="text"
          onChange={updateAnswer}
          placeholder="Enter Your Answer Here"
          className="form-control"
          style={{ width: 400 }}
        />
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
