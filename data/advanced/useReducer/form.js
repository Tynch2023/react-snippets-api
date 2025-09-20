import { useReducer } from "react";
import "./App.css";

const initialState = {
  name: "",
  email: "",
  password: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        [action.name]: action.value,
      };
    case "RESET":
      return initialState;

    default:
      return state;
  }
}

export default function App() {
  return (
    <div>
      <Form />
    </div>
  );
}

function Form() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleChange(e) {
    dispatch({
      type: "CHANGE_INPUT",
      name: e.target.name,
      value: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Data sent: ", state);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Your name"
        value={state.name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Your email"
        value={state.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Your password"
        value={state.password}
        onChange={handleChange}
      />

      <button type="submit">Send</button>
      <button type="button" onClick={() => dispatch({ type: "RESET" })}>
        Reset
      </button>
    </form>
  );
}
