var button1 = document.getElementById("button1");
var button2 = document.getElementById("button2");
var sort = 1;
button1.innerHTML = "Filters";
button2.innerHTML = "Create Spell";

button1.setAttribute("onClick", "toggleSpellFilters()");
button2.setAttribute("onClick", "toggleSpellsCreateUi()");

// Load list
// first argument - function to run
// second argument - level to show

loadList();

function loadList(x,y){
    $("#tbody_spell_table tr:not(:first)").remove();
    if (arguments.length == 0) {
        $.ajax({
            url:'spells/spellsLoadList.php',
            async: false,
            type: "POST",
            data: {function: 0},
            success: function(data) {
                //inserting older message
                //var data = data.split(': ');
                //var node = document.createElement("TR");
                //node.innerHTML = data;
                var data = data.split('|||');
                var spell_table = document.getElementById("tbody_spell_table");
                var x = 0;

                while (data[x] != 0) {
                    tbody_spell_table.innerHTML += '<tr id="' + data[x] + '" class="spell_row"><td>' + data[x + 1] + '</td><td>' + data[x + 2] + '</td><td>' + data[x+ 3] + '</td><td>' + data[x + 4] + '</td></tr>';
                    x += 5;
                }

          }});
    }
    if (arguments.length == 1) {
        $.ajax({
            url:'spells/spellsLoadList.php',
            async: false,
            type: "POST",
            data: {function: 1,level: x},
            success: function(data) {
                //inserting older message
                //var data = data.split(': ');
                //var node = document.createElement("TR");
                //node.innerHTML = data;
                var data = data.split('|||');
                var spell_table = document.getElementById("tbody_spell_table");
                var x = 0;

                while (data[x] != 0) {
                    tbody_spell_table.innerHTML += '<tr id="' + data[x] + '" class="spell_row"><td>' + data[x + 1] + '</td><td>' + data[x + 2] + '</td><td>' + data[x+ 3] + '</td><td>' + data[x + 4] + '</td></tr>';
                    x += 5;
                }

          }});
    }
    if (arguments.length == 2) {
        $.ajax({
            url:'spells/spellsLoadList.php',
            async: false,
            type: "POST",
            data: {function: 2,level: x,school: y},
            success: function(data) {
                //inserting older message
                //var data = data.split(': ');
                //var node = document.createElement("TR");
                //node.innerHTML = data;
                var data = data.split('|||');
                var spell_table = document.getElementById("tbody_spell_table");
                var x = 0;
                while (data[x] != 0) {
                    tbody_spell_table.innerHTML += '<tr id="' + data[x] + '" class="spell_row"><td>' + data[x + 1] + '</td><td>' + data[x + 2] + '</td><td>' + data[x+ 3] + '</td><td>' + data[x + 4] + '</td></tr>';
                    x += 5;
                }
          }});
    }
}

function toggleSpellsCreateUi() {
    var x = document.getElementById("grid-item-spells-create");
    var y = document.getElementById("grid-item-spells");
    if (x.style.display == "none") {
      x.style.display = "block";
      y.style.display = "none";
    } else {
      x.style.display = "none";
      y.style.display = "block";
      document.getElementById("spell-create-button").innerHTML = "Create Spell";
      document.getElementById("spellsCreate").setAttribute("action", "spells/spellsCreate.php");
      document.getElementById("spellsCreate").reset();
    }
}

// This will toggle the spell info box
function toggleSpellInfo() {
    var x = document.getElementById("spell_info");
    if (x.style.display == "block") {
        x.style.display = "none";
        button1.innerHTML = "Filters";
        button1.classList.remove("button-red");
        button1.setAttribute("onClick", "toggleSpellFilters()");
        button2.innerHTML = "Create Spell";
        button2.classList.remove("button-green");
        button2.setAttribute("onClick", "toggleSpellsCreateUi()");
    }
}

