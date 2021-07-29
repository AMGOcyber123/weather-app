//FETCH API

console.log("file is loaded")

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')

weatherForm.addEventListener('submit' , (e)=>{
    e.preventDefault()
    const location = search.value

    message1.textContent = 'Loading ...'
    message2.textContent = " "
    message3.textContent = " "



console.log(location)
fetch('/weather?address='+location).then((response) =>{
    response.json().then((data) =>{
        if(data.error)
        {
            message1.textContent = data.error
        }
        else
        {
            message1.textContent = "Location : "+data.location
            message2.textContent = "Today's Temprature : "+data.forecast.Temperature_initial + "°C"
            message3.textContent = "Overall Forecast : "+data.forecast.forecast
        }
    })
})

})
