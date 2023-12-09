import React from 'react'
import ReactDOM from 'react-dom/client'
import './main.scss'
import Home from "./pages/home/Home.tsx";
import {Provider} from "react-redux";
import {store} from "./features/store.ts";
import {Reset} from "styled-reset"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Reset/>
      <Home/>
    </Provider>
  </React.StrictMode>,
)
