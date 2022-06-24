import React, { useState } from 'react'
import { useMemo } from 'react';
import { Table } from 'react-bootstrap';

import { useSelector } from "react-redux";

export const SectionList = React.memo(() => {
const data = useSelector((state: any)=> state.dataManage)
   return <>
    <Table data-testid="section-list" className='mt-3' striped bordered hover>
      <thead>
        <tr>
          <th>Section</th>
          <th>Meters</th>
          <th>Price m2</th>
          <th>Total Price</th>
        </tr>
      </thead>
      <tbody>
      {
        data.map((it: {meters: number, section:{name:string, price:number}}, index: number)=>{
            return<><tr key={index+"_row"}>
            <td>{it.section.name}</td>
            <td >{it.meters} m2</td>
            <td>{it.section.price}€</td>
            <td>{it.section.price*it.meters}€</td>
          </tr></>
        })
    }
      
      </tbody>
    </Table>
    
   </>
})