let request = require('request');

const Discord = require('discord.js');
const { Client, GatewayIntentBits, Partials } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds], partials: [Partials.Channel] })
const { token } = require('./config.json');


client.login(token);

const voiceChannelID = '1004909950675472537';

let apiKey = '65635b71ddd389ff27b74d4cee3f0595';
let city = 'zagreb';

let lat = 45.81;
let lon = 15.98;
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
let url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

function setTemperatureInName() {
    request(url2, function (err, response, body) {
        if(err){
            console.log('error:', error);
        } else {
            console.log(body);
            let weather = JSON.parse(body);
            console.log(`It's ${weather.main.temp} degrees in ${weather.name}!`);
            let temperatura = (`${weather.main.temp}`);
            console.log(temperatura);
            brojTemp = parseFloat(temperatura, 10);
            brojTemp = brojTemp - 273.15;
            brojTemp = brojTemp.toFixed(2);
            brojTemp = brojTemp.toString();
        }
      });
    
    
    client.once('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
        client.channels.fetch(voiceChannelID)
            .then(channel => channel.setName(`Zagreb: ${brojTemp} °C`));
    });
}
function callEveryHour() {
    setInterval(setTemperatureInName, 60*60*100);
}
callEveryHour();
/*request(url2, function (err, response, body) {
    if(err){
        console.log('error:', error);
    } else {
        console.log(body);
        let weather = JSON.parse(body);
        console.log(`It's ${weather.main.temp} degrees in ${weather.name}!`);
        let temperatura = (`${weather.main.temp}`);
        console.log(temperatura);
        brojTemp = parseFloat(temperatura, 10);
        brojTemp = brojTemp - 273.15;
        brojTemp = brojTemp.toFixed(2);
        brojTemp = brojTemp.toString();
    }
  });


client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.channels.fetch(voiceChannelID)
        .then(channel => channel.setName(`Zagreb: ${brojTemp} °C`));
})*/
      