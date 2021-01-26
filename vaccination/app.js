const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: 'us-east-2'
});

const { v4: uuidv4 } = require('uuid');


const vaccinationTable = process.env.DB_Table;

exports.postForm = (event, context, callback) => {
    console.log(event);
    const vaccinationForm = JSON.parse(event.body);

    const vaccination = {
        id: uuidv4(),
        firstName: vaccinationForm.firstName,
        middle: vaccinationForm.middle,
        lastname: vaccinationForm.lastname,
        address: vaccinationForm.address,
        address2: vaccinationForm.address2,
        city: vaccinationForm.city,
        dob: vaccinationForm.dob,
        state: vaccinationForm.state,
        zip: vaccinationForm.zip,
        country: vaccinationForm.country,
        worker: vaccinationForm.worker,
        healthcar: vaccinationForm.healthcar,
        covid: vaccinationForm.covid
    };

    let response;
    console.log('new');
    dynamoDB.put({
        TableName: vaccinationTable,
        Item: vaccination
    }, function(err, data) {
      if (err) {
          console.log(err);
        response = {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true
            },
            body: JSON.stringify("Could Not Submit Your Form!")
        };
        
        callback(null, response);
      }
      else {
        console.log("success");
        response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json',
                "Access-Control-Allow-Credentials": true
            },
            body: JSON.stringify("Vacciantion Form Successfully Submitted!")
        };
        
        console.log(response);
        callback(null, response);
      }
    });
    
};



























// const AWS = require('aws-sdk')
// var uuid = require('uuid')
// const dynamoDB = new AWS.DynamoDB.DocumentClient({
//     region: 'us-east-2'
// });

// const vaccinationTable = process.env.DB_Table;

// exports.postForm = async (event, context) => {

//     console.log(event.body);

//     const vaccinationForm = JSON.parse(event.body)

//     console.log("vaccination form: ", vaccinationForm);

//     const vaccination = {
//         id: uuid.v4(),
//         firstName: vaccinationForm.firstName,
//         middle: vaccinationForm.middle,
//         lastname: vaccinationForm.lastname,
//         address: vaccinationForm.address,
//         address2: vaccinationForm.address2,
//         city: vaccinationForm.city,
//         dob: vaccinationForm.dob,
//         state: vaccinationForm.state,
//         zip: vaccinationForm.zip,
//         country: vaccinationForm.country,
//         worker: vaccinationForm.worker,
//         healthcar: vaccinationForm.healthcar,
//         covid: vaccinationForm.covid
//     }

//     const params = {
//         TableName: vaccinationTable,
//         Item: vaccination
//     }

//     console.log("Before dy")

//     dynamoDB.put(params, function(err, data) {
//         console.log("Error", err);
//         console.log("Data: ", data);
//         if (!err) {
//             console.log("data persisting!!!");
//             return {
//                 "statusCode": 200,
//                 "headers": {
//                     "Access-Control-Allow-Origin" : "*",
//                     "Access-Control-Allow-Credentials" : true,
//                     "Content-Type": "application/json"
//                 },
//                 "body": JSON.stringify("Successfully Submitted!")
//             }
//         } else {
//             console.log("Data not persisting!!!");
//             return {
//                 "body": JSON.stringify(err)
//             }
//         }
//     });
// };
