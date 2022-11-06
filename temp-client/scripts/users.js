const userForm = document.querySelector('.user-form');
const userBtn = userForm.querySelector('.request-users__demo__send-btn');

userBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const responseStatus = document.querySelector('.request-users__demo__status')
    const response = document.querySelector('.request-users__demo__response')

    const formData = {};
    for (let number = 0; number < userForm.elements.length - 1; number++) {
        const key = userForm.elements[number].name;
        if (userForm.elements[number].type !== 'radio' || userForm.elements[number].checked){
            formData[key] = userForm.elements[number].value;
        }
    }
    const method = formData.method;
    const id = formData.id;

    delete formData.method;
    delete formData.id;

    let body = new URLSearchParams(formData);
    let res, result;
    try {
        switch (method) {
            case 'GET':
                if (id.length === 0) {
                    res = await fetch('/api/users', {
                        method: 'GET',
                    });
                    result = await res.json();
                } else {
                    res = await fetch(`/api/users/${id}`, {
                        method: 'GET',
                    });
                    result = await res.json();
                }
                break;
            case 'POST':
              res = await fetch(`/api/users`, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                  },
                  body: body
              });
              result = await res.json();
                break;
            case 'PATCH':
              const patched = Array.from(body).filter(value => value[1].length > 0);
              body = new URLSearchParams();
              for (value of patched) {
                body.append(value[0], value[1]);
              }
              console.log(Array.from(body));
              res = await fetch(`/api/users/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: body
              });
              result = await res.json();
              break;
            case 'DELETE':
                res = await fetch(`/api/users/${id}`, {
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
