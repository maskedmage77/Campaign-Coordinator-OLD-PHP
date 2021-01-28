// debugging button
$(".feedback").click(function(){
    alert(character_proficiencies + " ");
});


$(document).ready(function(){
    $(".menu-create-campaign").hide();
    $("#character1").hide();
    $("#character2").hide();
    $("#character3").hide();
    $("#character4").hide();
    $("#character5").hide();
    $("#character6").hide();
    $("#character7").hide();
    loadList();
});

$("#create_campaign").click(function(){
    if ($(".menu-create-campaign").is(":hidden")) {
        $(".menu-list").fadeOut();
        setTimeout(function(){$(".menu-create-campaign").fadeIn();},405);
    }
});

$("#create_character").click(function(){
    if ($("#character1").is(":hidden")) {
        $(".menu-list").fadeOut();
        setTimeout(function(){$("#character1").fadeIn();},405);
    }
});

$("#exit_create_campaign_button").click(function(){
    if ($(".menu-create-campaign").is(":visible")) {
        $(".menu-create-campaign").fadeOut();
        setTimeout(function(){$(".menu-list").fadeIn();},405);
    }
});

$("#exit_create_character1_button").click(function(){
    if ($("#character1").is(":visible")) {
        $("#character1").fadeOut();
        setTimeout(function(){$(".menu-list").fadeIn();},405);
        $("form.campaignJoin")[0].reset();
    }
});

$('form.campaignCreate').on('submit', function() {

    var that = $(this),
        url = that.attr('action'),
        type = that.attr('method'),
        data = {};

    that.find('[name]').each(function(index, value) {
        var that = $(this),
            name = that.attr('name'),
            value = that.val();
            data[name] = value;
    })

    $.ajax({
        url: url,
        type: type,
        async: false,
        data: data
    });
    // This will clear the text form that the message box is in.
    $("form.campaignCreate")[0].reset();
    // this will reload the game list
    loadList();
    // insert something to get back to spells
    return false;
});

$('form.campaignJoin').on('submit', function() {
    var that = $(this),
        url = that.attr('action'),
        type = that.attr('method'),
        data = {};

    that.find('[name]').each(function(index, value) {
        var that = $(this),
            name = that.attr('name'),
            value = that.val();
            data[name] = value;
    })

    $.ajax({
        url: url,
        type: type,
        async: false,
        data: data,
        success: function(data) {
            if (data == "false") {
                alert("Sorry, your campaign ID and Password did not match a game.")
            } else if (data == "true") {
                campaign_id = $("#campaign_id").val();
                campaign_password = $("#campaign_password").val();
                displayCharacterCreation();
                // This will clear the text form that the message box is in.
                $("form.campaignJoin")[0].reset();

            }
        }
    });
    // insert something to get back to spells
    return false;
});

function loadList(){
    $("#menu-list-stuff div").remove();
    $.ajax({
        url:'campaigns/menuLoadList.php',
        async: false,
        success: function(data) {
            //inserting older message
            //var data = data.split(': ');
            //var node = document.createElement("TR");
            //node.innerHTML = data;
            var data = data.split('|||');
            var menu = document.getElementById("menu-list-stuff");
            var x = 0;
            while (data[x] != 0) {

                if (data[x + 5] == 0) {role = "Dungeon Master"; character = "";};
                if (data[x + 5] == 1) {role = "Player";
                    character =
                        '<span>' +
                            '<p>Character:&nbsp</p>' +
                            '<p>' + data[x + 7] + '</p>' +
                        '</span>'
                    };
                if (data[x + 5] == 2) {role = "Spectator"; character = "";};

                menu.innerHTML += '<div class="menu-list-campaign">' +
                '<h2>' + data[x + 2] + '</h2>' +
                    '<div>' +
                        '<span>' +
                            '<p>Role:&nbsp</p>' +
                            '<p>' + role + '</p>' +
                        '</span>' +
                        '<span>' +
                            '<p>Author:&nbsp</p>' +
                            '<p>' + data[x + 4] + '</p>' +
                        '</span>' +
                        character +
                    '</div>' +
                    '<button class="campaign_button">Play</button>' +
                    '<button class="campaign_button">Edit</button>' +
                '</div>'
                ;
                x += 8;
            }
        }
    });
}

