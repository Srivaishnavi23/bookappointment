// get the form and message elements
const form = document.querySelector('form');
const message = document.getElementById('message');

// add event listener to the form submission
form.addEventListener('submit', function(event) {
  // prevent default form submission behavior
  event.preventDefault();

  // get user input
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;

  // check if all fields are filled
  if (name === '' || email === '' || date === '' || time === '') {
    message.innerHTML = 'Please fill all fields.';
    return;
  }

  // create a date object for the selected date and time
  const selectedDate = new Date(`${date} ${time}`);

  // check if the selected date is in the future
  if (selectedDate <= new Date()) {
    message.innerHTML = 'Please select a date and time in the future.';
    return;
  }

  // make a POST request to the server to book the appointment
  axios.post('https://crudcrud.com/api/b9ea7f92b8514aada438504bbbaf07d4/VAISHU', {
    name: name,
    email: email,
    date: date,
    time: time
  })
  .then(function (response) {
    // store the appointment details in local storage
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('date', date);
    localStorage.setItem('time', time);

    // display success message
    message.innerHTML = 'Appointment booked successfully!';
  })
  .catch(function (error) {
    // display error message
    message.innerHTML = 'An error occurred while booking the appointment. Please try again later.';
  });
});
