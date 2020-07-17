import React from 'react';
import Calculator from './Calculator/Calculator';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'

function App() {
  return (
    <div className="App">
      <Calculator></Calculator>
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);