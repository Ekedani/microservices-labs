const postsForm = document.querySelector('.posts-form');
const postsBtn = postsForm.querySelector('.request-posts__demo__send-btn');

postsBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const responseStatus = document.querySelector('.request-posts__demo__status')
    const response = document.querySelector('.request-posts__demo__response')

    const formData = {};
    for (let number = 0; number < postsForm.elements.length - 1; number++) {
        const key = postsForm.elements[number].name;
        if (postsForm.elements[number].type !== 'radio' || postsForm.elements[number].checked){
            formData[key] = postsForm.elements[number].value;
        }
    }
    const method = formData.method;
    const id = formData.id;

    delete formData.method;
    delete formData.id;

    let res, result, body;
    try {
        switch (method) {
            case 'GET':
                if (id.length === 0) {
                    res = await fetch('/api/posts', {
                        method: 'GET',
                    });
                    result = await res.json();
                } else {
                    res = await fetch(`/api/posts/${id}`, {
                        method: 'GET',
                    });
                    result = await res.json();
                }
                break;
            case 'POST':
              body = JSON.stringify({
                "body": formData.body,
                "header": formData.header,
                "author_id": formData.author_id,
              });
              res = await fetch(`/api/posts`, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body
              });
              result = await res.json();
                break;
            case 'PUT':
              body = JSON.stringify({
                "id": formData.id,
                "body": formData.body,
                "header": formData.header,
                "author_id": formData.author_id,
              });
              res = await fetch(`/api/posts`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body
              });
              result = await res.json();
                break;
            case 'DELETE':
                res = await fetch(`/api/posts/${id}`, {
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
