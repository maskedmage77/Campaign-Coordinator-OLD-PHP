<?php
    require '../includes/account.dbh.inc.php';

    $test = $_POST["firstMsgRecievedTime"];

    // Create a template
    $sql = "SELECT msg_uid, msg_message, msg_time FROM general_chat WHERE msg_time < ? ORDER BY msg_time DESC LIMIT 1";
    // Create a prepared statement
    $stmt = mysqli_stmt_init($conn);
    // prepare the prepared PDOStatement
    mysqli_stmt_prepare($stmt, $sql);
    // bind the parameters to the placeholder
    mysqli_stmt_bind_param($stmt, "s", $test);
    // Run parameters inside database
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    while ($row = mysqli_fetch_assoc($result)) {
        echo $row['msg_time'].'|||'.$row['msg_uid'].'|||'.$row['msg_message']."|||";
    }
?>
