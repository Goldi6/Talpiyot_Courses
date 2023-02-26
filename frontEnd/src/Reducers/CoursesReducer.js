export const initialListState = [];

export const addItem_Action = (item) => ({
  type: "ADD_",
  item,
});

export const deleteItem_Action = (id) => ({
  type: "DELETE_",
  id,
});

export const initItemList_Action = (items) => ({
  type: "SET_",
  items,
});

export default function arrayOfDataObjectsReducer(currentArrayState, action) {
  //console.log("array Reducer");
  //console.log(action);
  switch (action.type) {
    case "SET_":
      return action.items;
    case "ADD_":
      return [...currentArrayState, action.item];
    case "DELETE_":
      return currentArrayState.filter((item) => item._id !== action.id);

    default:
      return currentArrayState;
  }
}
