
// interface IMeetInfo{
//   meetDate:string,
//   meetStartTime:string,
//   meetEndTime:string,
//   meetSession:string
// }

// export interface IMeet{
//     id:string,
//     title:string,
//     description:string,
//     message:string,
//     students:[],
//     sender:string,
//     meetInfo:IMeetInfo
// }

const data:any = {
  id:1,
  title:'Math Class',
  description:'please Join EveryOne',
  meetStartTime:"2021-12-18T00:30:00.000+00:00",
  message:'please bring and come your math book',
  students:[1,2,3,4,5],
  sender:1,
  meetInfo:{
    meetDate:"17-10-2022",
    meetStartTime:"10:00AM",
    meetEndTime:"11:15PM",
    delivered:false
  }

}

export default data;