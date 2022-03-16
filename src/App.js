import logo from "./logo.svg";
import "./App.css";
import ReactDOM from "react-dom";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleDeleteEdEx = this.handleDeleteEdEx.bind(this);
    this.handleAddEdEx = this.handleAddEdEx.bind(this);
    this.state = {
      choice: ["PersonalInformation", "Experience", "Education"],
    };
  }

  handlePick() {
    const randomOption =
      this.state.options[Math.floor(Math.random() * this.state.options.length)];
    console.log(randomOption);
    this.state.random = randomOption;
    console.log(this.state.random);
  }

  handleAddEdEx(chosen) {
    this.setState((prevState) => {
      return {
        choice: prevState.choice.concat(chosen).sort().reverse(),
      };
    });
  }

  render() {
    return (
      <div>
        {this.state.choice.map((element, index) => {
          return (
            <CvSection
              key={index}
              title={element}
              category={element}
              callBackFromParent={this.handleAddEdEx}
              callBackDeleteFromParent={this.handleDeleteEdEx}
            />
          );
        })}
      </div>
    );
  }
}

class CvSection extends React.Component {
  constructor(props) {
    super(props);

    this.handleAddEdEx = this.handleAddEdEx.bind(this);

    this.state = {
      PersonalInformation: [
        "First Name",
        "Last Name",
        "Title",
        "Address",
        "Phone Number",
        "Email",
        "Description",
      ],
      Experience: ["Position", "Company", "City", "From", "To"],
      Education: ["University Name", "City", "Degree", "Major", "From", "To"],
    };
  }

  handleAddEdEx(e) {
    let targetName = e.target.id;
    this.props.callBackFromParent(targetName);
  }

  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        {this.state[this.props.category].map((element, index) => {
          return <AddField key={index} cvField={element} />;
        })}

        {this.props.title !== "PersonalInformation" && (
          <div>
            <button id={this.props.category} onClick={this.handleAddEdEx}>
              Add
            </button>
            <button>Delete</button>
          </div>
        )}
      </div>
    );
  }
}

class AddField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form>
          <label>
            <span>{this.props.cvField}</span>
            <input type="text" name="option" />
          </label>
        </form>
      </div>
    );
  }
}

class AddSection extends React.Component {}

export default App;
