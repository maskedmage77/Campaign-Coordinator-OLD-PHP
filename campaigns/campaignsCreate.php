<?php
    require '../includes/account.dbh.inc.php';
    session_start();

    $campaign_author = $_SESSION['userId'];
    $campaign_name = $_POST['campaign_name'];
    $campaign_password = $_POST['campaign_password'];
    $campaign_description = strip_tags($_POST['campaign_description']);


    $sql = "INSERT INTO campaigns (campaign_author, campaign_name, campaign_password, campaign_description) VALUES (?, ?, ?, ?)";
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt, $sql)) {
        exit();
    }
    // runs the prepared statement
    else {

        mysqli_stmt_bind_param($stmt, "isss", $campaign_author, $campaign_name, $campaign_password, $campaign_description);
        mysqli_stmt_execute($stmt);

        $campaign_id =  $conn -> insert_id;

        $sql = "INSERT INTO campaigns_players (user_id, campaign_id, player_role) VALUES (?, ?, ?)";
        $stmt = mysqli_stmt_init($conn);
        if (!mysqli_stmt_prepare($stmt, $sql)) {
            exit();
        }
        else {
            $player_role = 0;
            mysqli_stmt_bind_param($stmt, "iii", $campaign_author, $campaign_id, $player_role);
            mysqli_stmt_execute($stmt);

        }
    }
?>
