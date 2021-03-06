import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Index as NotFoundPage } from '../components/404';
import PrivateRoute from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { withRouter } from 'react-router';

const loadable = loader => React.lazy(loader); // added

const routes = [
  // System Pages
  {
    path: '/',
    component: loadable(() => import('../pages/test1')),
    exact: true,
    authorize: false,
  },
];

const Router = props => {
  return (
    <Switch>
      {routes.map(route => {
        if (route.authorize) {
          return (
            <PrivateRoute
              // authorized={store.getState().Login.isLogin}
              key={route.path}
              keys={route.path}
              exact={route.exact}
              {...route}
              {...props}
            />
          );
        } else {
          return (
            <PublicRoute
              {...props}
              path={route.path}
              component={route.component}
              key={route.path}
              exact={route.exact}
              header={route.header}
              footer={route.footer}
              header={route.header || true}
            />
          );
        }
      })}

      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default withRouter(Router);
