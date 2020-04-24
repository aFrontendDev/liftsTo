import React, { useState, useEffect } from "react";
import styles from "./SalesBox.module.scss";

/* data structure for figures is:
  {
    1: {orders: 123, total: 123},
    2: {orders: 123, total: 123},
    etc
  }

  No idea which is today or last month, could be first item (1), could be last item or could be today represented by a number e,g 2 = tuesday
*/
const SalesBox = props => {
  const { type, figures } = props || {};
  let ordersSum = 0;
  let totalSum = 0;
  const titles = {
    today: 'Today',
    lastWeek: 'Last Week',
    lastMonth: 'Last Month'
  }
  const title = titles[type];

  if (type === 'today' || type === 'lastMonth') {
    const sales = figures['1'];
    ordersSum = sales.orders;
    totalSum = sales.total;
  }

  if (type === 'lastWeek') {
    const keys = Object.keys(figures);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const item = figures[key];
      const { orders, total } = item || {};
      ordersSum+= orders;
      totalSum+= total;
    }
    console.log({ordersSum, totalSum});
  }


  console.log({ordersSum, totalSum});

  return (
    <div className={styles.wrapper}>
      <p>{title}</p>
      <span>${totalSum} / {ordersSum} orders</span>
    </div>
  );
}

export default SalesBox;
