<?php

// This file should return the time of the most recent message sent to the database

    require '../includes/account.dbh.inc.php';
    $sql = "SELECT msg_time FROM general_chat ORDER BY msg_time DESC LIMIT 1;";
    $result = $conn->query($sql);
    $row = mysqli_fetch_array($result);
    echo $row['msg_time'];
?>
