import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, LineController } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useGlobalContext } from '../../context/GlobalContext';
import dateFormat from '../../utils/dateFormat';

ChartJs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, LineController);

function Chart() {
  const { incomes, expenses } = useGlobalContext();
  const chartRef = useRef(null);

  useEffect(() => {
    let chartInstance = null;

    const createChart = () => {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        if (chartInstance) {
          chartInstance.destroy();
        }

        // Combine incomes and expenses data arrays
        const allData = {
          income: incomes.map((inc) => inc.amount),
          expense: expenses.map((exp) => exp.amount),
        };

        // Combine incomes and expenses labels arrays
        const allLabels = incomes.map((inc) => dateFormat(inc.date));

        chartInstance = new ChartJs(ctx, {
          type: 'line',
          data: {
            labels: allLabels,
            datasets: [
              {
                label: 'Income',
                data: allData.income,
                backgroundColor: 'green',
                borderColor: 'green',
                fill: false,
              },
              {
                label: 'Expenses',
                data: allData.expense,
                backgroundColor: 'red',
                borderColor: 'red',
                fill: false,
              },
            ],
          },
          options: {
            maintainAspectRatio: false,
            scales: {
              x: {
                grid: {
                  display: false,
                },
              },
              y: {
                grid: {
                  display: false,
                },
              },
            },
            plugins: {
              tooltip: {
                intersect: false,
              },
            },
            elements: {
              line: {
                cubicInterpolationMode: 'monotone', // Use monotone interpolation for smoother lines
              },
            },
          },
        });
      }
    };

    createChart();

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [incomes, expenses]);

  return (
    <ChartStyled>
      <canvas ref={chartRef} />
    </ChartStyled>
  );
}

const ChartStyled = styled.div`
  background: #FCF6F9;
  border: 2px solid #FFFFFF;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.6);
  padding: 1rem;
  border-radius: 20px;
  width: 900px; // Adjust the width as desired
  height: 600px; // Adjust the height as desired
`;

export default Chart;
