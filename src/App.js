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
    this.myParentHandleExperienceInput =
      this.myParentHandleExperienceInput.bind(this);
    this.myParentHandleEducationInput =
      this.myParentHandleEducationInput.bind(this);

    this.state = {
      personal: {
        /*   FirstName: "",
        LastName: "",
        Address: "",
        PhoneNumber: "",*/
      },

      education: [{}],
      experience: [{}],
    };
  }

  myParentHandleExperienceInput(data, tempProp, index) {
    let newProperty = { ...this.state.experience };

    newProperty[index][tempProp] = data;

    return { experience: newProperty };

    //console.log(this.state);
    /* this.setState((prevState) => {
      return { experience: prevState.experience.filter((_, i) => i !== index)
      };
    });*/
  }

  myParentHandleEducationInput(data, tempProp, index) {
    console.log(index);
    let newProperty = { ...this.state.education };

    newProperty[index][tempProp] = data;

    return { education: newProperty };
  }

  myParentDeleteItem(index, edOrEx) {
    if (edOrEx === "education") {
      this.setState((prevState) => {
        return { education: prevState.education.filter((_, i) => i !== index) };
      });
    } else if (edOrEx === "experience") {
      this.setState((prevState) => {
        return {
          experience: prevState.experience.filter((_, i) => i !== index),
        };
      });
    }
  }

  myParentCallBack(infoProperty, infoValue) {
    /* this.setState((prevState) =>
    {
     return prevState.personal[infoProperty]= infoValue;
    })*/
    let newProperty = { ...this.state.personal };
    newProperty[infoProperty] = infoValue;
    this.setState({ personal: newProperty });
  }

  handleAddItemParent(blankData, edOrEx) {
    if (edOrEx == "education") {
      this.setState((prevState) => {
        return { education: prevState.education.concat(blankData) };
      });
    } else if (edOrEx == "experience") {
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

        <Education
          content={this.state.education}
          subject="education"
          callBackFromParentEducation={this.myParentHandleEducationInput}
        />

        <AddButton
          handleAddItemProp={this.handleAddItemParent}
          subject="education"
        />

        <Experience
          content={this.state.experience}
          subject="experience"
          callBackFromParentExperience={this.myParentHandleExperienceInput}
        />

        <AddButton
          handleAddItemProp={this.handleAddItemParent}
          subject="experience"
        />

        <RenderedPersonal content={this.state.personal} />

        {this.state.experience.map((element, index) => (
          <RenderedExperience
            key={index}
            id={index}
            content={this.state.experience[index]}
            handleDeleteItem={this.myParentDeleteItem}
            callBackFromParentExperience={this.myParentHandleExperienceInput}
          />
        ))}
        {this.state.education.map((element, index) => {
          return (
            <RenderedEducation
              key={index}
              id={index}
              handleDeleteItem={this.myParentDeleteItem}
              callBackFromParentEducation={this.myParentHandleEducationInput}
              content={this.state.education[index]}
            />
          );
        })}
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
        <h2>First: {this.props.content.FirstName} </h2>
        <h2> Last: {this.props.content.LastName}</h2>
        <p>Address: {this.props.content.Address}</p>
        <p>Phone: {this.props.content.PhoneNumber}</p>
      </div>
    );
  }
}

class RenderedExperience extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleExperienceInfo = this.handleExperienceInfo.bind(this);
    this.handleEditItem = this.handleEditItem.bind(this);

    this.state = {
      category: "experience",
      edit: false,
    };
  }
  handleDeleteItem(e) {
    this.props.handleDeleteItem(this.props.id, this.state.category);
  }

  handleEditItem(e) {
    // this.props.handleEditItem(this.props.id, this.state.category);

    this.setState((prevState) => {
      return {
        edit: !prevState.edit,
      };
    });
  }

  handleExperienceInfo(e) {
    let experienceInfoData = e.target.value;
    let experienceInfoElement = e.target.id;
    let indexOfExperience = this.props.id;
    console.log(experienceInfoData, experienceInfoElement, indexOfExperience);
    this.props.callBackFromParentExperience(
      experienceInfoData,
      experienceInfoElement,
      indexOfExperience
    );
  }

  render() {
    if (!this.state.edit) {
      return (
        <div>
          <h2>Title:{this.props.content.Title}</h2>
          <p>Company:{this.props.content.Company} </p>
          <p>From: {this.props.content.From} </p>
          <p>To: {this.props.content.To}</p>
          <button onClick={this.handleDeleteItem}>Delete</button>
          <button onClick={this.handleEditItem}>Edit</button>
        </div>
      );
    } else {
      return (
        <div>
          <div>
            Title:{" "}
            <input
              type="text"
              id="Title"
              placeholder={this.props.content.Degree}
              onChange={this.handleExperienceInfo}
            />
          </div>
          <div>
            Company:{" "}
            <input
              type="text"
              id="Company"
              placeholder={this.props.content.University}
              onChange={this.handleExperienceInfo}
            />
          </div>
          <div>
            From:{" "}
            <input
              type="text"
              id="From"
              placeholder={this.props.content.From}
              onChange={this.handleExperienceInfo}
            />
          </div>
          <div>
            To:{" "}
            <input
              type="text"
              id="To"
              placeholder={this.props.content.To}
              onChange={this.handleExperienceInfo}
            />
          </div>
          <button onClick={this.handleDeleteItem}>Delete</button>
          <button type="Submit" onClick={this.handleEditItem}>
            Save
          </button>
        </div>
      );
    }
  }
}

