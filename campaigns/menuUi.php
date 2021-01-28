<div class="menu">
    <div class="menu-list">
        <h1>Campaigns</h1>
        <div id="menu-list-stuff">
            <div class="menu-list-campaign">
                <h2>Selonia</h2>
                <div>
                    <span>
                        <p>Role: </p>
                        <p>Dungeon Master </p>
                    </span>
                    <span>
                        <p>Player Count: </p>
                        <p>20 </p>
                    </span>
                    <span>
                        <p>Author: </p>
                        <p>masky </p>
                    </span>
                </div>
                <button class="campaign_button">Play</button><button class="campaign_button">Edit</button>
            </div>
            <div class="menu-list-campaign">
                <h2>Dathomirian Tears</h2>
                <div>
                    <span>
                        <span>
                            <p>Role: </p>
                            <p>Player </p>
                        </span>
                        <span>
                            <p>Player Count: </p>
                            <p>5 </p>
                        </span>
                    </span>
                    <span>
                        <p>Author: </p>
                        <p>masky </p>
                    </span>
                    <span>
                        <p>Character: </p>
                        <p>Beepskeeptodola </p>
                    </span>
                </div>
                <button class="campaign_button">Play</button><button class="campaign_button">Edit</button>
            </div>
            <div class="menu-list-campaign">
                <h2>Mezorbs</h2>
                <div>
                    <span>
                        <span>
                            <p>Role: </p>
                            <p>Spectator </p>
                        </span>
                        <span>
                            <p>Player Count: </p>
                            <p>3 </p>
                        </span>
                    </span>
                    <span>
                        <p>Author: </p>
                        <p>BigBrotherNoir </p>
                    </span>
                </div>
                <button class="campaign_button">Play</button><button class="campaign_button">Edit</button>
            </div>
        </div>
        <button class="campaign_button" id="create_campaign">Create a Campaign</button><button class="campaign_button" id="create_character">Create a Character</button>
    </div>

    <div class="menu-create-campaign">
        <h1>Create Campaign</h1>
        <form method="post" class="campaignCreate" action="campaigns\campaignsCreate.php">
            <input type="text" name="campaign_name" placeholder="Campaign Name" required/>
            <input type="text" name="campaign_password" placeholder="Campaign Password (leave blank for no password)" />
            <textarea name="campaign_description" placeholder="Campaign Description" required></textarea>
            <button type="button" id="exit_create_campaign_button" onclick="">Back</button>
            <button type="submit" id="create_campaign_button" onclick="">Create Campaign</button>
        </form>
    </div>

    <div class="menu-create" id="character1">
        <h1>Join a Campaign</h1>
        <p>
            Please Enter the campaign ID and Password for the game you would like to create your character in. A campaign ID and password can be provided to you by your dungeon master.
        </p>
        <form method="post" class="campaignJoin" action="campaigns\campaignsJoin.php">
            <input type="text" name="campaign_id" id="campaign_id" placeholder="Campaign Id" required/>
            <input type="text" name="campaign_password" id="campaign_password" placeholder="Campaign Password (leave blank for no password)" />
            <button type="button" id="exit_create_character1_button" onclick="">Back</button>
            <button type="submit"  id="create_character1_button"  onclick="">Join Campaign</button>
        </form>
    </div>

    <div class="menu-create" id="character2">
        <h1>Create a Character - Basic Info</h1>
        <form method="post" class="form_character2">
            <input type="text" id="character_name" placeholder="Character Name" required/>
            <input type="text" id="character_title" placeholder="Character Title"/>
            <select name="" id="character_race" required>
                <option disabled selected hidden>Choose Race</option>
                <option value="1">Hill Dwarf</option>
                <option value="2">Mountain Dwarf</option>
                <option value="3">High Elf</option>
                <option value="4">Wood Elf</option>
                <option value="5">Dark Elf</option>
                <option value="6">Lightfoot Halfling</option>
                <option value="7">Stout Halfling</option>
                <option value="8">Human</option>
                <option value="9">Dragonborn</option>
                <option value="10">Forest Gnome</option>
                <option value="11">Rock Gnome</option>
                <option value="12">Half-Elf</option>
                <option value="13">Half-Orc</option>
                <option value="14">Tiefling</option>
            </select>
            <select name="" id="character_class" required>
                <option disabled selected hidden>Choose Class</option>
                <option value="barbarian">Barbarian</option>
                <option value="bard">Bard</option>
                <option value="cleric">Cleric</option>
                <option value="druid">Druid</option>
                <option value="fighter">Fighter</option>
                <option value="monk">Monk</option>
                <option value="paladin">Paladin</option>
                <option value="ranger">Ranger</option>
                <option value="Rouge">Rouge</option>
                <option value="sorcerer">Sorcerer</option>
                <option value="warlock">Warlock</option>
                <option value="wizard">Wizard</option>
            </select>
            <select name="" id="character_alignment">
                <option disabled selected hidden>Choose Alignment</option>
                <option value="">(Select this for no Alignment)</option>
                <option value="LG">Lawful Good</option>
                <option value="NG">Nuetral Good</option>
                <option value="CG">Chaotic Good</option>
                <option value="LN">Lawful Nuetral</option>
                <option value="NN">Nuetral Nuetral</option>
                <option value="CN">Chaotic Nuetral</option>
                <option value="LE">Lawful Evil</option>
                <option value="NE">Nuetral Evil</option>
                <option value="CE">Chaotic Evil</option>
            </select>
            <br />
            <button type="button" id="back_button" onclick="">Back</button>
            <button type="submit"  id="next_button"  onclick="">Next</button>
        </form>
    </div>

    <div class="menu-create" id="character3">
        <h1>Create a Character - Ability Scores</h1>
        <br />
        <div class="create-banner">
            <div class="create-statblock">
                <p>Strength</p>
                <div class="create-statblock-black">
                    <div class="create-statblock-number" id="character_str">10</div>
                    <div class="create-statblock-bonus" id="character_str_bonus"></div>
                </div>
                <img src="images/arrow_down.png" />
                <img src="images/arrow_up.png" />
                <button class="create-statblock-racial">Toggle Bonus</button>
            </div>
            <div class="create-statblock">
                <p>Dexterity</p>
                <div class="create-statblock-black">
                    <div class="create-statblock-number" id="character_dex">10</div>
                    <div class="create-statblock-bonus" id="character_dex_bonus"></div>
                </div>
                <img src="images/arrow_down.png" />
                <img src="images/arrow_up.png" />
                <button class="create-statblock-racial">Toggle Bonus</button>
            </div>
            <div class="create-statblock">
                <p>Constitution</p>
                <div class="create-statblock-black">
                    <div class="create-statblock-number" id="character_con">10</div>
                    <div class="create-statblock-bonus" id="character_con_bonus"></div>
                </div>
                <img src="images/arrow_down.png" />
                <img src="images/arrow_up.png" />
                <button class="create-statblock-racial">Toggle Bonus</button>
            </div>
            <div class="create-statblock">
                <p>Inteligence</p>
                <div class="create-statblock-black">
                    <div class="create-statblock-number" id="character_int">10</div>
                    <div class="create-statblock-bonus" id="character_int_bonus"></div>
                </div>
                <img src="images/arrow_down.png" />
                <img src="images/arrow_up.png" />
                <button class="create-statblock-racial">Toggle Bonus</button>
            </div>
            <div class="create-statblock">
                <p>Wisdom</p>
                <div class="create-statblock-black">
                    <div class="create-statblock-number" id="character_wis">10</div>
                    <div class="create-statblock-bonus" id="character_wis_bonus"></div>
                </div>
                <img src="images/arrow_down.png" />
                <img src="images/arrow_up.png" />
                <button class="create-statblock-racial">Toggle Bonus</button>
            </div>
            <div class="create-statblock">
                <p>Charisma</p>
                <div class="create-statblock-black">
                    <div class="create-statblock-number" id="character_cha">10</div>
                    <div class="create-statblock-bonus" id="character_cha_bonus"></div>
                </div>
                <img src="images/arrow_down.png" />
                <img src="images/arrow_up.png" />
                <button class="create-statblock-racial">Toggle Bonus</button>
            </div>
        </div>
        <form method="post" class="form_character3">
            <button type="button" id="back_button" onclick="">Back</button>
            <button type="submit"  id="next_button"  onclick="">Next</button>
        </form>
    </div>

    <div class="menu-create" id="character4">
        <h1>Create a Character - Options</h1>
        <form method="post" class="form_character4">
            <br />
            <button type="button" id="back_button" onclick="">Back</button>
            <button type="submit"  id="next_button"  onclick="">Next</button>
        </form>
    </div>

    <div class="menu-create" id="character5">
        <h1>Create a Character - Appearance</h1>
        <form method="post" class="form_character5">
            <input type="text" id="character_appearance_height" placeholder="Character Height"/>
            <input type="text" id="character_appearance_weight" placeholder="Character Weight"/>
            <input type="text" id="character_appearance_age" placeholder="Character Age"/>
            <input type="text" id="character_appearance_eyes" placeholder="Character Eyes"/>
            <input type="text" id="character_appearance_skin" placeholder="Character Skin"/>
            <input type="text" id="character_appearance_hair" placeholder="Character Hair"/>
            <textarea id="character_appearance" placeholder="Campaign Description"></textarea>
            <button type="button" id="back_button" onclick="">Back</button>
            <button type="submit"  id="next_button"  onclick="">Next</button>
        </form>
    </div>

    <div class="menu-create" id="character6">
        <h1>Create a Character - Info</h1>
        <br />
        <form method="post" class="form_character6">
            <textarea id="character_backstory" placeholder="Character Background"></textarea>
            <textarea id="character_information" placeholder="Additional Information"></textarea>
            <button type="button" id="back_button" onclick="">Back</button>
            <button type="submit"  id="next_button"  onclick="">Next</button>
        </form>
    </div>

    <div class="menu-create" id="character7">
        <h1>Create a Character - Finalization</h1>
        <p>
            Are you sure you would like to create this character?
        </p>
        <form method="post" class="form_character7">
            <button type="button" id="back_button" onclick="">Back</button>
            <button type="submit"  id="next_button"  onclick="">Create Character</button>
        </form>
    </div>

</div>



<div id="mybutton">
<button class="feedback">DEBUG BUTTON</button>
</div>

<script src="campaigns/menuLogic.js"></script>
