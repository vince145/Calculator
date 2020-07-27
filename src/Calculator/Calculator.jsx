import React from 'react';
import './Calculator.css';
import * as math from 'mathjs';
import { API, graphqlOperation } from 'aws-amplify';
import { listCalculations } from '../graphql/queries';
import { createCalculation } from '../graphql/mutations';
import { deleteCalculation } from '../graphql/mutations';

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
    var caughtError = 0;
    if (calcInput) {
      try {
        math.evaluate(calcInput)
      } catch (err) {
        this.setState({calcInput: ''});
        caughtError = 1;
        console.log('error: ', err);
        return;
      }
      if (!caughtError) {
        try {
          var calculation = { calcInput };
          calculations.unshift(calcInput);
          await API.graphql(graphqlOperation(createCalculation, {input: calculation}));
          this.setState({calcInput: ''});
        } catch (err) {
          this.setState({calcInput: ''});
          console.log('error: ', err);
          return;
        }
      }
    }
    this.setState({calcInput: ''});
    return;
  }

  // Handles deleting calculations within the database
  deleteCalculation = async (calculation) => {
    try {
      API.graphql(graphqlOperation(deleteCalculation, {calculation}));
    } catch (err) {
      console.log('error: ', err);
      return;
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
    event.target.reset();
  };

  
  // Lists all calculations performed
  calculationList() {
    var calcsUnsorted = this.state.calculations;
    // Sort calculations so most recent calculations appear first
    const calculations = calcsUnsorted.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
    // Setup for deleting any calculation older than the 10 most recent calculations
    /*
    for (var index = 10; index < calculations.length; index++) {
      this.deleteCalculation(calculations[index]);
    }
    */
   // Only display the 10 most recent calculations
    const results = calculations.slice(0,10).map((calculation) =>
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


  // https://reactjs.org/tutorial/tutorial.html used for button types
  // Calculator button setup to be clicked on for input
  // Provides the rendering properties of the buttons
  CalcButton(props) {
    switch (props.value) {
      case '0':
        return (
          <button className = "calcButtonZero" onClick={props.onClick}>
            {props.value}
          </button>
        );
      case '=':
        return (
          <button className = "calcButtonEquals" onClick={props.onClick}>
            {props.value}
          </button>
        );
      default:
        if (((props.value < 10) & props.value > 0) ||
            (props.value == '.')) {
          return (
            <button className = "calcButtonNum" onClick={props.onClick}>
              {props.value}
            </button>
          );
        } else {
          return (
            <button className = "calcButton" onClick={props.onClick}>
              {props.value}
            </button>
          );
        }

    }
  }

  // Renders a calculator button using its values after
  // it is clicked on
  renderButton(i) {
    return (
      <this.CalcButton
        value = {i}
        onClick = {() => this.handleClick(i)}
      />
    );
  }

  // Handles clicks on calculator buttons
  // and their associated actions
  handleClick(i) {
    switch(i) {
      // Handle clearing input
      case 'C':
        const r1 = '';
        this.setState({calcInput: r1});
        break;
      // Handle submitting answers
      case '=':
        const r2 = '';
        this.setState({calcInput: r2});
        (async () => {
          await this.createCalculation();
        })();
        (async () => {
          await this.fetchCalculations();
        })();
        break;
      default:
        var result = this.state.calcInput + String(i);
        this.setState({calcInput: result});
    }
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
          </form>
          <div className="calcButtons">
            <div className="calcButtonRow">
              {this.renderButton('C')}
              {this.renderButton('!')}
              {this.renderButton('%')}
              {this.renderButton('/')}
              {this.renderButton('^')}
              {this.renderButton('sin')}
            </div>
            <div className="calcButtonRow">
              {this.renderButton('7')}
              {this.renderButton('8')}
              {this.renderButton('9')}
              {this.renderButton('*')}
              {this.renderButton('(')}
              {this.renderButton('tan')}
            </div>
            <div className="calcButtonRow">
              {this.renderButton('4')}
              {this.renderButton('5')}
              {this.renderButton('6')}
              {this.renderButton('-')}
              {this.renderButton(')')}
              {this.renderButton('cos')}
            </div>
            <div className="calcButtonRow">
              {this.renderButton('1')}
              {this.renderButton('2')}
              {this.renderButton('3')}
              {this.renderButton('+')}
              {this.renderButton('e')}
              {this.renderButton('deg')}
            </div>
            <div className="calcButtonRow">
              {this.renderButton('0')}
              {this.renderButton('.')}
              {this.renderButton('=')}
              {this.renderButton('pi')}
            </div>
          </div>
          <h4>{this.calculationList()}</h4>
        </div>
      </React.Fragment>
    );
  }
}