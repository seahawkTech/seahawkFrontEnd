//Function used to make login box appear
var login = function() {

    $('#overlay').css('visibility', 'initial');
    $("#overlay").animate({
        opacity: .8
    }, "fast");
    $('#loginScreen').css('visibility', 'initial');

}

//Turns the screen black
$(document).ready(function() {
    $("#overlay").click(function() {

        $("#overlay").animate({
            opacity: 0
        }, "slow");
        $('#overlay').css('visibility', 'hidden');
        $('#loginScreen').css('visibility', 'hidden');
    });
});


//Check if the log in box is empty

function empty( user, password) {
    if ( (!user.replace(/^\s+/g, '').length) || (!password.replace(/^\s+/g, '').length)) {
        return true;
    } else {
        return false;
    }
}


//Triggers the validation 
function validate() {
   
    var user = $("#userInput").val();
    var password = $("#passwordInput").val();



    if (empty( user, password)) {
        alert("Please enter a value in all fields");
    } else {
        alert("Hooray!");
    }

}