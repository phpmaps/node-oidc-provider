window.onload = (event) => {
    console.log("page is fully loaded");
    const externalIdField = document.getElementById('externalId');
    const tokenField = document.getElementById('token');
    const apiUrlField = document.getElementById('apiUrl');

    const interview = JSON.parse(document.getElementById('interview').value);
    console.log(interview);
    //externalIdField.value = interview.externalId;
    //tokenField.value = interview.token;
    //apiUrlField.value = interview.apiUrl;
};

