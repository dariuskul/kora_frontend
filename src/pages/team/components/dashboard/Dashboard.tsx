import { TokenStorage } from 'constants/tokenStorage';
import { Realtime } from 'pages/team/components/dashboard/widgets/Realtime';
import React, { useEffect, useState } from 'react';
import { fetchUsersDashboard } from 'services/admin.service';
import { initRealTimeDashBord } from 'services/sse.service';

export const Dashboard = () => {
  const [info, setInfo] = useState()
  useEffect(() => {
    const userToken = TokenStorage.getToken();
    const test = initRealTimeDashBord(userToken)
    test.addEventListener('message', (e) => {
      const data = JSON.parse(e.data);
      setInfo(data);
    });

    return () => {
      test.close();
    };
  }, []);
  return (
    <div>
      {info && <Realtime timers={info} />}
    </div>
  );
};
