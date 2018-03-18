import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import bitcoin from 'bitcoinjs-lib';
import randomstring from 'randomstring';
import {acquire,acquireObj, increment, decrement} from "./state/actions";
import encryptor from 'simple-encryptor';
import {connect} from 'react-redux';
import crypto  from "crypto";
import MerkleTools from 'merkle-tools'
import fastRoot from 'merkle-lib/fastRoot';
import bswap from "bswap";

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




littleEndianDoubleHash = () =>{

    var hash = crypto.createHash('sha256').update('hello').digest();
    console.log(hash.toString('hex'));
    var dbhash = crypto.createHash('sha256').update(hash).digest();
    // in bitcoin double hash is shown little endian
    //dbhash.reverse();
    console.log(dbhash.toString('hex'));

}


merkletree =()=>{


  let treeOptions = {
    hashType: 'sha256' // optional, defaults to 'sha256'
    // valid hashTypes include all crypto hash algorithms
    // such as 'MD5', 'SHA1', 'SHA224', 'SHA256', 'SHA384', 'SHA512'
    // as well as the SHA3 family of algorithms
    // including 'SHA3-224', 'SHA3-256', 'SHA3-384', and 'SHA3-512'
  }
  let merkleTools = new MerkleTools(treeOptions) // treeOptions is optional

  var hexData = '05ae04314577b2783b4be98211d1b72476c59e9c413cfb2afa2f0c68e0d93911'
  var otherData = 'Some text data, perhaps'
   
  merkleTools.addLeaf('hello',true);
  merkleTools.addLeaf('hello',true);

  let leafCount =  merkleTools.getLeafCount();
  console.log(leafCount);

  //merkleTools.addLeaf(otherData, true)

let doubleHash = false // true to hash pairs twice as the tree is constructed 
 
merkleTools.makeTree(doubleHash);

var rootValue = merkleTools.getMerkleRoot().toString('hex');

console.log(rootValue);

}





hashsimple =() =>{
  var hash = crypto.createHash('sha256').update('2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b98242cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824').digest('hex');



  console.log(hash);


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
        <br/> 
        <button onClick = {this.littleEndianDoubleHash}>littleEndianDoubleHash</button> 
        <br/> 
        <button onClick = {this.merkletree}>merkletree</button>
        <br/> 
        <button onClick = {this.hashsimple}>hashsimple</button>            
      </div>
    );
  }
}

const mps = (state) => { return { wallet: state.wallet,walletObject:state.walletObject, counter : state.counter }; }
export default connect(mps)(Bitcoin1);


