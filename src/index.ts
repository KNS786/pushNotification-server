import express from 'express';
import {CronJob} from 'cron';
import dayjs from 'dayjs';

import axios from 'axios';

//db Connection
import db from './db.connection';

const app = express();
const PORT = process.env.PORT || 5000;
const FCM_SERVER_KEY = "AAAAt7J43O8:APA91bGMOcOJ4bokQddw8hUL_3-ZX1SFGB_9fw4mDfeJL2HdWr51V_vvV6kdy5jx-tVyOGUNhtEQG9xNAXUXVreVEVRCUMpU8P55hXCIHPuEGNUnmkIReQlgHC7GK5zL5ppOqXELz5xS";

async function sendPushNotificationFCM(deviceToken:any,title:any,message:any){

    let data:any = JSON.stringify({
        "to":`${deviceToken}`,
        "notification":{
            "body":`${message}`,
            "title":`${title}`
        }
    })

    const requestHeaders:any  = ({
        method:'post',
        url:'https://fcm.googleapis.com/fcm/send',
        headers:{
            'Content-Type':'application/json',
            'Authorization':"key=AAAAt7J43O8:APA91bGMOcOJ4bokQddw8hUL_3-ZX1SFGB_9fw4mDfeJL2HdWr51V_vvV6kdy5jx-tVyOGUNhtEQG9xNAXUXVreVEVRCUMpU8P55hXCIHPuEGNUnmkIReQlgHC7GK5zL5ppOqXELz5xS"
        },
        data:data
    })

    const response:any = await axios(requestHeaders);
    console.log("FCM RESPONSE::: ", response);
}

async function fetchAllMeetsScheduledNext15mins(){
 
    const getCurrentDate:any = dayjs().format('YYYY-MM-DDTHH:mm:00.000+00:00').toString();
    console.log("currentDate ::",getCurrentDate);
    const next30MinsDateTime = dayjs().add(30,'minute').format('YYYY-MM-DDTHH:mm:00.000+00:00').toString();
    console.log("next30minsDateTime :: ", next30MinsDateTime);

    const DB:any = await db();
    const getNext30minsSchduledMeets:any = await DB.collection("Meet").find({
        meetStartTime:{
            $gt:new Date(getCurrentDate),
            $lt:new Date(next30MinsDateTime)
        }
    }).toArray();

    console.log("next :: ", getNext30minsSchduledMeets);

    if(getNext30minsSchduledMeets.length > 0 ){
        getNext30minsSchduledMeets.forEach(async (data : any) => {
            if(data.deviceToken !== undefined){
                console.log("DB DATA ::", data);
                await sendPushNotificationFCM(
                    data.deviceToken,
                    data.meetTitle,
                    data.meetMessage
                );
            }
        })
    }


}




//Cron Jon Every 15 mins
let job = new CronJob("2 * * * * * ",async ()=>{
    await fetchAllMeetsScheduledNext15mins();
});

job.start();

app.listen(PORT,()=>{
    console.log("app Listening" , PORT );
});