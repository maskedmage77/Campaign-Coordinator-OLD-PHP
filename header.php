<?php
    session_start();
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <meta charset="utf-8">
        <meta name="description" content="This is an example of what the description should be.">
        <title>Maskelyne.net</title>
        <link rel="stylesheet" href="css\general.css">
        <link rel="shortcut icon" href="images\new symbol icon.ico" />
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="HandheldFriendly" content="true">

        <!-- this code will get jquery from google server -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

    </head>
    <body>
        <!-- hamburger Navigation Menu -->
        <div class="hamburgerNav">
            <a href="index.php" class="active">Maskelyne.net</a>
            <?php
                require 'includes/loginUiMobile.php';
            ?>
            <div id="links">
                <a href="campaigns.php">Campaigns</a>
                <a href="#">Characters</a>
                <a href="spells.php">Spells</a>
            </div>

            <a class="hamburgerNav-Button" onclick="openNav()">
                <img src="images/hamburger.png" />
            </a>

        </div>
        <!-- script for the hamburger menu button -->
        <script>
        function openNav() {
          var x = document.getElementById("links");
          if (x.style.display === "block") {
            x.style.display = "none";
          } else {
            x.style.display = "block";
          }
        }
        </script>

        <!-- regular navigation menu -->
        <div class="grid-container">
            <div class="grid-container-navigation">
                <div class="grid-navigation">
                    <nav>
                        <a href="index.php">Maskelyne.net</a>
                        <a href="campaigns.php">Campaigns</a>
                        <a href="#">Characters</a>
                        <a href="spells.php">Spells</a>
                    </nav>
                </div>
                <div class="grid-account">
                    <?php
                        require 'includes/loginUiDesktop.php';
                    ?>
                </div>
            </div>
