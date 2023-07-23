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
        "Suddenly, I saw more of these spectres. With eyes that were vacuums of despair, they fixated on me."
    ];
    
    

    var ChapterOne = [
        "This is the first piece of text.",
        "This is the second piece of text.",
        "This is the third piece of text.",
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
        displayNextText(); // Call the text scroller function when the start button is clicked
    });

    optionsButton.addEventListener('click', function() {
        titleScreen.style.display = 'none';
        optionsScreen.style.display = 'block';
    });

    // Game Screen
    titleButton.addEventListener('click', function() {
        gameScreen.style.display = 'none';
        titleScreen.style.display = 'block';
    });

    // Text Scroller
    function displayNextText() {
        if (textQueue.length > 0 && !isTyping) {
            isTyping = true;
            var nextText = textQueue.shift();
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
                    setTimeout(typeWriter, 20);
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
        } else if (isTyping) {
            skipTyping = true;
        }
    }
    
    
    
    

    document.addEventListener('click', displayNextText);
    document.addEventListener('keydown', function(e) {
        if (e.key === ' ' || e.key === 'Enter') {
            displayNextText();
        }
    });
    


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
        titleScreen.style.display = 'block';
    });

    
}
