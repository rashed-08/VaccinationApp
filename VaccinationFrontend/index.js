$(document).ready(function() {
    function handleFormSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.target);
        const formJSON = Object.fromEntries(data.entries());
        const formData = JSON.stringify(formJSON);

        console.log(formJSON);

        $.ajax({
            type: "POST",
            url: "https://dlmivgelue.execute-api.us-east-2.amazonaws.com/dev/vaccination",
            data: formData,
            dataType: "json",
            contentType: "application/json",
            accept: "application/json",
            success: function (data) {
                console.log("Data come here: ", data);
            },
            failure: function (err) {
                console.log("Error: ", err);
            }
        })
    }

    const form = document.querySelector('#user-form');
    form.addEventListener('submit', handleFormSubmit);
});
