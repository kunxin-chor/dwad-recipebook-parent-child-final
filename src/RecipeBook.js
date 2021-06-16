import React from "react";
import Listing from "./components/Listing";
import AddNew from "./components/AddNew";
import axios from "axios";

export default class RecipeBook extends React.Component {
  url = "https://3000-rose-cephalopod-vwyodmuv.ws-us09.gitpod.io/";
  state = {
    active: "listing",
    data: [
      {
        _id: 1,
        title: "Chicken Rice",
        ingredients: ["Chicken Broth", "Chicken", "Rice"]
      },
      {
        _id: 2,
        title: "Duck Rice",
        ingredients: ["Duck", "Rice"]
      }
    ],
    newTitle: "",
    newIngredients: ""
  };

  componentDidMount() {
    this.fetchData();
  }

  renderContent() {
    if (this.state.active === "listing") {
      return (
        <React.Fragment>
          <Listing data={this.state.data} />
        </React.Fragment>
      );
    } else if (this.state.active === "add") {
      return (
        <React.Fragment>
          <AddNew
            onUpdateFormField={this.updateFormField}
            newTitle={this.state.newTitle}
            newIngredients={this.state.newIngredients}
            onAddNew={this.addNew}
          />
        </React.Fragment>
      );
    }
  }

  updateFormField = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  setActive = (page) => {
    this.setState({
      active: page
    });
  };

 addNew = async () => {
    let response = await axios.post(this.url + "recipes", {
      title: this.state.newTitle,
      ingredients: this.state.newIngredients.split(",")
    });

    this.setState({
      data: [...this.state.data, response.data[0]],
      active: "listing"
    });
  };

  fetchData = async () => {
    let response = await axios.get(this.url + "recipes");
    this.setState({
      data: response.data
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button
                className="nav-link active"
                aria-current="page"
                onClick={() => {
                  this.setActive("listing");
                }}
              >
                Recipes
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link"
                onClick={() => {
                  this.setActive("add");
                }}
              >
                Add New
              </button>
            </li>
          </ul>
          {this.renderContent()}
        </div>
      </React.Fragment>
    );
  }
}
