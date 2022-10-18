//import dbUser from '../static-data';
//import dbMeet from '../meeting-data';

//import cron from 'cron';

import axios from 'axios';

//Get all Meet Today

const getDateToday = () =>{
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    return day+"-"+month+"-"+year+" "+hours+":"+minutes;
}

function FCMPushNotify(title:string,bodyMessage:string){
   const data = JSON.stringify({
    "to": "eIEmT7ONTxyS3PaF4--73s:APA91bH4HZZjLUwybWT0KN2_KuXzxL5PDt-Q7f0ncDJwn1KgKg9eawY2aHTG9YZRiviaKbQsVWo2EiMTTZYHP5Wp5hXr6RiNOhjUmsU0pqeFZ0WtQ9pP0RAHBk0hg4PH0bcyJSoE12Ja",
    "priority": "high",
    "notification": {
      "body": `${bodyMessage}`,
      "title": `${title}`,
      "isScheduled": "true",
      "scheduledTime": "2021-10-10 16:35:00"
    }
  });

  const config = {
    method: 'post',
    url: 'https://fcm.googleapis.com/fcm/send',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': 'key=AAAAt7J43O8:APA91bGMOcOJ4bokQddw8hUL_3-ZX1SFGB_9fw4mDfeJL2HdWr51V_vvV6kdy5jx-tVyOGUNhtEQG9xNAXUXVreVEVRCUMpU8P55hXCIHPuEGNUnmkIReQlgHC7GK5zL5ppOqXELz5xS'
    },
    data : data
  
  }

  axios(config).then(function(response){
    console.log(JSON.stringify(response.data));
  })
  .catch(function(err){
    console.log("err :: ", err);
  })
  
}


//Fetch DB every 15 mins in Meet Table 
// cron.schedule('15 * * * *',()=>{
//     console.log("cron job running");
//     //Fetch DB Meet Table
//     let todayDate = getDateToday().split(' ');
//     let [hours,minutes] = todayDate[1].split(':');
//     console.log("next 15 mins ::: ", minutes);
//     if(dbMeet.meetInfo.meetDate === todayDate[0]){
//         //Check Next 15 mins 
//         if(dbMeet.meetInfo.meetStartTime >= minutes * 15 && !dbMeet.meetInfo.delivered ){
//             //Perform Push Notification
//             let title = dbMeet.className;
//             let bodyMessage = dbMeet.message;
//             FCMPushNotify(title,bodyMessage);
//             dbMeet.meetInfo.delivered = true;
            
//         }

//     } 


// })