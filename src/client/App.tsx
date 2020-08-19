import * as React from "react";
import { Button } from "react-bootstrap";
import { Multiple } from "./Multiple";
import { Boolean } from "./Booolean";
import { TextQues } from "./TextQues";

export class App extends React.Component {
  state: any = {
    CurrentQuestion: null,
    APIData: null,
    QuestionsLength: 0,
    Correct: 0,
    Wrong: 0,
    TotalNumOfQues: 50,
    endScene: false,
  };
  restartApp = () => {
    this.setState({
      CurrentQuestion: null,
      APIData: null,
      QuestionsLength: 0,
      Correct: 0,
      Wrong: 0,
      TotalNumOfQues: 50,
      endScene: false,
    });
    this.fetchData();
  };
  fetchData = () => {
    fetch("http://localhost:4000/api/questions")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ APIData: data, QuestionsLength: data.results.length });
        this.selectNextQuestion();
      });
  };

  selectNextQuestion = () => {
    let index = -1;
    if (this.state.CurrentQuestion != null)
      index = this.state.APIData.results.findIndex(
        (x: any) => x.question == this.state.CurrentQuestion.question
      );
    if (index > -1) {
      let newData = this.state.APIData;
      newData.results.splice(index, 1);
      this.setState({
        APIData: newData,
        QuestionsLength: newData.results.length,
      });
    }
    if (this.state.QuestionsLength <= 1) this.setState({ endScene: true });
    else {
      const rand = Math.floor(Math.random() * (this.state.QuestionsLength - 1));
      this.setState({ CurrentQuestion: this.state.APIData.results[rand] });
    }
  };

  getNextQuestion = (answer: any) => {
    if (answer == true) {
      this.setState((prevState: any) => ({ Correct: prevState.Correct + 1 }));
    } else {
      this.setState((prevState: any) => ({ Wrong: prevState.Wrong + 1 }));
    }
    this.selectNextQuestion();
  };

  render() {
    let main = (
      <React.Fragment>
        {" "}
        <h1>Lucid</h1>
        <h2>Welcome to UI Team code assessment!</h2>
        <Button variant="primary" onClick={this.fetchData}>
          Start Assesment
        </Button>
      </React.Fragment>
    );

    if (this.state.endScene) {
      main = (
        <div style={{ fontSize: 20 }}>
          <div>Correct Answers : {this.state.Correct}</div>
          <div>Wrong Answers : {this.state.Wrong}</div>
          <div>Total Answers : {this.state.Wrong + this.state.Correct}</div>
          <div>
            Score :{" "}
            {Math.round(
              (this.state.Correct * 100) /
                (this.state.Correct + this.state.Wrong)
            )}
            %
          </div>
          <Button variant="primary" onClick={this.restartApp}>
            Restart Assesment
          </Button>
        </div>
      );
    } else if (
      this.state.CurrentQuestion &&
      this.state.CurrentQuestion.type === "multiple"
    )
      main = (
        <Multiple
          question={this.state.CurrentQuestion.question}
          correctAnswer={this.state.CurrentQuestion.correct_answer}
          inCorrectAnswer={this.state.CurrentQuestion.incorrect_answers}
          nextQuestion={this.getNextQuestion}
          quesNum={this.state.TotalNumOfQues - this.state.QuestionsLength + 1}
        ></Multiple>
      );
    else if (
      this.state.CurrentQuestion &&
      this.state.CurrentQuestion.type === "boolean"
    )
      main = (
        <Boolean
          question={this.state.CurrentQuestion.question}
          correctAnswer={this.state.CurrentQuestion.correct_answer}
          inCorrectAnswer={this.state.CurrentQuestion.incorrect_answers}
          nextQuestion={this.getNextQuestion}
          quesNum={this.state.TotalNumOfQues - this.state.QuestionsLength + 1}
        ></Boolean>
      );
    else if (
      this.state.CurrentQuestion &&
      this.state.CurrentQuestion.type === "text"
    )
      main = (
        <TextQues
          question={this.state.CurrentQuestion.question}
          correctAnswer={this.state.CurrentQuestion.correct_answer}
          inCorrectAnswer={this.state.CurrentQuestion.incorrect_answers}
          nextQuestion={this.getNextQuestion}
          quesNum={this.state.TotalNumOfQues - this.state.QuestionsLength + 1}
        ></TextQues>
      );
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 50,
        }}
      >
        {main}
      </div>
    );
  }
}
