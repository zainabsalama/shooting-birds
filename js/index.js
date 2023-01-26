window.addEventListener("load",function(){
    //find
    let goButton=this.document.querySelector("input[type=submit]");
    let textName=this.document.querySelector("input[name=fname]");

    //do
    goButton.onclick=function(e){
        let setUser={"firstName":textName.value,"score":0};
        console.log(setUser);

        localStorage.setItem("user",JSON.stringify(setUser));

        
        location.href="http://127.0.0.1:5500/game.html";
    }
})