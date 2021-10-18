import React, { ReactElement } from 'react'

import  Styles from "../Styles.module.scss";

interface Props {
  
}

export default function Header({}: Props): ReactElement {
  return (
    <header className={Styles.navHead}>
    <div className="navigate icon">
      <div className="img">
        <img  src="./images/back-arrow.png" alt="" />
      </div>
    </div>
    <h4 className={Styles.title}>Stations</h4>
    <div className={Styles.icon}>
      <div className="img">
        <img src="./images/switch.png" alt="" />
      </div>
    </div>
  </header>
  )
}

