const comment = async () => {
    const response = await fetch('/api/comment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/comment');
    } else {
      alert(response.statusText);
    }
  };
  
  document.querySelector('#content').addEventListener('click', comment);