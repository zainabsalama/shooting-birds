window.addEventListener("load",function(){
    //find
    let goButton=this.document.querySelector("input[type=submit]");
    let textName=this.document.querySelector("input[name=fname]");
    //let lastScore=this.document.querySelector(".lastScore");


    //do
    goButton.onclick=function(e){
        // e.preventDefault()
        let setUser={"firstName":textName.value,"score":0};
        console.log(setUser);

        localStorage.setItem("user",JSON.stringify(setUser));

        // localStorage.setItem("yourLastScore",lastScore.innerText);
        /*
        location.href="http://127.0.0.1:5500/game.html";
        */
    }
})