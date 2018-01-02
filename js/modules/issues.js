const issuesContainer = document.querySelector(".issues-container");
const issueIcon = `<svg aria-hidden="true" class="issue-icon-svg" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path fill-rule="evenodd" d="M11 11.28V5c-.03-.78-.34-1.47-.94-2.06C9.46 2.35 8.78 2.03 8 2H7V0L4 3l3 3V4h1c.27.02.48.11.69.31.21.2.3.42.31.69v6.28A1.993 1.993 0 0 0 10 15a1.993 1.993 0 0 0 1-3.72zm-1 2.92c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zM4 3c0-1.11-.89-2-2-2a1.993 1.993 0 0 0-1 3.72v6.56A1.993 1.993 0 0 0 2 15a1.993 1.993 0 0 0 1-3.72V4.72c.59-.34 1-.98 1-1.72zm-.8 10c0 .66-.55 1.2-1.2 1.2-.65 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path></svg>`
const commentIcon = `<svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M14 1H2c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1h2v3.5L7.5 11H14c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1zm0 9H7l-2 2v-2H2V2h12v8z"></path></svg>`;

const setIssueLabels = (issueNumber, anchorDiv) => {
  fetch(`https://api.github.com/repos/ComparetheMarket/CTM.MIT/issues/${issueNumber}/labels?access_token=${secrets.gitToken}`)
    .then(response => response.json())
    .then(labelData => {
      const element = (labelData[0] === undefined) ? null : createDiv(labelData[0].name, "issue-label");
      append(anchorDiv, [element]);
    })
    .catch(err => console.log(err))
  }
  
const setComments = (issueNumber, anchor) => {
  fetch(`https://api.github.com/repos/ComparetheMarket/CTM.MIT/pulls/${issueNumber}/comments?access_token=${secrets.gitToken}`)
  .then(response => response.json())
  .then(comments => {
    if (comments.length < 1) return null;
    
    const element = createDiv(comments.length, "issue-comment-number");
    const icon = document.createElement("div");
    icon.innerHTML = commentIcon;
    icon.className = "issue-comment-icon";
    
    append(anchor, [icon, element]);
  })
  .catch(err => console.log(err))
}

const setReviewStatus = (issueNumber, info) => {
  fetch(`https://api.github.com/repos/ComparetheMarket/CTM.MIT/pulls/${issueNumber}/reviews?state=all&access_token=${secrets.gitToken}`)
  .then(response => response.json())
  .then(data => {
    let text = "Review required";
    data.forEach(review => {
      if (review.state === "APPROVED") {
        text = "Approved";
      }
    })
    info.innerText += ` - ${text}`;
  })
  .catch(err => console.log(err))  
}

const timeSince = date => {
  date = new Date(date);
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

const fetchIssues = () => {  
  fetch(`https://api.github.com/repos/ComparetheMarket/CTM.MIT/pulls?state=all&access_token=${secrets.gitToken}`)
  .then(response => response.json())
  .then(data => {
    const openIssuesArray = data.filter(issue => issue.state === "open");
    
    openIssuesArray.map(issue => {
      const icon = document.createElement("div");
      icon.innerHTML = issueIcon;
      icon.className = "issue-icon";
      
      const anchor = createAnchor(issue.head.ref, `${issue.html_url}/files`);
      anchor.className = "issue";
      
      const lastUpdated = timeSince(issue.updated_at);
      
      const info = createDiv(`${issue.user.login} - last updated ${lastUpdated} ago`, "issue-info");
      
      setComments(issue.number, anchor);
      setIssueLabels(issue.number, anchor);
      setReviewStatus(issue.number, info);
      
      const anchorDiv = createDiv(null, "anchor-container");
      append(anchorDiv, [icon, anchor, info]);
      
      append(issuesContainer, [anchorDiv]);
    })
  })
  .catch(err => console.log(err))
}

const fetchNotifications = () => {
  fetch(`https://api.github.com/notifications?access_token=${secrets.gitToken}`)
  .then(response => response.json())
  .then(data => {
    if (data.length > 0) {
      document.querySelector('.issues-notifications').style.display = 'inline-block';
    }
  })
  .catch(err => console.log(err))
}