function displayCharacterCreation() {
    $("#character1").fadeOut();
    setTimeout(function(){$("#character2").fadeIn();},405);
}

// campaign_id
// campaign_password

// character_name
// character_title
// character_race
// character_class
// character_alignment

// character_str
// character_dex
// character_con
// character_int
// character_wis
// character_cha

// character_str_bonus
// character_dex_bonus
// character_con_bonus
// character_int_bonus
// character_wis_bonus
// character_cha_bonus
// character_additional_bonus

// character_proficiencies - make this an array
var character_proficiencies = [];
var character_languages = [];
var character_traits = [];
// character_appearance_height
// character_appearance_weight
// character_appearance_eyes
// character_appearance_age
// character_appearance_skin
// character_appearance_hair
// character_appearance

// character_backstory
// character_information




// racial bonus button
$(".create-statblock-racial").click(function(){

    if ($(this).hasClass("used")) {
        character_additional_bonus += 1;
        $(this).removeClass("used");
        $(this).prevAll('div .create-statblock-black').children().last().text("");
    } else {
        var bonus = parseInt($(this).prevAll('div .create-statblock-black').children().last().text().slice(2));
        if (!bonus) {
            if (character_additional_bonus > 0) {
                character_additional_bonus -= 1;
                $(this).prevAll('div .create-statblock-black').children().last().text(" + " + 1);
                $(this).addClass("used");
            }
        }
    }
});

