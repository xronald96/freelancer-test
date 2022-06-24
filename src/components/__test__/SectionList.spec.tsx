import React, { ReactNode } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import {SectionList}  from "../SectionList";
import { Provider } from 'react-redux'
import store from '../../redux/store'
import { addItem } from '../../redux/actions'
import configureStore  from "redux-mock-store";
import { act } from "react-dom/test-utils";
interface Props {
  children?: ReactNode,
  reduxStore:any
}

describe("<SectionList/>", () => {
  // let store = mockStore(initialState)
  let component: any ;
  beforeEach(()=>{
    component = render(<Provider store={store}><SectionList/></Provider>)
  })
  it('Component is rendered', () => {
    const element = screen.getByTestId('section-list')
    expect(element).not.toBeNull()
  })
  it('Table show data from redux', async() => {
    await act(()=> {
          store.dispatch(addItem({meters:10, section: {
          "name":"pared",
          "price":10
      }}))
    })
   expect(screen.getAllByRole('row').length-1).toEqual(1) // We rest 1 because the headers count as row
  })
  
});
