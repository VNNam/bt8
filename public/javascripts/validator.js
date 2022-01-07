var validator = document.getElementsByTagName('input');
var formValid = document.getElementById('regForm');
var formMessage = document.getElementById('formMessage');
formValid.addEventListener('submit', function (e) {
  e.preventDefault();
  const { firstName, lastName, username, password, birthdate } = validator;
  axios({
    method: 'POST',
    baseURL: 'http://localhost:3000/users',
    url: '/',
    data: {
      firstName: firstName.value,
      lastName: lastName.value,
      username: username.value,
      password: password.value,
      birthdate: birthdate.value,
    },
  })
    .then((res) => {
      const { data } = res;
      formMessage.setAttribute('class', 'unhide');
      formMessage.innerHTML = '';
      var node = document.createElement('p');
      var textNode = document.createTextNode(
        `${
          data?.error ??
          'User has already created. Automatic go to homepage after 5s.'
        }`
      );
      node.appendChild(textNode);
      formMessage.appendChild(node);
      if (!data.error)
        setTimeout(() => {
          location.href = 'http://localhost:3000/';
        }, 5000);
    })
    .catch((err) => console.error(err));
});
