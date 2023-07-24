window.onload = function() {

    // Declare all variables at the top
    var titleScreen = document.getElementById('title-screen');
    var gameScreen = document.getElementById('game-screen');
    var optionsScreen = document.getElementById('options-screen');
    var startButton = document.getElementById('start-button');
    var loadButton = document.getElementById('load-button');
    var titleButton = document.getElementById('title-button');
    var exitButton = document.getElementById('exit-button');
    var optionsButton = document.getElementById('options-button');
    var backButton = document.getElementById('back-button');
    var fontSizeSelect = document.getElementById('font-size');
    var textDisplay = document.getElementById('console-text');
    var isTyping = false;
    var skipTyping = false;
    var textSpeedSelect = document.getElementById('text-speed');
    var textSpeed = 20; 
    var prevScreen;
    var gameOptionsButton = document.getElementById('game-options-button');
    



    var Introduction = [
        "Pain. A searing pain, like a thousand white-hot needles. They all surged from my heart, engulfing every nerve in my body, every last cell of my person, destroying my soul.",
        "My body was being torn apart, my bones ached, my muscles protested. The relentless torment was enough to draw a scream, but I couldn’t. I couldn’t scream.",
        "If there was hell, this was surely it.",
        "My legs buckled, my balance shattered like fragile glass. A black fog invaded my vision, turning the room to swirls of black.",
        "Why was I condemned here? I had no answers.",
        "I tore my eyes open, desperate to make sense of this place. Yet all I saw was pitch-black. Was I in a nightmare?",
        "No, it was almost pure black. Something moved. Snake-like entrails on the floor’s edge, a figure more shadow than skin. Devils?",
        "Then, I struck out. It wasn’t my intention. No, it was sheer, instinctive terror.",
        "The shadow ruptured into a mist of goo, splattering on the floor.",
        "Suddenly, I saw more of these spectres. With eyes that were vacuums of despair, they fixated on me.",
        "[Battle:00]"
    ];
    
    

    var Battle00 = [
        "You're surrounded by 3 Shadows. You're uncertain how strong they are.",
        "You prepare yourself to an offensive stance.",
        "You feel stronger as ever, if not for the dizziness.",
        "[CombatShow]",
        // Add more text snippets here...
    ];

    // At the start of the game, use the introduction texts
    var textQueue = Introduction;

    var choices = [
        {
            text: "Choice 1",
            action: function() {
                // Code to execute when Choice 1 is selected
            }
        },
        {
            text: "Choice 2",
            action: function() {
                // Code to execute when Choice 2 is selected
            }
        },
        // Add more choices here...
    ];

    // Now you can use these variables in any block

    // Title Screen
    startButton.addEventListener('click', function() {
        titleScreen.style.display = 'none';
        gameScreen.style.display = 'block';
        textQueue = Introduction.slice(); // Reset the text queue
        textDisplay.textContent = ""; // Clear the text display
        setTimeout(displayNextText, 1000); // Start displaying the text after 2 seconds
    });

    optionsButton.addEventListener('click', function() {
        prevScreen = titleScreen;
        titleScreen.style.display = 'none';
        optionsScreen.style.display = 'block';
    });

    document.getElementById('options-button').addEventListener('click', function() {
        prevScreen = titleScreen;
        titleScreen.style.display = 'none';
        optionsScreen.style.display = 'block';
    });
    

    exitButton.addEventListener('click', function() {
        window.close();
    });
    

    // Game Screen
    titleButton.addEventListener('click', function() {
        gameScreen.style.display = 'none';
        titleScreen.style.display = 'block';
    });

    function showCombatPanel() {
        var combatPanel = document.getElementById('combat-options');
        combatPanel.style.display = 'flex';
    }
    
    function hideCombatPanel() {
        var combatPanel = document.getElementById('combat-options');
        combatPanel.style.display = 'none';
    }
    

    // Text Scroller
    function displayNextText() {
        if (textQueue.length > 0 && !isTyping) {
            var nextText = textQueue.shift();
            
            // Check for battle keyword
            if (nextText.startsWith("[Battle:")) {
                // Extract battleId from the keyword
                var battleId = nextText.split(":")[1].slice(0, -1);
                // Start the battle with the extracted battleId
                startBattle(battleId);
            } else if (nextText === "[CombatShow]") {
                // Show the combat panel
                showCombatPanel();
            } else {
                isTyping = true;
                var i = 0;
                var textNode = document.createTextNode('');
                textDisplay.appendChild(textNode);
    
                function typeWriter() {
                    if (skipTyping) {
                        textNode.nodeValue = nextText;
                        finishTyping();
                    } else if (i < nextText.length) {
                        textNode.nodeValue += nextText.charAt(i);
                        i++;
                        setTimeout(typeWriter, textSpeed);
                    } else {
                        finishTyping();
                    }
                }
    
                function finishTyping() {
                    textDisplay.appendChild(document.createElement('hr'));
                    if (textDisplay.scrollHeight > textDisplay.clientHeight) {
                        textDisplay.removeChild(textDisplay.firstChild);
                    }
                    isTyping = false;
                    skipTyping = false;
                }
                typeWriter();
            }
        } else if (isTyping) {
            skipTyping = true;
        }
    }
    
    textDisplay.addEventListener('click', displayNextText);
    document.addEventListener('keydown', function(e) {
        if (e.key === ' ' || e.key === 'Enter') {
            displayNextText();
        }
    });
    
    //Combat

    function startBattle(battleId) {
        // Initialize your battle here
        console.log("Battle starts! Battle Id: " + battleId);
        // Based on the battleId, load the correct battle dialogue array and begin
        // For example:
        textDisplay.innerHTML = '';

        if (battleId === '00') {
            textQueue = Battle00.slice();  // assuming Battle00 is a dialogue array for this battle
        }
        // Since you've changed textQueue, the next call to displayNextText() will start displaying battle text
    }
    
    function attack() {
        console.log("Attack button clicked");
        // Handle the attack here...
    }
    
    function magic() {
        console.log("Magic button clicked");
        // Handle the magic here...
    }
    
    function movement() {
        console.log("Movement button clicked");
        // Handle the movement here...
    }
    

    // Choices
    function displayChoices() {
        // Code to display the choices and attach click event listeners to them
    }

    // Options Screen
    fontSizeSelect.addEventListener('change', function() {
        gameScreen.style.fontSize = fontSizeSelect.value;
    });

    backButton.addEventListener('click', function() {
        optionsScreen.style.display = 'none';
        prevScreen.style.display = 'block';
    });    

    fontSizeSelect.addEventListener('change', function() {
        textDisplay.style.fontSize = fontSizeSelect.value + "em";
    });
    

    textSpeedSelect.addEventListener('change', function() {
        textSpeed = parseInt(textSpeedSelect.value, 10);
    });

    backButton.addEventListener('click', function() {
        optionsScreen.style.display = 'none';
        if (prevScreen) {
            prevScreen.style.display = 'block';
        } else {
            titleScreen.style.display = 'block';
        }
    });
    
    
    textDisplay.textContent = "";

}
