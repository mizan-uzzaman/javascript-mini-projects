const textInput = document.getElementById("textInput");

//connecting everything
const remainingCount = document.getElementById("remainingCount");
const charCount = document.getElementById("charCount");
const wordCount = document.getElementById("wordCount");

//main event
textInput.addEventListener("input", () => {
  const characterCount = textInput.value.replace(/[ \t\n]+/g, " ").length;

  remainingCount.textContent = `${characterCount}/280`;
  charCount.textContent = `Characters: ${characterCount}`;

  //word count logic
  const wordNum =
    textInput.value.trim() === ""
      ? 0
      : textInput.value.trim().split(/\s+/).length;

  wordCount.textContent = `Words: ${wordNum}`;

  //progressbar
  const progress = (characterCount / 280) * 100;
  progressFill.style.width = `${progress}%`;
  if (progress <= 30) {
    progressFill.style.backgroundColor = "#22c55e";
  } else if (progress <= 60) {
    progressFill.style.backgroundColor = "#84cc16";
  } else if (progress <= 80) {
    progressFill.style.backgroundColor = "#facc15";
  } else if (progress <= 90) {
    progressFill.style.backgroundColor = "#f97316";
  } else {
    progressFill.style.backgroundColor = "#ef4444";
  }
});

//clear button
const clearBtn = document.getElementById("clearBtn");

clearBtn.addEventListener("click", () => {
  textInput.value = "";
  remainingCount.textContent = "0/280";
  charCount.textContent = "Characters: 0";
  wordCount.textContent = "Words: 0";
  progressFill.style.width = "0%";
  progressFill.style.backgroundColor = "#e5e7eb";
});

//progressbar
const progressFill = document.getElementById("progressFill");
