import { Modal, Form, Button } from "react-bootstrap"
import { useForm } from "react-hook-form"
import React from 'react'
import data from '../fake-data/data.json'
import { addItem } from "../redux/actions";
import { useDispatch } from "react-redux";
export const ModalSection = React.memo((props: any) => {
    const { register, handleSubmit, reset } = useForm();
    const dispatch = useDispatch();

    const onSave = (newItem: any, event: any) =>{
        dispatch(addItem({...newItem, section: data.find((it:any)=>it.name === newItem.section)}))
        reset();
        props.onClose();
    }
    return <Modal data-testid="modal" show={props.show} onHide={props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Configure section</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleSubmit(onSave)}>
          <Form.Group className="mt-3" controlId="section">
            <Form.Select required {...register("section")} aria-label="Default select example">
              {data.map((it:any, index: number)=>{
                return <option key={index}>{it.name}</option>
              })}
            </Form.Select>
            <Form.Control.Feedback type="invalid">Campo requerido</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mt-3" controlId="meters">
          <Form.Label>Meter to paint</Form.Label>
          <Form.Control required {...register("meters")} type="number" placeholder="10m2" />
          <Form.Control.Feedback type="invalid">Campo requerido</Form.Control.Feedback>
        </Form.Group>
        <Button className="mt-3" variant="primary" type="submit">
          Save
          </Button>
        </Form>
        </Modal.Body>
      </Modal>
} )