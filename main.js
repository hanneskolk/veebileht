// Autorid: Armin Liiv, chatGPT

let words = [];

// Funktsioon sõna lisamiseks
function addWord() {
    const wordInput = document.getElementById('wordInput');
    const word = wordInput.value.trim();

    // Kontrollime, et sõna pole tühi
    if (word !== '') {
        // Kontrollime, et sõnade arv ei ületaks maksimaalset
        if (words.length < 24) {
            words.push(word);
            wordInput.value = '';
            // Loome sisestatud sõna jaoks uue välja
            createInputField();
        } else {
            alert('Maksimaalne sõnade arv ületatud');
        }
    }
}

// Funktsioon sisestatud sõna välja loomiseks
function createInputField() {
    const formSection = document.getElementById('formSection');
    const inputContainer = document.createElement('div');
    const lastWord = words[words.length - 1];

    // Määrame stiili sisestatud sõna väljale
    inputContainer.style.marginTop = '10px';
    inputContainer.style.padding = '8px';
    inputContainer.style.borderRadius = '5px';
    inputContainer.style.backgroundColor = '#555';
    inputContainer.style.color = 'white';
    inputContainer.style.cursor = 'pointer';

    inputContainer.textContent = lastWord; // Määrame sisu

    // Lisame kliki kuulaja, et klikitud sõna eemaldada
    inputContainer.addEventListener('click', function () {
        removeWord(this);
    });

    formSection.appendChild(inputContainer);
}

// Funktsioon sõna eemaldamiseks
function removeWord(container) {
    const wordToRemove = container.textContent;
    const indexToRemove = words.indexOf(wordToRemove);

    // Kontrollime, et sõna leiti
    if (indexToRemove !== -1) {
        words.splice(indexToRemove, 1);
        container.remove();
    }
}

// Funktsioon liikumiseks ratta lehele
function goToWheel() {
    if (words.length > 0) {
        // Suuname ratta lehele
        window.location.href = 'wheel.html';

        // Salvestame sõnad localStorage'i ratta lehe jaoks
        localStorage.setItem('words', JSON.stringify(words));
    } else {
        alert('Palun lisa vähemalt üks sõna.');
    }
}

// Funktsioon liikumiseks "Meist" lehele
function goToAboutPage() {
    window.location.href = 'aboutpagebeta.html';
}
