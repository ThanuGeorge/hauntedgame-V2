class Form
{
    constructor()
    {
        this.playerName = createInput('Put your name here');
        this.button = createButton('Submit');
        this.welcome = createElement('h3');
        this.wait = createElement('h3');
        this.tutorial1 = createButton('Read Tutorial')
        this.tutorial2 = createButton('Skip Tutorial')
        this.play = createButton('PLAY THE GAME');
        this.reset = createButton('Reset');
        this.tutorial1.hide();
        this.tutorial2.hide();
        this.play.hide();
        this.wait.hide();
  //      this.resetButton = createButton('Want to be lazy, Click Here!')
  //    load the tutorial image
    }

    display()
    {
            
        this.playerName.position(displayWidth/2, displayHeight/2);
         
        this.button.position(displayWidth/2, displayHeight-150);
        this.reset.position(displayWidth-100, 40);
        
        //this.resetButton.position(displayWidth/4, 100);

        this.button.mousePressed(()=>{


            this.button.hide();
            this.playerName.hide();
            this.tutorial1.show();
            this.tutorial2.show();
            this.welcome.html("Welcome.. To the amazing haunted house.. MWAHAHAHHAH")
            this.welcome.position(displayWidth/2-100, displayHeight/2);
            
            this.tutorial1.position(displayWidth/2 - 100, displayHeight/2 - 200)
            this.tutorial2.position(displayWidth/2 + 100, displayHeight/2 - 200)
                       
            playerCount = playerCount + 1;
            player.index = playerCount;
           
            player.updateCount(playerCount);
            player.name = this.playerName.value();
          
            player.xpos= BigCar[playerCount-1].x;
            player.ypos= BigCar[playerCount-1].y;
            player.updateDetails();

        })
        this.tutorial1.mousePressed(()=>{
            this.tutorial1.hide();
            this.tutorial2.hide();
            this.welcome.hide();
            this.play.show();
       //   image()
            this.play.position(displayWidth - 200, displayHeight/2 + 400);
        })
        this.play.mousePressed(()=>{
            this.play.hide();
            if(gamestate == 0){
                this.wait.show();
                this.wait.html('Please Wait, others are joining')
                this.wait.position(displayWidth/2-100, displayHeight/2)
                tutorial--;
                player.updateTutorial(tutorial);
            }   
            
        })
        this.reset.mousePressed(()=>{
           player.updateCount(0);
           player.updateTutorial(3);
           game.updateGame(0);
           game.removeghost();
            location.reload();
        })
        this.tutorial2.mousePressed(()=>{
            this.tutorial1.hide();
            this.tutorial2.hide();
            this.welcome.hide();
            if(gamestate == 0){
                this.wait.show();
                this.wait.style('color', 'white')
                this.wait.html('Please Wait, others are joining')
                this.wait.position(displayWidth/2-100, displayHeight/2)
                tutorial--;
                player.updateTutorial(tutorial);
            }   
        })
    }
    hide()
    {
        this.tutorial1.hide();
        this.tutorial2.hide();
        this.welcome.hide();     
        this.wait.hide();
      //  this.reset.hide();
    }
}