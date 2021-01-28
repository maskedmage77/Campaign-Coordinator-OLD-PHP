<?php
echo'test';
if (isset($_POST['login-submit'])) {

    require 'account.dbh.inc.php';
    echo'test1';
    $mailuid = $_POST['mailuid'];
    $password = $_POST['pwd'];

    // checks if the username and password box are not empty
    if (empty($mailuid) || empty($password)) {
        header("Location: ../index.php?error=emptyfields");
        exit();
    }
    else {
        $sql = "SELECT * FROM users WHERE user_uid=? Or user_email=?;";
        $stmt = mysqli_stmt_init($conn);
        if (!mysqli_stmt_prepare($stmt, $sql)) {
            header("Location: ../index.php?error=sqlerror");
            exit();
        }
        else {
            mysqli_stmt_bind_param($stmt, "ss", $mailuid, $mailuid);
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);
            if ($row = mysqli_fetch_assoc($result)) {
                $pwdCheck = password_verify($password, $row['user_pwd']);
                if ($pwdCheck == false) {
                    header("Location: ../index.php?error=wrongpwd");
                    exit();
                }
                elseif ($pwdCheck == true) {
                    session_start();
                    $_SESSION[userId] = $row['user_id'];
                    $_SESSION[userUid] = $row['user_uid'];
                    $_SESSION["msgTimes"] = array(0, 0, 0, 0, 0);

                    header("Location: ../index.php?login=success");
                    exit();
                }
                else {
                    header("Location: ../index.php?error=wrongpwd");
                    exit();
                }
            }
            else {
                header("Location: ../index.php?error=nouser");
                exit();
            }
        }
    }
}

else {
        header("Location: ../index.php");
        exit();
}
