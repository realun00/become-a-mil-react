import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";

const Welcome = lazy(() => import("./pages/Welcome"));
const Game = lazy(() => import("./pages/Game"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <div className="App">
      <Container fluid="xxl" id="df-container">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/game" element={<Game />} />

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
      </Container>
    </div>
  );
}

export default App;
