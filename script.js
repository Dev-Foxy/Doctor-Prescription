function generatePrescription() {
  const name = document.getElementById("patientName").value;
  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;
  const dateInput = document.getElementById("date").value;

  // Format date to DD-MM-YYYY
  const dateParts = dateInput.split("-");
  const formattedDate =
    dateParts.length === 3
      ? `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
      : dateInput;

  document.getElementById("patientNameDisplay").textContent = name;
  document.getElementById("ageDisplay").textContent = age;
  document.getElementById("genderDisplay").textContent = gender;
  document.getElementById("dateDisplay").textContent = formattedDate;

  const rows = document.querySelectorAll("#medBody tr");
  rows.forEach((row) => {
    const inputs = row.querySelectorAll("input");
    const cells = row.querySelectorAll("td");
    inputs.forEach((input, index) => {
      if (index < 5) {
        let value = input.value || "";
        if (index === 2) {
          // Usage column
          value = value
            .toLowerCase()
            .replace(/\b\w/g, (char) => char.toUpperCase());
        }
        cells[index].textContent = value;
      }
    });
  });
}

function addMedicine() {
  const row = document.createElement("tr");

  row.innerHTML = `
    <td><input type="text" placeholder="Medicine Name" /></td>
    <td><input type="text" placeholder="Dosage" /></td>
    <td><input type="text" placeholder="Usage" /></td>
    <td><input type="text" placeholder="Time" /></td>
    <td><input type="text" placeholder="Days" /></td>
    <td class="btn"><button onclick="removeRow(this)">Remove</button></td>
  `;

  document.getElementById("medBody").appendChild(row);
}

function removeRow(btn) {
  const row = btn.parentNode.parentNode;
  row.remove();
}

function downloadPDF() {
  const element = document.getElementById("prescription").cloneNode(true);

  const removeButtons = element.querySelectorAll(".btn");
  removeButtons.forEach((button) => button.remove());

  const inputs = element.querySelectorAll("input");
  inputs.forEach((input) => {
    const parent = input.parentNode;
    let value = input.value || "";
    if (parent.cellIndex === 2) {
      // Usage column
      value = value
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase());
    }
    parent.textContent = value;
  });

  html2pdf()
    .set({
      margin: [10, 10, 10, 10],
      filename: "prescription.pdf",
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    })
    .from(element)
    .save();
}
