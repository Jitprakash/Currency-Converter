const baseURL = "https://api.frankfurter.dev/v1/latest?";
const dropdowns = document.querySelectorAll(".selecter");
const submitBtn = document.querySelector("#mainBtn");
const userInput = document.querySelector("#userInput");
const toCurr = document.querySelector("#to");
const fromCurr = document.querySelector("#from");
const resultMsg = document.querySelector("#resultMsg");

//!Add the contryList As Option
dropdowns.forEach((select) => {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.value = currCode;
        newOption.innerText = currCode;

        //Make it so that the initial Option is USD to INR
        if (select.id === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.id === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    //Add a event to the select
    select.addEventListener("change", (e) => {
        //everyTime Something Change Call updateFlag
        //e-->event Object 
        //e.target --> returns the object that changed, in this case the Option that is selected
        updateFlag(e.target);
    });
});

//!Update the Flag with the Options
const updateFlag = (option) => {
    let currCode = option.value;
    let countryCode = countryList[currCode];
    let img = option.previousElementSibling;//as image is it's sibling get the sibling
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    // img.setAttribute("src", newSrc);
    img.src = newSrc;//We can set the atrribute like this also

}

//! Get the exchage Rate
const getExchangeRate = async () => {
    let fromvalue = fromCurr.value;
    let toValue = toCurr.value;
    let URL = `${baseURL}base=${fromvalue}&symbols=${toValue}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.rates[toValue];
    return rate;
}

//! Print The Result
const printResult = (finalvalue, amount) => {
    resultMsg.innerText = `${amount}${fromCurr.value} = ${finalvalue}${toCurr.value}`;
}

//! Convert The Currency
const convertCurrency = async () => {
    let amount = parseFloat(userInput.value);
    if (isNaN(amount) || amount < 1) {
        amount = 1;
        userInput.value = 1;
    }
    let rate = await getExchangeRate();
    let finalvalue = amount * rate;
    printResult(finalvalue, amount);
}

//!Add a event to the button so we get the currency exchage rate
submitBtn.addEventListener("click", convertCurrency);
document.addEventListener("DOMContentLoaded", convertCurrency);