
<?php
    require '../includes/account.dbh.inc.php';
    session_start();
    require '../generalChat/spamDetection.php';

    spamCheck();

    require '../generalChat/chatPlugins.php';

    // if the message is not spam it will be added to the database
    $msg_message = strip_tags($_POST['msg']);
    $msg_time = microtime(true);
    $msg_uid = $_SESSION['userUid'];

    if ($msg_message[0] == "!") {
        chatCommand($msg_message);
    } else {
        sendMessage($msg_time,$msg_uid,$msg_message);
    }
?>
