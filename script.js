// Use exchangerate-api.com

const currencyElement_one = document.getElementById('currency-one');
const currencyElement_two = document.getElementById('currency-two');
const amountElement_one = document.getElementById('amount-one');
const amountElement_two = document.getElementById('amount-two');

const rateElement = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch exchange rates and update the DOM
function calculate(){
    const currency_one = currencyElement_one.value;
    const currency_two = currencyElement_two.value;


    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {
        //console.log(data)

        //Rate of currency selected
        const rate = data.rates[currency_two];

        // Adding rate into rate div
        rateElement.innerText = `1 ${currency_one} = ${rate} ${currency_two}`

        //Updating amount of element two 
        amountElement_two.value = (amountElement_one.value * rate).toFixed(2);
    });
};

//Event Listeners
currencyElement_one.addEventListener('change', calculate);
amountElement_one.addEventListener('input', calculate);
currencyElement_two.addEventListener('change', calculate);
amountElement_two.addEventListener('input', calculate);

swap.addEventListener('click', () => {
    const temp = currencyElement_one.value;
    currencyElement_one.value = currencyElement_two.value;
    currencyElement_two.value = temp;
    calculate();
})
calculate();