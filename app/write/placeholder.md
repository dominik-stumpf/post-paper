# Garlic bread with cheese: What the science tells us

For years parents have espoused the health benefits of eating garlic bread with cheese to their children, with the food earning such an iconic status in our culture that kids will often dress up as warm, cheesy loaf for Halloween.

But a recent study shows that the celebrated appetizer may be linked to a series of rabies cases springing up around the country.

[Link to GitHub](https://github.com/home)

## Bubble sort algorithm

```js
function sort(result) {
  for (let i = 0; i < result.length; i += 1) {
    for (let j = 0; j < result.length - 1 - i; j += 1) {
      if (result[j] < result[j + 1]) {
        const incremented = result[j];
        result[j] = result[j + 1];
        result[j + 1] = incremented;
      }
    }
  }
  return result;
}

function isArrSorted(arr) {
  for (let i = 0; i < arr.length - 1; i += 1) {
    console.assert(arr[i] >= arr[i + 1], `${arr[i]} >= ${arr[i + 1]}`);
  }
}

function getRandomNumbers(n = 32) {
  return Array.from(
    {
      length: n,
    },
    () => Math.floor(Math.random() * 100),
  );
}

function main() {
  isArrSorted(sort(getRandomNumbers()));
}

main();
```

## Quick guide

> Note: 
> After finishing a symbol like ````js` or `#` hit space to finalize it.
> Use `Shift+Enter` (line break) where you want new line, but don't want to exit the text context (e.g. blockquote)

- Use `#` to create headings, with each `#` added the header level is lowered.
- Use `*` or `-` to create a list item, indent with tab.
- Use `>` to create a block quote.
- Use `---` to create horizontal rule.
- Use `~~` to create strike through.
- After selecting text, use `Ctrl+B` for bold, `Ctrl+I` for italic, `Ctrl+U` for underline.
- Use ``` to create inline code.
- Type ````language` to insert a code block.
