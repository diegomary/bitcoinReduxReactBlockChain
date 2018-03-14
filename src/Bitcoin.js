import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import bitcoin from 'bitcoinjs-lib';
import randomstring from 'randomstring';
import PropTypes from "prop-types";// To render available the state in the component
import {acquire} from "./state/actions";
import encryptor from 'simple-encryptor';
import {connect} from 'react-redux';




class Bitcoin extends Component {

  static contextTypes = {store: PropTypes.object}; 

  observeTheStateChanging = () =>{
      let encEngine =encryptor("secretkejkfghsdlfjkgylerhtuwe5j0w89235h06g34y");
    

      console.log('ORIGINAL',this.context.store.getState().wallet)
      let encrypted = encEngine.encrypt(this.context.store.getState().wallet);
      console.log("ENCRYPTED",encrypted);
      console.log(typeof encrypted);
      var decrypted = encEngine.decrypt(encrypted);
      console.log('DECRYPTED',decrypted);

   }
  componentDidMount(){
     this.context.store.subscribe(this.observeTheStateChanging);
     
     };

  updateState = ()=> {

    let randomString = randomstring.generate(32);
    let randomStringBuffer = () => { return new Buffer(randomString);}
    let testnet = bitcoin.networks.testnet;
    let keyPair = bitcoin.ECPair.makeRandom({ network: testnet, rng: randomStringBuffer })
    let privateKey = keyPair.toWIF()
    let testnetAddress = keyPair.getAddress();   
    let wl = { walletName: "TestNetWallet", randomString:randomString, testnetAddress:testnetAddress, privateKey:privateKey };
    this.context.store.dispatch(acquire(wl));

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick = {this.updateState}>Create a Testnet Bitcoin resource</button>
      </div>
    );
  }
}

export default Bitcoin;