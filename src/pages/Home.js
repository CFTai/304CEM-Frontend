import React, {useState, Component} from 'react';
import Overlay from '../components/overlay';
import Header from '../components/header';

export default class Home extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      activeClass : false
    };
  }

  render() {
  return (
    // <ul>
    //   {
    //     this.state.persons
    //       .map(person =>
    //         <li key={person.id}>{person.name}</li>
    //       )
    //   }
    // </ul>
    <div>
      <section className={"container"}>
        <Header
          setActiveClass={this.setState({activeClass: this.state.activeClass ? false : true })}
          activeClass={this.state.activeClass}
          brand="brand"
        />
        dabcas
        <Overlay />
      </section>
    </div>
  )
  }
}