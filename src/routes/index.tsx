import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Example from "containers/Example";

const Routes = () => {
  const routesPath = "/example";

  return (
    <div className="smls-lf">
      <BrowserRouter>
        <Switch>
          <Route exact path={`${routesPath}`} component={Example} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};
export default Routes;
