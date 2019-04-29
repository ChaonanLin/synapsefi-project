export const ON_MODALCHANGE = "ON_MODALCHANGE";
export const CHANGE_TRANSAMOUNT = "CHANGE_TRANSAMOUNT";
export const CHANGE_DROPDOWN = "CHANGE_DROPDOWN";

// export const GET_CURRENTACCOUNT = "GET_CURRENTACCOUNT";
// export const GET_ALLOTHERACCOUNT = "GET_ALLOTHERACCOUNT";
// export const GET_ALLTRANSACTIONS = "GET_ALLTRANSACTIONS ";

export const onModalChange = () => {
  return {
    type: ON_MODALCHANGE
  };
};

export const changeAmount = () => {
  return {
    type: CHANGE_TRANSAMOUNT
  };
};

export const changeDropdown = () => {
  return {
    type: CHANGE_DROPDOWN
  };
};

// export const getCurrentAccount = () => {
//   return {
//     type: GET_CURRENTACCOUNT
//   };
// };
//
// export const getAllOtherAccount = () => {
//   return {
//     type: GET_ALLOTHERACCOUNT
//   };
// };
//
// export const getAllTransactions = () => {
//   return {
//     type: GET_ALLTRANSACTIONS
//   };
// };
