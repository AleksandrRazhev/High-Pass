new JustValidate('.request', {
  rules: {
    email: {
      required: true,
      email: true
    },

    name: {
      required: true,
      minLength: 3,
      maxLength: 30,
      function: () => {
        const inputName = document.querySelector("[data-validate-field='name']").value;
        const arr = [...inputName];
        const arrSimbol = ['?','!','@','#','$','%','^','&','*'];

        for (let i in [...inputName]) {
          for (let item in arrSimbol) {
            if (arr[i] == arrSimbol[item] || !isNaN(Number(arr[i]))) {
              return false;
            } 
          }
        }
        return true;
      }
    }
  },

  messages: {
    email: 'Недопустимый формат',
    name: 'Недопустимый формат'
  },

  colorWrong: '#F06666'
});