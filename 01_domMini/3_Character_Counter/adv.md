# **Custom 280-character limit**

## **1. First, understand the problem**

Our project has a custom counting rule:

- One letter = 1 character.
- One number = 1 character.
- One punctuation mark = 1 character.
- Multiple consecutive spaces = 1 character.
- Multiple consecutive newlines = 1 character.
- Multiple consecutive tabs = 1 character.

For example:

| Actual input                 | Custom count |
| ---------------------------- | ------------ |
| `Hello`                      | 5            |
| `Hello World`                | 11           |
| `Hello    World`             | 11           |
| `Hello` + 5 spaces + `World` | 11           |

The problem is that HTML's `maxlength="280"` counts actual input characters, whereas our JavaScript counts normalized characters.

**Our solution:** Remove HTML's `maxlength` and enforce the 280-character limit using our own logic.

## **2. Approach A — Advanced native JavaScript (recommended)**

JavaScript provides a built-in API called `Intl.Segmenter`.

It can identify **grapheme clusters**, meaning characters as users perceive them.

For example, some emoji look like one character but are internally made of multiple Unicode code units. Normal `.length` may count them as 2 or more. `Intl.Segmenter` handles this correctly.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://developer.mozilla.org\&sz=32)

MDN+1



**Step A: Create a segmenter**

```
const segmenter = new Intl.Segmenter(undefined, {
  granularity: "grapheme",
});
```

**Step B: Create a custom counting function**

```
function getCharacterCount(value) {
  let count = 0;
  let previousWasWhitespace = false;

  for (const { segment } of segmenter.segment(value)) {
    const isWhitespace = /^\s+$/u.test(segment);

    if (isWhitespace && previousWasWhitespace) {
      continue;
    }

    count++;
    previousWasWhitespace = isWhitespace;
  }

  return count;
}
```

**Step C: Create a truncation function**

This preserves the original whitespace in the textarea while ensuring the custom count doesn't exceed 280.

```
function limitCharacters(value, max) {
  let result = "";
  let count = 0;
  let previousWasWhitespace = false;

  for (const { segment } of segmenter.segment(value)) {
    const isWhitespace = /^\s+$/u.test(segment);

    if (isWhitespace && previousWasWhitespace) {
      result += segment;
      continue;
    }

    if (count === max) break;

    result += segment;
    count++;

    previousWasWhitespace = isWhitespace;
  }

  return result;
}
```

**Step D: Use it in the input event**

```
textInput.addEventListener("input", () => {
  const oldStart = textInput.selectionStart;
  const oldEnd = textInput.selectionEnd;

  const original = textInput.value;
  const limited = limitCharacters(original, 280);

  if (original !== limited) {
    textInput.value = limited;

    textInput.setSelectionRange(
      Math.min(oldStart, limited.length),
      Math.min(oldEnd, limited.length)
    );
  }

  const characterCount = getCharacterCount(textInput.value);

  // Update your counters and progress bar here.
});
```

This version truncates excess content from the end. It also tries to preserve the cursor or selection position.

**Advanced browser API:** `beforeinput` can intercept edits before they modify the textarea, although some browser operations are non-cancelable. A fallback `input` handler is still useful.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://developer.mozilla.org\&sz=32)

MDN+1



## **3. Approach B — Use an npm library**

An npm package worth knowing is [Graphemer](https://www.npmjs.com/package/graphemer?utm_source=chatgpt.com).

**Graphemer**

Unicode grapheme splitter · Zero dependencies

[npm package documentation](https://www.npmjs.com/package/graphemer?utm_source=chatgpt.com)

### **Step A: Install**

```
npm install graphemer
```

### **Step B: Import and initialize**

```
import Graphemer from "graphemer";

const splitter = new Graphemer();
```

### **Step C: Count custom characters**

```
function getCharacterCount(value) {
  let count = 0;
  let previousWasWhitespace = false;

  const graphemes = splitter.splitGraphemes(value);

  for (const grapheme of graphemes) {
    const isWhitespace = /^\s+$/u.test(grapheme);

    if (isWhitespace && previousWasWhitespace) {
      continue;
    }

    count++;
    previousWasWhitespace = isWhitespace;
  }

  return count;
}
```

You can use the same truncation algorithm as Approach A, replacing:

```
segmenter.segment(value)
```

with:

```
splitter.splitGraphemes(value).map(segment => ({ segment }))
```

The remaining logic stays the same.

## **4. Comparison**

| Feature                          | Native `Intl.Segmenter` | Graphemer       |
| -------------------------------- | ----------------------- | --------------- |
| Installation                     | Not required            | npm required    |
| Unicode graphemes                | Yes                     | Yes             |
| Custom whitespace rules          | Your logic              | Your logic      |
| Enforce 280 limit                | Your logic              | Your logic      |
| Language-aware word segmentation | Yes                     | Not its purpose |
| External dependency              | No                      | Yes             |

## **5. My recommendation**

Best choice for this project

Use **native JavaScript with&#x20;**`Intl.Segmenter`.

Why?

- No additional npm dependency.
- Supports grapheme-aware counting.
- Also provides language-aware word segmentation through `granularity: "word"`.
- Your custom 280-character rules remain under your control.&#x20;

  [image](https://www.google.com/s2/favicons?domain=https://developer.mozilla.org\&sz=32)

  MDN+1



**Important distinction for your notes:** Neither `Intl.Segmenter` nor Graphemer automatically enforces a character limit. They help identify character boundaries. You still write the custom counting and truncation logic yourself.

That's the difference between using a library and understanding the actual application logic, bro!