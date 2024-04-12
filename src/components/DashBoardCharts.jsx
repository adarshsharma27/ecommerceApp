import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const DashBoardCharts = ({ users, products,orders }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          font: {
            family: "'Outfit', 'sans-serif'",
            weight: "bold",
          },
        },
      },
      tooltip: {
        titleFont: {
          family: "'Outfit', 'sans-serif'",
        },
        bodyFont: {
          family: "'Outfit', 'sans-serif'",
        },
      },
    },
  };

  const data = {
    labels: [
        "Total Users",
      "Total Products",
      "Total Orders"
    ],
    datasets: [
      {
        label: "Application Record",
        data: [users, products,orders],
        backgroundColor: ["#E2E8F0", "#4F46E5","#198057"],
        borderColor: ["#E2E8F0", "#4F46E5","#198057"],
        borderWidth: 2,
      },
    ],
  };
  return (
    <>
      <div className="my-6 w-full p-4 container h-[50vh] md:h-[80vh] card-shadow-custom rounded-lg dark:shadow-2xl dark:text-white">
        <Doughnut options={options} data={data} />
      </div>
    </>
  );
};

export default DashBoardCharts;
