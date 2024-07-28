import {
  historyMeasurementMarkup,
  patientHistoryChartMarkup,
} from "./DiagnosisMarkup.js";

const patientHistoryChartEl = document.querySelector(".legend");
const diagnosisMeasurementEl = document.querySelector(".diagnois-measurement");

// Canvas element for rendering the chart
const ctx = document.getElementById("history-chart");

const PatientHistoryChart = (pData) => {
  // Filter the diagnosis history to only include entries from October in reversed order
  const filteredHistory = pData[3].diagnosis_history
    .filter((entry) => {
      const date = new Date(`${entry.month} 1, ${entry.year}`);
      return date >= new Date("October 1, 2023");
    })
    .reverse();

  const dateOuptut = filteredHistory.map(
    (entry) => `${entry.month.substring(0, 3)}, ${entry.year}`
  );

  const systolicArray = filteredHistory.map(
    (entry) => entry.blood_pressure.systolic.value
  );
  const diastolicArray = filteredHistory.map(
    (entry) => entry.blood_pressure.diastolic.value
  );

  // Insert the  markup
  patientHistoryChartEl.insertAdjacentHTML(
    "beforeend",
    patientHistoryChartMarkup(filteredHistory)
  );
  diagnosisMeasurementEl.insertAdjacentHTML(
    "beforeend",
    historyMeasurementMarkup(filteredHistory)
  );

  //Chart JS -- External libarary
  // Create a new Chart instance to render the blood pressure chart
  new Chart(ctx, {
    type: "line",
    data: {
      labels: dateOuptut,
      datasets: [
        {
          label: "Systolic",
          data: systolicArray,
          borderWidth: 2,
          borderColor: "#E66FD2",
          backgroundColor: "#E66FD2",
        },
        {
          label: "Diastolic",
          data: diastolicArray,
          borderWidth: 2,
          borderColor: "#8C6FE6",
          backgroundColor: "#8C6FE6",
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: false,
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
      elements: {
        line: {
          tension: 0.4,
        },
      },
      plugins: {
        legend: {
          display: false,
        },

        title: {
          display: true,
          text: "Blood Pressure",
          align: "start",
          color: "#072635",
          padding: {
            bottom: 20,
          },
        },
      },
    },
  });
};

export default PatientHistoryChart;
