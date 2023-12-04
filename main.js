let words = [];

function addWord() {
    const wordInput = document.getElementById('wordInput');
    const word = wordInput.value.trim();

    if (word !== '') {
        if (words.length < 24) {
            words.push(word);
            wordInput.value = '';
            createInputField();
        } else {
            alert('Maksimaalne sõnade arv ületatud');
        }
    }
}

function createInputField() {
    const formSection = document.getElementById('formSection');
    const inputContainer = document.createElement('div');
    const lastWord = words[words.length - 1];
    
    inputContainer.style.marginTop = '10px'; // Adjust the margin as needed
    inputContainer.style.padding = '8px'; // Add padding for a rounded box
    inputContainer.style.borderRadius = '5px'; // Add border-radius for a rounded box
    inputContainer.style.backgroundColor = '#555'; // Gray background color
    inputContainer.style.color = 'white'; // Adjust the text color as needed
    inputContainer.style.cursor = 'pointer'; // Set cursor to pointer for click interaction

    inputContainer.textContent = lastWord; // Set the content

    // Add click event listener to remove the clicked word
    inputContainer.addEventListener('click', function () {
        removeWord(this);
    });

    formSection.appendChild(inputContainer);
}

function removeWord(container) {
    const wordToRemove = container.textContent;
    const indexToRemove = words.indexOf(wordToRemove);

    if (indexToRemove !== -1) {
        words.splice(indexToRemove, 1);
        container.remove();
    }
}


function goToWheel() {
    if (words.length > 0) {
        // Redirect to the wheel page
        window.location.href = 'wheel.html';

        // Save words in localStorage for the wheel page
        localStorage.setItem('words', JSON.stringify(words));
    } else {
        alert('Palun lisa vähemalt üks sõna.');
    }
}

function goToAboutPage() {
    window.location.href = 'aboutpagebeta.html';
}
