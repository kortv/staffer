import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import _ from 'lodash';
import Img from './Img';
import Text from './Text';

const components = {
  image: Img, text: Text
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: {},
      settings: {},
      assets: {},
    }
  }
  
  componentDidMount() {
    fetch('http://live.spongecell.com/interview/ad_revision.json')
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        this.setState(data)
      })
  }
  
  render() {
    const {
      size,
      settings,
      assets,
    } = this.state
    const elements = _.get(settings, 'screens.[0].elements', [])
    console.log(elements);
    const maitLayout = elements.map((el) => {
      const Element = components[el.type]
      return <Element key={el.iid} {...el} assets={assets} />
    })
    return (
      <div className="App" style={size}>
        {maitLayout}
      </div>
    );
  }
}

export default App;
