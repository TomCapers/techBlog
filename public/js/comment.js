const commentForm = async (event) => {
    event.preventDefault();
    var id = document.location.pathname.split("/");
    console.log(id);
    const blog_id = parseInt(id[2])
    const comment = document.querySelector('#new-comment').value.trim();

    if (comment) {
    const response = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({comment, blog_id}),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
}};
  
  document.querySelector('.new-comment-form').addEventListener('submit', commentForm);