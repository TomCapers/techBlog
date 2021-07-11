const newBlogHandler = async (event) => {
    event.preventDefault();
  
    const blogTitle = document.querySelector('#blog-title').value.trim();
    const blogCon = document.querySelector('#new-blog').value.trim();
    
  
    if (blogTitle && blogCon) {
      const response = await fetch(`/api/blog`, {
        method: 'POST',
        body: JSON.stringify({ title, content, user_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create blog');
      }
    }
  };

  document
  .querySelector('.new-blog-form')
  .addEventListener('submit', newBlogHandler);