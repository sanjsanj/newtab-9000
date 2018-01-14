import { createNotes } from './createElement';

export function setupTodos () {
  getTodos();
}

function getTodos() {
  chrome.storage.sync.get(
    "text",
    text => {
      createNotes(text.text);
    },
  );
}