// This will toggle the spell filter box
function toggleSpellFilters() {
    var x = document.getElementById("spell_filter");
    if (x.style.display == "none") {
        x.style.display = "block";
        button1.innerHTML = "Back";
        button2.innerHTML = "Apply Filter";
        button1.classList.add("button-red");
        button2.classList.add("button-green");
        button2.setAttribute("onClick", "ApplyFilters()");
  } else {
        x.style.display = "none";
        button1.innerHTML = "Filters";
        button1.classList.remove("button-red");
        button2.innerHTML = "Create Spell";
        button2.classList.remove("button-green");
        button2.setAttribute("onClick", "toggleSpellsCreateUi()");
  }
}

// This will apply the spell Filters
function ApplyFilters() {
    var levels = [];
    var schools = [];
    for (i = 0; i < 10; i++) {
        var id = '#fb' + i;
        if ($(id).hasClass('button-cyan') == true) {levels.push(i);}
    }
    for (i = 10; i < 18; i++) {
        var id = '#fb' + i;
        if ($(id).hasClass('button-cyan') == true) {schools.push($('#fb' + i).text());}
    }
    if (levels.length == 0 && schools.length == 0) {
        loadList();
        toggleSpellFilters();
        return;
    }
    if (levels.length != 0 && schools.length != 0) {
        loadList(levels,schools);
        toggleSpellFilters();
        return;
    }
    if (levels.length == 0) {
        levels = [0,1,2,3,4,5,6,7,8,9];
        loadList(levels,schools);
        toggleSpellFilters();
        return;
    }
    if (schools.length == 0) {
        schools = ["Abjuration","Conjuration","Divination","Enchantment","Evocation","Illusion","Necromancy","Transmutation"];
        loadList(levels,schools);
        toggleSpellFilters();
        return;
    }

}

// This will edit a spell
function editSpell() {
    document.getElementById("spellsCreate").setAttribute("action", "spells/spellsEdit.php");
    toggleSpellsCreateUi();
    document.getElementById("spell-create-button").innerHTML = "Save Changes";

    // These lines will set the text in the edit window
    document.getElementById("spellsCreate").children[0].value = document.getElementById("spell_name").textContent;
    document.getElementById("spellsCreate").children[1].value = document.getElementById("spell_school").textContent;
    if (document.getElementById("spell_ritual").textContent == "") {
        document.getElementById("spellsCreate").children[2].selectedIndex = "2";
    } else {
        document.getElementById("spellsCreate").children[2].selectedIndex = "1";
    }
    switch (document.getElementById("spell_level").textContent) {
        case "Cantrip": document.getElementById("spellsCreate").children[3].value = "0"; break;
        case "1st-level": document.getElementById("spellsCreate").children[3].value = "1"; break;
        case "2nd-level": document.getElementById("spellsCreate").children[3].value = "2"; break;
        case "3rd-level": document.getElementById("spellsCreate").children[3].value = "3"; break;
        case "4th-level": document.getElementById("spellsCreate").children[3].value = "4"; break;
        case "5th-level": document.getElementById("spellsCreate").children[3].value = "5"; break;
        case "6th-level": document.getElementById("spellsCreate").children[3].value = "6"; break;
        case "7th-level": document.getElementById("spellsCreate").children[3].value = "7"; break;
        case "8th-level": document.getElementById("spellsCreate").children[3].value = "8"; break;
        case "9th-level": document.getElementById("spellsCreate").children[3].value = "9"; break;
    }
    document.getElementById("spellsCreate").children[4].value = document.getElementById("spell_time").textContent.slice(14);
    document.getElementById("spellsCreate").children[5].value = document.getElementById("spell_range").textContent.slice(7);
    document.getElementById("spellsCreate").children[6].value = document.getElementById("spell_components").textContent.slice(12);
    document.getElementById("spellsCreate").children[7].value = document.getElementById("spell_duration").textContent.slice(10);
    // this part will replace line breaks for the text area
    var textarea = document.getElementById("spell_description").innerHTML;
    textarea = textarea.split("<br>").join("\n");
    textarea = textarea.split("<b>").join("**");
    textarea = textarea.split("</b>").join("**");
    textarea = textarea.split("<i>").join("*");
    textarea = textarea.split("</i>").join("*");
    document.getElementById("spellsCreate").children[9].value = textarea;

    switch (document.getElementById("spell_source").textContent) {
        case "Homebrew": document.getElementById("spellsCreate").children[10].selectedIndex = "1"; break;
        case "D&D 5e Player's Handbook": document.getElementById("spellsCreate").children[10].selectedIndex = "2"; break;
        case "D&D 5e Elemental Evil": document.getElementById("spellsCreate").children[10].selectedIndex = "3"; break;
        case "D&D 5e Sword Coast Adventurer's Guide": document.getElementById("spellsCreate").children[10].selectedIndex = "4"; break;
        case "D&D 5e Xanathars Guide to Everything": document.getElementById("spellsCreate").children[10].selectedIndex = "5"; break;
        case "Maskelyne's Guide to Magic": document.getElementById("spellsCreate").children[10].selectedIndex = "6"; break;
    }
    var u = document.getElementById("spell_classes").textContent.slice(15);
    u_array = u.split(", ");
    var el = document.getElementById("spellsCreate").children[11];
    if (u_array.includes("bard")) {el[1].selected = true;}
    if (u_array.includes("cleric")) {el[2].selected = true;}
    if (u_array.includes("druid")) {el[3].selected = true;}
    if (u_array.includes("paladin")) {el[4].selected = true;}
    if (u_array.includes("ranger")) {el[5].selected = true;}
    if (u_array.includes("sorcerer")) {el[6].selected = true;}
    if (u_array.includes("warlock")) {el[7].selected = true;}
    if (u_array.includes("wizard")) {el[8].selected = true;}
}

