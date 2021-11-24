import React, { Component } from 'react';
import Form from '../components/Form';
import Header from '../components/Header';
import Table from '../components/Table';

class Wallet extends Component {
  render() {
    return (
      <div className="container-wallet">
        <Header />
        <Form />
        <Table />
      </div>
    );
  }
}

export default Wallet;
