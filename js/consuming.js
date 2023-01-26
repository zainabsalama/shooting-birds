window.addEventListener("load",function(){
        takeUsername();
       
        /***   click button to start the game  ***/ 
        buttonObjectStart.onclick=function(){
      
            alertObject.classList.add("hidden");

            startTimer();

            /***   Timer for starting creating birds  ***/
            let birdsTimer = setInterval(createBird, 1000);

            console.log(birdsTimer);
            
            /*** Timer for starting creating birds ***/
            let bombTimer = setInterval(createBomb, 2000);
           
        
             /***   Timer for moving birds    ***/
            setInterval(() => {
                document.querySelectorAll(".images-display").forEach(bird=>{
                    moveRight(bird);
                });
            }, 100);

                
                /****  timer to stop creating birds  ****/
                setTimeout(function() {
                    clearInterval(birdsTimer);
                }, 48700);
        
                  /****  timer to stop creating bombs****/
                setTimeout(function() {
                    clearInterval(bombTimer);
                    }, 57000);

                 /****  timer to get score after finish game  ****/
                setTimeout(() => {
                    if (scores > 50) {
                        imgId.classList.remove("finalAlert");
                        message[1].innerText= "You Win";
                        messageImg.src = "images/happyface.png";
                        
                    } else {
                        imgId.classList.remove("finalAlert");
                        message[1].innerText = "You Lose";
                        messageImg.src = "images/sadface.png";
                    }
                    /*** getting last score  ***/
                    let getScore = localStorage.getItem("yourLastScore");
                    getFinalScore.innerText="Your Last Score: "+getScore;

                    /*** getting last visit ***/
                    let getVisit=localStorage.getItem("yourLastVisit");
                    getFinalVisit.innerText="You Last Visit: "+getVisit;
                    
                }, 60000);  
    }
    /***   click button to start the game  ***/ 
    buttonObjectAgain.onclick=function(){
        location.reload();
    }
});
