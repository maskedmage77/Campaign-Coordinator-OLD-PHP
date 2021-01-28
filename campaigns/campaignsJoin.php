<?php
    require '../includes/account.dbh.inc.php';
    session_start();

    $campaign_id = $_POST['campaign_id'];
    $campaign_password = $_POST['campaign_password'];



    $sql = "SELECT campaign_name, campaign_id, campaign_password FROM campaigns WHERE campaign_id = ? AND campaign_password = ?";
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt, $sql)) {
        exit();
    }
    // runs the prepared statement
    else {

        mysqli_stmt_bind_param($stmt, "is", $campaign_id, $campaign_password);
        mysqli_stmt_execute($stmt);

        $result = mysqli_stmt_get_result($stmt);

        $row = mysqli_fetch_array($result);

        if (($row['campaign_id'] == $campaign_id) && ($row['campaign_password'] == $campaign_password)) {
            echo "true";
            $_SESSION['campaign_id'] = $row['campaign_id'];
            $_SESSION['campaign_password'] = $row['campaign_password'];
        } else {
            echo "false";
        }
        $result -> free_result();
        $conn -> close();
    }
?>
