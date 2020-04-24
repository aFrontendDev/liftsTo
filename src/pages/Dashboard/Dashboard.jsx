import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.scss";
import { getAccessToken } from '../../helpers/login.helper';
import SalesBox from '../../components/SalesBox/SalesBox';

const Dashboard = () => {
  const [data, setData] = useState(null);

  const getData = async () => {
    const accessToken = await getAccessToken().then(res => res);

    fetch('https://freddy.codesubmit.io/dashboard', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
    })
    .then(res => {
      const { status } = res || {};
      if (status < 200 || status >= 300) {
        return;
      }

      return res.json();
    })
    .then(json => {
      const { dashboard } = json || {};
      setData(dashboard)
    });
  }

  useEffect(() => {
    getData();
  }, []);

  if (!data) {
    return null;
  }

  console.log({data});
  const { bestsellers, sales_over_time_week, sales_over_time_year } = data || {};

  return (
    <section className={`app ${styles.wrapper}`}>
      <header className={styles.header}>
        <h1 className={styles.title}>Dashboard</h1>
      </header>
      <div className={styles.body}>
        <div className={styles.sales}>
          <SalesBox type="today" figures={sales_over_time_week}/>
          <SalesBox type="lastWeek" figures={sales_over_time_week} />
          <SalesBox type="lastMonth" figures={sales_over_time_year} />
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
