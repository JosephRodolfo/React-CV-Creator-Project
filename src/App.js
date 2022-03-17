import logo from "./logo.svg";
import "./App.css";
import ReactDOM from "react-dom";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleAddItemParent = this.handleAddItemParent.bind(this);
    this.myParentCallBack = this.myParentCallBack.bind(this);
    this.myParentDeleteItem = this.myParentDeleteItem.bind(this);

    this.state = {
      personal: {
        FirstName: "",
        LastName: "",
        Address: "",
        PhoneNumber: "",
      },

      education: [
        {
          FirstName: "",
          LastName: "",
          Address: "",
          PhoneNumber: "",
        },
      ],
      experience: [[]],
    };
  }

  myParentCallBack(infoProperty, infoValue) {
    console.log(infoProperty, infoValue);
    /* this.setState((prevState) =>
    {
     return prevState.personal[infoProperty]= infoValue;
    })*/
    let newProperty = { ...this.state.personal };
    newProperty.FirstName = infoValue;
    this.setState({ personal: newProperty });
  }

  handleAddItemParent(blankData, edOrEx) {
    if (edOrEx == "education") {
      this.setState((prevState) => {
        return { education: prevState.education.concat(blankData) };
      });
    } else if (edOrEx=="experience") {
      this.setState((prevState) => {
        return { experience: prevState.experience.concat(blankData) };
      });
    }
    /*
    this.setState(previousState => ({
      myArray: [...previousState.myArray, 'new value']
  }));*/
  }
  render() {
    return (
      <div>
        <PersonalInformation
          title="Personal Information"
          callBackFromParent={this.myParentCallBack}
        />
        <h2>Education</h2>

        {this.state.education.map((element, index) => {
          return <Education content={this.state.education} id={index} subject="education"/>;
        })}
        <AddButton
          handleAddItemProp={this.handleAddItemParent}
          subject="education"
        />
        <h2>Experience</h2>

        {this.state.experience.map((element, index) => {
          return <Experience content={this.state.experience} id={index} subject="experience"/>;
        })}
        <AddButton
          handleAddItemProp={this.handleAddItemParent}
          subject="experience"
        />
        <RenderedPersonal content={this.state.personal} />
      </div>
    );
  }
}

export default App;

class AddButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddItem = this.handleAddItem.bind(this);
  }

  handleAddItem() {
    let newItem = {};
    let subject = this.props.subject;

    this.props.handleAddItemProp(newItem, subject);
  }

  render() {
    return <button onClick={this.handleAddItem}>Add</button>;
  }
}

class PersonalInformation extends React.Component {
  constructor(props) {
    super(props);
    this.setPersonalInfo = this.setPersonalInfo.bind(this);

    this.state = {
      fields: ["First Name", "Last Name", "Address", "Phone Number"],
    };
  }

  setPersonalInfo(e) {
    let personalInfoData = e.target.value;
    let personalInfoId = e.target.id;

    this.props.callBackFromParent(personalInfoId, personalInfoData);
    //console.log(e.target.value);
    //console.log(e.target.id);
  }
  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>

        {this.state.fields.map((element, index) => {
          return (
            <div key={index}>
              <label>{element}</label>
              <input
                type="text"
                onChange={this.setPersonalInfo}
                id={element.replace(/\s/g, "")}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

class RenderedPersonal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h2>
          Name: {this.props.content.FirstName} {this.props.content.LastName}{" "}
        </h2>
      </div>
    );
  }
}

class Experience extends React.Component {
  constructor(props) {
    super();
    this.handleDeleteItem=this.handleDeleteItem.bind(this);
    this.state = {
      fields: ["University", "Degree", "Major", "From", "To"],
    };
  }

  handleDeleteItem(e){
console.log(this.props.id, this.props.subject);
//this.props.passItemToDeleteToParent(this.props.id);
  }
  render() {
    return (
      <div>
        {this.state.fields.map((element, index) => {
          return (
            <div key={index}>
              <label>{element}</label>
              <input type="text" />
            </div>
          );
        })}
        <button onClick={this.handleDeleteItem}>Delete</button>
      </div>
    );
  }
}
class Education extends React.Component {
  constructor(props) {
    super();
    this.handleDeleteItem=this.handleDeleteItem.bind(this);
    this.state = {
      fields: ["Title", "Company", "Address", "From", "To"],
    };
  }
  handleDeleteItem(e){
    console.log(this.props.id, this.props.subject);
    //this.props.passItemToDeleteToParent(this.props.id);
      }
  render() {
    return (
      <div>
        {this.state.fields.map((element, index) => {
          return (
            <div key={index}>
              <label>{element}</label>
              <input type="text" />
            </div>
          );
        })}
        <button onClick={this.handleDeleteItem}>Delete</button>
      </div>
    );
  }
}
