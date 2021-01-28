$.ajax({
    url:'generalChat/getFirst20.php',
    async: false,
    success: function(data) {
        //inserting new message
        var data = data.split('|||');
        var i = 0;
        while (i <= 57) {
            var node = document.createElement("P");
            node.innerHTML = "<span class=\"msgUsername\">" + data[i + 1] + "</span>: <span class=\"msgText\">" + data[i + 2] + "</span>";
            var msgs = document.getElementById("general_chat_box");
            msgs.insertBefore(node, msgs.childNodes[0]);
            lastMsgRecievedTime = data[0];
            i = i + 3;
        }
  }});
