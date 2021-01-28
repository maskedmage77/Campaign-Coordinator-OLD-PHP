<?php
    if (isset($_SESSION['userId'])) {
        readfile("generalChat/generalChatUi.html");
        require 'includes/account.dbh.inc.php';
        
        }
    // this echo will ensure the chat box is scrolled to the bottom after the initial messages are loaded
    echo "
    <script>
    var objDiv = document.getElementById('general_chat_box');
    objDiv.scrollTop = objDiv.scrollHeight;
    </script>
    ";
?>
