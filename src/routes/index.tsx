import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Cnpj from "../containers/Register/Cnpj";
import Company from "../containers/Register/Company";
import Admin from "../containers/Register/Admin";
import Loader from "../containers/Register/Loader";
import PageSuccess from "../containers/Register/PageSuccess";

const Routes = () => {
  const routesPath = "/cadastro";

  return (
    <div className="smls-lf">
      <Router>
        <Switch>
          <Route exact path={`${routesPath}`} component={Cnpj} />
          <Route exact path={`${routesPath}/empresa`} component={Company} />
          <Route exact path={`${routesPath}/admin`} component={Admin} />
          <Route exact path={`${routesPath}/processando`} component={Loader} />
          <Route exact path={`${routesPath}/sucesso`} component={PageSuccess} />
        </Switch>
      </Router>
    </div>
  );
};
export default Routes;
