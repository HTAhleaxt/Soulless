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

function startRhythmGame() {
    // Hide combat options and show rhythm game
    document.getElementById('combat-options').style.display = 'none';
    document.getElementById('attack-minigame').style.display = 'block';

    let points = [
        {x: 10, y: 10, hit: false}, // Start of Z (top left)
        {x: 50, y: 10, hit: false},
        {x: 90, y: 10, hit: false}, // Top right
        {x: 50, y: 50, hit: false}, // Middle of Z
        {x: 10, y: 90, hit: false}, // Bottom left
        {x: 50, y: 90, hit: false},
        {x: 90, y: 90, hit: false}, // Bottom right
    ];
    
    
    function setHitTargets() {
        // Reset hit status for all points
        for (let i = 0; i < points.length; i++) {
            points[i].hit = false;
        }
    
        // Exclude the first 3 points from being hit targets
        let indices = [3, 4, 5, 6];
        indices.sort(() => Math.random() - 0.5);
    
        // Set hit targets
        for (let i = 0; i < 3; i++) {
            points[indices[i]].hit = true;
        }
    }
    
    
    
    

    // Set hit targets first
    setHitTargets();

    // Then create red circles with unique IDs
    for (let i = 0; i < points.length; i++) {
        if (points[i].hit) {
            let hitCircle = document.createElement('div');
            hitCircle.className = 'hitCircle';
            hitCircle.style.left = points[i].x + '%';
            hitCircle.style.top = points[i].y + '%';
            hitCircle.id = 'hitCircle' + i;  // Add unique ID
            document.getElementById('attack-minigame').appendChild(hitCircle);
        }
    }

    let circle = document.getElementById('circle');
    let t = 0;
    let speed = 0.03;

    function lerp(start, end, amt){
        return start * (1 - amt) + end * amt;
    }

    let svg = document.getElementById('tracer');
    let previousPos = null;

    // Check if the circle hits a red circle
    function checkHit() {
        let circleRect = circle.getBoundingClientRect();
        let gameRect = document.getElementById('attack-minigame').getBoundingClientRect();  // get bounding rect of game div
    
        for (let i = 0; i < points.length; i++) {
            if (points[i].hit) {
                let hitCircle = document.getElementById('hitCircle' + i);
                let hitCircleRect = hitCircle.getBoundingClientRect();
            
                // Check if the center of the white circle is inside the expanded hit area of the red circle
                if (circleRect.left + circleRect.width / 2 >= hitCircleRect.left - 100
                    && circleRect.right - circleRect.width / 2 <= hitCircleRect.right + 100
                    && circleRect.top + circleRect.height / 2 >= hitCircleRect.top - 100
                    && circleRect.bottom - circleRect.height / 2 <= hitCircleRect.bottom + 100) {
                
                    // Remove the red circle and create a ripple effect
                    // Calculate the x, y relative to the game div
                    let xPixel = hitCircleRect.left - gameRect.left + hitCircleRect.width / 2;
                    let yPixel = hitCircleRect.top - gameRect.top + hitCircleRect.height / 2;
                    hitCircle.remove();
                    createRipple(xPixel, yPixel);
                    points[i].hit = false;
                    break;
                }
            }
        }
    }
    
    

    // Create ripple effect
    function createRipple(x, y) {
        let ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        document.getElementById('attack-minigame').appendChild(ripple);
    
        // Animate the ripple
        let size = 0;
        let opacity = 1;
        let interval = setInterval(function() {
            size += 5;
            opacity -= 0.05;
            ripple.style.width = size + 'px';
            ripple.style.height = size + 'px';
            ripple.style.opacity = opacity;
            ripple.style.borderRadius = size / 2 + 'px';
            ripple.style.marginLeft = -size / 2 + 'px';
            ripple.style.marginTop = -size / 2 + 'px';
            if (opacity <= 0) {
                clearInterval(interval);
                ripple.remove();
            }
        }, 20);
    }

    // Add event listeners for click and keydown events
    document.addEventListener('click', checkHit);
    document.addEventListener('keydown', function(e) {
        if (e.key === ' ' || e.key === 'Enter') {
            checkHit();
        }
    });

    function update() {
        let segment = Math.floor(t);

        if(segment >= points.length - 1) {
            // If we've reached the end of the path, stop the animation
            return;
        }

        let pos = {
            x: lerp(points[segment].x, points[segment + 1].x, t - segment),
            y: lerp(points[segment].y, points[segment + 1].y, t - segment)
        };

        // Update circle position
        circle.style.left = pos.x + '%';
        circle.style.top = pos.y + '%';

        // Draw the line between previous position and current
        if (previousPos) {
            let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', previousPos.x + '%');
            line.setAttribute('y1', previousPos.y + '%');
            line.setAttribute('x2', pos.x + '%');
            line.setAttribute('y2', pos.y + '%');
            line.setAttribute('stroke', 'white');
            line.setAttribute('stroke-width', '2');
            svg.appendChild(line);

            // Remove the line after a delay
            setTimeout(() => svg.removeChild(line), 300);
        }

        // Save this position for the next frame
        previousPos = pos;

        // Update t
        t += speed;
    
        // Call update function again after a short delay
        setTimeout(update, 1000 / 60);
    }

    // Wait a second, then start the movement
    setTimeout(update, 1000);
}

// Connect this function to your Attack button
document.getElementById('attackButton').addEventListener('click', startRhythmGame);
