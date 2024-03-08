/**
 * Constructs a table based on the provided configuration, data, and target element.
 * @param {Object} config - The configuration object.
 * @param {Array} data - The data array.
 * @param {string} targetElement - The ID of the target element where the table will be appended.
 */
export const constructTable = (config, data, optionsSets, targetElement) => {

  

  if (data.length > 0) {
    const card = document.createElement('div');
    card.setAttribute('class', 'card card-body');
    const table = document.createElement('table');
    table.setAttribute('class', 'table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const tr = document.createElement('tr');
    const thSurvey = document.createElement('th');
    thSurvey.appendChild(document.createTextNode('Pruzkum'));
    const thAccess = document.createElement('th');
    thAccess.appendChild(document.createTextNode('Přístup pro'));
    const thDate = document.createElement('th');
    thDate.appendChild(document.createTextNode('Ze dne'));
    const thLink = document.createElement('th');
    thLink.appendChild(document.createTextNode('Odkaz'));
    tr.appendChild(thSurvey);
    tr.appendChild(thAccess);
    tr.appendChild(thDate);
    tr.appendChild(thLink);
    thead.appendChild(tr);
    table.appendChild(thead);
    for (const access of data) {
      const tr = document.createElement('tr');
      const tdSurvey = document.createElement('td');
      tdSurvey.appendChild(document.createTextNode(access.survey));
      const tdAccess = document.createElement('td');

      // find the option in the optionsSets based on the access.survey and access.token
      const options = optionsSets.get(access.surveyKey);
      const filteredOptions = options.filter(option => option.id === access.token);
      let optionText = ""
      if (filteredOptions.length > 0) {
        optionText = filteredOptions[0].text;
      }

      tdAccess.appendChild(document.createTextNode(optionText));
      const tdDate = document.createElement('td');
      tdDate.appendChild(document.createTextNode(access.date));
      const tdLink = document.createElement('td');
      const aLink = document.createElement('a');
      aLink.setAttribute('href', access.link);
      aLink.setAttribute('target', '_blank');
      aLink.setAttribute('class', 'btn btn-sm btn-outline-secondary');
      aLink.appendChild(document.createTextNode('Vrátit se k průzkumu'));
      tdLink.appendChild(aLink);
      tr.appendChild(tdSurvey);
      tr.appendChild(tdAccess);
      tr.appendChild(tdDate);
      tr.appendChild(tdLink);
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    const p = document.createElement('p');
    p.setAttribute('style', 'text-align: center;')
    p.appendChild(document.createTextNode('Vaše historie průzkumů:'));
    card.appendChild(table);
    document.getElementById(targetElement).appendChild(card);
  }
}


/**
 * Event handler function that updates the survey link based on the selected value.
 *
 * @param {Event} e - The event object.
 * @param {Object} config - The configuration object.
 * @param {string} survey - The survey name.
 * @returns {Function} - The event handler function.
 */
export const onEventHandler = (e, config, survey) =>{
  return function() {
      const selectedValue = arguments[0];
      if(selectedValue !== "") {
          const accessLink = `${config.surveys[survey].link}?token=${selectedValue}`;
          $("#surveyLink").attr("href", accessLink);
          $("#surveyLink").addClass("btn-primary");
          $("#surveyLink").removeClass("disabled");
          $("#surveyLink").removeClass("btn-secondary");
      } else {
          $("#surveyLink").addClass("disabled");
          $("#surveyLink").removeClass("btn-primary");
          $("#surveyLink").addClass("btn-secondary");
      }
  };
};