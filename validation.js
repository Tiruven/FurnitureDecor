const form = document.getElementById('form')
const firstname_input = document.getElementById('firstname-input')
const email_input = document.getElementById('email-input')
const password_input = document.getElementById('password-input')
const repeat_password_input = document.getElementById('repeat-password-input')
const phone_input = document.getElementById('phone-input')
const error_message = document.getElementById('error-message')
const success_message = document.getElementById('success-message')

form.addEventListener('submit', (e) => {
  let errors = []

  if (firstname_input) {
    // If we have a firstname input then we are in the signup
    errors = getSignupFormErrors(firstname_input.value, email_input.value, password_input.value, repeat_password_input.value, phone_input.value)
    if (errors.length === 0) {
      localStorage.setItem('registeredEmail', email_input.value)
      localStorage.setItem('registeredPassword', password_input.value)
      if (success_message) {
        success_message.innerText = 'Signup successful! Redirecting to login page...'
      }
      setTimeout(() => {
        window.location.href = "./login.html"
      }, 2000)
    }
  } else {
    // If we don't have a firstname input then we are in the login
    errors = getLoginFormErrors(email_input.value, password_input.value)
    const registeredEmail = localStorage.getItem('registeredEmail')
      if (success_message) {
        success_message.innerText = 'Login successful! Redirecting to home page...'
      }
    if (errors.length === 0 && email_input.value === registeredEmail && password_input.value === registeredPassword) {
      success_message.innerText = 'Login successful! Redirecting to home page...'
      setTimeout(() => {
        window.location.href = "./index.html"
      }, 2000)
    } else {
      errors.push('Invalid email or password')
    }
  }

  if (errors.length > 0) {
    // If there are any errors
    e.preventDefault()
    error_message.innerText = errors.join(". ")
  }
})

function getSignupFormErrors(firstname, email, password, repeatPassword, phone) {
  let errors = []

  if (firstname === '' || firstname == null) {
    errors.push('Firstname is required')
    firstname_input.parentElement.classList.add('incorrect')
  }
  if (email === '' || email == null) {
    errors.push('Email is required')
    email_input.parentElement.classList.add('incorrect')
  }
  if (password === '' || password == null) {
    errors.push('Password is required')
    password_input.parentElement.classList.add('incorrect')
  }
  if (password.length < 8) {
    errors.push('Password must have at least 8 characters')
    password_input.parentElement.classList.add('incorrect')
  }
  if (password !== repeatPassword) {
    errors.push('Password does not match repeated password')
    password_input.parentElement.classList.add('incorrect')
    repeat_password_input.parentElement.classList.add('incorrect')
  }
  if (phone === '' || phone == null) {
    errors.push('Phone number is required')
    phone_input.parentElement.classList.add('incorrect')
  }
  if (!/^\d{7}$/.test(phone)) {
    errors.push('Phone number must contain exactly 7 digits')
    phone_input.parentElement.classList.add('incorrect')
  }

  return errors;
}

function getLoginFormErrors(email, password) {
  let errors = []

  if (email === '' || email == null) {
    errors.push('Email is required')
    email_input.parentElement.classList.add('incorrect')
  }
  if (password === '' || password == null) {
    errors.push('Password is required')
    password_input.parentElement.classList.add('incorrect')
  }

  return errors;
}

const allInputs = [firstname_input, email_input, password_input, repeat_password_input, phone_input].filter(input => input != null)

allInputs.forEach(input => {
  input.addEventListener('input', () => {
    if (input.parentElement.classList.contains('incorrect')) {
      input.parentElement.classList.remove('incorrect')
      error_message.innerText = ''
    }
  })
})
