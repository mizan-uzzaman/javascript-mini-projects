## **Final JavaScript**

Replace your current JavaScript with this:

```

const increaseBtn = document.querySelector("#increase-btn");
const decreaseBtn = document.querySelector("#decrease-btn");
const resetBtn = document.querySelector("#reset-btn");
const display = document.querySelector("#count-display");
const stepInput = document.querySelector("#step-input");

let count = 0;

// Update the visible counter
function updateDisplay() {
  display.textContent = count;
}

// Normal button clicks
resetBtn.addEventListener("click", () => {
  count = 0;
  updateDisplay();
});

// Keyboard shortcuts
document.addEventListener("keydown", (event) => {
  if (event.target === stepInput) return;

  if (event.key === "+" || event.key === "=") {
    count++;
    updateDisplay();
  }

  if (event.key === "-") {
    count--;
    updateDisplay();
  }

  if (event.key === "0") {
    count = 0;
    updateDisplay();
  }
});

// Hold-to-repeat functionality
let holdInterval;
let holdTimeout;
let activePointerId = null;
let holdAction = null;
let didHold = false;

function startHolding(event, action) {
  if (event.button !== 0 && event.pointerType === "mouse") return;
  if (activePointerId !== null) return;

  activePointerId = event.pointerId;
  holdAction = action;
  didHold = false;

  holdTimeout = setTimeout(() => {
    didHold = true;
    holdInterval = setInterval(holdAction, 100);
  }, 400);
}

function stopHolding(event) {
  if (activePointerId === null) return;
  if (event && event.pointerId !== activePointerId) return;

  clearTimeout(holdTimeout);
  clearInterval(holdInterval);

  activePointerId = null;
  holdAction = null;
}

// Increase button
increaseBtn.addEventListener("pointerdown", (event) => {
  startHolding(event, () => {
    count++;
    updateDisplay();
  });
});

increaseBtn.addEventListener("click", () => {
  if (didHold) {
    didHold = false;
    return;
  }

  count++;
  updateDisplay();
});

// Decrease button
decreaseBtn.addEventListener("pointerdown", (event) => {
  startHolding(event, () => {
    count--;
    updateDisplay();
  });
});

decreaseBtn.addEventListener("click", () => {
  if (didHold) {
    didHold = false;
    return;
  }

  count--;
  updateDisplay();
});

// Stop holding when pointer is released or cancelled
document.addEventListener("pointerup", stopHolding);
document.addEventListener("pointercancel", stopHolding);
document.addEventListener("visibilitychange", () => {
  if (document.hidden) stopHolding();
});

```

## **Add this CSS**

```
#count-logic button {
  user-select: none;
  -webkit-user-select: none;
  touch-action: none;
}
```

## **Expected behaviour**

| Action         | Result                |
| -------------- | --------------------- |
| Click `+`      | Increase by 1         |
| Hold `+`       | Repeat after 400ms    |
| Release `+`    | Stop immediately      |
| Click `-`      | Decrease by 1         |
| Hold `-`       | Repeat after 400ms    |
| Release `-`    | Stop immediately      |
| Touch and hold | Same repeat behaviour |

**Why 400ms?** It gives the user time to make a normal click before repeating starts.

One detail: this version intentionally waits 400ms before repeating; a normal click still changes the count immediately on release.