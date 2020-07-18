import React, {useState, useEffect} from 'react';
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

  // Fetchs stored calculations in DynamoDB database
  // using graphQL and aws to communicate with database
  async fetchCalculations() {
    try {
      const apiData = await API.graphql(graphqlOperation(listCalculations));
      const calculations = apiData.data.listCalculations.items;
      this.setState({calculations: calculations});
    } catch (err) {
      console.log('error: ', err);
    }
  }

  // https://scotch.io/tutorials/graphql-api-with-aws-and-use-with-react
  async componentDidMount() {
    // Used for fetching calculations from the database every 1000ms
    this.intervalID = setInterval(
      () => this.poll(),
      1000
    );
    // Performs initial fetch of calculations from database
    (async () => {
      await this.fetchCalculations();
    })();
  }

  // Used for fetching calculations from the database every 1000ms
  poll() {
    (async () => {
      await this.fetchCalculations();
    })();
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  createCalculation = async () => {
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
          /*
          calculations.length =
            calculations.length <= 10 ?
            calculations.length : 10;
          */
          // this.setState({calcInput: calcInput, calculations: calculations});
          await API.graphql(graphqlOperation(createCalculation, {input: calculation}));
          this.setState({calcInput: ''});
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

  // Lists all calculations performed
  CalculationList() {
    const calculations = this.state.calculations;
    const results = calculations.map((calculation) =>
      (String(calculation.calcInput) + ' = ' + math.evaluate(String(calculation.calcInput))));
    const listResults = results.map((result, index) =>
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
        IntervalExample();
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