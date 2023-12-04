// Autorid: Armin Liiv, chatGPT

document.addEventListener('DOMContentLoaded', function () {
    const words = JSON.parse(localStorage.getItem('words'));
    const wheelSection = document.getElementById('wheelSection');
    const wheelCanvas = document.getElementById('wheelCanvas');
    const resultElement = document.getElementById('result');

    if (words && words.length > 0) {
        // Loome ratta
        createWheel(words, wheelCanvas);
        // Seadistame ratta keerlemise
        spinWheelSetup(words, wheelCanvas, resultElement);
    } else {
        // Kui sõnu pole, näitame vastavat teadet
        wheelSection.innerHTML = '<p>Sõnu pole saadaval. Palun mine tagasi ja lisa mõned sõnad.</p>';
    }

    // Nupp "Tagasi algusesse"
    document.getElementById('goBackButton').addEventListener('click', function () {
        window.location.href = 'pealeht.html';
    });
});

// Funktsioon ratta loomiseks
function createWheel(words, canvas) {
    const wheelRadius = 300;
    const context = canvas.getContext('2d');
    const numberOfSegments = words.length;

    // Seadistame lõuendi suuruse
    canvas.width = wheelRadius * 2;
    canvas.height = wheelRadius * 2;

    // Arvutame sektori nurga
    const angle = (2 * Math.PI) / numberOfSegments;

    // Liigutame konteksti ratta keskpunkti
    context.translate(wheelRadius, wheelRadius);

    // Loome iga sektori ratta peal
    for (let i = 0; i < numberOfSegments; i++) {
        context.beginPath();
        context.moveTo(0, 0);
        context.arc(0, 0, wheelRadius, i * angle, (i + 1) * angle);
        // Määrame täitevärvi, ääre värvi ja ääre laiuse
        context.fillStyle = 'red';
        context.strokeStyle = 'black';
        context.lineWidth = 3;

        // Täidame sektori ja lisame teksti
        context.fill();
        context.stroke();

        // Salvestame konteksti ja lisame teksti sektorisse
        context.save();
        context.rotate(i * angle + angle / 2);
        context.fillStyle = 'white';
        context.font = '16px Arial';
        context.fillText(words[i], wheelRadius - 150, 5);
        context.restore();
    }
}

// Funktsioon ratta keerlemise seadistamiseks
function spinWheelSetup(words, canvas, resultElement) {
    let isSpinning = false;

    // Lisame "Keeruta ratast" nupu
    document.getElementById('spinButton').addEventListener('click', function () {
        if (!isSpinning) {
            isSpinning = true;
            // Käivitame ratta keerlemise
            spinWheel(words, canvas, resultElement);
        }
    });
}

// Funktsioon ratta keerlemiseks
function spinWheel(words, canvas, resultElement) {
    const wheelRadius = 300;
    const context = canvas.getContext('2d');
    const numberOfSegments = words.length;
    const angle = (2 * Math.PI) / numberOfSegments;

    let currentAngle = Math.random() * (Math.PI * 2);
    let spinSpeed = 0.3;

    // Funktsioon ratta joonistamiseks
    function drawWheel() {
        context.clearRect(-wheelRadius, -wheelRadius, canvas.width, canvas.height);
        context.translate(wheelRadius, wheelRadius);
        context.rotate(currentAngle);

        // Loome uuesti ratta iga sektori
        for (let i = 0; i < numberOfSegments; i++) {
            context.beginPath();
            context.moveTo(0, 0);
            context.arc(0, 0, wheelRadius, i * angle, (i + 1) * angle);
            context.fillStyle = 'red';
            context.strokeStyle = 'black';
            context.lineWidth = 3;

            context.fill();
            context.stroke();

            // Lisame teksti sektoritesse
            context.save();
            context.rotate(i * angle + angle / 2);
            context.fillStyle = 'white';
            context.font = '14px Arial';
            context.fillText(words[i], wheelRadius - 150, 5);
            context.restore();
        }

        context.setTransform(1, 0, 0, 1, 0, 0);
    }

    // Funktsioon ratta keerlemiseks
    function rotateWheel() {
        currentAngle += spinSpeed;

        // Joonistame ratta
        drawWheel();

        r = 0.99;
        spinSpeed *= r;

        // Kui ratas keerleb veel, jätkame animatsiooni
        if (spinSpeed > 0.001) {
            requestAnimationFrame(rotateWheel);
        } else {
            // Lõpetasime keerlemise, lubame uuesti keerutada
            isSpinning = false;
            spinWheelSetup(words, canvas, resultElement);
        }
    }

    // Alustame ratta keerlemist
    rotateWheel();
}
