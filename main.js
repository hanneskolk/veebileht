let words = [];

function addWord() {
    const wordInput = document.getElementById('wordInput');
    const word = wordInput.value.trim();

    if (word !== '') {
        if (words.length < 50) {
            words.push(word);
            wordInput.value = '';
            createInputField();
        } else {
            alert('Maximum inputs reached (25 words).');
        }
    }
}

function createInputField() {
    const formSection = document.getElementById('formSection');
    const inputContainer = document.createElement('div');
    inputContainer.textContent = words[words.length - 1];
    formSection.appendChild(inputContainer);
}

function goToWheel() {
    if (words.length > 0) {
        // Redirect to the wheel page
        window.location.href = 'wheel.html';

        // Save words in localStorage for the wheel page
        localStorage.setItem('words', JSON.stringify(words));
    } else {
        alert('Please add at least one word before going to the wheel.');
    }
}

function goToAboutPage() {
    window.location.href = 'aboutpagebeta.html';
}
