fetch('https://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data);
    })
})

const weatherForm = document.querySelector('form');
const address = document.querySelector('input'); 
const m1 = document.querySelector('#m-1');
const m2 = document.querySelector('#m-2');






weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    m1.textContent = 'Loading.....';
    m2.textContent = '';
    
    fetch('/weather?search=' + address.value).then((response) => {
        response.json().then((data) => {
    
            if(data.error) {
                m1.textContent = data.error;
                console.log(data.error);
            }
            else{
                console.log(data);

                m1.textContent = data.address;
                m2.textContent = data.forecast;
                
            }
        })
    })
})


