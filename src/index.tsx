import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';


import * as React  from "react";
import * as ReactDOM from "react-dom";
import { App } from "./components/App"
import "./styles/style.scss"

const ROOT = document.querySelector(".container");

ReactDOM.render(<App />, ROOT);