//material va price moshkel dare


let id = localStorage.getItem("id");
let $fnameData = document.getElementById("fnameData");
let $lnameData = document.getElementById("lnameData");
let $countryData = document.getElementById("countryData");
let $cityData = document.getElementById("cityData");
let $bioData = document.getElementById("bioData");
let $addData = document.getElementById("addData");
let $commData = document.getElementById("commData");

function renderProf(){
    $fnameData.innerHTML = localStorage.getItem("firstname");
    $lnameData.innerHTML = localStorage.getItem("lastname");
    $countryData.innerHTML = localStorage.getItem("country");
    $cityData.innerHTML = localStorage.getItem("city");
    $bioData.innerHTML = localStorage.getItem("biography");
    $addData.innerHTML = localStorage.getItem("address");
    $commData.innerHTML = localStorage.getItem("commisionPercentage");
}

function getArtworks(callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", `http://localhost:3001/api/artworks/artist/${id}`);
    xhr.onreadystatechange = function(){
        if (xhr.readyState === 4 && xhr.status === 200){
            callback(JSON.parse(xhr.response));
        }
    }
    xhr.send();
};

let artworksDisplay = document.getElementById("artworks");
function renderArtworks(artworks){
    artworksDisplay.innerHTML = "<h1>Your Artworks</h1>";
    if(artworks.length==0){
        artworksDisplay.innerHTML += `<p class="danger">You have not submited any artworks!</p>`;
    }
    else{
        for(let i=0;i<artworks.length;i++){
            if(artworks[i].description==null || artworks[i].description==undefined)
                artworks[i].description="Not Specified.";
            if(artworks[i].price==null || artworks[i].price==undefined)
                artworks[i].price="Not Specified.";
            artworksDisplay.innerHTML += 
            `<div>  
                <p class="data">${artworks[i].artworkName}</p>
                <p>Artwork Name : </p>
                <br />    
                <p class="data">${artworks[i].length}</p>
                <p>Length : </p>
                <br />   
                <p class="data">${artworks[i].width}</p>
                <p>Width : /p>
                <br /> 
                <p class="data">${artworks[i].height}</p>
                <p>Height : </p>
                <br /> 
                <p class="data">${artworks[i].description}</p>
                <p>Description : </p>
                <br /> 
                <p class="data">${artworks[i].price}</p>
                <p>Price : </p>
                <br /><br /><br />  
             </div>`;
        }
    }
}

function loadJSON(method, url, data) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 201) { 
          // Check for a successful response
          console.log(JSON.parse(xhr.response));
        } else {
          // Handle error cases
          console.error('Error:', xhr.status);
        }
      }
    };
    // Convert the data to JSON string before sending
    xhr.send(data); 
}

//buttons
let btn1 = document.getElementById("submit-1");
let btn2 = document.getElementById("submit-2");

//errors
let nameErr = document.getElementById("nameErr");
let wErr = document.getElementById("wErr");
let lErr = document.getElementById("lErr");
let hErr = document.getElementById("hErr");
let error2 = document.getElementById("error2");

let artName = document.getElementById("artName");
let height = document.getElementById("height");
let width = document.getElementById("width");
let length1 = document.getElementById("length");

btn1.onclick = function checkForm1(){
    let n=0;
    nameErr.innerHTML = "";
    wErr.innerHTML = "";
    hErr.innerHTML = "";
    lErr.innerHTML = "";
    if(artName.value==""){
        nameErr.innerHTML = "Artwork Name can't be empty!";
        n++;
    }
    if(height.value==""){
        hErr.innerHTML = "Height can't be empty!";
        n++;
    }
    if(width.value==""){
        wErr.innerHTML = "Width can't be empty!";
        n++;
    }
    if(length1.value==""){
        lErr.innerHTML = "Length can't be empty!";
        n++;
    }
    if (n==0){
        var artInfo = {
            "creationDate" : document.getElementById("creationDate").value  == "" ? null : document.getElementById("creationDate").value,
            "description" : document.getElementById("desc").value  == "" ? null : document.getElementById("desc").value,
            "artworkName" : artName.value,
            "height" : height.value  == "" ? null : parseInt(height.value),
            "width" : width.value  == "" ? null : parseInt(width.value),
            "length" : length1.value  == "" ? null : parseInt(length1.value),
            "artistId_artwork_fk" : parseInt(id),
        };
        let mats = document.getElementById("mats");
        if(mats.value!=""){
            var artwrokMaterial = {
                "material" : mats.value == "" ? null : mats.value,
            };
            loadJSON("POST", "http://localhost:3001/api/artwork-materials", JSON.stringify(artwrokMaterial));
        }
        let price = document.getElementById("price");
        if(price.value!=""){
            var artwrokPrice = {
                "price" : price.value == "" ? null : parseInt(price.value),
            };
            loadJSON("POST", "http://localhost:3001/api/artwork-prices", JSON.stringify(artwrokPrice));
        }
        loadJSON("POST", "http://localhost:3001/api/artworks", JSON.stringify(artInfo));
    }
}

let newcountry = document.getElementById("newcountry");
let newcity = document.getElementById("newcity");
let newAdd = document.getElementById("newAdd");
let newbio = document.getElementById("newbio");

btn2.onclick = function checkForm1(){
    error2.innerHTML = "";
    if(newcountry.value=="" && newcity.value=="" && newAdd.value=="" && newbio.value==""){
        error2.innerHTML = "Atleast one field should be specified!";
    }
    else{
        if(newcountry.value!=""){
            localStorage.setItem("country",newcountry.value);
            newcountry.value="";
        }
        if(newcity.value!=""){
            localStorage.setItem("city",newcity.value);
            newcity.value="";
        }
        if(newAdd.value!=""){
            localStorage.setItem("address",newAdd.value);
            newAdd.value="";
        }
        if(newbio.value!=""){
            localStorage.setItem("biography",newbio.value);
            newbio.value="";
        }
        var newProf = {
            "biography" : localStorage.getItem("biography"),
            "address" : localStorage.getItem("address"),
            "country" : localStorage.getItem("country"),
            "city" : localStorage.getItem("city"),
        }
        loadJSON("PUT", `http://localhost:3001/api/artworks/${id}`, JSON.stringify(newProf));
        renderProf();
    }
}

renderProf();
getArtworks(renderArtworks);