// This will load a spells info
function loadSpellInfo(id) {
    $.ajax({
        url:'spells/spellsLoadInfo.php',
        async: false,
        type: "POST",
        data: {spell_id: id},
        success: function(data) {
            var data = data.split('|||');
            document.getElementById("spell_name").innerHTML = data[1];
            switch(data[2]) {
            case "0":
                document.getElementById("spell_level").innerHTML = "Cantrip";
            break;
            case "1":
                document.getElementById("spell_level").innerHTML = "1st-level";
            break;
            case "2":
                document.getElementById("spell_level").innerHTML = "2nd-level";
            break;
            case "3":
                document.getElementById("spell_level").innerHTML = "3rd-level";
            break;
            case "4":
                document.getElementById("spell_level").innerHTML = "4th-level";
            break;
            case "5":
                document.getElementById("spell_level").innerHTML = "5th-level";
            break;
            case "6":
                document.getElementById("spell_level").innerHTML = "6th-level";
            break;
            case "7":
                document.getElementById("spell_level").innerHTML = "7th-level";
            break;
            case "8":
                document.getElementById("spell_level").innerHTML = "8th-level";
            break;
            case "9":
                document.getElementById("spell_level").innerHTML = "9th-level";
            break;
            }
            document.getElementById("spell_school").innerHTML = data[3];
            switch (data[4]) {
                case "0":
                    document.getElementById("spell_ritual").innerHTML = "";
                    break;
                case "1":
                    document.getElementById("spell_ritual").innerHTML = "(ritual)";
                    break;
            }
            document.getElementById("spell_time").innerHTML = "<b>Casting Time: </b>" + data[5];
            document.getElementById("spell_range").innerHTML = "<b>Range: </b>" + data[6];
            document.getElementById("spell_components").innerHTML = "<b>Components: </b>" + data[7];
            document.getElementById("spell_duration").innerHTML = "<b>Duration: </b>" + data[8];
            data[9] = data[9].split("\n").join("<br>");
            data[9] = data[9].replace(/\*\*(.*?)\*\*/g,'<b>$1</b>');
            data[9] = data[9].replace(/\*(.*?)\*/g,'<i>$1</i>');

            document.getElementById("spell_description").innerHTML = data[9];
            document.getElementById("spell_source").innerHTML = data[10];
            var class_count = data.length - 13;
            switch (class_count) {
                case 0:
                    document.getElementById("spell_classes").innerHTML = "";
                break;
                case 1:
                    document.getElementById("spell_classes").innerHTML = "Available for: " + data[12];
                break;
                case 2:
                    document.getElementById("spell_classes").innerHTML = "Available for: " + data[12] + ", " + data[13];
                break;
                case 3:
                    document.getElementById("spell_classes").innerHTML = "Available for: " + data[12] + ", " + data[13] + ", " + data[14];
                break;
                case 4:
                    document.getElementById("spell_classes").innerHTML = "Available for: " + data[12] + ", " + data[13] + ", " + data[14] + ", " + data[15];
                break;
                case 5:
                    document.getElementById("spell_classes").innerHTML = "Available for: " + data[12] + ", " + data[13] + ", " + data[14] + ", " + data[15] + ", " + data[16];
                break;
                case 6:
                    document.getElementById("spell_classes").innerHTML = "Available for: " + data[12] + ", " + data[13] + ", " + data[14] + ", " + data[15] + ", " + data[16] + ", " + data[17];
                break;
                case 7:
                    document.getElementById("spell_classes").innerHTML = "Available for: " + data[12] + ", " + data[13] + ", " + data[14] + ", " + data[15] + ", " + data[16] + ", " + data[17] + ", " + data[18];
                break;
                case 8:
                    document.getElementById("spell_classes").innerHTML = "Available for: " + data[12] + ", " + data[13] + ", " + data[14] + ", " + data[15] + ", " + data[16] + ", " + data[17] + ", " + data[18] + ", " + data[19];
                break;
            }
      }
    });
    var x = document.getElementById("spell_info");
    if (x.style.display == "none") {
      x.style.display = "block";
      button1.innerHTML = "Back";
      button2.innerHTML = "Edit";
      button1.classList.add("button-red");
      button1.setAttribute("onClick", "toggleSpellInfo()");
      button2.setAttribute("onClick", "editSpell()");
    }
}

