console.log('Client side javascript file is loaded')

// fetch('http://localhost:3000/weather?address=Boston').then((response) => {
//     response.json().then((data) => {
//         if(data.error) {
//             console.log(data.error)
//         } else {
//             console.log('Location: '+data.location+' Forecast: '+data.forecast)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const searchText = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    const url = 'http://localhost:3000/weather?address='+ searchText.value
    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})