import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};
const accountSlice = createSlice({
  name: "account",
  initialState: initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },

    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.loanPurpose;
        state.balance += action.payload.amount;
      },
    },
    payloan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    converting(state) {
      state.isLoading = true;
    },
  },
});

export const deposit = (amount, currency) => {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  return async function (dispatch, getState) {
    dispatch({
      type: "account/converting",
    });
    const res = await fetch(
      `https://api.fastforex.io/convert?from=${currency}&to=USD&amount=${amount}&api_key=4d6d3a2b0e-3b463036b9-sqhiuu`
    );
    const data = await res.json();
    const converted = data.result.USD;
    dispatch({ type: "account/deposit", payload: converted });
  };
};
export const { withdraw, requestLoan, payloan } = accountSlice.actions;
export default accountSlice.reducer;

// const accountReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "account/deposit":
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };
//     case "account/withdraw":
//       return { ...state, balance: state.balance - action.payload };
//     case "account/requestLoan":
//       if (state.loan > 0) return state;
//       return { ...state, loan: action.payload };
//     case "account/payloan":
//       return {
//         ...state,
//         loan: 0,
//         loanPurpose: "",
//         balance: state.balance - state.loan,
//       };
//     case "account/converting":
//       if (state.loan > 0) return state;
//       return { ...state, isLoading: true };
//     default:
//       return state;
//   }
// };

// export const withdraw = (amount) => {
//   return { type: "account/withdraw", payload: amount };
// };
// export const requestLoan = (amount) => {
//   return { type: "account/requestLoan", payload: amount };
// };
// export const payloan = () => {
//   return { type: "account/payloan" };
// };
