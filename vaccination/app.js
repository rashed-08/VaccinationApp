const AWS = require('aws-sdk');
const request = require('request')

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
        covid: vaccinationForm.covid,
        email: vaccinationForm.email
    };

    let response;
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

    const firstname = vaccinationForm.firstName + vaccinationForm.middle;

    const mcData = {
        members: [
            {
                email_address: vaccinationForm.email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstname,
                    LNAME: vaccinationForm.lastname
                }
            }
        ]
    }

    const mcDataPost = JSON.stringify(mcData);

    const options = {
        url: 'https://<dc>.api.mailchimp.com/3.0/lists/{list_id}',
        method: 'POST',
        headers: {
            Authorization: 'auth api_key-us4'
        },
        body: mcDataPost
    }

    request(options, (err, response, body) => {
        if (err) {
            console.log('Failed to persist into Mailchimp');
        } else {
            if (response.statusCode === 200) {
                console.log('Data persist to Mailchimp');
            } else {
                console.log('Could not persist to Mailchimp');
            }    
        }
    });
    
};
