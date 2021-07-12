import React from "react";
import BackgroundLines from "./BackgroundLines";
import Header from "./Header";

function Layout(props) {
  const { children } = props;
  return (
    <div className="mi-wrapper">
      <BackgroundLines />
      <Header />
      {children}
    </div>
  );
}

export default Layout;