// character creation boxes
    $(".form_character2").on('submit', function (e) {
        // these lines will clean up the next page if it has already been used
        $(".create-statblock-bonus").text("");
        $(".create-statblock-racial").hide();
        $(".create-statblock-racial").removeClass("used");

        // these will set variables for the character to be
        character_name = $("#character_name").val();
        character_title = $("#character_title").val();
        character_race = $("#character_race").val();
        character_class = $("#character_class").val();
        character_alignment = $("#character_alignment").val();

        // this ajax request will get and insert the ability score info required for the next page
        $.ajax({
            url:'campaigns/getRaceBonuses.php',
            type: "POST",
            data: {character_race: character_race},
            async: false,
            success: function(data) {
                var data = data.split('|||');
                for (let i = 0; i < 6; i++) {
                    if (data[i]) {
                        $(".create-statblock-bonus:eq(" + i + ")").text(" + " + data[i]);
                    }
                }
                if (data[6]) {
                    $(".create-statblock-racial").show();
                    character_additional_bonus = data[6];
                }
          }});

        //stop form submission
        e.preventDefault();

        $("#character2").fadeOut();
        setTimeout(function(){$("#character3").fadeIn();},405);
    });
    $(".form_character2 #back_button").click(function(){
        $("#character2").fadeOut();
        setTimeout(function(){$("#character1").fadeIn();},405);
    });

    $(".form_character3").on('submit', function (e) {
        var arr = [];
        var arr2 = ["str","dex","con","int","wis","cha"];
        for (let i = 0; i < 6; i++) {
            if (parseInt($("#character_"+arr2[i]+"_bonus").text().slice(2))) {
                arr[i] = parseInt($("#character_"+arr2[i]).text()) + parseInt($("#character_"+arr2[i]+"_bonus").text().slice(2));
            } else {
                arr[i] = parseInt($("#character_"+arr2[i]).text());
            }
        }
        character_str = arr[0];
        character_dex = arr[1];
        character_con = arr[2];
        character_int = arr[3];
        character_wis = arr[4];
        character_cha = arr[5];

        // add required boxes for next page
            // hill dwarf & mountain dwarf
            if (character_race == 1 || character_race == 2) {
                $(".form_character4").prepend(
                    "<label>Select a dwarven tool proficiency:</label><select id=\"character_proficiencies\"><option disabled selected hidden>Select Tool Proficiency</option><option value=\"5\">Smith's tools</option><option value=\"6\">Brewer's supplies</option><option value=\"7\">Mason's tools</option></select>"
                );
            }
            // high elf
            else if (character_race == 3) {
                $(".form_character4").prepend(
                    "<label>Select another language:</label><select id=\"character_languages\"><option disabled selected hidden>Select Language</option><option value=\"1\">Abyssal</option><option value=\"2\">Aquan</option><option value=\"3\">Auran</option><option value=\"4\">Celestial</option><option value=\"6\">Deep Speech</option><option value=\"7\">Draconic</option><option value=\"9\">Dwarvish</option><option value=\"11\">Giant</option><option value=\"12\">Gnomish</option><option value=\"13\">Goblin</option><option value=\"14\">Gnoll</option><option value=\"15\">Halfling</option><option value=\"16\">Ignan</option><option value=\"17\">Infernal</option><option value=\"18\">Orc</option><option value=\"19\">Primordial</option><option value=\"20\">Sylvan</option><option value=\"21\">Terran</option><option value=\"22\">Undercommon</option></select>"
                );
            }
            // human
            else if (character_race == 8) {
                $(".form_character4").prepend(
                    "<label>Select another language:</label><select id=\"character_languages\"><option disabled selected hidden>Select Language</option><option value=\"1\">Abyssal</option><option value=\"2\">Aquan</option><option value=\"3\">Auran</option><option value=\"4\">Celestial</option><option value=\"6\">Deep Speech</option><option value=\"7\">Draconic</option><option value=\"9\">Dwarvish</option><option value=\"10\">Elvish</option><option value=\"11\">Giant</option><option value=\"12\">Gnomish</option><option value=\"13\">Goblin</option><option value=\"14\">Gnoll</option><option value=\"15\">Halfling</option><option value=\"16\">Ignan</option><option value=\"17\">Infernal</option><option value=\"18\">Orc</option><option value=\"19\">Primordial</option><option value=\"20\">Sylvan</option><option value=\"21\">Terran</option><option value=\"22\">Undercommon</option></select>"
                );
            }
            // dragonborn
            else if (character_race == 9) {
                $(".form_character4").prepend(
                    "<label>Select Draconic Ancestry:</label><select id=\"character_traits\"><option disabled selected hidden>Select Ancestry</option><option value=\"15\">Black</option><option value=\"16\">Blue</option><option value=\"17\">Brass</option><option value=\"18\">Bronze</option><option value=\"19\">Copper</option><option value=\"20\">Gold</option><option value=\"21\">Green</option><option value=\"22\">Red</option><option value=\"23\">Silver</option><option value=\"24\">White</option></select>"
                );
            }
            // half-elf
            else if (character_race == 12) {
                $(".form_character4").prepend(
                    "<label>Select a language:</label><select id=\"character_languages\"><option disabled selected hidden>Select Language</option><option value=\"1\">Abyssal</option><option value=\"2\">Aquan</option><option value=\"3\">Auran</option><option value=\"4\">Celestial</option><option value=\"6\">Deep Speech</option><option value=\"7\">Draconic</option><option value=\"9\">Dwarvish</option><option value=\"11\">Giant</option><option value=\"12\">Gnomish</option><option value=\"13\">Goblin</option><option value=\"14\">Gnoll</option><option value=\"15\">Halfling</option><option value=\"16\">Ignan</option><option value=\"17\">Infernal</option><option value=\"18\">Orc</option><option value=\"19\">Primordial</option><option value=\"20\">Sylvan</option><option value=\"21\">Terran</option><option value=\"22\">Undercommon</option></select>"
                    +
                    "<label>Select a skill:</label><select id=\"character_proficiencies\"><option disabled selected hidden>Select 1st Skill</option><option value=\"11\">Athletics</option><option value=\"12\">Acrobatics</option><option value=\"13\">Sleight of Hand</option><option value=\"14\">Stealth</option><option value=\"15\">Arcana</option><option value=\"16\">History</option><option value=\"17\">Investigation</option><option value=\"18\">Nature</option><option value=\"19\">Religion</option><option value=\"20\">Animal Handling</option><option value=\"21\">Insight</option><option value=\"22\">Medicine</option><option value=\"23\">Perception</option><option value=\"24\">Survival</option><option value=\"25\">Deception</option><option value=\"26\">Intimidation</option><option value=\"27\">Performance</option><option value=\"28\">Persuasion</option></select>"
                    +
                    "<label>Select a skill:</label><select id=\"character_proficiencies\"><option disabled selected hidden>Select 2nd Skill</option><option value=\"11\">Athletics</option><option value=\"12\">Acrobatics</option><option value=\"13\">Sleight of Hand</option><option value=\"14\">Stealth</option><option value=\"15\">Arcana</option><option value=\"16\">History</option><option value=\"17\">Investigation</option><option value=\"18\">Nature</option><option value=\"19\">Religion</option><option value=\"20\">Animal Handling</option><option value=\"21\">Insight</option><option value=\"22\">Medicine</option><option value=\"23\">Perception</option><option value=\"24\">Survival</option><option value=\"25\">Deception</option><option value=\"26\">Intimidation</option><option value=\"27\">Performance</option><option value=\"28\">Persuasion</option></select>"
                );
            }

        e.preventDefault();
        $("#character3").fadeOut();
        setTimeout(function(){$("#character4").fadeIn();},405);
    });
    $(".form_character3 #back_button").click(function(){

        $("#character3").fadeOut();
        setTimeout(function(){$("#character2").fadeIn();},405);
    });
    // stat arrows
        $(".create-statblock img:first-of-type").click(function(){
        var number =  parseInt($(this).prevAll('div .create-statblock-black').children().first().text());
        if ($(this).prevAll('div .create-statblock-black').children().last().text() == "") {
            var bonus = 0;
        } else {
            var bonus = parseInt($(this).prevAll('div .create-statblock-black').children().last().text().slice(2));
        }
        if (number + bonus > 3){
            number -= 1;
            $(this).prevAll('div .create-statblock-black').children().first().text(number);
        }

    });
        $(".create-statblock img:last-of-type").click(function(){
        var number =  parseInt($(this).prevAll('div .create-statblock-black').children().first().text());
        if ($(this).prevAll('div .create-statblock-black').children().last().text() == "") {
            var bonus = 0;
        } else {
            var bonus = parseInt($(this).prevAll('div .create-statblock-black').children().last().text().slice(2));
        }
        if (number + bonus < 20){
            number += 1;
            $(this).prevAll('div .create-statblock-black').children().first().text(number);
        }
    });

    $(".form_character4").on('submit', function (e) {
        // hill dwarf & mountain dwarf
        if (character_race == 1 || character_race == 2) {
            character_proficiencies.push(parseInt($("#character_proficiencies").val()));
        }
        // high elf & human
        if (character_race == 3 || character_race == 8) {
            character_languages.push(parseInt($("#character_languages").val()));
        }
        // dragonborn
        if (character_race == 9) {
            character_traits.push(parseInt($("#character_traits").val()));
        }

        alert(character_traits);
        //stop form submission
        e.preventDefault();

        $("#character4").fadeOut();
        setTimeout(function(){$("#character5").fadeIn();},405);
    });
    $(".form_character4 #back_button").click(function(){
        $(".form_character4 input").remove();
        $(".form_character4 select").remove();
        $(".form_character4 label").remove();

        $("#character4").fadeOut();
        setTimeout(function(){$("#character3").fadeIn();},405);
    });

    $(".form_character5").on('submit', function (e) {
        character_appearance_height = $("#character_appearance_height").val();
        character_appearance_weight = $("#character_appearance_weight").val();
        character_appearance_eyes = $("#character_appearance_eyes").val();
        character_appearance_age = $("#character_appearance_age").val();
        character_appearance_skin = $("#character_appearance_skin").val();
        character_appearance_hair = $("#character_appearance_hair").val();
        character_appearance = $("#character_appearance").val();
        //stop form submission
        e.preventDefault();

        $("#character5").fadeOut();
        setTimeout(function(){$("#character6").fadeIn();},405);
    });
    $(".form_character5 #back_button").click(function(){
        character_proficiencies = [];
        character_languages = [];
        character_traits = [];

        $("#character5").fadeOut();
        setTimeout(function(){$("#character4").fadeIn();},405);
    });

    $(".form_character6").on('submit', function (e) {
        character_backstory = $("#character_backstory").val();
        character_information = $("#character_information").val();
        //stop form submission
        e.preventDefault();

        $("#character6").fadeOut();
        setTimeout(function(){$("#character7").fadeIn();},405);
    });
    $(".form_character6 #back_button").click(function(){
        $("#character6").fadeOut();
        setTimeout(function(){$("#character5").fadeIn();},405);
    });

    $(".form_character7").on('submit', function (e) {
        //stop form submission
        e.preventDefault();

        $("#character7").fadeOut();
        setTimeout(function(){$("#character8").fadeIn();},405);
    });
    $(".form_character7 #back_button").click(function(){
        $("#character7").fadeOut();
        setTimeout(function(){$("#character6").fadeIn();},405);
    });
