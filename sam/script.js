const startButton = document.getElementById('startButton');
const output = document.getElementById('output');
const correctSentenceInput = document.getElementById('correctSentence');

let correctSentence = '';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'en-US';

recognition.onstart = () => {
    output.textContent = 'Listening...';
};

recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    output.textContent = `You said: ${transcript}`;

    if (correctSentence && transcript.toLowerCase() === correctSentence.toLowerCase()) {
        output.textContent += ' - Pronunciation is correct!';
    } else if (correctSentence) {
        output.textContent += ' - Pronunciation is incorrect.';
    }
};

startButton.addEventListener('click', () => {
    correctSentence = correctSentenceInput.value;
    recognition.start();
});
