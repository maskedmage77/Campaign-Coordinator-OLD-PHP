<?php

$servername = "localhost";

$dBUsername = "root";
//phpmyadmin
$dBPassword = "";
//tester77
$dBName = "website";

$conn = mysqli_connect($servername, $dBUsername, $dBPassword, $dBName);

if (!$conn) {
    echo "fail";
    die("Connection failed: ".mysqli_connection_error());
}
