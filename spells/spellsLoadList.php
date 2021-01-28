<?php
    $function = $_POST["function"];

    if ($function == 0) {loadAll();}
    if ($function == 1) {loadFilteredLevel($_POST["level"]);}
    if ($function == 2) {loadFilteredLevelSchool($_POST["level"],$_POST["school"]);}
    function loadAll() {
        require '../includes/account.dbh.inc.php';
        // Create a template
        $sql = "SELECT spell_id, spell_name, spell_level, spell_school, spell_time FROM spells ORDER BY spell_name;";
        $stmt = mysqli_stmt_init($conn);
        mysqli_stmt_prepare($stmt, $sql);
        //mysqli_stmt_bind_param($stmt, "i", //put spell level here);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        while($row = mysqli_fetch_array($result)) {
            // this should take the msg_message and add extra slashes so it prints correctly
            echo $row['spell_id']."|||".$row['spell_name']."|||".$row['spell_level']."|||".$row['spell_school']."|||".$row['spell_time']."|||";
        }
        $result -> free_result();
        $conn -> close();
    }

    function loadFilteredLevel($levels) {
        require '../includes/account.dbh.inc.php';
        $in = str_repeat('?,', count($levels) - 1). '?';
        $sql = "SELECT spell_id, spell_name, spell_level, spell_school, spell_time FROM spells WHERE spell_level in ($in) ORDER BY spell_name;";
        $stmt = $conn->prepare($sql);
        $types = str_repeat('s', count($levels));
        $stmt->bind_param($types, ...$levels);
        mysqli_stmt_execute($stmt);
        $result = $stmt->get_result();
        while($row = mysqli_fetch_array($result)) {
            echo $row['spell_id']."|||".$row['spell_name']."|||".$row['spell_level']."|||".$row['spell_school']."|||".$row['spell_time']."|||";
        }
        $result -> free_result();
        $conn -> close();
    }

    function loadFilteredLevelSchool($levels,$schools) {
        require '../includes/account.dbh.inc.php';
        $in = str_repeat('?,', count($levels) - 1). '?';
        $in2 = str_repeat('?,', count($schools) - 1). '?';
        $sql = "SELECT spell_id, spell_name, spell_level, spell_school, spell_time FROM spells WHERE spell_level in ($in) AND spell_school in ($in2) ORDER BY spell_name;";
        $stmt = $conn->prepare($sql);
        $types = str_repeat('s', count($levels)).str_repeat('s', count($schools));
        $combined = array_merge($levels, $schools);
        $stmt->bind_param($types, ...$combined);
        mysqli_stmt_execute($stmt);
        $result = $stmt->get_result();
        while($row = mysqli_fetch_array($result)) {
            echo $row['spell_id']."|||".$row['spell_name']."|||".$row['spell_level']."|||".$row['spell_school']."|||".$row['spell_time']."|||";
        }
        $result -> free_result();
        $conn -> close();
    }
?>
