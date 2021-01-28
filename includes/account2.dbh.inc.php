<?php

$servername = "localhost";

$dBUsername = "maskedmage77";
//phpmyadmin
$dBPassword = "tester77";
//tester77
$dBName = "website";

$conn = mysqli_connect($servername, $dBUsername, $dBPassword, $dBName);

if (!$conn) {
    die("Connection failed: ".mysqli_connection_error());
}
