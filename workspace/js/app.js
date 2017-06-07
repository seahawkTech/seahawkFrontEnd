//Initialize the select2 boxes
$(document).ready(function() {
    $(".filterSelect").select2();
});


//For converting the date data to readable format
function convertData(string) {
    var newDate = "";
    var dateArray = string.split('-');
    console.log(dateArray[1]);

    if (dateArray[1] == '01') {
        newDate = "January";
    } else if (dateArray[1] == '02') {
        newDate = "Febuary";
    } else if (dateArray[1] == '03') {
        newDate = "March";
    } else if (dateArray[1] == '04') {
        newDate = "April";
    } else if (dateArray[1] == '05') {
        newDate = "May";
    } else if (dateArray[1] == '06') {
        newDate = "June";
    }

    if (dateArray[1] == '07') {
        newDate = "July";
    }

    if (dateArray[1] == '08') {
        newDate = "August";
    }

    if (dateArray[1] == '09') {
        newDate = "September";
    }

    if (dateArray[1] == '10') {
        newDate = "October";
    }

    if (dateArray[1] == '11') {
        newDate = "November";
    }

    if (dateArray[1] == '12') {
        newDate = "December";
    }

    newDate = newDate + "." + dateArray[2] + "." + dateArray[0];

    return newDate;

}


//For creating the semCol element
function createSemCol(data, mainRow) {
    var semanticCol = $('<div></div>');
    semanticCol.attr('class', 'col-sm-1');
    semanticCol.addClass('semanticCol');
    var semanticTag = $('<div></div>');
    semanticTag.addClass('semanticTag');


    var icon = $('<i class="fa fa-2x" aria-hidden="true"></i>');
    icon.addClass(data.sentiment);
    semanticTag.append(icon);
    semanticCol.append(semanticTag);


    var dateTag = $('<div></div>');
    dateTag.addClass('dateTag')
    var date = $('<h1></h1>');
    date.addClass('date');
    date.text(convertData(data.dateTime));
    dateTag.append(date);

    semanticCol.append(dateTag);
    mainRow.append(semanticCol);
}

//For creating the contenetCol element

function createContentCol(data, mainRow) {
    var contentCol = $('<div></div>');
    contentCol.attr('class', 'col-sm-8');
    contentCol.addClass('contentCol');
    var contentTitle = $('<div></div>');
    contentTitle.addClass('contentTitle');

    var titleText = $('<h1></h1>');
    titleText.addClass('titleText');


    var titleURL = $('<a style = "color:black; text-decoration:none;"></a>');
    titleURL.attr('href', data.url);
    titleURL.text(data.title);
    titleURL.attr('target', '_blank');

    titleText.append(titleURL);

    //titleText.text(data.title);




    contentTitle.append(titleText);
    contentCol.append(contentTitle);

    var contentArea = $('<div></div>');
    contentArea.addClass('contentArea');

    var contentText = $('<h1></h1>');
    contentText.addClass('contentText');

    var content = data.content + data.description;
    contentText.text(content);

    var readMore = $('<p></p>');
    readMore.addClass('readMore');


    var readURL = $('<a></a>');
    readURL.attr('href', data.url);
    readURL.text("(Read More)");
    readURL.attr('target', '_blank');

    readMore.append(readURL);
    contentText.append(readMore);

    contentArea.append(contentText);
    contentCol.append(contentArea);

    mainRow.append(contentCol);
}


//For creating the keyCol element
function createKeyCol(data, mainRow) {
    var keyCol = $('<div></div>');
    keyCol.attr('class', 'col-sm-3');
    keyCol.addClass('keyCol');

    var keyTags = $('<div></div>');
    keyTags.addClass('keyTags');

    var locationTag = $('<div></div>');
    locationTag.addClass('locationTag');

    var locationText = $('<p></p>');
    locationText.addClass('locationText');

    if (data.location.length == 0) {
        locationText.text("Location Not Found");

    } else {
        locationText.text(data.location);

    }

    locationTag.append(locationText);
    keyCol.append(locationTag);

    var companyTag = $('<div></div>');
    companyTag.addClass('companyTag');

    var companyText = $('<p></p>');
    companyText.addClass('companyText');

    if (data.companyName.length == 0) {
        companyText.text("No Applicable Company");

    } else {
        companyText.text(data.companyName);
    }

    companyTag.append(companyText);
    keyCol.append(companyTag);

    var riskTag = $('<div></div>');
    riskTag.addClass('riskTag');

    var riskText = $('<p></p>');
    riskText.addClass('riskText');

    var riskValue = capWord(data.riskType);
    riskText.text(riskValue);

    riskTag.append(riskText);
    keyCol.append(riskTag);


    mainRow.append(keyCol);
}


//Takes in specfic url and then populates page via API calls
function populatePage(url) {
    var jsonMimeType = "application/json;charset=UTF-8";
    $.ajax({
        url: url,
        type: "GET",
        async: false,
        jsonpCallback: "jcall",
        contentType: "application/jsonp; charset=utf-8",

        dataType: "jsonp",
        crossDomain: true,
        success: function(result) {
            if (result == '') {
                $('#noResults').css('visibility', 'initial');
            }


            for (i = 0; i < 10; i++) {

                var resultID = result[i]._id;


                var row = $("<div class ='row'></div>");
                row.attr('id', resultID);

                createSemCol(result[i], row);
                createContentCol(result[i], row);
                createKeyCol(result[i], row);
                $('#resultsContain').append(row);
            }

        },
        error: function(jqXHR, exception, response) {
            var msg = '';
            console.log("bad");
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            $('#div1').html(msg);
        }

    });
}

