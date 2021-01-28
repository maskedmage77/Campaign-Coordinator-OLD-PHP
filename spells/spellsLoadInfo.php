<?php
    require '../includes/account.dbh.inc.php';

    session_start();

    $spell_id = $_POST['spell_id'];
    $_SESSION['spell_id'] = $spell_id;
    // Create a template
    $sql = "SELECT spell_id, spell_name, spell_level, spell_school, spell_ritual, spell_time, spell_range, spell_components, spell_duration, spell_description, spell_source, spell_author FROM spells WHERE spell_id = ? LIMIT 1";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $spell_id);
    $stmt->execute();
    $result = mysqli_stmt_get_result($stmt);
    while($row = mysqli_fetch_array($result)) {
        echo $row['spell_id']."|||"
        .$row['spell_name']."|||"
        .$row['spell_level']."|||"
        .$row['spell_school']."|||"
        .$row['spell_ritual']."|||"
        .$row['spell_time']."|||"
        .$row['spell_range']."|||"
        .$row['spell_components']."|||"
        .$row['spell_duration']."|||"
        .$row['spell_description']."|||"
        .$row['spell_source']."|||"
        .$row['spell_author']."|||";
    }
    $stmt -> free_result();

    $sql2 = "SELECT spell_id, bard, cleric, druid, paladin, ranger, sorcerer, warlock, wizard FROM spells_class WHERE spell_id = ? LIMIT 1";
    $stmt2 = $conn->prepare($sql2);
    $stmt2->bind_param("i", $spell_id);
    $stmt2->execute();
    $result = mysqli_stmt_get_result($stmt2);
    while($row = mysqli_fetch_array($result)) {
        if ($row['bard'] == 1) {echo "bard|||";}
        if ($row['cleric'] == 1) {echo "cleric|||";}
        if ($row['druid'] == 1) {echo "druid|||";}
        if ($row['paladin'] == 1) {echo "paladin|||";}
        if ($row['ranger'] == 1) {echo "ranger|||";}
        if ($row['sorcerer'] == 1) {echo "sorcerer|||";}
        if ($row['warlock'] == 1) {echo "warlock|||";}
        if ($row['wizard'] == 1) {echo "wizard|||";}
    }

    $stmt -> free_result();
    $conn -> close();
?>
