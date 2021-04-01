import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { message, notification } from 'antd';

const PrivateRoute = props => {
  const {
    authorized,
    component: Component,
    path,
    keys,
    exact,
    history,
  } = props;
  const [scroll, setscroll] = useState(0);
  const [access, set_access] = useState(false);
  const [message, set_message] = useState('');

  useEffect(() => {
    window.scrollTo({
      top: 80,
      left: 100,
      behavior: 'smooth',
    });
  }, [scroll]);
  //   alert(path);

  if (set_access) {
    return (
      <Route
        path={path}
        key={keys}
        exact={exact}
        render={props => {
          //
          if (authorized) {
            return (
              <div
                className='main_container'
                style={{
                  width: '100%',
                  overflowX: 'hidden',
                }}
              >
                <div>
                  <Component {...props} />
                </div>
              </div>
            );
          } else {
            // notification.error({
            //   message: 'Unauthorized Access',
            //   description: 'Please Login to Access the Page !',
            // });
            history.push('/login');
            // window.location.href = '/';
          }
          // } else {
          //   //
          //   notification.error({
          //     message: 'Unauthorized Access',
          //     description: 'You have no rights to access this page!',
          //   });
          //   return <Redirect to='/' />;
          // }
          // return <Redirect to="/user/login" />
          // return <Redirect to='/' />;
        }}
      />
    );
  }
};

export default PrivateRoute;
