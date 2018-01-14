import { append } from './createElement';

export function setupNotes () {
  const container = document.querySelector('.notes-container');
  
  chrome.storage.sync.get(
    "text",
    textItem => {
      let textarea = document.createElement("textarea");
      textarea.className = "note-textarea";
      textarea.spellcheck = false;
      textarea.value = textItem.text;
      textarea.onchange = (e) => {
        chrome.storage.sync.set({
          "text": e.target.value
        })
      }
      append(container, [textarea]);
    },
  );
}
