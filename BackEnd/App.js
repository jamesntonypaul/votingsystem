import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'


class App extends Component {
  componentWillMount() {
    this.loadBlockchainData()
    this.SetBlockdata()
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0], account1: accounts[1] })
    console.log('Attemping to deploy from account', accounts[0]);

  }

  constructor(props) {
    super(props)
    this.state = { account: '' }
  }

  render() {
    return (
      <div className="container">
        <h1l>Hello, World!</h1l>
        <p>Your account: {this.state.account}</p>
        <p>Your account: {this.state.account1}</p>
      </div>
    );
  }
}

export default App;
