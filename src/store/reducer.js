import * as actionTypes from "./actions/actionTypes";

const initialState = {
  currentAccount: {},
  otherAccounts: [],
  transactions: [],
  modalOpen: false,
  modalType: "",
  transactionAmount: "0.00",
  showDropdownItems: false,
  selectedAccount: {}
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
        transactionAmount: action.payload.maskedvalue
      };

    case actionTypes.CHANGE_DROPDOWN:
      return {
        ...state,
        showDropdownItems: !state.showDropdownItems
      };

    case actionTypes.CHANGE_ACCOUNT:
      return {
        ...state,
        selectedAccount: action.selected,
        showDropdownItems: false
      };

    case actionTypes.SET_CURRENTACCOUNT:
      return {
        ...state,
        currentAccount: action.account
      };
    case actionTypes.SET_ALLOTHERACCOUNT:
      return {
        ...state,
        otherAccounts: action.account
      };
    case actionTypes.SET_ALLTRANSACTIONS:
      return {
        ...state,
        transactions: action.transactions
      };
    default:
      return state;
  }
};

export default reducer;
