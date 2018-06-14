// Initialize Firebase
var config = {
    apiKey: "AIzaSyDcnps7XE8WFj1EH_P8ZWvBKaSJ0REqkds",
    authDomain: "first-database-c073e.firebaseapp.com",
    databaseURL: "https://first-database-c073e.firebaseio.com",
    projectId: "first-database-c073e",
    storageBucket: "first-database-c073e.appspot.com",
    messagingSenderId: "189368493103"
};
firebase.initializeApp(config);

var dataRef = firebase.database();

//Inital Values
var player1name = "";
var player1selection = "";
var player1wins = 0;
var player1losses = 0;
var player2name = "";
var player2selection = "";
var player2wins = 0;
var player2losses = 0;
var player1Exists;
var player2Exists;
var turnplayer1 = 0;
var turnplayer2 = 0;






//Check if player 1 alreadt exists
var checkPlayer1 = firebase.database().ref("/players/1");
checkPlayer1.once("value", function (snapshot) {
    player1Exists = snapshot.child("name").val();
    console.log("Player 1 Exists " + player1Exists);
});

var checkPlayer2 = firebase.database().ref("/players/2");
checkPlayer2.once("value", function (snapshot) {
    player2Exists = snapshot.child("name").val();
    console.log("Player 2 Exists " + player2Exists);
});


function player1Assign() {
    var rock1Div = $("<div>");
    rock1Div.text("Rock");
    rock1Div.attr("id", "player1Rock");
    var paper1Div = $("<div>");
    paper1Div.text("Paper");
    paper1Div.attr("id", "player1Paper")
    var scissors1Div = $("<div>");
    scissors1Div.text("Scissors");
    scissors1Div.attr("id", "player1Scissors")
    var score1Div = $("<div>");
    
     $("#RPSsectionPlayer1").append(rock1Div);
    $("#RPSsectionPlayer1").append(paper1Div);
    $("#RPSsectionPlayer1").append(scissors1Div);
    $("#player1Score").append(score1Div);
}

function player2Assign() {
    var rock2Div = $("<div>");
    rock2Div.text("Rock");
    rock2Div.attr("id", "player2Rock");
    var paper2Div = $("<div>");
    paper2Div.text("Paper");
    paper2Div.attr("id", "player2Paper")
    var scissors2Div = $("<div>");
    scissors2Div.text("Scissors");
    scissors2Div.attr("id", "player2Scissors")
    var score2Div = $("<div>");
    
    $("#player2Status").text("Waiting for player 1 to choose");
    
    $("#RPSsectionPlayer2").append(rock2Div);
    $("#RPSsectionPlayer2").append(paper2Div);
    $("#RPSsectionPlayer2").append(scissors2Div);
    $("#player2Score").append(score2Div);
}



$("#startGame").on("click", function (event) {
    event.preventDefault();

    if (player1Exists == null) {
        //Add player 1 name
        console.log("Ponemos al jugador 1");
        player1name = $("#playerName").val().trim();

        dataRef.ref("/players/1").set({
            name: player1name,
            player1selection: player1selection,
            wins: player1wins,
            losses: player1losses,
            turnplayer1: turnplayer1,
        })


        $("#ShowplayerName").html("Hi " + player1name + " you are player 1");
        $("#player1Name").text(player1name);
        player1Assign(player1wins, player1losses);
        //hide the DIV of RPS and Status of Player 2 
        $("#RPSsectionPlayer2").hide();
        $("#player2Status").hide();


        checkPlayer1.onDisconnect().remove();
    };
    if (player1Exists != null & player2Exists == null) {
        //To be able to start a new game once disconnected
        resetGame();


        //Add player 2 name
        dataRef.ref("/players/1").once("value", function (snapshot) {
            player1name = snapshot.val().name
            console.log("El jugador 1 es: " + player1name);


            console.log("Ponemos el jugador 2");
            player2name = $("#playerName").val().trim();
           
        })
        dataRef.ref("/players/2").set({
            name: player2name,
            player2selection: player2selection,
            wins: player2wins,
            losses: player2losses,
            turnplayer2: turnplayer2,
        });
        //Hide the RPS and Status section of Player 1
        $("#RPSsectionPlayer1").hide();
        $("#player1Status").hide();


        $("#ShowplayerName").html("Hi " + player2name + " you are player 2");
        $("#player1Name").text(player1name);
        $("#player2Name").text(player2name);
        //player1Assign(player1wins, player1losses);
        player2Assign(player2wins, player2losses);



        setTimeout(test(),3*1000)

        function test(){
        //Give Turn to player 1
        dataRef.ref("/players/1").update({
            turnplayer1: 1,
        });
    }

        
        checkPlayer2.onDisconnect().remove();
        

    }
})


