import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { NoAuth, WithAuth } from "./components/other/RequireAuth";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/style.scss";

const Welcome = lazy(() => import("./pages/Welcome"));
const Game = lazy(() => import("./pages/Game"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <div className="App">
      <div className="container-xxl position-relative">
        <Routes>
          <Route element={<NoAuth />}>
            <Route path="/" element={<Welcome />} />
          </Route>
          <Route element={<WithAuth />}>
            <Route path="/game" element={<Game />} />
          </Route>
          {/* NO FOUND */}
          <Route
            path="*"
            element={
              <Suspense fallback={<>...</>}>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
