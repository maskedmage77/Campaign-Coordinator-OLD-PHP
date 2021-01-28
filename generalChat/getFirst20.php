<?php
require '../includes/account.dbh.inc.php';

$sql = "SELECT msg_uid, msg_message, msg_time FROM general_chat ORDER BY msg_time DESC LIMIT 20;";
$result = $conn->query($sql);
while($row = mysqli_fetch_array($result)) {

    // this should take the msg_message and add extra slashes so it prints correctly
    // $msg = addcslashes($row['msg_message'], '\\');
    $msg = $row['msg_message'];

    echo $row['msg_time'].'|||'.$row['msg_uid'].'|||'.$row['msg_message']."|||";
}
$result -> free_result();
$conn -> close();
?>
