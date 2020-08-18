import * as React from "react";
import { Button } from "react-bootstrap";
import { Multiple } from "./Multiple";

export class App extends React.Component {
  state: any = {
    CurrentQuestion: null,
    APIData: null,
    QuestionsLength: 0,
    Correct: 0,
    Wrong: 0,
  };
  fetchData = () => {
    fetch("http://localhost:4000/api/questions")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ APIData: data, QuestionsLength: data.results.length });
        const index = this.state.APIData.results.indexOf(
          this.state.CurrentQuestion,
          0
        );
        if (index > -1) {
          let newData = this.state.APIData;
          newData.results.splice(index, 1);
          this.setState({
            APIData: newData,
            QuestionsLength: newData.results.length,
          });
        }
        this.selectNextQuestion();
      });
  };

  selectNextQuestion = () => {
    const rand = Math.floor(Math.random() * this.state.QuestionsLength);
    const data: any = this.state.APIData;
    this.setState({ CurrentQuestion: data.results[rand] });
  };

  getNextQuestion = (answer: any) => {
    if (answer == "false")
      this.setState((prevState: any) => ({ Wrong: prevState.Wrong + 1 }));
    else
      this.setState((prevState: any) => ({ Correct: prevState.Correct + 1 }));
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
    if (
      this.state.CurrentQuestion &&
      this.state.CurrentQuestion.type === "multiple"
    )
      main = (
        <Multiple
          question={this.state.CurrentQuestion.question}
          correctAnswer={this.state.CurrentQuestion.correct_answer}
          inCorrectAnswer={this.state.CurrentQuestion.incorrect_answers}
          nextQuestion={this.getNextQuestion}
        ></Multiple>
      );
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 100,
        }}
      >
        {main}
      </div>
    );
  }
}
