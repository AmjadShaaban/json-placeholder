function fetchAndDisplayUserRecords() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((r) => r.json())
    .then((userRecords) => {
      const rows = userRecords.map((record) => {
        const row = document.createElement("tr");

        for (const field of userFields) {
          const cell = document.createElement("td");
          const content = field.renderTableCell(record);

          if (typeof content === "string") {
            cell.innerText = content;
          } else {
            cell.appendChild(content);
          }

          row.appendChild(cell);
        }

        return row;
      });

      usersTableBodyEl.replaceChildren(...rows);
    });
}

function fetchAndDisplayUserPosts(user) {
  fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`)
    .then((r) => r.json())
    .then((userPosts) => {
      const header = document.createElement("h1");
      header.innerText = `Viewing posts for ${user.name}:`;

      const posts = userPosts.map((post) => {
        const article = document.createElement("article");

        const title = document.createElement("h2");
        title.innerText = post.title;

        const body = document.createElement("p");
        body.innerText = post.body;

        const separator = document.createElement("hr");

        article.appendChild(title);
        article.appendChild(body);
        article.appendChild(separator);

        return article;
      });

      userPostsEl.replaceChildren(header, ...posts);

      toggleUI();
    });
}

const usersTableEl = document.getElementById("users-table");
const usersTableHeadRowEl = usersTableEl.querySelector("thead > tr");
const usersTableBodyEl = usersTableEl.querySelector("tbody");

const navigationEl = document.getElementById("navigation");

const userPostsEl = document.getElementById("user-posts");

function toggleUI() {
  usersTableEl.classList.toggle("d-none");
  navigationEl.classList.toggle("d-none");
}

const userFields = [
  {
    header: "Name",
    renderTableCell: (user) => {
      const button = document.createElement("button");
      button.classList.add("btn", "btn-link");
      button.innerText = user.name;
      button.addEventListener("click", () => {
        fetchAndDisplayUserPosts(user);
      });

      return button;
    },
  },
  {
    header: "Username",
    renderTableCell: (user) => user.username,
  },
  {
    header: "Email Address",
    renderTableCell: (user) => user.email,
  },
];

const goBackButtonEl = document.querySelector("#navigation > button");

goBackButtonEl.addEventListener("click", () => {
  userPostsEl.replaceChildren();
  toggleUI();
});

for (const field of userFields) {
  const cell = document.createElement("th");
  cell.innerText = field.header;
  usersTableHeadRowEl.appendChild(cell);
}

fetchAndDisplayUserRecords();
