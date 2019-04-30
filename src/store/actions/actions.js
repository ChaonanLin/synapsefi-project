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

export const changeAccount = item => {
  return {
    type: actionTypes.CHANGE_ACCOUNT,
    selected: item
  };
};

export const setAuthKey = key => {
  return {
    type: actionTypes.SET_AUTHKEY,
    key: key
  };
};

export const getAuthanticated = () => {
  return dispatch => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://uat-api.synapsefi.com/v3.1/users/5cc13e09ad388f6fabe64d76`,
        {
          headers: {
            "X-SP-GATEWAY":
              "client_id_gcvWhR0VjZiawAr8JU6LpkN2bKtx5OmzulyFBM70|client_secret_3xDY0cMElJmeq7r6ZfIsPj2gBLTUOSyG1dnpt8VA",
            "X-SP-USER-IP": "73.241.31.11",
            "X-SP-USER": "|e83cf6ddcf778e37bfe3d48fc78a6502062fc",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      )
      .then(res => {
        //pass refresh_token to useRefreshKey then get auth_key
        dispatch(useRefreshKey(res.data.refresh_token));
      })
      .catch(res => {
        console.log("get refresh token failed", res);
      });
  };
};

export const useRefreshKey = refresh_token => {
  let data = { refresh_token: refresh_token };
  return dispatch => {
    axios
      .post(
        `https://cors-anywhere.herokuapp.com/https://uat-api.synapsefi.com/v3.1/oauth/5cc13e09ad388f6fabe64d76`,
        data,
        {
          headers: {
            "X-SP-GATEWAY":
              "client_id_gcvWhR0VjZiawAr8JU6LpkN2bKtx5OmzulyFBM70|client_secret_3xDY0cMElJmeq7r6ZfIsPj2gBLTUOSyG1dnpt8VA",
            "X-SP-USER-IP": "73.241.31.11",
            "X-SP-USER": "|e83cf6ddcf778e37bfe3d48fc78a6502062fc",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      )
      .then(res => {
        //when get auth_key, set the store state, and starting fetch protected data with the auth_key
        dispatch(setAuthKey(res.data.oauth_key));
        dispatch(getCurrentAccount(res.data.oauth_key));
        dispatch(getAllOtherAccount(res.data.oauth_key));
        dispatch(getAllTransactions(res.data.oauth_key));
      })
      .catch(res => {
        console.log("get auth key failed", res);
      });
  };
};

// a common headers for getCurrentAccount; getAllOtherAccount; getAllTransactions below
const headers = {
  "X-SP-GATEWAY":
    "client_id_gcvWhR0VjZiawAr8JU6LpkN2bKtx5OmzulyFBM70|client_secret_3xDY0cMElJmeq7r6ZfIsPj2gBLTUOSyG1dnpt8VA",
  "X-SP-USER-IP": "73.241.31.11",
  "X-SP-USER": "oauth_ImA0UY9axO4GCpH5oXeJiZ3dcVBjqL0FMThwfyPR|",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*"
};

// get Current Account data and set it to state
export const setCurrentAccount = accountdata => {
  return {
    type: actionTypes.SET_CURRENTACCOUNT,
    account: accountdata
  };
};

export const getCurrentAccount = authKey => {
  return dispatch => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://uat-api.synapsefi.com/v3.1/users/5cc13e09ad388f6fabe64d76/nodes/5cc661ea21730420ee50ee26`,
        {
          headers: { ...headers, "X-SP-USER": authKey.concat("", "|") }
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

// get all other accounts data and set it to state
export const setAllOtherAccount = accountdata => {
  return {
    type: actionTypes.SET_ALLOTHERACCOUNT,
    account: accountdata
  };
};

export const getAllOtherAccount = authKey => {
  return dispatch => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://uat-api.synapsefi.com/v3.1/users/5cc13e09ad388f6fabe64d76/nodes`,
        {
          headers: { ...headers, "X-SP-USER": authKey.concat("", "|") }
        }
      )
      .then(res => {
        //filter out the current account so only other accouns will be shown in the dropdown
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

// get all transactions data and set it to state
export const setAllTransactions = transactions => {
  return {
    type: actionTypes.SET_ALLTRANSACTIONS,
    transactions: transactions
  };
};

export const getAllTransactions = authKey => {
  return dispatch => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://uat-api.synapsefi.com/v3.1/users/5cc13e09ad388f6fabe64d76/nodes/5cc661ea21730420ee50ee26/trans`,
        {
          headers: { ...headers, "X-SP-USER": authKey.concat("", "|") }
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
