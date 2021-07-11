const commentForm = async (event) => {
    event.preventDefault();

    const newComment = document.querySelector('#new-comment').value.trim();

    if (newComment) {
    const response = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({comment, blog_id, user_id}),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
}};
  
  document.querySelector('.new-comment-form').addEventListener('submit', commentForm);