import "normalize.css";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Main } from "./components/Main/Main";
import { store } from "./store";

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <Main />
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);
