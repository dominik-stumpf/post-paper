import { micromark } from 'micromark';

function parseMarkdown(source: string) {
  return micromark(source);
}

self.addEventListener('message', (event) => {
  const parsedData = parseMarkdown(event.data);
  self.postMessage(parsedData);
});
