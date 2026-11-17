const stepInput = document.querySelector("#step-input");
let step = 1;
stepInput.addEventListener("input", () => {
  const newStep = Number(stepInput.value);

  if (stepInput.value !== "" && Number.isFinite(newStep) && newStep > 0) {
    step = newStep;
  }
});

//*start from here 1st, top is the last step
const increaseBtn = document.querySelector("#increase-btn");
const decreaseBtn = document.querySelector("#decrease-btn");
const resetBtn = document.querySelector("#reset-btn");
let count = 0;


increaseBtn.addEventListener("click", () => {
  //   count++;
  count += step;
  updateDisplay();
  //   console.log(count);
});

decreaseBtn.addEventListener("click", () => {
  //   count--;
  count -= step;
  updateDisplay();
  //   console.log(count);
});

resetBtn.addEventListener("click", () => {
  count = 0;
  updateDisplay();
  //   console.log(count);
});

//document => event bubbling keyboard functionality
document.addEventListener("keydown", (event) => {
  if (event.target === document.querySelector("#step-input")) {
    return;
  } //very important

  if (event.key === "+") {
    // count++;
    count += step;

    updateDisplay();
    // console.log(count);
  }

  if (event.key === "-") {
    // count--;
    count -= step;

    updateDisplay();
    // console.log(count);
  }

  if (event.key === "0") {
    count = 0;
    updateDisplay();
    // console.log(count);
  }
});

const display = document.querySelector("#count-display");
function updateDisplay() {
  display.textContent = count;
}
