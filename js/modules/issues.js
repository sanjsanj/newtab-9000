import secrets from "../secrets";

export function fetchNotifications() {
  fetch(`https://api.github.com/notifications?access_token=${secrets.gitToken}`)
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        document.querySelector(".issues-notifications").style.display =
          "inline-block";
      }
    })
    .catch(err => console.log(err));
}
