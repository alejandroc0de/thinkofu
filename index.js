
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyB0YC1gySFjSDku7yeTr-dWGOirLul71lY",
authDomain: "thinkofu-4a727.firebaseapp.com",
projectId: "thinkofu-4a727",
storageBucket: "thinkofu-4a727.firebasestorage.app",
messagingSenderId: "612043825187",
appId: "1:612043825187:web:961b037fa18bbe4cdc1196",
measurementId: "G-GP321CS8PY"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


//---------------------- M ------------------------------------



let clienteID;


const botonSubmit = document.getElementById("botonSubmit")
botonSubmit.addEventListener("click", sendMessage)
clienteIdCheck()
console.log(localStorage)

function sendMessage(){
    let messageSent = document.getElementById("messageInput")
    console.log(messageSent.value)
}

function clienteIdCheck(){
    if(localStorage.getItem("clienteId") == null){
        clienteID = crypto.randomUUID()
        localStorage.setItem("clienteId", clienteID)
    }else{
        console.log(localStorage)
    }
}
