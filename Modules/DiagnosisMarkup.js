//Generate markup for the patient history chart
const patientHistoryChartMarkup = (data) => {
  const { value: dValue, levels: dLevels } =
    data[data.length - 1].blood_pressure.diastolic;

  const { value: sValue, levels: sLevels } =
    data[data.length - 1].blood_pressure.systolic;

  //return HTML element
  return `
    <ul>
    <li>
      <div class="name">
        <span></span>
        <span>Systolic</span>
      </div>
      <h3>${sValue}</h3>
      <div class="rate">
        <img src="asset/ArrowUp.svg" alt="arrow up" />
        <span>${sLevels}</span>
      </div>
    </li>
    <li>
      <div class="name">
        <span></span>
        <span>Diastolic</span>
      </div>
      <h3>${dValue}</h3>
      <div class="rate">
        <img src="asset/ArrowDown.svg" alt="arrow down" />
        <span>${dLevels}</span>
      </div>
    </li>
  </ul>
    `;
};

const historyMeasurementMarkup = (data) => {
  // Get the last entry in the data array
  const diagnoisRate = data[data.length - 1];

  const arr = ["Temperature", "Respiratory_Rate", "Heart_Rate"];

  const desiredValues = arr
    .map((ar) => {
      //Find matching keys
      const key = Object.keys(diagnoisRate).find(
        (key) =>
          key.toLowerCase().replace(" ", "") ===
          ar.toLowerCase().replace(" ", "")
      );

      // If matching key found, create markup for it

      if (key) {
        return `
            <div style="background: ${
              ar === "Respiratory_Rate" ? "#E0F3FA" : "#FFE6F1"
            }">
              <img src="asset/${ar
                .toLowerCase()
                .replace(" ", "")}.svg" alt="${ar}" />
              <p>${ar.replace("_", " ")}</p>
              <h3>${diagnoisRate[key].value} ${
          ar === "Temperature" ? "°F" : "bpm"
        }</h3>
              <span>${ar === "Heart_Rate" ? "&#11206;" : ""} ${
          diagnoisRate[key].levels
        }</span>
            </div>
          `;
      }
      return "";
    })
    .join("");

  return desiredValues;
};

export { patientHistoryChartMarkup, historyMeasurementMarkup };
