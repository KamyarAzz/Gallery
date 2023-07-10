let artworks = document.getElementById("artworks");
let exhibitions = document.getElementById("exhibitions");

function renderArtworks(data){
    artworks.innerHTML = "<h1>آثار هنری</h1>";
    for(let i=0;i<data.length;i++){
        if(data[i].description==null)
            data[i].description="تماس بگیرید";
        if(data[i].price==undefined)
            data[i].price="تماس بگیرید";
        artworks.innerHTML += 
        `<div class="artwork">
            <p> نام اثر : </p>
            <p class="data">${data[i].artworkName}</p>
            <br />    
            <p> طول : </p>
            <p class="data">${data[i].length}</p>
            <br />   
            <p>  عرض : </p>
            <p class="data">${data[i].width}</p>
            <br /> 
            <p>  ارتفاع : </p>
            <p class="data">${data[i].height}</p>
            <br /> 
            <p>  توضیحات : </p>
            <p class="data">${data[i].description}</p>
            <br /> 
            <p>  قیمت : </p>
            <p class="data">${data[i].price}</p>
            <br /> 
        </div>`;
    }
}

function renderExhibitions(data){
    exhibitions.innerHTML = "<h1>نمایشگاه ها</h1>";
    for(let i=0;i<data.length;i++){
        exhibitions.innerHTML += 
        `<div class="exhibition">
            <p> اسم نمایشگاه : </p>
            <p class="data">${data[i].name}</p>
            <br />   
            <p>  توضیحات : </p>
            <p class="data">${data[i].description}</p>
            <br /> 
            <p>  تعداد بازدیدکنندگان : </p>
            <p class="data">${data[i].visitorAttended}</p>
            <br /> 
            <p>  تاریخ شروع : </p>
            <p class="data">${data[i].startDate}</p>
            <br /> 
            <p>  تاریخ پایان : </p>
            <p class="data">${data[i].endDate}</p>
            <br />
            <p>  تعداد تیکت ها  : </p>
            <p class="data">${data[i].numberOfTickets}</p>
            <br /> <br /> 
            <button class="success" type="button">خرید</button>
        </div>`;
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

loadJSON("GET","http://localhost:3001/api/artworks/",renderArtworks);
loadJSON("GET","http://localhost:3001/api/exhibitions/",renderExhibitions);