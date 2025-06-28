// src/components/Charts.jsx
import React, { useEffect, useRef } from 'react';
import { AgCharts } from 'ag-charts-community';
import axios from '../utils/axiosInstance.js';

const Charts = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const res = await axios.get('/api/orders'); // Backend returns { orders: [...] }
        const orders = res.data.orders;

        const dailySales = {};

        orders.forEach((order) => {
          // Format: "DD-MM-YYYY HH:MM" → extract just date in YYYY-MM-DD for sorting
          const [day, month, yearTime] = order.cdate.split('-');
          const [year] = yearTime.split(' ');
          const isoDate = `${year}-${month}-${day}`; // YYYY-MM-DD

          dailySales[isoDate] = (dailySales[isoDate] || 0) + Number(order.total_amount || 0);
        });

        const chartData = Object.entries(dailySales)
          .map(([date, sales]) => ({ date, sales }))
          .sort((a, b) => new Date(a.date) - new Date(b.date));

        const options = {
          container: chartRef.current,
          title: {
            text: 'Per Day Orders',
          },
          data: chartData,
          series: [
            {
              type: 'bar',
              xKey: 'date',
              yKey: 'sales',
              yName: 'Sales (₹)',
              stroke: '#3b82f6',
            },
          ],
          axes: [
            {
              type: 'category',
              position: 'bottom',
              title: { text: 'Date' },
            },
            {
              type: 'number',
              position: 'left',
              title: { text: 'Sales (₹)' },
            },
          ],
        };

        AgCharts.create(options);
      } catch (err) {
        console.error('Failed to fetch sales data:', err);
      }
    };

    fetchSalesData();
  }, []);

  return (
    <div className="p-4 bg-white shadow rounded">
      <div ref={chartRef} style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
};

export default Charts;
