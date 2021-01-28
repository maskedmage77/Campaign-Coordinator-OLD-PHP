<?php
    session_start();
    require '../includes/account.dbh.inc.php';
    // Create a template
    $user = $_SESSION['userId'];
    $sql = "SELECT
        campaigns.campaign_id,
        campaigns.campaign_author,
        campaigns.campaign_name,
        campaigns.campaign_description,
        users.user_uid,
        campaigns_players.player_role,
        campaigns_players.character_id,
        characters.character_name
        FROM campaigns
        LEFT JOIN campaigns_players ON campaigns.campaign_id=campaigns_players.campaign_id
        LEFT JOIN users ON campaigns.campaign_author=users.user_id
        LEFT JOIN characters ON campaigns_players.character_id=characters.character_id
        WHERE campaigns_players.user_id = ".$user." ORDER BY campaign_name;";
    $stmt = mysqli_stmt_init($conn);
    mysqli_stmt_prepare($stmt, $sql);
    //mysqli_stmt_bind_param($stmt, "i", //put spell level here);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    while($row = mysqli_fetch_array($result)) {
        // this should take the msg_message and add extra slashes so it prints correctly
        echo $row['campaign_id']."|||".$row['campaign_author']."|||".$row['campaign_name']."|||".$row['campaign_description']."|||".$row['user_uid']."|||".$row['player_role']."|||".$row['character_id']."|||".$row['character_name']."|||";
    }
    $result -> free_result();
    $conn -> close();
?>
