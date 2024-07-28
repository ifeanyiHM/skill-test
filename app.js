// Import necessary modules for rendering different parts of the patient data
import DiagnosticListMarkup from "./Modules/DiagnosticListMarkup.js";
import LabResultMarkup from "./Modules/LabResultMarkup.js";
import PatientHistoryChart from "./Modules/PatientHistoryChart.js";
import PatientProfileMarkup from "./Modules/PatientProfileMarkup.js";
import PatientsListMarkup from "./Modules/PatientsListMarkup.js";

// Select DOM elements where patient data will be inserted
const patientListContainer = document.querySelector(".patient-list-container");
const patientContainerEl = document.querySelector(".patient-container");
const patientLabResultCont = document.querySelector(".lab-result-container");
const patientDiagnosticList = document.querySelector(
  ".diagnosis-list-container"
);

// Credentials for API authorization
const username = "coalition";
const password = "skills-test";

//Fetch and display patient data
const displayPatientList = async function () {
  try {
    const res = await fetch(
      "https://fedskillstest.coalitiontechnologies.workers.dev/",
      {
        headers: {
          Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        },
      }
    );
    const data = await res.json();

    // Throw an error if the response is not ok
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    //Append HTML Element containing patient's information
    patientListContainer.insertAdjacentHTML(
      "beforeend",
      PatientsListMarkup(data)
    );

    PatientHistoryChart(data);
    patientContainerEl.insertAdjacentHTML(
      "beforeend",
      PatientProfileMarkup(data[3])
    );

    patientDiagnosticList.insertAdjacentHTML(
      "beforeend",
      DiagnosticListMarkup(data[3].diagnostic_list)
    );

    patientLabResultCont.insertAdjacentHTML(
      "beforeend",
      LabResultMarkup(data[3].lab_results)
    );
  } catch (error) {
    throw error;
  }
};

//Invoke the function to display data
displayPatientList();
