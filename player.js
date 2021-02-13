class Player
{
    constructor(){
        this.name = null;
        this.index =  null;
        this.score = 0;
        this.rank = null;
        this.xpos = 0;
        this.ypos = 0;
    }
    readCount()
    {
        var gameRef = db.ref('PlayerCount');
        gameRef.on("value", function(data){
            playerCount = data.val();
        })
    }
    updateCount(count)
    {
        db.ref('/').update({
            'PlayerCount':count
        })
    }
    readTutorial()
    {
        var gameRef = db.ref('Tutorial');
        gameRef.on("value", function(data){
            tutorial = data.val();
        })
    }
    updateTutorial(count)
    {
        db.ref('/').update({
            'Tutorial':count
        })
    }
    updateDetails()
    {
        var index = "Player/player" + this.index 
        db.ref(index).set({
           Name : this.name,
           score : this.score,
           xpos : this.xpos,
           ypos : this.ypos
        })
    }
//calling at class level... we display all player details to all.
    static getplayerinfo()
    {
        var playerRef = db.ref('Player');
        playerRef.on("value", function(data){

            AllPlayers = data.val();
        })
        
    }
  /*  readRank()
    {
        var Rankref = db.ref('LeaderBoard');
        Rankref.on("value", (data) =>
        {
            this.rank = data.val();
        })
    }
    updateRank(rank)
    {
        db.ref('/').update({
            LeaderBoard: rank
            
            
        })
    } */
}


