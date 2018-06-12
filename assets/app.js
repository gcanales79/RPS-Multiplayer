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
var turnplayer1 = 1;
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


function player1Assign(player1wins, player1losses) {
    var rock1Div = $("<div>");
    rock1Div.text("Rock");
    var paper1Div = $("<div>");
    paper1Div.text("Paper");
    var scissors1Div = $("<div>");
    scissors1Div.text("Scissors");
    var score1Div = $("<div>");
    score1Div.text("Wins: " + player1wins + " Losses: " + player1losses);
    $("#player1Section").append(rock1Div);
    $("#player1Section").append(paper1Div);
    $("#player1Section").append(scissors1Div);
    $("#player1Section").append(score1Div);
}

function player2Assign(player2wins, player2losses) {
    var rock2Div = $("<div>");
    rock2Div.text("Rock");
    var paper2Div = $("<div>");
    paper2Div.text("Paper");
    var scissors2Div = $("<div>");
    scissors2Div.text("Scissors");
    var score2Div = $("<div>");
    score2Div.text("Wins: " + player2wins + " Losses: " + player2losses);
    $("#player2Section").append(rock2Div);
    $("#player2Section").append(paper2Div);
    $("#player2Section").append(scissors2Div);
    $("#player2Section").append(score2Div);
}



$("#startGame").on("click", function (event) {
    event.preventDefault();

    if (player1Exists == null) {
        //Add player 1 name
        console.log("Ponemos al jugador 1");
        player1name = $("#playerName").val().trim();

        dataRef.ref("/players/1").set({
            name: player1name,
            selection: player1selection,
            wins: player1wins,
            losses: player1losses,
            turn: turnplayer1,
        })
        $("#ShowplayerName").html("Hi " + player1name + " you are player 1");
        $("#player1Section").text(player1name);
        player1Assign(player1wins, player1losses);


        checkPlayer1.onDisconnect().remove();
    };
    if (player1Exists != null) {
        //Add player 2 name
        dataRef.ref("/players/1").on("value", function (snapshot) {
            player1name = snapshot.val().name
            console.log("El jugador 1 es: " + player1name);


            console.log("Ponemos el jugador 2");
            console.log("El jugador 1 es: " + player1name);
            player2name = $("#playerName").val().trim();
            $("#player1Section").text(player1name);

            dataRef.ref("/players/2").set({
                name: player2name,
                selection: player2selection,
                wins: player2wins,
                losses: player2losses,
                turn: turnplayer2,
            })
            $("#ShowplayerName").html("Hi " + player2name + " you are player 2");
            $("#player2Section").text(player2name);
            player2Assign(player2wins, player2losses);

        })
        checkPlayer2.onDisconnect().remove();

    }
})



