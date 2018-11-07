import React, { Component } from 'react';


export default class Preloader extends Component {
  render() {
    return (
      <div style={{ textAlign: 'center', width: '100%'}}>
        <img
          style={{
            width: '180px'
          }}
          src="https://camo.githubusercontent.com/a1a81b0529517027d364ee8432cf9a8bd309542a/687474703a2f2f692e696d6775722e636f6d2f56446449444f522e676966"
          alt="preloader"
        />
      </div>
    )
  }
}
