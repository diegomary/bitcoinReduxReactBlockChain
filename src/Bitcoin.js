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










//https://blockchain.info/address/1JYoWUnAn27c7qCH5XYqvPoCFiebx8NxsM
//https://blockchain.info/address/1JYoWUnAn27c7qCH5XYqvPoCFiebx8NxsM?format=json

//The foloowing also checks sandbox addresses
//https://live.blockcypher.com/

// var express = require("express");
// var app = express();
// var bodyparser = require("body-parser");
// var bitcore = require("bitcore-lib");
// var bitcoin = require('bitcoinjs-lib')
// var randomstring = require("randomstring");
// var prettyjson = require('prettyjson');




// app.use(bodyparser.urlencoded({
// 	extended:true
// }));
// app.use(bodyparser.json());

// app.get ("/", (req,res) => {
// 	res.sendFile(__dirname + "/index.html");
// });
// app.post("/wallet", (req,res) => {
// 	var brainsrc = randomstring.generate(256);	
// 	var input = new Buffer(brainsrc);
// 	var hash = bitcore.crypto.Hash.sha256(input);
// 	var bn = bitcore.crypto.BN.fromBuffer(hash);	
// 	// for sandbox operations
// 	var keypair = new bitcore.PrivateKey(bn,'testnet')
// 	var pkey = keypair.toWIF();
// 	var addy = keypair.toAddress();
// 	//var addy = new bitcore.PrivateKey(bn).toAddress();	
// 	res.send(`The Brain Wallet of:</br> <textarea rows='8' cols='30'>${brainsrc}</textarea> </br>Testnet address: ${addy} </br>Private Key: ${pkey}`)
// });




// app.post("/getaddress", (req,res) => {

// var randomString = randomstring.generate(32);
// var randomStringBuffer = ()=>{ return new Buffer(randomString);}
// var testnet = bitcoin.networks.testnet;
//     var keyPair = bitcoin.ECPair.makeRandom({ network: testnet, rng: randomStringBuffer })
//     var privateKey = keyPair.toWIF()
// 	var address = keyPair.getAddress();
// 	res.send(`The Brain Wallet of:</br> <textarea rows='8' cols='30'>${randomString}</textarea> </br>Testnet address: ${address} </br>Private Key: ${privateKey}`)

// });



//3
//Testnet address: mnreyYjaEEifJnDpj4NM4Ei43cm81wjx83 
//Private Key: cQ13t1vaYtUdNqvFFUHZWK1xcDEES1jhEJ2chEKSwY6NkF2JRh7i

//New destination
//Testnet address: msLLuqntw5rZs3xCgzxZwuawwiYRY5LV95 
//Private Key: cQSpaVCBqw39AUeZQJQg8pY6Wp7BcYUYGH29qHwX2X9XzQ4u2K9w


// We need anew destination for the total
// Wallet:FwAZdYyGLCi6K6VyP7pTzmf3ymHxJvXh
// Testnet address: mgUq9cSnDJ9g213tcAdukTZTNNaeuvndhE 
// Private Key: cPwgH8tkTxhgB5UGmJDvJ2UAMbSiUEuTsMyGHQk3YXZn9SZonsdY


// app.get("/transact",(req,res)=>{

//  var alice = bitcoin.ECPair.fromWIF('cQ13t1vaYtUdNqvFFUHZWK1xcDEES1jhEJ2chEKSwY6NkF2JRh7i',bitcoin.networks.testnet)
//  var bob = bitcoin.ECPair.fromWIF('cQSpaVCBqw39AUeZQJQg8pY6Wp7BcYUYGH29qHwX2X9XzQ4u2K9w',bitcoin.networks.testnet)
// 	var tx = new bitcoin.TransactionBuilder(bitcoin.networks.testnet);
	

// 	//Alice transactions

