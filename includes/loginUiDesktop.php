<?php
    if (isset($_SESSION['userId'])) {
        echo '
            <p>You are logged in as: '.$_SESSION['userUid'].'</p>

        <form class="" action="includes\logout.inc.php" method="post">
            <button type="submit" name="logout-submit">Logout</button>
        </form>';
    }
    else {
        echo '
        <form action="includes\login.inc.php" method="post">
            <input type="text" name="mailuid" placeholder="Username/Email...">
            <input type="password" name="pwd" placeholder="Password">
            <button type="submit" name="login-submit">Login</button>
            <button class="" formaction="register.php">Register</button>
        </form>
        ';
    }
?>
