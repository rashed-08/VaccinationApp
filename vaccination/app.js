const AWS = require('aws-sdk')
const dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: 'us-east-2'
});

const vaccinationTable = process.env.DB_Table;

exports.postForm = async (event, context) => {

    console.log(event);

    const vaccinationForm = JSON.parse(event.body)

    const vaccination = {
        id: context.awsRequestId,
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
    }

    const params = {
        TableName: vaccinationTable,
        Item: vaccination
    }

    await dynamoDB.put(params, function(err, data) {
        if (err) {
            console.log("Error: ", err);
        } else {
            console.log("Success");
        }
    });
};