// if reverse is true it will reverse the order
function sortTable(row,reverse) {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("spell_table");
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    if (reverse == false) {
        for (i = 1; i < (rows.length - 1); i++) {
        //start by saying there should be no switching:
        shouldSwitch = false;
        /*Get the two elements you want to compare,
        one from current row and one from the next:*/
        x = rows[i].getElementsByTagName("td")[row];
        y = rows[i + 1].getElementsByTagName("td")[row];
        //check if the two rows should switch place:
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
        }
    }
    }
    if (reverse == true) {
        for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("td")[row];
            y = rows[i + 1].getElementsByTagName("td")[row];
            //check if the two rows should switch place:
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                //if so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
            }

        }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

// This will open the spell info box when a spell row is clicked
$('body').on('click', 'tr:not(:first-child)', function () {
    id = $(this).attr("id");
    loadSpellInfo(id);
});

// this will sort the table
$('body').on('click', '#spell_table th', function () {
var xr = $('#spell_table th').index(this);
    if (xr == 0 && sort == 0) {sortTable(0,true);sort = 1;return;}
    if (xr == 0 && sort == 1) {sortTable(0,false);sort = 0;return;}
    if (xr == 1 && sort == 0) {sortTable(1,true);sort = 1;return;}
    if (xr == 1 && sort == 1) {sortTable(1,false);sort = 0;return;}
    if (xr == 2 && sort == 0) {sortTable(2,true);sort = 1;return;}
    if (xr == 2 && sort == 1) {sortTable(2,false);sort = 0;return;}
    if (xr == 3 && sort == 0) {sortTable(3,true);sort = 1;return;}
    if (xr == 3 && sort == 1) {sortTable(3,false);sort = 0;return;}
});

//this will add the class button-cyan to filter buttons when clicked
$('button.filter_button').click(function() {
    pos = $(this).attr("id");
    $(this).toggleClass('button-cyan');
});