// 	  	tx.addInput("f67858b99145a07e0c933a6ad2cf21243a0bd4f7fa01864b7b37d888d0dcd73e", 0);
// 	  	tx.addInput("16ae0da271831ba844cbf2d1a324bee1fbe26eb84cbcb61d1f967e99a389e9ac", 0);
// 	  	tx.addInput("3c1f4b39affd52d36fd5850272dd1355e930978434a78fa830d01caf8b8558f4", 0);
// 	  	tx.addInput("d7493b4798928f8558e42677a14a838967dfddc09c95067c7b151952f21d65ea", 0);
// 	  	tx.addInput("17f3cad26d6827f701880fd699c67595625dd87eeb19eff20a214c8ea1ad2a39", 1);
// 	    tx.addInput("4a016805d9052c9c2dbea2dc9a8cdff38518e247523fbc6de7d9058f3d83d1a7", 0);
// 	    tx.addInput("7751047fcd91a7af91ad28754f5f558f9d33305c07c7b26ac27681b2e6aa5681", 0);
// 	    tx.addInput("c47b892b97cb2069f02e078cb10a6f1affacf526208399a834caf55c8b0980c2", 1);
// 	    tx.addInput("07538b0f277f7113dbf20e3104bc23153ed393c481b62e57b8d78af4c3f03d48", 9);
// 	    tx.addInput("e7c6532abdac94fabca60663734d9402fd67d1847da87813d6ade8e9b8a9fa10", 0);

// 	//Bob transactions

// 		tx.addInput("89b890290536529b57c255b49bd508447f5d829203153d592d7d933af1a621b9", 0);
// 	    tx.addInput("72d4ab6844d2e51f19f540a392677d5d86f9560a4960cfbb20c03d675212472e", 1);
// 	    tx.addInput("57160929572f4ea6d4a945d47c0321cc5c4afc7119aaa72e641faf619b80f21d", 1);
// 	    tx.addInput("7fd8be3d19d50d47eb3b4e2076cdc7cab59f1a56986631a1b8da0203d6a545d8", 0);
	 
	
// 	tx.addOutput("mgUq9cSnDJ9g213tcAdukTZTNNaeuvndhE", 301293600000);
// 	tx.sign(0, alice)
// 	tx.sign(1, alice)
// 	tx.sign(2, alice)
// 	tx.sign(3, alice)
// 	tx.sign(4, alice)
// 	tx.sign(5, alice)
// 	tx.sign(6, alice)
// 	tx.sign(7, alice)
// 	tx.sign(8, alice)
// 	tx.sign(9, alice)

// 	tx.sign(10, bob)
// 	tx.sign(11, bob)
// 	tx.sign(12, bob)
// 	tx.sign(13, bob)
	




//     console.log(tx.build().toHex());	
// 	res.send(tx.build().toHex());

// });




// app.get("/decode",(req,res)=>{
// 	var txHexSerialized = "0100000001a101c88673bcd8e1341021eb8b9a17a8cc8c05c1d9e4aa288858f61208baf8f6000000006b483045022100adc35008fe2852395090211334d5cf06d0089243fd7e1a8fe055214896e5e23202205a159d74ed806a0996523c62e7e586917b4058874339d3911f26a49c50971ce8012103bc6c8dc474f60cd6df305ffbd0f660369063a4d13ab65e2d7e2992d8cc6e7c8affffffff034081ba01000000001976a9148d3d69c0bed1ae650498b041fcb95bc397131caa88ac002d3101000000001976a914a363b5016980768bfd1c6d4b211630000e960e4c88ac002d3101000000001976a9145082be13dc963b04af37042808022fd38be2488c88ac00000000";
// 	var txDecoded = new bitcore.Transaction(txHexSerialized);	
// 	res.json(txDecoded);
// });





// app.listen(80, ()=> {
// 	console.log("go");
// });


// List of APIS
// https://testnet.blockchain.info/rawaddr/mtPm9AArTAoVh6EWGcSpnpLwfK7ZVGqSDX
//https://testnet.blockchain.info/rawtx/f6f8ba0812f6588828aae4d9c1058ccca8179a8beb211034e1d8bc7386c801a1

// Broadcast a transaction a post request with x-www-form-urlencoded
// the parameter is rawtx and its value is the transactine ex value
//https://testnet.blockexplorer.com/api/tx/send


//https://testnet.blockexplorer.com/api/status?q=getInfo
