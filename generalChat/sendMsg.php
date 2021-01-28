<?php

function sendMessage($x0,$x1,$x2) {
    global $conn;
    $sql = "INSERT INTO general_chat (msg_time, msg_uid, msg_message) VALUES (?, ?, ?)";
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt, $sql)) {
        exit();
    }
    // runs the prepared statement
    else {
        mysqli_stmt_bind_param($stmt, "sss", $x0, $x1, $x2);
        mysqli_stmt_execute($stmt);
        exit();
    }
}

 ?>
