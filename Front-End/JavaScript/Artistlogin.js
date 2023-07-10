let user = document.getElementById("firstname");
let pass = document.getElementById("artistId");
let $userErr = document.getElementById("userErr");
let $passErr = document.getElementById("passErr");
let btn = document.getElementById("submit");

function checkInfo(data){
    for (var i=0;i<data.length;i++){
        if (user.value == data[i].firstname){
            if (pass.value ==data[i].artistId){
                localStorage.setItem("id",data[i].artistId);
                localStorage.setItem("firstname",data[i].firstname);
                localStorage.setItem("lastname",data[i].lastname);
                localStorage.setItem("country",data[i].country);
                localStorage.setItem("city",data[i].city);
                localStorage.setItem("biography",data[i].biography);
                localStorage.setItem("address",data[i].address);
                localStorage.setItem("commisionPercentage",data[i].commisionPercentage);
                window.location.replace("../Artist Page/ArtistPage.html");   
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
    var xhr = new XMLHttpRequest();
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
        loadJSON("GET","http://localhost:3001/api/artist/",checkInfo);
    }
    else{
        return;
    }
}
