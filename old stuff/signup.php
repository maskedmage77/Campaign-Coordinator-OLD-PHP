<?php
    require "header.php";
 ?>

<main>

    <?php
        if (isset($_GET['error'])) {
            if ($_GET['error'] == "emptyfields") {
                echo '<p>Fill in all fields!</p>';
            }
            elseif ($_GET['error'] == "invaliduid") {
                echo '<p>Invalid password!</p>';
            }
            elseif ($_GET['error'] == "invaliduidmail") {
                echo '<p>Try another username and email!</p>';
            }
            elseif ($_GET['error'] == "invalidmail") {
                echo '<p>Invalid email!</p>';
            }
            elseif ($_GET['error'] == "passwordcheck") {
                echo '<p>Your passwords do not match!</p>';
            }
            elseif ($_GET['error'] == "usertaken") {
                echo '<p>Signup successful!</p>';
            }
            elseif ($_GET['signup'] == "success") {
                echo '<p>Username is already taken!</p>';
            }
        }

     ?>
    <form class="registerform" action="includes\signup.inc.php" method="post">
        <input type="text" name="uid" placeholder="Username">
        <input type="text" name="mail" placeholder="E-mail">
        <input type="password" name="pwd" placeholder="Password">
        <input type="password" name="pwd-repeat" placeholder="Repeat password">
        <button type="submit" name="signup-submit">Register</button>
    </form>
</main>

 <?php
    require "footer.php";
  ?>
