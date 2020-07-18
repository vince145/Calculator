import React from 'react';
import Calculator from './Calculator/Calculator';
import Amplify from 'aws-amplify';
import aws_config from "./aws-exports";
Amplify.configure(aws_config);

function App() {
  return (
    <div className="App">
      <Calculator></Calculator>
    </div>
  );
}

export default App;