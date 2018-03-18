import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Bitcoin from './Bitcoin';
import Bitcoin1 from './Bitcoin1';
import { Provider } from "react-redux";// eslint-disable-line no-unused-vars
import registerServiceWorker from './registerServiceWorker';
import store from "./state/store";


ReactDOM.render( <Provider store = {store}><Bitcoin/></Provider>, document.getElementById("root") );
registerServiceWorker();