//Function used to capitilize first letter
function capFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//Function used to capitilize first letter of each word
function capWord(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
}

//When the icon next to the search button is clicked, the results are found using the value in the search box
$('#searchButton').click(function() {
    showAll();
    $('#resultsContain').html("");
    var baseURL = "https://protected-sea-64327.herokuapp.com/auth/results/query?"

    var searchValue = $('#searchContain input').val();
    //searchValue = capFirst(searchValue);

    var textQuery = "text=" + searchValue + '&';

    baseURL += textQuery;

    populatePage(baseURL);

});



var plusClicked = false;
var minusClicked = false;
var neutralClicked = false;
var allClicked = false;

var semanticClicked = false;


//function used to show all results
function showAll() {
    $("#resultsContain .row").filter(function() {
        return $('i', this);
    }).show();

    $('#semanticFilter i').removeClass('white');
    $('#semanticFilter i').addClass('black');


    plusClicked = false;
    minusClicked = false;
    neutralClicked = false;
    allClicked = false;
}


//Function used to filter out all the positive results and shows 'no results found' if none found
$('#plusButton').click(function() {

    if ((!plusClicked) && (!minusClicked) && (!neutralClicked) && (!allClicked)) {
        $("#resultsContain .row").filter(function() {
            return (!$('i', this).hasClass('pos'));
        }).hide();

        $('#plusButton').removeClass('black');
        $('#plusButton').addClass('white');
        plusClicked = true;
        if ($('.pos').length == 0) {
            $('#noResults').css('visibility', 'initial');
        } else {
            $('#noResults').css('visibility', 'hidden');
        }
    } else if (plusClicked) {
        showAll();
    } else {
        showAll();
        $('#plusButton').click();
        if ($('.pos').length == 0) {
            $('#noResults').css('visibility', 'initial');
        } else {
            $('#noResults').css('visibility', 'hidden');
        }

    }

});


//Function used to filter out all the negative results and shows 'no results found' if none found
$('#minusButton').click(function() {

    if ((!minusClicked) && (!plusClicked) && (!neutralClicked) && (!allClicked)) {
        $("#resultsContain .row").filter(function() {
            return (!$('i', this).hasClass('neg'));
        }).hide();

        $('#minusButton').removeClass('black');
        $('#minusButton').addClass('white');
        minusClicked = true;
        if ($('.neg').length == 0) {
            $('#noResults').css('visibility', 'initial');
        } else {
            $('#noResults').css('visibility', 'hidden');
        }

    } else if (minusClicked) {

        showAll();
    } else {
        showAll();
        $('#minusButton').click();
        if ($('.neg').length == 0) {
            $('#noResults').css('visibility', 'initial');
        } else {
            $('#noResults').css('visibility', 'hidden');
        }

    }

});

//Function used to filter out all the neutral results and shows 'no results found' if none found
$('#neutralButton').click(function() {

    if ((!neutralClicked) && (!plusClicked) && (!minusClicked) && (!allClicked)) {
        $("#resultsContain .row").filter(function() {
            return (!$('i', this).hasClass('neutral'));
        }).hide();

        $('#neutralButton').removeClass('black');
        $('#neutralButton').addClass('white');
        neutralClicked = true;
        if ($('.neutral').length == 0) {
            $('#noResults').css('visibility', 'initial');
        } else {
            $('#noResults').css('visibility', 'hidden');
        }

    } else if (neutralClicked) {

        showAll();
    } else {
        showAll();
        $('#neutralButton').click();
        if ($('.neutral').length == 0) {
            $('#noResults').css('visibility', 'initial');
        } else {
            $('#noResults').css('visibility', 'hidden');
        }

    }

});


//Function to return all results
$('#allButton').click(function() {

    if ((!allClicked) && (!plusClicked) && (!minusClicked) && (!neutralClicked)) {
        $("#resultsContain .row").filter(function() {
            return $('i', this);
        }).show();

        $('#allButton').removeClass('black');
        $('#allButton').addClass('white');
        allClicked = true;

    } else if (allClicked) {

        showAll();
    } else {
        showAll();
        $('#allButton').click();


    }

});




//Takes the filters that were chosen and then gives results
$('#filterButton').click(function() {
    showAll();

    var baseURL = "https://protected-sea-64327.herokuapp.com/auth/results/query?"
    var dateQuery = "date=" + $('#dateFilter').val() + '&';
    var locationQuery = "location=" + $('#locationFilter').val() + '&';
    var companyQuery = "company=" + $('#companyFilter').val() + '&';
    var topicQuery = "topic=" + $('#topicFilter').val();
    baseURL += dateQuery + locationQuery + companyQuery + topicQuery;
    if (($('#dateFilter').val() == "") && ($('#locationFilter').val() == "") && ($('#companyFilter').val() == "") && ($('#topicFilter').val() == "")) {
        baseURL = "https://protected-sea-64327.herokuapp.com/auth/results";
    }
    $('#resultsContain').html("");
    populatePage(baseURL);


});