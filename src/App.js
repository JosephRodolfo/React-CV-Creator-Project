import logo from "./logo.svg";
import "./App.css";
import ReactDOM from "react-dom";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {};
  }

  handlePick() {
    const randomOption =
      this.state.options[Math.floor(Math.random() * this.state.options.length)];
    console.log(randomOption);
    this.state.random = randomOption;
    console.log(this.state.random);
  }

  handleDeleteOptions() {
    this.setState(() => {
      return {
        options: [],
      };
    });
  }

  handleAddOption(option) {
    if (!option) {
      return "Enter valid value to add item.";
    } else if (this.state.options.indexOf(option) > -1) {
      return "This option already exists";
    }

    this.setState((prevState) => {
      return {
        options: prevState.options.concat(option),
      };
    });
  }
  render() {
    return (
      <div>
        <CvSection title="Personal Information" category="personalInformation" />
        <CvSection title="Experience"  category="experience"/>
        <CvSection title="Education" category="education" />
      </div>
    );
  }
}

class CvSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personalInformation: [
        "First Name",
        "Last Name",
        "Title",
        "Address",
        "Phone Number",
        "Email",
        "Description",
      ],
      experience: ["Position", "Company", "City", "From", "To"],
      education: ["University Name", "City", "Degree", "Major", "From", "To"],
    };
  }

  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        {
        this.state[this.props.category].map((element, index) => {
          return <AddField key = {index} cvField={element} />;
        })}

        {this.props.title!=="Personal Information" && (
        <div>
          <button>Add</button>
          <button>Delete</button>
        </div>)}
       
      </div>
    );
  }
}

class AddField extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddField = this.handleAddField.bind(this);
    this.state = {
      error: undefined,
    };
  }
  handleAddField(e) {
    e.preventDefault();
    const option = e.target.elements.option.value.trim();

    const error = this.props.handleAddField(option);

    this.setState(() => {
      return { error };
    });
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
