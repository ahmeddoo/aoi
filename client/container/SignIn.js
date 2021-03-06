import React, { useReducer } from "react";
import SwitchEntry from "./SwitchEntry";
import Input from "../components/UI/Input";
import EntryButton from "../components/UI/EntryButton";
import * as actionTypes from "./actionTypes";
import useAuthActions from "../hooks/store/actions/auth";

const controls = {
  email: {
    eleType: "input",
    eleConfig: {
      type: "email",
      placeholder: "Email",
      required: true,
    },
    validation: {
      required: true,
      match: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
    },
    valid: true,
    value: "",
  },
  password: {
    eleType: "input",
    eleConfig: {
      type: "password",
      placeholder: "Password",
      required: true,
    },
    validation: {
      required: true,
      length: { min: 5 },
    },
    valid: true,
    value: "",
  },
};

const signInFormReducer = (state, action) => {
    switch (action.type) {
    case actionTypes.START_TYPING:
      return {
        ...state,
        [action.field]: { ...state[action.field], value: action.value },
      };
    default:
      throw new Error("No command found");
  }
};

const SignIn = (props) => {
  const { authResponse } = useAuthActions();
  const [signInFormState, dispatch] = useReducer(signInFormReducer, controls);
  // signin click handler
  const onSignInHandler = (event) => {
    event.preventDefault();
    const signInFormData = {
      email: signInFormState.email.value,
      password: signInFormState.password.value,
    };

    authResponse(signInFormData, true);
  };

  // two way binding...
  const onInputChangeHandler = (event, field) => {
    dispatch({
      type: actionTypes.START_TYPING,
      field,
      value: event.target.value,
    });
  };
  return (
    <React.Fragment>
      <h2 className="page-title">Sign in</h2>
      <SwitchEntry
        guest={props.guest}
        toggleAccount={props.toggleAccount}
        entry=" Create account"
      />

      <form>
        {Object.keys(signInFormState).map((field) => {
          return (
            <Input
              change={(event) => onInputChangeHandler(event, field)}
              value={signInFormState[field].value}
              inValid={!signInFormState[field].valid}
              key={field}
              eleConfig={signInFormState[field].eleConfig}
              eleType={signInFormState[field].eleType}
            />
          );
        })}
        <EntryButton sign={(event) => onSignInHandler(event)}>
          {" "}
          Sign In{" "}
        </EntryButton>
      </form>
    </React.Fragment>
  );
};

export default SignIn;
