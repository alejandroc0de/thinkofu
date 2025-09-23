
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
let codeClientGlobal;


setUpListenerSnapshot()
clienteIdCheck()
showInputName()


const loginPageSubmitButton = document.getElementById("loginPageSubmit")
loginPageSubmitButton.addEventListener("click",checkClientCode)
const submitNameBoton = document.getElementById("submitName")
submitNameBoton.addEventListener("click", getName)
const botonSubmit = document.getElementById("botonSubmit")
botonSubmit.addEventListener("click", sendMessage)
const botonFindPartner = document.getElementById("butonfindPartner")
botonFindPartner.addEventListener("click",findPartner)



async function checkClientCode(){
    let codeClient; 
    codeClient = document.getElementById("loginPageIdInput").value.trim()

    if(!codeClient){
        return
    }
    codeClientGlobal = codeClient

    const usuarioRef = doc(db,"users",codeClient)
    const usuarioData = await getDoc(usuarioRef)
    if(usuarioData.exists()){
        console.log("usuario existe ")
        let loginPageDiv = document.querySelector(".loginPage");
        loginPageDiv.classList.remove("show");
        loginPageDiv.classList.add("noShow");
        let mainPageDiv = document.getElementById("mainPage")
        mainPageDiv.classList.remove("noShow")
        showInputName(codeClientGlobal)
    }else{
        console.log("User no existe, creando usuario..")
        await setDoc(usuarioRef,{
            nameUser : "Annon",
            codeUser : codeClientGlobal,
            createdAt : Date.now(),
            partner : null,
            partnerName : null
        });
        showInputName(codeClientGlobal)
    }
    showPartnerInfo()
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
        "text" : messageSent.value,
        "userId" : String(codeClientGlobal),
        "timestamp" : timenow
    })

    document.getElementById("messageInput").value =""
}

async function getName(){
    let nameGiven = document.getElementById("nameGiven").value
    console.log(nameGiven)
    if(nameGiven == null || nameGiven == ""){
        return
    }else{
        clienteName = nameGiven
        const usuarioRef = doc(db,"users",codeClientGlobal)
        await setDoc(usuarioRef,{nameUser : clienteName},{merge:true})
        askNameEle.classList.remove("show")
    }
}

async function showInputName(codeClient){
    const usuarioRef = doc(db,"users",codeClient)
    const usuarioData = await getDoc(usuarioRef)
    if(!usuarioData.exists() || usuarioData.data().nameUser === "Annon" ) {
        askNameEle = document.querySelector(".askName")
        askNameEle.classList.add("show")
    }else{
        let welcome = document.createElement("p")
        console.log(usuarioData.data())
        welcome.textContent = `Welcome ${usuarioData.data().nameUser} - Your thinkofu code is ${usuarioData.data().codeUser}`
        welcome.classList.add("showWelcome")
        const mainPageDiv1 = document.getElementById("welcomeText")
        mainPageDiv1.prepend(welcome)
}
}


function setUpListenerSnapshot(){
    onSnapshot(collection(db,"messages"), async (snapshot) => {
        for (let change of snapshot.docChanges()) {
            if (change.type === "added"){

                const data = change.doc.data();
                const userId = data.userId;

                const usuarioRef = doc(db,"users",userId)
                const usuarioData = await getDoc(usuarioRef)
                let nameClient = "Anon";

                if(usuarioData.exists()){
                    nameClient = usuarioData.data().nameUser
                }

                let msg = document.createElement("p")
                msg.textContent = `${nameClient}: ${change.doc.data().text}`
                const chatDiv = document.getElementById("chat")
                chatDiv.appendChild(msg)

                requestAnimationFrame(() => {
                    chatDiv.scrollTop = chatDiv.scrollHeight;   
                });
            }
        }
    })
}

async function findPartner(){
    let codePartner = document.getElementById("findPartnerInput").value
    if(!codePartner){
        console.log("Partner id is incorrect")
        return
    }

    const usuarioRef = doc(db,"users",codeClientGlobal);
    const usuarioData = await getDoc(usuarioRef)
    const nameUsuario = usuarioData.data().nameUser

    const partnerRef = doc(db,"users",codePartner);
    const partnerData = await getDoc(partnerRef);
    const namePartner = partnerData.data().nameUser


    if(partnerData.exists()){
        await setDoc(usuarioRef, {partner: codePartner, partnerName: namePartner},{merge:true});
        await setDoc(partnerRef, {partner: codeClientGlobal, partnerName:nameUsuario},{merge:true})
        let divFindPartner = document.getElementById("divFindPartner")
        divFindPartner.classList.add("noShow")         
        showPartnerInfo() 
    } 
}

async function showPartnerInfo(){
    const usuarioRef = doc(db,"users",codeClientGlobal);
    const usuarioData = await getDoc(usuarioRef)
    if(!usuarioData.data().partner){
        
    }
    else{
        const divFindPartner = document.getElementById("divFindPartner")
        divFindPartner.classList.add("noShow")
        let showPartnerText = document.createElement("p")
        showPartnerText.classList.add("showWelcome")
        showPartnerText.textContent = `Partner : ${usuarioData.data().partnerName}`
        let welcomeTextDiv = document.getElementById("welcomeText")
        welcomeTextDiv.appendChild(showPartnerText)
    }

}