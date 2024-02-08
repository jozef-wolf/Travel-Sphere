import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { LivePreviewProvider } from "./context/live-preview-context-provider";
import reportWebVitals from "./reportWebVitals";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
 
export default function ScrollToTop() {
  const { pathname } = useLocation();
 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
 
  return null;
}
ReactDOM.render(
  <BrowserRouter>
    <LivePreviewProvider>
      <ScrollToTop/>
      <App />
    </LivePreviewProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
