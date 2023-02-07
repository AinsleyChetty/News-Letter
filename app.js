const express = require("express");
const bodyParser = require ("body-parser");
const request = require("request");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const https = require("https");

const app = express();

app.use(express.static("public"));//here we created a static link to folder "public" so that we can send these files to the browser when called. Without this local files will not be sent

app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req, res){

res.sendFile(__dirname + "/signup.html");

//res.send("all is well");

});

mailchimp.setConfig({
//*****************************ENTER YOUR API KEY HERE******************************
 apiKey: "88f6a30efc18f8ae5f75308a40d6ddbb-us21",
//*****************************ENTER YOUR API KEY PREFIX HERE i.e.THE SERVER******************************
 server: "us21"
});

//As soon as the sign in button is pressed execute this
app.post("/", function (req,res) {
//*****************************CHANGE THIS ACCORDING TO THE VALUES YOU HAVE ENTERED IN THE INPUT ATTRIBUTE IN HTML******************************
const firstName = req.body.fName;
const lastName = req.body.sName;
const email = req.body.eMail;
//*****************************ENTER YOU LIST ID HERE******************************
const listId = "7df09683ba";
//Creating an object with the users data
const subscribingUser = {
 firstName: firstName,
 lastName: lastName,
 email: email
};
//Uploading the data to the server
 async function run() {
const response = await mailchimp.lists.addListMember(listId, {
 email_address: subscribingUser.email,
 status: "subscribed",
 merge_fields: {
 FNAME: subscribingUser.firstName,
 LNAME: subscribingUser.lastName
}
});
//If all goes well logging the contact's id
res.sendFile(__dirname + "/success.html")
console.log(
 `Successfully added contact as an audience member. The contact's id is ${
  response.id
  }.`
 );
}
//Running the function and catching the errors (if any)
// ************************THIS IS THE CODE THAT NEEDS TO BE ADDED FOR THE NEXT LECTURE*************************
// So the catch statement is executed when there is an error so if anything goes wrong the code in the catch code is executed. In the catch block we're sending back the failure page. This means if anything goes wrong send the faliure page
 run().catch(e => res.sendFile(__dirname + "/failure.html"));
});
// const jsonData = JSON.stringify(data);
// const url = "https://us21.api.mailchimp.com/3.0/lists/7df09683ba";
//
// const options = {
//   method: "POST",
//   auth: "ainsleyc:88f6a30efc18f8ae5f75308a40d6ddbb-us21"
// }
//
// const request = https.request(url, options, function(response){
// response.on("data", function(data){
//   console.log(JSON.parse(data));
// })
// })
//
// request.write(jsonData);
// request.end();
// });

app.listen(process.env.PORT || 3000, function(){

console.log("Server started on Port 3000");

})

// API Key
// 88f6a30efc18f8ae5f75308a40d6ddbb-us21

// List // ID:
// 7df09683ba