class RenderedEducation extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleEditItem = this.handleEditItem.bind(this);
    this.handleEducationInfo = this.handleEducationInfo.bind(this);

    this.state = {
      category: "education",
      edit: false,
    };
  }
  handleDeleteItem(e) {
    this.props.handleDeleteItem(this.props.id, this.state.category);
  }

  handleEditItem(e) {
    // this.props.handleEditItem(this.props.id, this.state.category);

    this.setState((prevState) => {
      return {
        edit: !prevState.edit,
      };
    });
  }

  handleEducationInfo(e) {
    let educationInfoData = e.target.value;
    let educationInfoElement = e.target.id;
    let indexOfEducation = this.props.id;
    console.log(educationInfoData, educationInfoElement, indexOfEducation);
    this.props.callBackFromParentEducation(
      educationInfoData,
      educationInfoElement,
      indexOfEducation
    );
  }
  render() {
    if (!this.state.edit) {
      return (
        <div>
          <h2>Degree:{this.props.content.Degree}</h2>

          <p>University:{this.props.content.University} </p>
          <p>Address: {this.props.content.Address} </p>
          <p>From: {this.props.content.From}</p>
          <p>To: {this.props.content.To}</p>
          <button onClick={this.handleDeleteItem}>Delete</button>
          <button onClick={this.handleEditItem}>Edit</button>
        </div>
      );
    } else {
      return (
        <div>
          <div>
            Degree:{" "}
            <input
              type="text"
              id="Degree"
              placeholder={this.props.content.Degree}
              onChange={this.handleEducationInfo}
            />
          </div>
          <div>
            University:{" "}
            <input
              type="text"
              id="University"
              placeholder={this.props.content.University}
              onChange={this.handleEducationInfo}
            />
          </div>
          <div>
            From:{" "}
            <input
              type="text"
              id="From"
              placeholder={this.props.content.From}
              onChange={this.handleEducationInfo}
            />
          </div>
          <div>
            To:{" "}
            <input
              type="text"
              id="To"
              placeholder={this.props.content.To}
              onChange={this.handleEducationInfo}
            />
          </div>
          <button onClick={this.handleDeleteItem}>Delete</button>
          <button type="Submit" onClick={this.handleEditItem}>
            Save
          </button>
        </div>
      );
    }
  }
}

class Experience extends React.Component {
  constructor(props) {
    super(props);
    this.handleExperienceInfo = this.handleExperienceInfo.bind(this);
    this.state = {
      fields: ["Title", "Company", "From", "To"],
    };
  }

  handleDeleteItem(e) {
    this.props.handleDeleteItem(this.props.id, this.props.subject);
  }

  handleExperienceInfo(e) {
    let experienceInfoData = e.target.value;
    let experienceInfoElement = e.target.id;
    let indexOfExperience = this.props.content.length - 1;

    this.props.callBackFromParentExperience(
      experienceInfoData,
      experienceInfoElement,
      indexOfExperience
    );
  }
  render() {
    return (
      <div>
        <h2>Experience</h2>

        {this.state.fields.map((element, index) => {
          return (
            <div key={index}>
              <label>
                {element}
                {this.props.id}
              </label>
              <input
                id={element}
                type="text"
                onChange={this.handleExperienceInfo}
                value={this.props.content[element]}
              />
            </div>
          );
        })}
      </div>
    );
  }
}
class Education extends React.Component {
  constructor(props) {
    super(props);
    this.handleEducationInfo = this.handleEducationInfo.bind(this);

    this.state = {
      fields: ["Degree", "University", "Address", "From", "To"],
    };
  }

  handleEducationInfo(e) {
    console.log(this.props.content.length);
    let educationInfoData = e.target.value;
    let educationInfoElement = e.target.id;
    let indexOfEducation = this.props.content.length - 1;
    console.log(educationInfoData, educationInfoElement, indexOfEducation);
    this.props.callBackFromParentEducation(
      educationInfoData,
      educationInfoElement,
      indexOfEducation
    );
  }
  render() {
    return (
      <div>
        <h2>Education</h2>

        {this.state.fields.map((element, index) => {
          return (
            <div key={index}>
              <label>
                {element}
                {this.props.id}
              </label>
              <input
                id={element}
                onChange={this.handleEducationInfo}
                type="text"
              />
            </div>
          );
        })}
      </div>
    );
  }
}
