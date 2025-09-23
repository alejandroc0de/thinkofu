
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-analytics.js";
import{
    getFirestore,
    collection,
    addDoc,
    setDoc,
    doc,
    getDoc,
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
let clienteName;
let askNameEle;


setUpListenerSnapshot()
clienteIdCheck()
showInputName()


const loginPageSubmitButton = document.getElementById("loginPageSubmit")
loginPageSubmitButton.addEventListener("click",checkClientCode)
const submitNameBoton = document.getElementById("submitName")
submitNameBoton.addEventListener("click", getName)
const botonSubmit = document.getElementById("botonSubmit")
botonSubmit.addEventListener("click", sendMessage)



async function checkClientCode(){
    let codeClient; 
    codeClient = document.getElementById("loginPageIdInput").value.trim()

    if(!codeClient){
        return
    }

    const usuarioRef = doc(db,"users",codeClient)
    const usuarioData = await getDoc(usuarioRef)
    if(usuarioData.exists()){
        console.log("usuario existe ")
        let loginPageDiv = document.querySelector(".loginPage");
        loginPageDiv.classList.remove("show");
        loginPageDiv.classList.add("noShow");
        let mainPageDiv = document.getElementById("mainPage")
        mainPageDiv.classList.remove("noShow")
    }else{
        console.log("User no existe, creando usuario..")
        await setDoc(usuarioRef,{
            createdAt : Date.now(),
            partner : null
        });
    }
}


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
    if(messageSent.value == ""){
        console.log("Envia un mensaje")
        return
    }
    let timenow = Date.now()
    await addDoc(collection(db,"messages"),{
        "nameClient" : clienteName,
        "text" : messageSent.value,
        "userId" : String(clienteID),
        "timestamp" : timenow
    })
    document.getElementById("messageInput").value =""
}

function getName(){
    let nameGiven = document.getElementById("nameGiven").value
    console.log(nameGiven)
    if(nameGiven == null || nameGiven == ""){
        return
    }else{
        clienteName = nameGiven
        localStorage.setItem("userName", clienteName)
        askNameEle.classList.remove("show")
    }
}

function showInputName(){
    if(localStorage.getItem("userName")==null){
        askNameEle = document.querySelector(".askName")
        askNameEle.classList.add("show")
    }else{
        clienteName = localStorage.getItem("userName")
    }
}



function setUpListenerSnapshot(){
    onSnapshot(collection(db,"messages"), (snapshot) => {
    snapshot.docChanges().forEach(change => {
        if (change.type === "added"){
            let msg = document.createElement("p")
            msg.textContent = `${change.doc.data().nameClient}: ${change.doc.data().text}`
            const chatDiv = document.getElementById("chat")
            chatDiv.appendChild(msg)
            requestAnimationFrame( () => {
                chatDiv.scrollTop = chatDiv.scrollHeight;   
            })
        }
    });
})
}
