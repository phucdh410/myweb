import { Line } from 'react-chartjs-2';
import { ArrowDropDownCircle } from '@mui/icons-material';
import { Box, Grid, Stack, Typography } from '@mui/material';
import {
  CategoryScale,
  Chart,
  ChartData,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';

Chart.register(
  Legend,
  CategoryScale,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
);

const DashboardPage = () => {
  const data: ChartData<'line', number[], string> = {
    labels: Array(18)
      .fill('')
      .map((e, i) => (2012 + i).toString()),
    datasets: [
      {
        fill: true,
        data: [
          22, 24, 30, 26, 24, 25, 28, 31, 34, 35, 36, 32, 29, 27, 23, 24, 26,
          27,
        ],
        borderColor: '#007867',
        backgroundColor: '#b9e3d6',
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: 'transparent',
        pointBorderColor: 'transparent',
        pointBorderWidth: 1.5,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#007867',
        pointHoverBorderColor: 'white',
        pointHoverBorderWidth: 1.5,
      },
    ],
  };

  return (
    <Grid container gap={3}>
      <Grid item xs={3.5}>
        <Box
          borderRadius="16px"
          color="rgb(0, 75, 80)"
          overflow="hidden"
          sx={{
            background:
              'linear-gradient(135deg, rgba(91, 228, 155, 0.2), rgba(0, 167, 111, 0.2)) rgb(255, 255, 255)',
          }}
        >
          <Stack direction="row" justifyContent="space-between" p={3}>
            <Stack gap={1}>
              <Typography>Income</Typography>
              <Typography>Money</Typography>
              <Typography>Data</Typography>
            </Stack>
            <ArrowDropDownCircle />
          </Stack>
          <Box height={100}>
            <Line
              data={data}
              options={{
                layout: {
                  autoPadding: false,
                  padding: 0,
                },
                responsive: true,
                maintainAspectRatio: false,

                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    mode: 'index' as const,
                    intersect: false,
                    titleColor: '#333',
                    titleFont: {
                      weight: 'bold',
                    },
                    bodyColor: '#333',
                    bodyAlign: 'center',
                    displayColors: false,
                    backgroundColor: 'white',
                    padding: 10,
                    cornerRadius: 10,
                    callbacks: {
                      label: (context) => {
                        return `$${context.raw}`;
                      },
                    },
                  },
                },
                hover: {
                  mode: 'index' as const,
                  intersect: false,
                },
                scales: {
                  x: {
                    display: false,
                  },
                  y: {
                    display: false,
                    ticks: {
                      // forces step size to be 50 units
                      stepSize: 10,
                    },
                  },
                },
              }}
            />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={3.5}></Grid>
      <Grid item xs={5}></Grid>
    </Grid>
  );
};

export default DashboardPage;
