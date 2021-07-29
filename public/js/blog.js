const newBlogHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#blog-title').value.trim();
    const content = document.querySelector('#new-blog').value.trim();
    
  
    if (title && content) {
     
      const response = await fetch(`/api/blog`, {
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

  document
  .querySelector('.new-blog-form')
  .addEventListener('submit', newBlogHandler);