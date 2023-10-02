const form = document.getElementById("formId");
const blogs = document.getElementById("blogs");
const commentForm = document.getElementById("commentId");

window.addEventListener("DOMContentLoaded", letItStay);

function letItStay() {
  axios
    .get("http://localhost:3000/blog/get-blogs")
    .then((result) => {
      result.data.forEach((data) => {
        showCOntent(data);
      });
    })
    .catch((err) => console.log(err));
}

form.addEventListener("submit", blogSubmitHandler);

function blogSubmitHandler(e) {
  e.preventDefault();
  console.log("HELLO");
  const title = document.getElementById("blog-title").value;
  const author = document.getElementById("blog-author").value;
  const content = document.getElementById("blog-content").value;

  const blogContent = {
    title,
    author,
    content,
  };
  console.log(blogContent);

  axios
    .post("http://localhost:3000/blog/add-blog", blogContent)
    .then((result) => {
      console.log(result.data);
      showCOntent(result.data);
    })
    .catch((err) => console.log(err));
}

// commentForm.addEventListener("submit", commentSubmitHandler);

function commentSubmitHandler(id) {
  // e.preventDefault();
  console.log(id);
  const comment = document.getElementById(`comment${id}`).value;
  axios
    .post("http://localhost:3000/blog/add-comment", { id, comment })
    .then((result) => {
      console.log(result.data);
      // showCOntent(result.data);
    })
    .catch((err) => console.log(err));
}

function showCOntent(blogObj, comment) {
  console.log(blogObj);

  const childNode = document.createElement("li");
  let inner = `
  <div><details>
  <summary>${blogObj.title} ~ Author ${blogObj.author}</summary>
  <p>${blogObj.content}</p>
  <input type="text" placeholder="Add a Comment" id="comment${blogObj.id}"  />
  <button type="click" id="comment" onClick="commentSubmitHandler('${blogObj.id}')" >Add Comment</button>
</details>
</div>`;
  childNode.innerHTML = inner;
  blogs.appendChild(childNode);
}
