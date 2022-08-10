/* Global Variables */

const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=d87c135aefb93a8d394fd35464d56e10&units=imperial";

const zipCode = document.querySelector('#zip');
const feeling = document.querySelector('#feelings');
const updatedDate = document.querySelector('#date');
const temp = document.querySelector('#temp');
const content = document.querySelector('#content');


document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
    const cretaedURL = `${baseURL}${zipCode.value}${apiKey}`;
    retrieveData(cretaedURL).then(function(data) {
        filteredData(data).then(function(summaryData) {
            postData("/addData", summaryData).then(function(data){
                getBackData("/all", data);
            });
        });
    });
}

// Get the data from openweather website
const retrieveData = async (url) => {
    const request = await fetch(url);
    try {
         // Transform into JSON
        const data = await request.json();
        return data;
    }catch(error) {
        // appropriately handle the error
        console.log("error", error);
    }
}

// Summarize the data needed out of all data receieved.
const filteredData = async (data) => {
    if (data.cod != 200){
        console.log("Error");
    }else{
        const importantInfo = {
            date: new Date().toDateString(),
            temp: data.main.temp,
            content: feeling.value
        }
        return importantInfo;
    }
}


// Async POST
const postData = async (url = '', data = {})=>{
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });
    try {
        const newData = await response.json();
        return newData;
    }catch(error) {
        // appropriately handle the error
        console.log("error", error);
    }
};

// Async GET
const getBackData = async () =>{
    const request = await fetch('/all');
    try {
    // Transform into JSON
    const allData = await request.json()
    console.log(allData)
    // Write updated data to DOM elements
    temp.innerHTML = Math.round(allData.temp)+ 'degrees';
    content.innerHTML = allData.content;
    updatedDate.innerHTML = new Date().toDateString();
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
   }
