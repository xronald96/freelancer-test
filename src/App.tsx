import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import './App.scss';
import { Button } from "react-bootstrap";
import { ModalSection } from './components/ModalSection'
import { SectionList } from './components/SectionList'
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
function App() {
  const [ show , setshow ] = useState(false);
  const [ price, setPrice ] = useState('')
  const data = useSelector((state: any)=> state.dataManage)
  const calculaPrice = () => { // esta funcion
    fetch('/fake-endpoint').then((response: any)=>response.json()).then((response: any)=> { // el finally solo se usa para pintar en la ui lo que deberia deolver el servidor real
      setPrice(response.price)
    }).catch((err:any)=> console.log(err)).finally(()=>setPrice(getCurrentAmount()+'')) 
  }
  const getCurrentAmount = () => { // simulata the real response value
    let result = 0;
    data.forEach((element: any) => {
      result+= (element.color.price+ element.section.price)*element.meters
    });
    return result;
  }
  const controlModal = useCallback(() => setshow(!show), [show])
  return (
    <Container data-testid="app">
      <div className="Title">
        <div className='aling-center-item font-Title'>List of sections to be painted</div>
        <div className='aling-center-item'><Button onClick={controlModal} className="mt-3 align-items-center" variant="dark">Add section</Button></div>
      </div>
      <ModalSection show={show} onClose={controlModal}/>
      <SectionList/>
      <div className="Title">
      <Button onClick={calculaPrice} className="mt-3" variant="dark">Calculate</Button>
      {price && <div className='final-price'>Estimated price: {price}€</div>}
      </div>
    </Container>
  );
}

export default App;
