// interface IMeet{
//     meetDate:String,
//     meetStartTime:String,
//     meetEndTime:String,
//     meetSession:String
// }

// interface IUser{
//     id:String,
//     name:String,
//     role:Array,
//     classes:Array,
//     studentsId:Array,
//     deviceToken:String,
//     meets:[IMeet]
// }

const User:any = {
    id:1,
    name:'navani',
    role:['Tutor','Student'],
    classes:['Math','Science'], // classesId
    studentsId:[1,2,3,4],
    deviceToken:"hsjhdjsd8273hshdsdhsdjhsjdhjshdjhsjdhjxcbnbjsdjhye8-sjkdsjkxcnxkjk",
    meets:[{
      meetDate:"17-Oct-2022",
      meetStartTime:'10:00',
      meetEndTime:'11:15',
      meetSession:'AM'
    }]
}


export default User;
