
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    message1.textContent = 'Loading...'
    message2.textContent =''
    const url = 'http://localhost:3000/weather?address='+location
    fetch(url).then((response)=>{
    response.json().then((data)=>{
            if(data.error){
                message1.textContent = data.error;
                
            }else{
                message2.textContent= data.location
                message1.textContent= data.forcast
            }
            
    })
})
           
})