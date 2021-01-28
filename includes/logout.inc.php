<?php
session_start();

//deletes all the session variables
session_unset();

session_destroy();

header("Location: ../index.php")
?>
