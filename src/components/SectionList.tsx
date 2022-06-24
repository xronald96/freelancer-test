import React from 'react'
import { Button, Table } from 'react-bootstrap';
import { deleteItem } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

export const SectionList = React.memo(() => {
const data = useSelector((state: any)=> state.dataManage)
const dispatch = useDispatch();
const deleteSection = (index: number) => {
  dispatch(deleteItem(index))
}
   return <>
    <Table data-testid="section-list" className='mt-3' striped bordered hover>
      <thead>
        <tr>
          <th>Section</th>
          <th>Meters</th>
          <th>Price m2</th>
          <th>Total Price</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
      {
        data.map((it: {meters: number, section:any, color:any}, index: number)=>{
            return<><tr key={index+"_row"}>
            <td>{it.section.name}</td>
            <td >{it.meters} m2</td>
            <td>{it.color.price+ it.section.price}€</td>
            <td>{(it.color.price+ it.section.price)*it.meters}€</td>
            <td><Button onClick={()=> {deleteSection(index)} } variant="danger">Delete</Button></td>
          </tr></>
        })
    }
      </tbody>
    </Table>
    
   </>
})