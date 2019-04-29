import * as actionTypes from "./actions/actions.js";

const initialState = {
  modalOpen: false,
  modalType: "",
  transactionAmount: "0.00",
  showDropdownItems: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ON_MODALCHANGE:
      return {
        ...state,
        modalOpen: !state.modalOpen,
        modalType: action.modalType
      };

    case actionTypes.CHANGE_TRANSAMOUNT:
      return {
        ...state,
        transactionAmount: action.playload.maskedvalue
      };

    case actionTypes.CHANGE_DROPDOWN:
      return {
        ...state,
        showDropdownItems: !state.showDropdownItems
      };

    // case actionTypes.GET_CURRENTACCOUNT:
    // return {
    //
    // };
    // case actionTypes.GET_ALLOTHERACCOUNT:
    // return {
    //
    // };
    // case actionTypes.GET_ALLTRANSACTIONS:
    // return {
    //
    // };
    default:
      return state;
  }
};

export default reducer;
