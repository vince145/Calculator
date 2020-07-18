import React from 'react';
import ReactDOM from 'react-dom';
import './Calculator.css';
import * as math from 'mathjs';
import { API, graphqlOperation } from 'aws-amplify';
import { listCalculations } from '../graphql/queries';
import { createCalculation } from '../graphql/mutations';

export default class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calcInput: '',
      calculations: [],
    };
  }

  async fetchCalculations() {
    try {
      const apiData = await API.graphql(graphqlOperation(listCalculations));
      const calculations = apiData.data.listCalculations.items;
      this.setState({calculations});
    } catch (err) {
      console.log('error: ', err);
    }
  }

  // https://scotch.io/tutorials/graphql-api-with-aws-and-use-with-react
  async componentDidMount() {
    try {
      const apiData = await API.graphql(graphqlOperation(listCalculations));
      var calculations = apiData.data.listCalculations.items;
      this.setState({calculations});
    } catch (err) {
      console.log('error: ', err);
    }
  }

  createCalculation = async () => {
    this.setState({error: false});
    var {calcInput, calculations } = this.state;
    if (calcInput) {
      try {
        math.evaluate(calcInput)
      } catch (err) {
        this.setState({error : err});
        console.log('error: ', err);
        return;
      }
      if (!this.state.error) {
        try {
          var calculation = { calcInput };
          calculations.unshift(calcInput);
          // Handles limiting shown calculations to only 10 calculations
          calculations.length =
            calculations.length <= 10 ?
            calculations.length : 10;
          this.setState({calcInput: calcInput, calculations: calculations});
          await API.graphql(graphqlOperation(createCalculation, {input: calculation}));
          calcInput = '';
        } catch (err) {
          console.log('error: ', err);
          return;
        }
      }
    }
  }

  // Handles users typing into form
  handleChange = event => {
    this.setState({calcInput: event.target.value});
  };


  // Handles users submitting a calculation by
  // using enter or clicking on the submit button
  handleSubmit = event => {
    (async () => {
      await this.createCalculation();
    })();
    (async () => {
      await this.fetchCalculations();
    })();
    event.preventDefault();
    event.target.reset();
  };

  // Lists the last 10 calculations performed and their
  // answers
  CalculationList() {
    var calculations = this.state.calculations;
    // var results = calculations.map((calculation) =>
    //  (calculation + ' = ' + math.evaluate(calculation)));
    var results = calculations;
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