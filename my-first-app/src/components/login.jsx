import React, { Component } from "react";
import Joi from "joi-browser";

class Login extends Component {
  state = {
    username: "",
    password: "",
    errors: {},
  };

  JoiSchema = {
    username: Joi.string().required(),
    password: Joi.string().required(),
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();

    if (errors) {
      return;
    }

    //call backend server
    console.log("submit");
  };

  validate = () => {
    let errors = {};
    let state = { ...this.state };
    delete state.errors;
    let res = Joi.validate(state, this.JoiSchema, { abortEarly: false });
    if (res.error === null) {
      this.setState({ errors: {} });
      return null;
    }

    for (const error of res.error.details) {
      errors[error.path] = error.message;
      console.log(res);
    }
    this.setState({ errors });
    return true;
  };

  handleChange = (e) => {
    let state = { ...this.state };
    state[e.currentTarget.name] = e.currentTarget.value;
    this.setState(state);
  };
  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              autoFocus
              type="text"
              className="form-control"
              id="username"
            />
            {this.state.errors.username && (
              <div className="alert alert-danger">
                {this.state.errors.username}
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
            {this.state.errors.password && (
              <div className="alert alert-danger">
                {this.state.errors.password}
              </div>
            )}
          </div>
          <div className="form-group form-check"></div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default Login;
