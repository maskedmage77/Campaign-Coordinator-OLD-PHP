<?php
    if (isset($_SESSION['userId'])) {
        echo '
        <form class="login-form-mobile" action="includes\logout.inc.php" method="post">
            <input class="signOut-Button" type="image" src="images/signOut2.png" alt="Submit Form" />
        </form>
        <p class="login-message">'.$_SESSION['userUid'].'</p>';
    }
    else {
        echo '
        <script>
            function showSignin() {
                var x = document.getElementsByClassName("grid-account");
                if (x[0].style.display == "block") {
                    x[0].style.display = "none";
                } else {
                    x[0].style.display = "block";
                }

            }
        </script>
            <p class="login-message">Sign In / Register</p>
            <img class="signOut-Button" src="images/signin.png" alt="Submit Form" onclick="showSignin()" />
        ';
    }
?>
