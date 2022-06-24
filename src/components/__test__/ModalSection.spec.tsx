import React, { ReactNode } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import {ModalSection}  from "../ModalSection";
import { Provider } from 'react-redux'
import store from '../../redux/store'
import configureStore  from "redux-mock-store";
import { act } from "react-dom/test-utils";
interface Props {
  children?: ReactNode,
  reduxStore:any
}

describe("<ModalSection />", () => {
  const initialState = {dataManage:[]}
  const mockStore = configureStore()
  // let store = mockStore(initialState)
  let component: any ;
  const onClose = jest.fn()
  beforeEach(()=>{
    component = render(<Provider store={store}><ModalSection show={true} onClose={onClose}/></Provider>)
  })
  it('Component is rendered"', () => {
    const element = screen.getByTestId('modal')
    expect(element).not.toBeNull()
  })
  it('when clink in X onClose is called', () => {
    const button = screen.getAllByLabelText('Close')
    fireEvent.click(button[0]);
    expect(onClose).toHaveBeenCalled()
  })
  it('fill the field data should be stored', async() => {
    const button:any = screen.getByText('Save');
    const input: any = screen.getAllByPlaceholderText('10m2')
    fireEvent.change(input[0], {target: {value: "23"}})
    await act(()=> {fireEvent.click(button)})
    const array:any = store.getState().dataManage
    expect(array.length).toEqual(1)
  })
});
