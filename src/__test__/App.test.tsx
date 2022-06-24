import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App  from "../App";
import 'whatwg-fetch'
import { Provider } from 'react-redux'
import store from '../redux/store'
import { act } from "react-dom/test-utils";
import {rest} from 'msw'
import {setupServer} from 'msw/node'
const server = setupServer(
  rest.get('/fake-endpoint', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({price: '100'}))
  }),
)
describe("<App/>", () => {

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
  let component: any ;
  beforeEach(async ()=>{
     await act(async()=> {await render(<Provider store={store}><App/></Provider>)})
  })
  it('Component is rendered', () => {
    const element = screen.getByTestId('app')
    expect(element).not.toBeNull()
  })
  it('2 buttons are in the DOM', ()=>{
    expect(screen.getAllByRole('button').length).toEqual(2)
  })
  it('Section list is in the DOM', ()=>{
    expect(screen.getByTestId('section-list')).toBeDefined()
  })
  it('when click to add new section modal have to be open', ()=>{
    const button = screen.getByText('Add new section')
    act(()=>{fireEvent.click(button)})
    expect(screen.getByTestId('modal')).toBeDefined()
  })
  it('Calculate price', async ()=>{
    const button = screen.getByText('Calculate price')
    await act(()=>{fireEvent.click(button)})
    await waitFor(()=> expect(screen.getAllByText('100')).toBeDefined())
  })
});
