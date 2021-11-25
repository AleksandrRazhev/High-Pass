new JustValidate('.mailing', {
  rules: {
    email: {
      required: true,
      email: true
    },
  },
  
  messages: {
    email: 'Недопустимый формат'
  },

  colorWrong: '#F06666'
});