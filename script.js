function saveLocalStorag(hold_info) {
    let value = localStorage.getItem(hold_info);
    if (value) {
        $(`#text${hold_info}`).text(value);
    }
  }
  
  
  
  
  $( document ).ready(function() {
    $("#currentDay").text(moment().format("dddd, MMMM Do"));
    $("#currentDay").css("text-decoration", "underline");
    for (let i = 9; i < 18; i++) {
    
        // create a row
        var row = $(`<div data-time=${i} id='${i}' class="row">`);
  
        // create a column  hour
        var col1 = $('<div class="col-sm-2"> <p class="hour">' + timeAmPm(i) + '</p>');
  
        //create column with  event info
        var col2 = $(`<div class="col-sm-8 past"><textarea id=text${i} class="event" placeholder="Add your event here..."></textarea>`);        
       
        //create column to use save button
        var col3 = $(`<div class="col-sm-2"><button class="saveButton" id=${i}><i class="fas fa-save"></i></button>`)
  
        row.append(col1);
        row.append(col2);
        row.append(col3);
  
       
        $(".container").append(row);
  
        saveLocalStorag(i);
    }
  
    function timeAmPm(hours) {
        var timeAmPm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        return hours + timeAmPm;
    }
  timeAmPm();
  
  // function to change event block color for past present and future
  function  changeColors(){
    var currentDate = new Date().getHours();
    for (var i = 9; i < 18; i++) { 
     if ($(`#${i}`).data("time") == currentDate){
        $(`#text${i}`).addClass( "present");
    } else if (currentDate < $(`#${i}`).data("time")) {
        $(`#text${i}`).addClass( "future");
    }
  }
  }
  
  setInterval(function() {
     changeColors();
  }, 1000);
  
  var saveButton = $('.saveButton');
  saveButton.on('click', function(){
    let taskId= $(this).attr('id');
    let taskText = $(this).parent().siblings().children('.event').val();
    localStorage.setItem(taskId, taskText);
  });
  });
    