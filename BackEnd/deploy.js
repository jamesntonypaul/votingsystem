import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'
import './contractABI.json'


const contractABI ='./contractABI.json'

const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
const accounts = await web3.eth.getAccounts()

const contract = new web3.eth.Contract(contractABI, accounts[0]);

async function getCandidateCount(){
    const count = await contract.methods.getCandidateCount().call();
    console.log(count)
  };
