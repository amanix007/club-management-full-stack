import React from 'react';
import Footer from './footer/Footer';
import Header from './header/Header';
import logo from './logo.svg';
import Routes from './Routes/Routes';
import './App.scss';

import Styles from "./Styles.module.scss";

function App() {
  return (
    <main className={Styles.App} data-testid="main_tag">
      {/* <Header /> */}
      <Routes />
      {/* <Footer /> */}
    </main>
  );
}

export default App;
