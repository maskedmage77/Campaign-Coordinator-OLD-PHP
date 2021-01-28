<?php
    require "header.php";
 ?>
 <!-- Div for campaigns -->
<?php
    if (isset($_SESSION['userId'])) {
        if (isset($_SESSION['campaignId'])) {
            require "campaigns/gameUi.php";
        }
        else {
            require "campaigns/menuUi.php";
        }
    }
    else {
        require "campaigns/blankUi.php";
    }
?>
<?php
    require "footer.php";
?>
