# A demo of `react-markdown`

`react-markdown` is a markdown component for React.

👉 Changes are re-rendered as you type.

👈 Try writing some markdown on the left.

## Overview

* Follows [CommonMark](https://commonmark.org)
* Optionally follows [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual React elements instead of using `dangerouslySetInnerHTML`
* Lets you define your own components (to render `MyHeading` instead of `'h1'`)
* Has a lot of plugins

## Contents

Here is an example of a plugin in action
([`remark-toc`](https://github.com/remarkjs/remark-toc)).
**This section is replaced by an actual table of contents**.

## Syntax highlighting

Here is an example of a plugin to highlight code:
[`rehype-highlight`](https://github.com/rehypejs/rehype-highlight).

```js
import React from 'react'
import ReactDOM from 'react-dom'
import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'

const markdown = `
# Your markdown here
`

ReactDOM.render(
  <Markdown rehypePlugins={[rehypeHighlight]}>{markdown}</Markdown>,
  document.querySelector('#content')
)
```

Pretty neat, eh?

## GitHub flavored markdown (GFM)

For GFM, you can *also* use a plugin:
[`remark-gfm`](https://github.com/remarkjs/react-markdown#use).
It adds support for GitHub-specific extensions to the language:
tables, strikethrough, tasklists, and literal URLs.

These features **do not work by default**.
👆 Use the toggle above to add the plugin.

|    Feature | Support              |
| ---------: | :------------------- |
| CommonMark | 100%                 |
|        GFM | 100% w/ `remark-gfm` |

~~strikethrough~~

# Garlic bread with cheese: What the science tells us

For years parents have espoused the health benefits of eating garlic bread with cheese to their children, with the food earning such an iconic status in our culture that kids will often dress up as warm, cheesy loaf for Halloween.

But a recent study shows that the celebrated appetizer may be linked to a series of rabies cases springing up around the country.

[Link to GitHub](https://github.com/home)

## Some lorem ipsum

Irure id est in minim amet nostrud eu eiusmod commodo dolor esse consequat ullamco. Occaecat Lorem irure laboris pariatur irure anim aute. Quis consequat fugiat amet dolor dolor anim magna aliquip velit veniam. Dolore adipisicing in minim cillum nisi reprehenderit ullamco exercitation nulla veniam.

Eu adipisicing minim ad aliqua aliquip elit proident tempor sit irure adipisicing. Laborum ad anim anim amet aliquip et eiusmod consectetur duis exercitation aliquip. Est nulla non excepteur Lorem.

horizontal rule

---

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
> After finishing a symbol like `>` or `#` hit space to finalize it.
> Use `Shift+Enter` (line break) where you want new line, but don't want to exit the text context (e.g. blockquote)

- Use `#` to create headings, with each `#` added the header level is lowered.
- Use `*` or `-` to create a list item, indent with tab.
- Use `>` to create a block quote.
- Use `---` to create horizontal rule.
- Use `~~` to create strike through.
- After selecting text, use `Ctrl+B` for bold, `Ctrl+I` for italic, `Ctrl+U` for underline.
- Use ``` to create inline code.
- Type ````language` to insert a code block.
