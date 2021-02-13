class Game
{
    constructor()
    {

    }
    readGame()
    {
        var gameRef = db.ref('GameState');
        gameRef.on("value", function(data){
            gamestate = data.val();
        })
    }
    updateGame(state)
    {
        db.ref('/').update({
            GameState:state
        })
    }
    removeghost(){
        db.ref('Ghost').remove().then(function() {
            console.log("Remove succeeded.")
          })
      }
    readghost()
    {
        var Rankref = db.ref('GhostStatus');
        Rankref.on("value", (data) =>
        {
            ghoststatus= data.val();
        })
    }
    updateghost(X,Y){
        var ghostindex = "Ghost/ghost"+player.index;
        db.ref(ghostindex).set({
            'Ghostxpos':X,
            'Ghostypos':Y
        })
    }
    
    static getghost()
    {
        var playerRef = db.ref('Ghost');
        playerRef.on("value", function(data){

            Allghost = data.val();
        })
        
    }
    startGame()
    {
        if(gamestate == 0)
        {
            
        player1 = createSprite(displayWidth/2, displayHeight/2, 20, 20)
        player2 = createSprite(displayWidth/2, displayHeight/2 + 50, 20, 20)
        player3 = createSprite(displayWidth/2, displayHeight/2 - 50, 20, 20)
        player4 = createSprite(displayWidth/2 - 50, displayHeight/2, 20, 20)
    //    player5 = createSprite(displayWidth/2 - 50,  displayHeight/2 + 50, 20, 20)
  //      player6 = createSprite(displayWidth/2 - 50, displayHeight/2 - 50, 20, 20)
  //      player7 = createSprite(displayWidth/2 + 50, displayHeight/2, 20, 20)
  //      player8 = createSprite(displayWidth/2 + 50,  displayHeight/2 + 50, 20, 20)
  //      player9 = createSprite(displayWidth/2 + 50, displayHeight/2 - 50, 20, 20)
      //  BigCar = [player1, player2, player3, player4, player5, player6, player7, player8, player9];
         BigCar = [player1, player2, player3,player4];
        
            player = new Player();
            player.readCount();
            player.readTutorial();
            form = new Form();
            form.display();         
            edges = createEdgeSprites(); 
      //      game.readghost();
      
    //    car1.addImage(car1Img);
    //    car2.addImage(car2Img);
    //    car3.addImage(car3Img);
    //    car4.addImage(car4Img);
    
    
    }
    }
    play()
    {
        form.hide();
        Player.getplayerinfo();
        Game.getghost();
     
        if(AllPlayers !== undefined){
                       
            background(0);
            image(ghostbg,-100, -300, displayWidth+300, displayHeight+300);
            var arrayindex = 0;
    
            for(var P in AllPlayers){
          //       ypos = displayHeight/2 - AllPlayers[P].Distance  ;
          if(player.index !== (arrayindex+1))
          {
             BigCar[arrayindex].x = AllPlayers[P].xpos;
             BigCar[arrayindex].y = AllPlayers[P].ypos;
          }
            else 
               if(player.index == (arrayindex+1)){
                fill("blue");
                 ellipse(BigCar[arrayindex].x ,BigCar[arrayindex].y,20, 20);
              //  camera.position.x = BigCar[arrayindex].x;
              //  camera.position.x = displayWidth/2;
              //  camera.position.y = BigCar[arrayindex].y
            
          // player move up
                 
               }              
                 arrayindex++;
           
            }
        }        
        if(keyDown("w") && player.index!==null)
        {
           
            BigCar[player.index - 1].velocityY =  Math.round(random(-1, -3))          
        
        }
        if(keyDown("a") && player.index!==null)
        {

           BigCar[player.index - 1].velocityX =  Math.round(random(-1, -3))          
                                                                   
        }
        if(keyDown("s")  && player.index!==null)
        {
            BigCar[player.index - 1].velocityY =  Math.round(random(1, 3))
           
        }
        if(keyDown("d") && player.index!==null)
        {
            BigCar[player.index - 1].velocityX =  Math.round(random(1, 3))
           
        }
        
                
      
        if(frameCount% 300 === 0 && ghoststatus == "kill" ){
           
            ghost = createSprite(200,Math.round(random(40,90)),40,10);
            ghost.addImage(ghostImg);
            ghost.scale=0.1;
            game.updateghost(ghost.x,ghost.y);
            ghoststatus = "alive";
            
        }   
        if(ghoststatus == "alive" && player.index!==null){
     
            var ghostspeed = BigCar[player.index - 1].getSpeed();
            //find distance
          
            var dx = player.xpos - ghost.x;
            var dy = player.ypos - ghost.y;
            var distance = Math.sqrt((dx*dx) + (dy*dy));
            //find speed
            var ghostspeedX = ghostspeed * (dx/distance);
            var ghostspeedY = ghostspeed * (dy/distance);
        
            //ghost follow player
            ghost.x += (ghostspeedX*random(0.5,1));
         //   ghost.x += ghostspeedX;
            ghost.y += (ghostspeedY*random(0.5,1));
         //   ghost.y += ghostspeedY;
            game.updateghost(ghost.x,ghost.y);
           
         if(ghost.isTouching(BigCar[0])||ghost.isTouching(BigCar[1])||ghost.isTouching(BigCar[2])
        ||ghost.isTouching(BigCar[3])){
            ghost.destroy();          
            ghoststatus = "kill";
            game.updateghost(0,0);
        }

        }
        

      //  console.log(Allghost)
        if(Allghost !== undefined){
            for (var gh in Allghost){
     //           console.log(gh)
                var currind = gh.slice(5)
       //         console.log(currind)
                if(Number(currind) !== player.index){
                    
                    if(Allghost[gh].Ghostxpos !==0 && Allghost[gh].Ghostypos!== 0){
                        image(ghostImg,Allghost[gh].Ghostxpos,Allghost[gh].Ghostypos,80,80)
                    }              
                }

                
            }
            
        }
         
        player.ypos = BigCar[player.index - 1].y;
        player.xpos = BigCar[player.index - 1].x;
        player.updateDetails();     
                                
        BigCar[player.index - 1].collide(edges[0]);   
        BigCar[player.index - 1].collide(edges[1]);   
        BigCar[player.index - 1].collide(edges[2]);   
        BigCar[player.index - 1].collide(edges[3]);   
            
       
    }
    endGame()
    {
        textSize(20);
        textFont("Verdana");
        stroke("blue");
        strokeWeight(5);
        fill("red");
        text(player.name + " Your rank is " + player.rank + " what a horrible rank ><", displayWidth/2 - 100, -(displayHeight * 20 ) - 300);
        form.resetButton.show();
    }
     


}