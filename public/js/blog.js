const newBlogHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#blog-title').value.trim();
    const content = document.querySelector('#new-blog').value.trim();
    
  
    if (title && content) {
     
      const response = await fetch(`/new-blog`, {
        method: 'POST',
        body: JSON.stringify({title, content}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.reload(); 
      } else {
        alert('Failed to create blog');
      }
    }
  };

  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/blog/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete blog');
      }
    }
  };

  document
  .querySelector('.new-blog-form')
  .addEventListener('submit', newBlogHandler);

  document
  .querySelector('.user-blog')
  .addEventListener('click', delButtonHandler);