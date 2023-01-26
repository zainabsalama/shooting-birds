/*** find****/
let getFinalScore=document.querySelector(".lastScore");
let getFinalVisit=document.querySelector(".lastVisit");
let alertName=document.querySelector(".alertname");
let welcomeName=document.querySelector(".welcomename");
let buttonObjectStart=document.querySelectorAll("button")[0];
let buttonObjectAgain=document.querySelectorAll("button")[1];
let alertObject=document.querySelector(".alert");
let bodyOfPage=document.querySelector("body");
let arrayOfImages = ["birdsImages/bird1.gif", "birdsImages/bird2.gif", "birdsImages/bird3.gif"];
let timeLimit=document.querySelector(".timeLimit");
let initScore=document.querySelector(".initScore");
let KilledBirds=document.querySelector(".birdsKilled");
let message = document.querySelectorAll("h1");
let messageImg = document.querySelector(".messageImg");
let bombSound =document.querySelector(".bomb");
let gunSound =document.querySelector(".gun");
let imgId=document.getElementById("msg");

let allBirds = [];
let bombedBirds = [];
let scores = 0;
let killed = 0;

/***  ***/


/***  function for creating elements with style    ***/
function createElementWithTop(sorce,classAdd,objectLeft,objectTop)
{
  let imgElement=document.createElement("img");
  imgElement.src=sorce;
  imgElement.classList.add(classAdd);
  imgElement.style.left=objectLeft;
  imgElement.style.top=objectTop;
  return imgElement;
}

/***   function for taking name from user by local Storage   ***/
function takeUsername(){
    let getName=localStorage.getItem("user");
    let userName=JSON.parse(getName);
    alertName.innerText=userName[`firstName`];
    console.log(userName);
    welcomeName.innerText=userName[`firstName`];
}

/*** function for creating Bird ***/
function createBird()
   {
        let myRandomNum=Math.floor(Math.random()*arrayOfImages.length);
        let randomTopVariables=Math.floor(Math.random()*(400-50)+50)+"px";
        let bird= createElementWithTop(arrayOfImages[myRandomNum],"images-display","0px",randomTopVariables);
        allBirds.push(bird);
        bodyOfPage.append(bird);
        // return 1

        window.addEventListener("click",function(){
            gunSound.play();
        })
   }

/*** function for moving birds ***/
function moveRight(bird)
    {
        if(bird.offsetLeft<(innerWidth-bird.width))
        {
            bird.style.left=bird.offsetLeft+10+"px";
        }
        else
        {
            let index = allBirds.indexOf(bird);
            allBirds.splice(index, 1);
            bird.remove();
        }
    }


 function startTimer() {
    let seconds = 60;
    let Id = setInterval(() => {
        seconds--;
        if (seconds == 0) {
            clearInterval(Id);
            localStorage.setItem("yourLastScore",scores); 
            localStorage.setItem("yourLastVisit", new Date().toLocaleString());
        }
        timeLimit.innerText = seconds;
    }, 1000);
}

/*** function for creating bomb ***/
 function createBomb(){
    let left =Math.random()*((400-50)+50)+"px";
    let bomb= createElementWithTop("images/remove.png","bomb",left,"0px");
    bodyOfPage.append(bomb);

    let startDown =moveDown(bomb, 0, left);

    bomb.addEventListener("click", function() {

        clearInterval(startDown);
           bombSound.play();

        let firedBomb = this;   
         firedBomb.src = "images/fireremove.png";
         firedBomb.classList.remove("bomb");
         firedBomb.classList.add("firedBomb");

        
        let bombLeft = parseInt(firedBomb.style.left);
        let bombTop = parseInt(firedBomb.style.top);
        let bombWidth = firedBomb.width;
        let bombHeight = firedBomb.height;

        setTimeout(function() {
            firedBomb.remove();
        }, 500);

        allBirds.forEach(function(bird) {
            let birdLeft = parseInt(bird.style.left);
            let birdTop = parseInt(bird.style.top);
            let birdWidth = bird.width;
            let birdHeight = bird.height;
            if (birdLeft + birdWidth >= bombLeft &&
                birdLeft <= bombLeft + bombWidth &&
                birdTop + birdHeight >= bombTop &&
                birdTop <= bombTop + bombHeight) {
                bombedBirds.push(bird.src.slice(-9, -4));
                let index = allBirds.indexOf(bird);
                allBirds.splice(index, 1);
                bird.remove();
            }
        });
        bombedBirds.forEach(function(bombed) {
            if (bombed == "bird1")
                scores-= 10;
            else if (bombed == "bird2")
                scores += 10;
            else if (bombed == "bird3")
                scores += 5;
        });

        killed += bombedBirds.length;
        initScore.innerText= scores;

        KilledBirds.innerText = killed;
        bombedBirds.length = 0;     
    });
};

/*** function for moving bomb ***/
function moveDown(bomb, top, left) {
    let id = setInterval(function() {
        top += 5;
        if (top < (innerHeight - bomb.height)) {
            bomb.style.top = top + "px";
        } else {
            clearInterval(id);
            bomb.remove();
        }
    }, 20);
}





