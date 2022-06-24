export const addItem = (item: any) => {
    return {
      type: "ADD",
      payload: item,
    };
  };
  export const deleteItem = (index: any) => {
    return {
      type: "DELETE",
      payload: index,
    };
  };