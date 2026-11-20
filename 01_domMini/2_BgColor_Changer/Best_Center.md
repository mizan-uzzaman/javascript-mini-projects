If you want Container-1 at the exact vertical center of the viewport, regardless of the heading, I'd recommend **CSS Grid or absolute positioning**.

### **My recommendation: CSS Grid**

We can use three grid rows:

```
body {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  justify-items: center;
}

h1 {
  /* Your existing styles */
}

.Container-1 {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 25px;
  align-self: center;
}

.Container-2 {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}
```

### **How Grid works here**

**Row 1 — H1**

Automatic height

**Row 2 — Flexible space (1fr)**

**Container-1**

Vertically centered in this row

**Row 3 — Container-2**

Automatic height

**One important distinction:** This centers Container-1 in the middle grid row, not necessarily at the exact 50% height of the viewport.

If exact viewport centering is your priority, use `position: absolute; top: 50%; transform: translateY(-50%)` on a wrapper containing both containers.

### **About using&#x20;**`vh`**,&#x20;**`%`**&#x20;or&#x20;**`vw`

- `vh` — viewport height.
- `vw` — viewport width.
- `%` — relative to the containing block (depending on the property).

You could use `margin-top: 20vh`, but that is a fixed proportional offset, not true centering.

**My advice:** For this particular layout, Grid is a clean choice. But if you want the two containers treated as one group and that group exactly centered in the viewport, use a wrapper with absolute positioning.

### important adds ------------------------------>>
function hexToHsl(hex) {
const r = parseInt(hex.slice(1, 3), 16) / 255;
const g = parseInt(hex.slice(3, 5), 16) / 255;
const b = parseInt(hex.slice(5, 7), 16) / 255;

const max = Math.max(r, g, b);
const min = Math.min(r, g, b);

let h, s;
const l = (max + min) / 2;

if (max === min) {
h = s = 0;
} else {
const d = max - min;

    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h *= 60;

}

s _= 100;
const lightness = l _ 100;

return `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(lightness)}%)`;
}

### important ------------------------------------->>
1. Initially, show the copy icon.
2. When clicked, copy the color code and change the icon to a tick mark.
3. When the color changes again, restore the original copy icon.

You can do this by changing the icon's class using JavaScript.

### **HTML**

```
<button id="copy-btn" title="Copy color code">
  <i class="fa-regular fa-copy"></i>
</button>
```

### **JavaScript**

```
const copyIcon = copyBtn.querySelector("i");

// Copy color code
copyBtn.addEventListener("click", async () => {
  await navigator.clipboard.writeText(colorCode.textContent);

  copyIcon.classList.replace("fa-copy", "fa-check");
});

// Restore original icon whenever color changes
function updateColor() {
  // Your existing color update logic

  copyIcon.classList.replace("fa-check", "fa-copy");
}
```

**Important:** Integrate the icon-reset line into your existing color-update function rather than creating a second function.

### **Understanding this method**

- `querySelector("i")` selects the icon inside the button.
- `classList.replace("fa-copy", "fa-check")` replaces the copy icon with a tick.
- `classList.replace("fa-check", "fa-copy")` restores the copy icon.

This way, you don't need to replace the entire HTML element. Just change its class.