const csv = document.getElementById("csv");
const json = document.getElementById("json");
const changeConverter = document.getElementById("changeConverter");
const img = document.getElementById("img");
const converterStart = document.getElementById("converterStart");
const converterDisplay = document.getElementById("converterDisplay");
let changeConversion = true; 

function csvToJson(csvText) {
  const lines = csvText.trim().split("\n");
  const headers = lines[0].split(",");

  const result = lines.slice(1).map(line => {
    const values = line.split(",");
    const obj = {};
    headers.forEach((header, i) => {
      obj[header] = values[i] ?? "";
    });
    return obj;
  });

  return result;
}

function jsonToCsv(jsonArray) {
  if (!jsonArray.length) return "";

  const headers = Object.keys(jsonArray[0]);
  const headerString = headers.join(",");

  const replacer = (key, value) =>
    value == null ? "" : `"${String(value).replace(/"/g, '""')}"`;

  const rows = jsonArray.map(obj =>
    headers.map(field => replacer(field, obj[field])).join(",")
  );

  return [headerString, ...rows].join("\r\n");
}

converterStart.addEventListener("click", () => {
  if (changeConversion === true) {
    const csvText = csv.value.trim();
    const jsonData = csvToJson(csvText);
    json.value = JSON.stringify(jsonData, null, 2);
  } else {
    try {
      const jsonArray = JSON.parse(json.value.trim());
      csv.value = jsonToCsv(jsonArray);
    } catch (error) {
      alert("JSON inválido. Verifique a formatação.");
    }
  }
});

changeConverter.addEventListener("click", () => {
  changeConversion = !changeConversion;

  if (changeConversion) {
    changeConverter.style.transform = "rotateZ(0deg)";
    converterDisplay.textContent = "JSON";
    csv.placeholder = "Digite seu CSV aqui...";
    json.placeholder = "Saída JSON";
  } else {
    changeConverter.style.transform = "rotateZ(180deg)";
    converterDisplay.textContent = "CSV";
    csv.placeholder = "Saída CSV";
    json.placeholder = "Digite seu JSON aqui...";
  }
});
