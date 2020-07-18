import React from 'react';
import ReactDOM from 'react-dom';
import './Calculator.css';
import * as math from 'mathjs';
import { API } from 'aws-amplify';

export default class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calcInput: '',
      calculations: [],
      error: null,
    };
  }

  // Handles users typing into form
  handleChange = event => {
    this.setState({calcInput: event.target.value});
  };

  // Handles users submitting a calculation by
  // using enter or clicking on the submit button
  handleSubmit = event => {
    // Try and catch handle invalid input for mathjs evaluate
    this.setState({error: false});
    if (this.state.calcInput) {
      try {
        math.evaluate(this.state.calcInput)
      } catch (error) {
        this.setState({error});
        throw(error);
      }
      if (!this.state.error) {
        this.state.calculations.unshift(this.state.calcInput);
        // Handles limiting shown calculations to only 10 calculations
        this.state.calculations.length = 
          this.state.calculations.length <= 10 ?
          this.state.calculations.length : 10;
        this.setState({calcInput: ''});
      }
    }
    event.preventDefault();
    event.target.reset();
  };

  // Lists the last 10 calculations performed and their
  // answers
  CalculationList() {
    var calculations = this.state.calculations;
    var results = calculations.map((calculation) =>
    (calculation + ' = ' + math.evaluate(calculation)));
    var listResults = results.map((result, index) =>
      <li key={index}> 
        {result}
      </li>
    );
    return (
      <ul>{listResults}</ul>
    )
  }

  render() {
    return (
      <React.Fragment>
        <div className="Calculator">
          <form onSubmit={this.handleSubmit}>
            <div className="Form">
              <label>
                  <input
                    type='text' 
                    value={this.state.calcInput}
                    onChange={this.handleChange}
                  />
                </label>
            </div>
            <div className="Submit">
              <input
                type="submit"
                value="Submit"
              />
            </div>
          </form>
          <h4>{this.CalculationList()}</h4>
        </div>
      </React.Fragment>
    );
  }
}