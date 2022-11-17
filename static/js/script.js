/*details script*/
const path = window.location.pathname;
var post_id = "";
if (path.split("/api/posts/")[1] !== undefined) {
  post_id = path.split("/api/posts/")[1].toString();
}

$(document).ready(function () {
  show_comment(post_id);
});

function save_comment() {
  let name = $("#name").val();
  let comment = $("#comment").val();

  $.ajax({
    type: "POST",
    url: "/comments",
    data: {
      postId_give: post_id,
      nickname_give: name,
      comment_give: comment,
    },
    success: function (response) {
      alert(response["msg"]);
      window.location.reload();
    },
  });
}

function show_comment(postId) {
  $.ajax({
    type: "GET",
    url: `/comments/${postId}`,
    data: { postId: postId },
    success: function (response) {
      let rows = response["lists"];
      for (let i = 0; i < rows.length; i++) {
        let nickname = rows[i]["nickname"];
        let comment = rows[i]["comment"];

        let temp_html = `<div class="card">
                                            <div class="card-body">
                                                <blockquote class="blockquote mb-0">
                                                    <p>${comment}</p>
                                                    <footer class="blockquote-footer">${nickname}</footer>
                                                </blockquote>
                                            </div>
                                        </div>`;
        $("#comment-list").append(temp_html);
      }
    },
  });
}
/*end of detatils script*/
