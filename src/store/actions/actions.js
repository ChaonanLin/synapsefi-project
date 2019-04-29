import * as actionTypes from "./actionTypes";
import axios from "axios";

export const onModalChange = modalType => {
  return {
    type: actionTypes.ON_MODALCHANGE,
    modalType: modalType
  };
};

export const changeTransAmount = (event, maskedvalue, floatvalue) => {
  return {
    type: actionTypes.CHANGE_TRANSAMOUNT,
    payload: { event, maskedvalue, floatvalue }
  };
};

export const changeDropdown = () => {
  return {
    type: actionTypes.CHANGE_DROPDOWN
  };
};

export const changeAccount = (item) => {
    return {
        type:actionTypes.CHANGE_ACCOUNT,
        selected:item
    }
}

const headers = {
  "X-SP-GATEWAY":
    "client_id_gcvWhR0VjZiawAr8JU6LpkN2bKtx5OmzulyFBM70|client_secret_3xDY0cMElJmeq7r6ZfIsPj2gBLTUOSyG1dnpt8VA",
  "X-SP-USER-IP": "73.241.31.11",
  "X-SP-USER": "oauth_GbwYxPstFqUQM95EmJo0DpThLl0izVk6g8RI42n7|",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*"
};

export const setCurrentAccount = accountdata => {
  return {
    type: actionTypes.SET_CURRENTACCOUNT,
    account: accountdata
  };
};

export const getCurrentAccount = () => {
  return dispatch => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://uat-api.synapsefi.com/v3.1/users/5cc13e09ad388f6fabe64d76/nodes/5cc661ea21730420ee50ee26`,
        {
          headers: headers
        }
      )
      .then(res => {
        dispatch(setCurrentAccount(res.data));
      })
      .catch(res => {
        console.log(" get current account failed", res);
      });
  };
};

export const setAllOtherAccount = accountdata => {
  return {
    type: actionTypes.SET_ALLOTHERACCOUNT,
    account: accountdata
  };
};

export const getAllOtherAccount = () => {
  return dispatch => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://uat-api.synapsefi.com/v3.1/users/5cc13e09ad388f6fabe64d76/nodes`,
        {
          headers: headers
        }
      )
      .then(res => {
        //filter out the current account
        let otherAccount = res.data.nodes.filter(
          node => node._id !== "5cc661ea21730420ee50ee26"
        );
        dispatch(setAllOtherAccount(otherAccount));
      })
      .catch(res => {
        console.log("get all other account failed", res);
      });
  };
};

export const setAllTransactions = transactions => {
  return {
    type: actionTypes.SET_ALLTRANSACTIONS,
    transactions: transactions
  };
};

export const getAllTransactions = () => {
  return dispatch => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://uat-api.synapsefi.com/v3.1/users/5cc13e09ad388f6fabe64d76/nodes/5cc661ea21730420ee50ee26/trans`,
        {
          headers: headers
        }
      )
      .then(res => {
        dispatch(setAllTransactions(res.data.trans));
      })
      .catch(res => {
        console.log("get transactions data failed", res);
      });
  };
};
