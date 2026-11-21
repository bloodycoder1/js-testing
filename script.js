require("dotenv").config()

console.log("This is the Dummy File");
(async()=>{
    let data = await process.env.mypassword;
    console.log(data);
    
})();
