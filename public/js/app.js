fetch('https://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data);
    })
})

const weatherForm = document.querySelector('form');
const address = document.querySelector('input'); 
const m1 = document.querySelector('#m-1');
const m2 = document.querySelector('#m-2');
const m3 = document.querySelector('#m-3');






weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    m1.textContent = 'Loading.....';
    m2.textContent = '';
    m3.textContent = '';    
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
                const ast = data.ast;
                ast.forecastday.forEach(ele => {
                    m3.textContent = ele.astro.sunrise;
                    console.log(ele.astro);
                })
                
            }
        })
    })
})


