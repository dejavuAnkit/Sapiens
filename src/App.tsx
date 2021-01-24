import React from "react";
import { Provider } from "react-redux";
import { ToastProvider } from "react-toast-notifications";
import HomeRouting from "./components/routing/RoutingComponent";

import * as styles from "./App.css";
//store
import { store } from "./store/configureStore";

const App : React.FC = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <ToastProvider autoDismiss>
          <HomeRouting></HomeRouting>
        </ToastProvider>
      </div>
    </Provider>
  );
};

export default App;
