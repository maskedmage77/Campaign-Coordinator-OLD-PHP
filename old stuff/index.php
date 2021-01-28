<?php
    require "header.php";
    require 'includes\loginui.inc.php';

 ?>


     <?php
        if (isset($_SESSION['userId'])) {
            echo '<p>You are logged in as: '.$_SESSION['userUid'].'</p>';
        }
        else {
            echo '<p>You are logged out!</p>';
        }
      ?>
  </div>


 <?php
    require "footer.php";
  ?>
