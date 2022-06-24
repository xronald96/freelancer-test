import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { ModalSection } from './components/ModalSection'
import { SectionList } from './components/SectionList'
import { useCallback } from 'react';
function App() {
  const [ show , setshow ] = useState(false);
  const [ price, setPrice ] = useState('')
  const calculaPrice = () => {
    fetch('/fake-endpoint').then((response: any)=> response.json()).then((response: any)=> {
      setPrice(response.price)}).catch((err:any)=> console.log(err))
  }
  const controlModal = useCallback(() => setshow(!show), [show])
  return (
    <Container data-testid="app">
      <ModalSection show={show} onClose={controlModal}/>
      <Button onClick={controlModal} className="mt-3" variant="primary">Add new section</Button>
      <SectionList/>
      <Button onClick={calculaPrice} className="mt-3" variant="primary">Calculate price</Button>
      <div id="price">{price}</div>
    </Container>
  );
}

export default App;