//Player 1 choose     
function player1Choose() {
    $("#player1Status").text("Your turn, please choose");
    //If player 1  choose Rock
    $(document).on("click", "#player1Rock", function (event) {
        event.preventDefault();
        player1selection = $("#player1Rock").text();
        $("#RPSsectionPlayer1").empty();
        $("#player1Selection").html(player1selection);
        $("#player1Selection").addClass("Selection");
        dataRef.ref("/players/1").update({
            player1selection: player1selection,
            turnplayer1: 3
        });
        dataRef.ref("/players/2").update({
            turnplayer2: 1,
        });
    });
    //If player 1  choose Paper
    $(document).on("click", "#player1Paper", function (event) {
        event.preventDefault();
        player1selection = $("#player1Paper").text();
        $("#RPSsectionPlayer1").empty();
        $("#player1Selection").html(player1selection);
        $("#player1Selection").addClass("Selection");
        dataRef.ref("/players/1").update({
            player1selection: player1selection,
            turnplayer1: 3
        });
        dataRef.ref("/players/2").update({
            turnplayer2: 1,
        });
    });
    //If player 1  choose Scissors
    $(document).on("click", "#player1Scissors", function (event) {
        event.preventDefault();
        player1selection = $("#player1Scissors").text();
        $("#RPSsectionPlayer1").empty();
        $("#player1Selection").html(player1selection);
        $("#player1Selection").addClass("Selection");
        dataRef.ref("/players/1").update({
            player1selection: player1selection,
            turnplayer1: 3
        });
        dataRef.ref("/players/2").update({
            turnplayer2: 1,
        });
    });
}

//Player 2 choose 
function player2Choose() {
    $("#player2Status").text("Your turn, please choose");
    //If player 2 choose Rock
    $(document).on("click", "#player2Rock", function (event) {
        event.preventDefault();
        player2selection = $("#player2Rock").text();
        $("#RPSsectionPlayer2").empty();
        $("#player2Selection").html(player2selection);
        $("#player2Selection").addClass("Selection");
        dataRef.ref("/players/2").update({
            player2selection: player2selection,
        });
        dataRef.ref("/players/2").update({
            turnplayer2: 3,
        });
    });
    //If player 2 choose Paper
    $(document).on("click", "#player2Paper", function (event) {
        event.preventDefault();
        player2selection = $("#player2Paper").text();
        $("#RPSsectionPlayer2").empty();
        $("#player2Selection").html(player2selection);
        $("#player2Selection").addClass("Selection");
        dataRef.ref("/players/2").update({
            player2selection: player2selection,
        });
        dataRef.ref("/players/2").update({
            turnplayer2: 3,
        });
    });
    //If player 2 choose Scissors
    $(document).on("click", "#player2Scissors", function (event) {
        event.preventDefault();
        player2selection = $("#player2Scissors").text();
        $("#RPSsectionPlayer2").empty();
        $("#player2Selection").html(player2selection);
        $("#player2Selection").addClass("Selection");
        dataRef.ref("/players/2").update({
            player2selection: player2selection,
        });
        dataRef.ref("/players/2").update({
            turnplayer2: 3,
        });
    });

}


dataRef.ref("/players").on("child_changed", function (snapshot) {
    
    console.log("I move");
    var playerturn1 = snapshot.val().turnplayer1;
    var playerturn2 = snapshot.val().turnplayer2;
    console.log("Playerturn1: " + playerturn1);
    console.log("Playerturn2: " + playerturn2);
    console.log(playerturn1);
    if (playerturn1 === 1) {
        console.log("It is player 1 turn");
       dataRef.ref("/players/2").once("value",function(snapshot){
           player2name=snapshot.val().name;
           $("#player2Name").text(player2name);
       });
        player1Choose();
    }
    if (playerturn2 === 1) {
        console.log("It is player 2 turn");
        player2Choose();
    }
    if (playerturn2 === 3) {
        console.log("It is time to compare");

        dataRef.ref("/players/1").on("value", function (snapshot) {
            player1selection = snapshot.val().player1selection;
            console.log(player1selection);
        })
        dataRef.ref("/players/2").on("value", function (snapshot) {
            player2selection = snapshot.val().player2selection;
            console.log(player2selection);
        })

        $("#player2Selection").empty();
        $("#player2Selection").html(player2selection);
        $("#player2Selection").addClass("Selection");

        $("#player1Selection").empty();
        $("#player1Selection").html(player1selection);
        $("#player1Selection").addClass("Selection");

        RPS(player1selection,player2selection);
    
    }
});

