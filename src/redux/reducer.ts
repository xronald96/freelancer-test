export const manageDataReducer = function (state:any = [], action:{type: string, payload:any}) {
    switch (action.type) {
      case "ADD":{
        const newState = [...state]
        newState.push(action.payload)
        return newState};
      case "DELETE":{
        const newState = [...state];
        newState.splice(action.payload, 1)
        return newState
    };
      default:
        return state;
    }
  };