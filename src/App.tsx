import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "react-query-devtools";
import { QueryCache, ReactQueryCacheProvider } from "react-query";
import "semantic-ui-css/semantic.min.css";

import Routes from "./routes";
import "./App.css";

function App() {
  const queryCache = new QueryCache();
  return (
      <ReactQueryCacheProvider queryCache={queryCache}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </ReactQueryCacheProvider>
  );
}

export default App;
