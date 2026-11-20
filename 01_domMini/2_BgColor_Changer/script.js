let currentColor = genRandomColor();
//use rgb as 1st color format also, then change the code accordingly
//creating randomness
function genRandomColor() {
  const randomColor = Math.floor(Math.random() * 16777216);
  return `#${randomColor.toString(16).padStart(6, "0")}`;
}

const generateBtn = document.querySelector("#generate-btn");
const colorCode = document.querySelector("#color-code");

//main function
generateBtn.addEventListener("click", () => {
  currentColor = genRandomColor();

  document.body.style.backgroundColor = currentColor;
  colorCode.textContent = currentColor;
  updateColorCode();
});

//hex to rgb conversion
const colorFormat = document.querySelector("#color-format");

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgb(${r},${g},${b})`;
}
//sync color code and dropdown
function updateColorCode() {
  if (colorFormat.value === "hex") {
    colorCode.textContent = currentColor;
  } else if (colorFormat.value === "rgb") {
    colorCode.textContent = hexToRgb(currentColor);
  }
}

colorFormat.addEventListener("change", updateColorCode);

//add copy button functionality
const copyBtn = document.querySelector("#copy-btn");
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(colorCode.textContent);
});

//custom color choosing
const customColor = document.querySelector("#custom-color");
customColor.addEventListener("input", () => {
  currentColor = customColor.value;

  document.body.style.backgroundColor = currentColor;
  updateColorCode();
});
