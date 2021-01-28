<?php
    require '../includes/account.dbh.inc.php';
    session_start();

    $spell_id = $_SESSION['spell_id'];
    $spell_author = $_SESSION['userId'];
    $spell_name = $_POST['spell_name'];
    $spell_school = $_POST['spell_school'];
    $spell_ritual = $_POST['spell_ritual'];
    $spell_level = $_POST['spell_level'];
    $spell_time = $_POST['spell_time'];
    $spell_range = $_POST['spell_range'];
    $spell_components = $_POST['spell_components'];
    $spell_duration = $_POST['spell_duration'];
    $spell_description = strip_tags($_POST['spell_description']);
    $spell_source = $_POST['spell_source'];
    $spell_classes = $_POST['spell_classes'];

    $bard = in_array("bard", $spell_classes);
    $cleric = in_array("cleric", $spell_classes);
    $druid = in_array("druid", $spell_classes);
    $paladin = in_array("paladin", $spell_classes);
    $ranger = in_array("ranger", $spell_classes);
    $sorcerer = in_array("sorcerer", $spell_classes);
    $warlock = in_array("warlock", $spell_classes);
    $wizard =  in_array("wizard", $spell_classes);

    $sql = "UPDATE spells SET spell_author=?, spell_name=?, spell_school=?, spell_ritual=?, spell_level=?, spell_time=?, spell_range=?, spell_components=?, spell_duration=?, spell_description=?, spell_source=? WHERE spell_id = ?";
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt, $sql)) {
        exit();
    }
    // runs the prepared statement
    else {
        mysqli_stmt_bind_param($stmt, "issiissssssi", $spell_author, $spell_name, $spell_school, $spell_ritual, $spell_level, $spell_time, $spell_range, $spell_components, $spell_duration, $spell_description, $spell_source, $spell_id);
        mysqli_stmt_execute($stmt);
        //this will now add the spells classes to the database
        $sql1 = "UPDATE spells_class SET bard=?, cleric=?, druid=?, paladin=?, ranger=?, sorcerer=?, warlock=?, wizard=? WHERE spell_id = ?";
        $stmt2 = mysqli_stmt_init($conn);
        if (!mysqli_stmt_prepare($stmt2, $sql1)) {
            exit();
        }
        // runs the prepared statement
        else {
            mysqli_stmt_bind_param($stmt2, "iiiiiiiii", $bard, $cleric, $druid, $paladin, $ranger, $sorcerer, $warlock, $wizard, $spell_id);
            mysqli_stmt_execute($stmt2);
            exit();
        }

    }
?>
