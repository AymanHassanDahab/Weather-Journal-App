/* Global Variables */
const apiKey = 'd87c135aefb93a8d394fd35464d56e10&units=imperial';
const apiUrl = 'http://localhost:8000/';

const zipCode = document.querySelector('#zip');
const feeling = document.querySelector('#feelings');
const date = document.querySelector('#date');
const temp = document.querySelector('#temp');
const content = document.querySelector('#content');


const catchError = function(error) {
    console.log('Error is ', error);
} 

// Add function to HTML Element
document.querySelector('#generate').addEventListener("click", function() {
    debugger
    let data = {
        zipCode: zipCode.value,
        content: feeling.value,
        date: new Date()
    };

    // postData to api to get zipcode data
    getZipCode(data.zipCode).then(function(zipCodeInfo) {
        // check if city isn't found and alert it
        if (zipCodeInfo.cod != 200) {
            return alert(zipCodeInfo.message)
        }
        
        // Post data to server
        data.temp = zipCodeInfo.list[0].main.temp;
        postDataToServer(data);
    }).catch(catchError);
});

// get zip code from API
async function getZipCode(zipCode) {
    return await(await fetch(`http://api.openweathermap.org/data/2.5/forcast?zip=${zipCode}${apiKey}`)).json()
}

// for saving, post data to server
async function postDataToServer(data) {
    debugger
    let response = await fetch(`${apiUrl}postData`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),  
    });
    try {
        if(!response.ok) {
            alert("Failed Process");
            return;
        }
        response.json().then(function(data) {
            if (response.ok) {
                //Update UI right away 
                updateUI(); 
            } else {
                alert('Failed Process');
            }
        }).catch(catchError);
    } catch (error) {
        catchError(error);
    }
}

async function updateUI() {
    debugger 
    let response = await fetch(`${apiUrl}all`);
    try {
        response.json().then(function(){
            date.innerHTML = `Date: ${data.date}`,
            temp.innerHTML = `Temperature: ${data.temp}`,
            content.innerHTML = `Feeling: ${data.content}`
        }).catch(catchError);
    } catch(error) {
        catchError(error);
    }
}

