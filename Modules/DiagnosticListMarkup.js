//Generate markup for the diagnostic list
const DiagnosticListMarkup = (diagnosticList) => {
  return `
    <div role="rowgroup" class="table-body">
    ${diagnosticList
      .map((dl) => {
        return `
    <div role="row" class="tr">
    <span role="cell">${dl.name}</span>
    <span role="cell">${dl.description}</span>
    <span role="cell">${dl.status}</span>
  </div>
    `;
      })
      .join("")}
  </div>
    `;
};

export default DiagnosticListMarkup;
