<?php
    session_start();
    require '../includes/account.dbh.inc.php';
    $character_race = $_POST["character_race"];
    $sql = "SELECT
        races.race_str_bonus,
        races.race_dex_bonus,
        races.race_con_bonus,
        races.race_int_bonus,
        races.race_wis_bonus,
        races.race_cha_bonus,
        races.race_additional_bonus
        FROM races
        WHERE races.race_id = ".$character_race.";";
    $stmt = mysqli_stmt_init($conn);
    mysqli_stmt_prepare($stmt, $sql);
    //mysqli_stmt_bind_param($stmt, "i", //put spell level here);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    while($row = mysqli_fetch_array($result)) {
        // this should take the msg_message and add extra slashes so it prints correctly
        echo $row['race_str_bonus']."|||".$row['race_dex_bonus']."|||".$row['race_con_bonus']."|||".$row['race_int_bonus']."|||".$row['race_wis_bonus']."|||".$row['race_cha_bonus']."|||".$row['race_additional_bonus']."|||";
    }
    $result -> free_result();
    $conn -> close();
?>
