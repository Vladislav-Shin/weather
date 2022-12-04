import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Spinner from "../UI/spinner/Spinner";

import "../../global.css";

const ErrorPage = lazy(() => import("../../pages/404"));
const MainPage = lazy(() => import("../../pages/MainPage/MainPage"));
const SinglePage = lazy(() => import("../../pages/SinglePage/SinglePage"));

const App = () => {
  
  return (
    <Router>
      <div className="app">
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="*" element={<ErrorPage />} />
            <Route path="/" element={<MainPage />} />
            <Route path="/weather/:id" element={<SinglePage />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;