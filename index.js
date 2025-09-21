
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-analytics.js";
import{
    getFirestore,
    collection,
    addDoc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";
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
const db = getFirestore(app);

// const analytics = getAnalytics(app);








//---------------------- M ------------------------------------
let clienteID;

setUpListenerSnapshot()
clienteIdCheck()


const botonSubmit = document.getElementById("botonSubmit")
botonSubmit.addEventListener("click", sendMessage)


function clienteIdCheck(){
    if(localStorage.getItem("clienteId") == null){
        clienteID = crypto.randomUUID()
        localStorage.setItem("clienteId", clienteID)
    }else{
        clienteID = localStorage.getItem("clienteId");
    }
}


async function sendMessage(){
    let messageSent = document.getElementById("messageInput")
    console.log(messageSent.value)
    let timenow = Date.now()
    await addDoc(collection(db,"messages"),{
        "text" : messageSent.value,
        "userId" : String(clienteID),
        "timestamp" : timenow
    })
}


function setUpListenerSnapshot(){
    onSnapshot(collection(db,"messages"), (snapshot) => {
    snapshot.forEach(doc => {
        let msg = document.createElement("p")
        msg.textContent = `${doc.id} > ${doc.data().text}`
        document.getElementById("chat").appendChild(msg)
    });
})
}
