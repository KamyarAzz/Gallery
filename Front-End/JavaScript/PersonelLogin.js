let user = document.getElementById("PersonelID");
let pass = document.getElementById("NationalID");
let $userErr = document.getElementById("userErr");
let $passErr = document.getElementById("passErr");
let btn = document.getElementById("submit");

function checkInfo(data){
    for (var i=0;i<data.length;i++){
        if (user.value == data[i].email){
            if (pass.value ==data[i].nationalId){
                window.location.replace("../Personel Page/PersonelPage.html");   
            }
            else{
                $passErr.innerHTML = "Password is incorrect!";
                return;
            }
        }
        else{
            $userErr.innerHTML = "Username not found!";
            return;
        }
    }
}

function loadJSON(method, url, callback){
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onreadystatechange = function(){
        if (xhr.readyState === 4 && xhr.status === 200){
            callback(JSON.parse(xhr.response));
        }
    }
    xhr.send();
};

btn.onclick = function checkEmpty(){
    let n=0;
    $userErr.innerHTML = "";
    $passErr.innerHTML = "";
    if (user.value==""){
        $userErr.innerHTML = "Username can't be empty!";
        n++;
    }
    if (pass.value==""){
        $passErr.innerHTML = "Password can't be empty!";
        n++;
    }
    if (n==0){
        loadJSON("GET","http://localhost:3001/api/workers/",checkInfo);
    }
    else{
        return;
    }
}
