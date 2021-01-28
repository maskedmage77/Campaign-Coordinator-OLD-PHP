<?php
require '../generalChat/sendMsg.php';


function chatCommand($message) {
    global $msg_time;
    global $msg_uid;
    $command = explode(" ", $message);
    if (strpos($command[0], '!roll') !== false) {
        $roll = preg_split("/[Dd]/", $command[1]);
        $addon = 0;
        $total = 0;
        if (count($command) == 4) {
            if ($command[2] == "-") {$addon = $command[3] * -1; $addonMsg = "With an additional <b>".$addon."</b> subtracted.";}
            if ($command[2] == "+") {$addon = $command[3]; $addonMsg = "With an additional <b>".$addon."</b> added.";}
        }
        $total = $total + $addon;
        if ($roll[0] == "" || $roll[0] == "1") {
            $total += rand(1,$roll[1]);

            $msg_message = '<span class="roll">Has rolled a <b>'.$roll[1].'</b> sided dice. '.$addonMsg.' The roll was: <br /><h1>'.$total.'</h1></span>';
        } else {
            for ($x = 1; $x <= $roll[0]; $x+=1) {
                $total += rand(1,$roll[1]);
            }
            $msg_message = '<span class="roll">Has rolled <b>'.$roll[0]."</b> dice with <b>".$roll[1].'</b> sided. '.$addonMsg.' The roll was: <br /><h1>'.$total.'</h1></span>';
        }
        sendMessage($msg_time,$msg_uid,$msg_message);
    }
}
?>
