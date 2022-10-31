const commentsForm = document.querySelector('.comments-form');
const commentsBtn = commentsForm.querySelector('.request-comments__demo__send-btn');

commentsBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  const responseStatus = document.querySelector('.request-comments__demo__status')
  const response = document.querySelector('.request-comments__demo__response')

  const formData = {};
  for (let number = 0; number < commentsForm.elements.length - 1; number++) {
      const key = commentsForm.elements[number].name;
      if (commentsForm.elements[number].type !== 'radio' || commentsForm.elements[number].checked){
          formData[key] = commentsForm.elements[number].value;
      }
  }

  const { post_id, id, method } = formData;

  delete formData.method;
  delete formData.id;

  let body = new URLSearchParams(formData);
  let res, result;
  try {
      switch (method) {
          case 'GET':
              if (id.length === 0) {
                  res = await fetch(`/api/posts/${post_id}/comments`, {
                      method: 'GET',
                  });
                  result = await res.json();
              } else {
                  res = await fetch(`/api/posts/${post_id}/comments/${id}`, {
                      method: 'GET',
                  });
                  result = await res.json();
              }
              break;
          case 'POST':
            res = await fetch(`/api/posts/${post_id}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: body
            });
            result = await res.json();
              break;
          case 'PATCH':
            console.log(`/api/posts/${post_id}/comments/${id}`);
            res = await fetch(`/api/posts/${post_id}/comments/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: body
            });
            result = await res.json();
            break;
          case 'DELETE':
              res = await fetch(`/api/posts/${post_id}/comments/${id}`, {
                  method: 'DELETE',
              });
              result = res;
              break;
      }
      responseStatus.innerHTML = `Status: ${res.status}`;
      response.innerHTML = JSON.stringify(result, null, 2);
  } catch (e) {
      alert(e);
  }
});
