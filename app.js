const api = require('./api.json');
const axios= require('axios');




const getWeather = async location =>{

    const city =location || "coimbatore";
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        api.key
        }`;


    try{

        const response = await axios.get(url);

        if (response.status === 200){

            try{

                if(response.data.name){

                    return response.data;


                }
                else{

                    const notFound= new Error(`The ${city} city Location is not found in database `);
                    printError(notFound);

                }


            }
            catch (error){
                printError(error);
            }
        }
        else{
            const statusCodeError = new Error(` There Was an Error in getting the message form the  ${city} (Status code ${response.status} )`);
            printError(statusCodeError);


        }


    }
    catch (e) {

        printError(e);

    }





};


const argument = process.argv[2];
console.log(`Loading the current temprature in The city ${argument} .....`)
getWeather(argument).then(val => {
    printWeather(val);
    });


function printWeather(weather) {
    let message = `Current Temperature in ====>>> ${weather.name} ===> ${weather.main.temp
        }°C <======`;

    console.log(weather);
}

function printError(error) {
    console.error(error.message);
}

module.exports = {
    getWeather,
    printWeather
};