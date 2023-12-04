document.addEventListener('DOMContentLoaded', function () {
    const words = JSON.parse(localStorage.getItem('words'));
    const wheelSection = document.getElementById('wheelSection');
    const wheelCanvas = document.getElementById('wheelCanvas');
    const resultElement = document.getElementById('result');

    if (words && words.length > 0) {
        createWheel(words, wheelCanvas);
        spinWheelSetup(words, wheelCanvas, resultElement);

    } else {
        wheelSection.innerHTML = '<p>No words available. Please go back and add some words.</p>';
    }

    document.getElementById('goBackButton').addEventListener('click', function () {
        window.location.href = 'pealeht.html';
    });
});

function createWheel(words, canvas) {
    const wheelRadius = 300;
    const context = canvas.getContext('2d');
    const numberOfSegments = words.length;

    canvas.width = wheelRadius * 2;
    canvas.height = wheelRadius * 2;

    const angle = (2 * Math.PI) / numberOfSegments;

    context.translate(wheelRadius, wheelRadius);

    for (let i = 0; i < numberOfSegments; i++) {
        context.beginPath();
        context.moveTo(0, 0);
        context.arc(0, 0, wheelRadius, i * angle, (i + 1) * angle);
        context.fillStyle = 'red'; // Set the fill color to red
        context.strokeStyle = 'black'; // Set the border color to black
        context.lineWidth = 3; // Set the border width

        context.fill();
        context.stroke();

        // Add text to the segment
        context.save();
        context.rotate(i * angle + angle / 2);
        context.fillStyle = 'white';
        context.font = '16px Arial';
        context.fillText(words[i], wheelRadius - 150, 5);
        context.restore();
    }
}


function spinWheelSetup(words, canvas, resultElement) {
    let isSpinning = false;

    document.getElementById('spinButton').addEventListener('click', function () {
        if (!isSpinning) {
            isSpinning = true;
            spinWheel(words, canvas, resultElement);
        }
    });
}

function spinWheel(words, canvas, resultElement) {
    const wheelRadius = 300;
    const context = canvas.getContext('2d');
    const numberOfSegments = words.length;
    const angle = (2 * Math.PI) / numberOfSegments;

    let currentAngle = Math.random() * (Math.PI * 2);
    let spinSpeed = 0.3;

    function drawWheel() {
        context.clearRect(-wheelRadius, -wheelRadius, canvas.width, canvas.height);
        context.translate(wheelRadius, wheelRadius);
        context.rotate(currentAngle);
    
        for (let i = 0; i < numberOfSegments; i++) {
            context.beginPath();
            context.moveTo(0, 0);
            context.arc(0, 0, wheelRadius, i * angle, (i + 1) * angle);
            context.fillStyle = 'red'; // Set the fill color to red
            context.strokeStyle = 'black'; // Set the border color to black
            context.lineWidth = 3; // Set the border width
    
            context.fill();
            context.stroke();
    
            // Add text to the segment
            context.save();
            context.rotate(i * angle + angle / 2);
            context.fillStyle = 'white';
            context.font = '14px Arial';
            context.fillText(words[i], wheelRadius - 150, 5);
            context.restore();
        }
    
        context.setTransform(1, 0, 0, 1, 0, 0);
    }
    

    function rotateWheel() {
        currentAngle += spinSpeed;
    
        drawWheel();
    
        r = 0.99;
        spinSpeed *= r; // Gradually slow down

        if (spinSpeed > 0.001) {
            requestAnimationFrame(rotateWheel);
        } else {
            isSpinning = false;
            spinWheelSetup(words, canvas, resultElement); // Allow spinning again
        }
    }

    rotateWheel();
}
