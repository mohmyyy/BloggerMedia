const form = document.getElementById("formId");
const blogs = document.getElementById("blogs");
const commentForm = document.getElementById("commentId");

window.addEventListener("DOMContentLoaded", letItStay);

function letItStay() {
  axios
    .get("http://localhost:3000/blog/get-blogs")
    .then((result) => {
      console.log(result);
      result.data.forEach((data) => {
        showContent(data);
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
      console.log(result);
      showContent(result.data);
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
      console.log(result.data.comment.comment);
      const newComment = result.data.comment.comment;

      // Create a span element for the new comment
      const newCommentElement = document.createElement("div");
      newCommentElement.innerHTML = newComment;

      // Append the new comment to the comments div
      const commentsDiv = document.getElementById(`comments${id}`);
      commentsDiv.appendChild(newCommentElement);
      console.log(commentsDiv);
    })
    .catch((err) => console.log(err));
}

// function showContent(blogObj) {
//   console.log(blogObj);

//   const childNode = document.createElement("li");
//   let inner = `
//     <div>
//       <details>
//         <summary>${blogObj.title} ~ Author ${blogObj.author}</summary>
//         <p>${blogObj.content}</p>
//         <div>${blogObj.addcomments.map(
//           (comment) => `<span>${comment.comment}</span>`
//         )}</div>
//         <input type="text" placeholder="Add a Comment" id="comment${
//           blogObj.id
//         }" />
//         <button type="button" id="comment" onclick="commentSubmitHandler('${
//           blogObj.id
//         }')">Add Comment</button>
//       </details>
//     </div>`;
//   childNode.innerHTML = inner;
//   blogs.appendChild(childNode);
// }

function showContent(blogObj) {
  console.log(blogObj);

  const childNode = document.createElement("li");
  let inner = `
    <div>
      <details>
        <summary>${blogObj.title} ~ Author ${blogObj.author}</summary>
        <p>${blogObj.content}</p>
        <div id="comments${blogObj.id}">${blogObj.addcomments
    .map((comment) => `<div>${comment.comment}</div>`)
    .join("")}</div>
        <input type="text" placeholder="Add a Comment" id="comment${
          blogObj.id
        }" />
        <button type="button" id="comment" onclick="commentSubmitHandler('${
          blogObj.id
        }')">Add Comment</button>
      </details>
    </div>`;
  childNode.innerHTML = inner;
  blogs.appendChild(childNode);
}
