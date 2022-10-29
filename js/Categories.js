var textWrapper = document.querySelector('.ml12');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml12 .letter',
    translateX: [40,0],
    translateZ: 0,
    opacity: [0,1],
    easing: "easeOutExpo",
    duration: 1200,
    delay: (el, i) => 500 + 30 * i
  }).add({
    targets: '.ml12 .letter',
    translateX: [0,-30],
    opacity: [1,0],
    easing: "easeInExpo",
    duration: 1100,
    delay: (el, i) => 100 + 30 * i
  });

  function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
  }
/////////////////////////////////////////////////////////////////////////


function getMeals( cat  )
{
    var httpReq = new XMLHttpRequest();
    // connection method
    httpReq.open( "GET" , `https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}` );

    httpReq.send();

httpReq.addEventListener("readystatechange" , function(){

    if(  httpReq.readyState == 4 && httpReq.status == 200 )
    {
       myData = JSON.parse( httpReq.response ).meals    ;

       displayData();
    }
})
}


function getDefault(  )
{
    var httpReq = new XMLHttpRequest();
    // connection method
    httpReq.open( "GET" , `https://www.themealdb.com/api/json/v1/1/categories.php` );

    httpReq.send();

httpReq.addEventListener("readystatechange" , function(){

    if(  httpReq.readyState == 4 && httpReq.status == 200 )
    {
       myData = JSON.parse( httpReq.response ).categories    ;

       displayDataDefault();
    }
})
}

getDefault()



function displayData()
{
    var hasalah = ``;
    for( var i =0 ; i < myData.length ; i++ )
    {
        hasalah +=`<div class="col-md-3">
        <div class="card-item">
            <img src="${myData[i].strMealThumb}" class="img-fluid">
 
            <h6>${myData[i].strCategory}</h6>
        </div>
    </div>`
    }

    document.querySelector(".row").innerHTML = hasalah;
}

function displayDataDefault()
{
    var hasalah = ``;
    for( var i =0 ; i < myData.length ; i++ )
    {
        hasalah +=`<div class="col-md-3">
        <div>
    <img src="${myData[i].strCategoryThumb}" class="img-fluid">

      <div class="text"> <h6>${myData[i].strCategory}</h6></div>
    </div>
  </div>
    </div>`
    }

    document.querySelector(".row").innerHTML = hasalah;
}

