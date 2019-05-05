console.log('Client side js file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() // Removes the default e.g. page refresh after submit
    messageOne.textContent = 'Loading ...'
    messageTwo.textContent = ''

    const location = search.value // sets location from input field value

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return messageOne.textContent = data.error
            } else
            messageOne.textContent = data.location 
            messageTwo.textContent = data.summary
        })
    })

})

