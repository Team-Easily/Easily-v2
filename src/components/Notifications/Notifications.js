import React, { useEffect, useState } from 'react';
import { setToken } from '../../firebase/firebaseMessaging';

const Notifications = (props) => {
  const [isTokenFound, setTokenFound] = useState(false);

  console.log('Token found', isTokenFound);

  useEffect(() => {
    let data;
    async function tokenFunc() {
      data = await setToken(setTokenFound);
      if (data) {
        console.log('Token is', data);
      }
      return data;
    }
    tokenFunc();
  }, [setTokenFound]);

  return <></>;
};
Notifications.propTypes = {};

export default Notifications;