//Function to compare the game
function RPS(player1selection,player2selection){
    if(player1selection==player2selection){
        console.log("It is a tie")
        $("#resultSection").text("Tie");
        $("#player1Score").text("Wins: " + player1wins + " Losses: " + player1losses);
        $("#player2Score").text("Wins: " + player2wins + " Losses: " + player2losses);
        setTimeout(function(){
            prepareFornewGameplayer1();
            prepareFornewGameplayer2();
        },5*1000);
    
    };
    if(player1selection=="Rock" & player2selection=="Paper"){
        console.log("Player 2 wins")
        $("#resultSection").text("Player 2 Win");
        player2wins++;
        player1losses++;
        $("#player1Score").text("Wins: " + player1wins + " Losses: " + player1losses);
        $("#player2Score").text("Wins: " + player2wins + " Losses: " + player2losses);
        setTimeout(function(){
            prepareFornewGameplayer1();
            prepareFornewGameplayer2();
        },5*1000);
        
    };
    if(player1selection=="Rock" & player2selection=="Scissors"){
        console.log("Player 1 wins")
        $("#resultSection").text("Player 1 Win");
        player1wins++;
        player2losses++;
        $("#player1Score").text("Wins: " + player1wins + " Losses: " + player1losses);
        $("#player2Score").text("Wins: " + player2wins + " Losses: " + player2losses);
        setTimeout(function(){
            prepareFornewGameplayer1();
            prepareFornewGameplayer2();
        },5*1000);
    };
    if(player1selection=="Paper" & player2selection=="Rock"){
        console.log("Player 1 wins")
        $("#resultSection").text("Player 1 Win");
        player1wins++;
        player2losses++;
        $("#player1Score").text("Wins: " + player1wins + " Losses: " + player1losses);
        $("#player2Score").text("Wins: " + player2wins + " Losses: " + player2losses);
        setTimeout(function(){
            prepareFornewGameplayer1();
            prepareFornewGameplayer2();
        },5*1000);
    
    };
    if(player1selection=="Paper" & player2selection=="Scissors"){
        console.log("Player 2 wins")
        $("#resultSection").text("Player 2 Win");
        player2wins++;
        player1losses++;
        $("#player1Score").text("Wins: " + player1wins + " Losses: " + player1losses);
        $("#player2Score").text("Wins: " + player2wins + " Losses: " + player2losses);
        setTimeout(function(){
            prepareFornewGameplayer1();
            prepareFornewGameplayer2();
        },5*1000);

    };
    if(player1selection=="Scissors" & player2selection=="Rock"){
        console.log("Player 2 wins")
        $("#resultSection").text("Player 2 Win");
        player2wins++;
        player1losses++;
        $("#player1Score").text("Wins: " + player1wins + " Losses: " + player1losses);
        $("#player2Score").text("Wins: " + player2wins + " Losses: " + player2losses);
        setTimeout(function(){
            prepareFornewGameplayer1();
            prepareFornewGameplayer2();
        },5*1000);
    };
    if(player1selection=="Scissors" & player2selection=="Paper"){
        console.log("Player 1 wins")
        $("#resultSection").text("Player 1 Win");
        player1wins++;
        player2losses++;
        $("#player1Score").text("Wins: " + player1wins + " Losses: " + player1losses);
        $("#player2Score").text("Wins: " + player2wins + " Losses: " + player2losses);
        setTimeout(function(){
            prepareFornewGameplayer1();
            prepareFornewGameplayer2();
        },5*1000);;
    };
};


function prepareFornewGameplayer1(){
    $("#resultSection").empty();
    $("#player1Selection").empty();
    $("#RPSsectionPlayer1").empty();
    $("#player2Selection").empty();
    $("#player1Selection").removeClass("Selection");
    player1Assign();
    dataRef.ref("/players/1").update({
        turnplayer1: 0,
        player1selection:"",
    });
    dataRef.ref("/players/2").update({
        turnplayer2:0,
        player2selection:"",
    })
    $(document).off("click", "#player1Rock")
    $(document).off("click", "#player1Paper")
    $(document).off("click", "#player1Scissors")
}

function prepareFornewGameplayer2(){
    $("#resultSection").empty();
    //$("#player1Selection").empty();
    $("#player2Selection").empty();
    $("#RPSsectionPlayer2").empty();
    $("#player2Selection").removeClass("Selection");
    player2Assign();
    dataRef.ref("/players/1").update({
        turnplayer1: 1,
    });
    $(document).off("click", "#player2Rock")
    $(document).off("click", "#player2Paper")
    $(document).off("click", "#player2Scissors")
}


function resetGame(){
    $("#resultSection").empty();
    $("#player1Selection").empty();
    $("#RPSsectionPlayer1").empty();
    $("#player2Selection").empty();
    $("#player1Selection").removeClass("Selection");
    player1Assign();
    dataRef.ref("/players/1").update({
        turnplayer1: 0,
        player1selection:"",
    });
  
    $(document).off("click", "#player1Rock")
    $(document).off("click", "#player1Paper")
    $(document).off("click", "#player1Scissors")
}


