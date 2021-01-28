var lastMsgRecievedTime = 0;
var firstMsgRecievedTime = 0;

// this will get the time of the most recent message when the page loads
$.ajax({
    url:'generalChat/checkmsglatest.inc.php',
    async: false,
    success: function(data) {
    lastMsgRecievedTime = data;
  }
});

// this will get the time of the most first message the page loaded
$.ajax({
    url:'generalChat/checkmsgfirstrecieved.inc.php',
    async: false,
    success: function(data) {
    firstMsgRecievedTime = data;
  }
});


// this will repeat every second to update messages
setInterval(function()
{
    var moreMsgs = 1;
    // this will ask for info about the general_chat_box div
    var objDiv = document.getElementById("general_chat_box");

    // this if statement will insert old messages at the top
    if ($(objDiv).scrollTop() == 0) {

        //this for loop will add 5 older messages at the top
        for (i = 0; i < 5; i++) {
        $.ajax({
            url:'generalChat/checkmsgold.inc.php',
            type: "POST",
            data: {firstMsgRecievedTime: firstMsgRecievedTime},
            async: false,
            success: function(data) {
                //inserting older message
                var data = data.split('|||');
                var node = document.createElement("P");
                node.innerHTML = "<span class=\"msgUsername\">" + data[1] + "</span>: <span class=\"msgText\">" + data[2] + "</span>";
                var msgs = document.getElementById("general_chat_box");
                msgs.insertBefore(node, msgs.childNodes[0]);
                firstMsgRecievedTime = data[0];
          }});
      }
    }
    // create scrollbottom height
    var scrollBottom = $(objDiv).scrollTop() + $(objDiv).height();
    var scrollBottomBefore = scrollBottom;
    // creating some variables to compare after adding the new message
    var HeightBefore = objDiv.scrollHeight;

    // this is a check for new messages
    do {
        $.ajax({
            url:'generalChat/checkmsg.inc.php',
            type: "POST",
            data: {lastMsgRecievedTime: lastMsgRecievedTime},
            async: false,
            success: function(data) {

                // this if statement will insert new messages at the bottom that are missing
                if (data != 0) {
                    //inserting new message
                    var data = data.split('|||');
                    var node = document.createElement("P");
                    node.innerHTML = "<span class=\"msgUsername\">" + data[1] + "</span>: <span class=\"msgText\">" + data[2] + "</span>";
                    var msgs = document.getElementById("general_chat_box");
                    msgs.appendChild(node, msgs.childNodes[0]);
                    lastMsgRecievedTime = data[0];
                }
                moreMsgs = data;
          }});

    } while (moreMsgs != 0);

    // this will keep it scrolled to the bottom only if its already at the bottom
    // if the user has scrolled up to view old messages it wont force them down
    if (HeightBefore == scrollBottomBefore) {
        objDiv.scrollTop = objDiv.scrollHeight;
    }

}, 1000); //10000 milliseconds = 10 seconds
