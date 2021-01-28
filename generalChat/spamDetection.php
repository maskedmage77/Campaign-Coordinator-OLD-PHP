<?php
// this file will detech spam in messages submitted
function spamCheck() {

    // this for loop will add a time for last 5 messages
    // this will be used to stop spamming
    for ($x = 0; $x <= 4; $x++) {
        if ($x == 4) {
            $_SESSION['msgTimes'][0] = microtime(true);
            break;
        } elseif ($_SESSION['msgTimes'][$x] >= $_SESSION['msgTimes'][$x + 1]) {
            $_SESSION['msgTimes'][$x + 1] = microtime(true);
            break;
        }
    }

    // these variables and the for loop will check if the last 5 messages are within 10 seconds
    // if the are it is considered spam and will exit after sending a spam warning
    $currentTime = microtime(true);
    $i = 0;
    for ($x = 0; $x <= 4; $x++) {
        if ($_SESSION['msgTimes'][$x] + 10 > $currentTime) {
            $i += 1;
        }
    }
    if ($i == 5) {
        echo "spam warning".$i;
        exit();
    }
}
?>
