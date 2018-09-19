import React, { Component } from 'react';
import './App.css';

import Layout from './components/Layout/Layout';
import Box from './components/Box/Box';
import FloatButton from './components/UI/FloatButton/FloatButton';
import Modal from './components/UI/Modal/Modal';
import ExpanseForm from './components/ExpanseForm/ExpanseForm';

class App extends Component {

 state = {
    isModalShowing: false
 } 


 clickFloatButtonHandler =() =>{
   console.log("Button clicked");
    this.setState({isModalShowing: true});
 } 

 closeModalHandler =()=> {
  console.log("modal closed");
   this.setState({isModalShowing: false});
 }


  render() {
    const modal = (
      <Modal show={this.state.isModalShowing} modalClosed={this.closeModalHandler} >
        <ExpanseForm />
      </Modal> 
    );
    
    
    return (
      <Layout>
        {modal}
        <Box title="Receitas" />
        <Box title="Despesas" />
        <FloatButton clicked={this.clickFloatButtonHandler} />
      </Layout>
    );
  }
}

export default App;
