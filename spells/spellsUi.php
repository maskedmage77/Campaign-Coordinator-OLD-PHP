<?php
if (isset($_SESSION['userId'])) {
    readfile("spells/spellsUi.html");
    readfile("spells/spellsUiCreate.html");

} else {
    readfile("spells/spellsUi.html");
    readfile("spells/spellsUiCreate.html");
}
?>
