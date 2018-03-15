import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import bitcoin from 'bitcoinjs-lib';
import randomstring from 'randomstring';
import {acquire,acquireObj, increment, decrement} from "./state/actions";
import encryptor from 'simple-encryptor';
import {connect} from 'react-redux';

class Bitcoin1 extends Component {

    constructor(props) {
        super(props);
        this.state = {test:true};
    }

  observeTheStateChanging = (wallet) =>{

      let encEngine = encryptor("secretkejkfghsdlfjkgylerhtuwe5j0w89235h06g34y");
      console.log('ORIGINAL', wallet)
      let encrypted = encEngine.encrypt(wallet);
      console.log("ENCRYPTED",encrypted);     
      var decrypted = encEngine.decrypt(encrypted);
      console.log('DECRYPTED',decrypted);     

   }

   componentWillUpdate(nextProps) {
    if (nextProps.wallet !== this.props.wallet) {        
        this.observeTheStateChanging(nextProps.wallet);
    }
    if (nextProps.walletObject !== this.props.walletObject) {
    console.log(nextProps.walletObject);
  }




if (nextProps.counter !== this.props.counter) {        
  console.log('COUNTER IS NOW',nextProps.counter )
    }


   }

   


  updateState = ()=> {
    let randomString = randomstring.generate(32);
    let randomStringBuffer = () => { return new Buffer(randomString);}
    let testnet = bitcoin.networks.testnet;
    let keyPair = bitcoin.ECPair.makeRandom({ network: testnet, rng: randomStringBuffer })
    let privateKey = keyPair.toWIF()
    let testnetAddress = keyPair.getAddress();   
    let wl = { walletName: "TestNetWallet", randomString:randomString, testnetAddress:testnetAddress, privateKey:privateKey };
   
    this.props.dispatch(acquireObj(this.refs.address.value,wl));
   // this.props.dispatch(acquireObj('second',wl));
  //  this.props.dispatch(acquireObj('third',wl));




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

        <input ref='address' type="text"/>
        <button onClick = {this.updateState}>Create a Testnet Bitcoin resource</button>        
      </div>
    );
  }
}

const mps = (state) => { return { wallet: state.wallet,walletObject:state.walletObject, counter : state.counter }; }
export default connect(mps)(Bitcoin1);


