//we use the built-in class alredy provided by javascript

//this creates a new HTTP message/request to send to the backend

const xhr = new XMLHttpRequest();
//in order to be able to wait for a response we add a listener
//load means the response has loaded
xhr.addEventListener('load', () => {
    //cause we wait for the response to be loaded it wont be undefined
    console.log(xhr.response);
});
/*
To set up the request we use open and give it 2 parameters
the first one is the type which can be
-GET
-POST
-PUT
-DELETE
the second parameter is where to send the HTTP message/request using the URL
*/
//the url is a path not every path is supported the ones that are supported are called backend API
xhr.open('GET', 'https://supersimplebackend.dev');
//after setting it we send it
xhr.send();
//to get the response (the response is not available right away)
//this is called asynchronous code since the code doesnt wait for the response after sending it
//so it will be undefined
//xhr.response