
function renderFrontPage() {
    var doc = document.getElementById("start");
    for (var i = 0; i < data.ASSETS.Box.length; i++) {
        doc.appendChild(createLI(data.ASSETS.Box[i]));
    }
}

function createLI(item) {
    var node = document.createElement("li");
    var textnode = document.createTextNode(item.content);
    node.appendChild(chreateAnchor(item, node));
    return node;
}

function chreateAnchor(item, node) {
    var link = document.createElement("a");
    var textnode = document.createTextNode(item.content);
    link.title = item.content;
    link.appendChild(textnode);
    link.onclick = function () { clickHandler(item.lesson, node) }
    return link;
}

function renderLetters(letters) {
    var doc = document.getElementById("letters");
    while (doc.firstChild) {
        doc.removeChild(doc.firstChild);
    }
    console.log(letters);
    if (letters.list_letters != "") {
        for (var i = 0; i < letters.list_letters.letter.length; i++) {
            doc.appendChild(renderLetter(letters.list_letters.letter[i]));
        }
    }
}

function renderLetter(letter) {
    var span = document.createElement('li');
    var audio = document.createElement('audio');
    audio.setAttribute('controls', '');
    audio.setAttribute('style', 'display:none');

    audio.src = 'http://ceres.napier.ac.uk/staff/alistair/GaelicparentHelp/' + letter.sound_link;

    var link = document.createElement("a");
    var textnode = document.createTextNode(letter.text);
    link.appendChild(textnode);
    link.href = '#';
    link.onclick = function () { audio.play(); }
    span.appendChild(audio);
    span.appendChild(link);
    return span;
}

function renderWords(letters) {
    var doc = document.getElementById("words");
    while (doc.firstChild) {
        doc.removeChild(doc.firstChild);
    }
    console.log(letters);
    for (var i = 0; i < letters.list_words.word.length; i++) {
        doc.appendChild(renderWord(letters.list_words.word[i]));
    }
}

function renderWord(letter) {
    var span = document.createElement('li');
    var audio = document.createElement('audio');
    audio.setAttribute('controls', '');
    audio.setAttribute('style', 'display:none');

    audio.src = 'http://ceres.napier.ac.uk/staff/alistair/GaelicparentHelp/' + letter.sound_link;

    var link = document.createElement("a");
    var textnode = document.createTextNode(letter.text);
    link.appendChild(textnode);
    var phonic_sounds = [];
    if (letter.list_sounds) {
        phonic_sounds = letter.list_sounds.sound;
    } else if (letter.list_phonics) {
        phonic_sounds = letter.list_phonics.phonic;
    }

    link.onclick = function () { toggleActive(span); renderPhonics(phonic_sounds); audio.play(); }
    span.appendChild(audio);
    span.appendChild(link);
    return span;
}

function clearPhonics() {
    var doc = document.getElementById("phonics");
    while (doc.firstChild) {
        doc.removeChild(doc.firstChild);
    }
}

function renderPhonics(sounds) {

    clearPhonics();
    var doc = document.getElementById("phonics");

    console.log(letters);
    for (var i = 0; i < sounds.length; i++) {
        doc.appendChild(renderPhonic(sounds[i]));
    }
}

function renderPhonic(phonic) {
    var span = document.createElement('li');
    var audio = document.createElement('audio');
    audio.setAttribute('controls', '');
    audio.setAttribute('style', 'display:none');

    audio.src = 'http://ceres.napier.ac.uk/staff/alistair/GaelicparentHelp/' + phonic.sound_link;

    var link = document.createElement("a");
    var textnode = document.createTextNode(phonic.text);
    link.appendChild(textnode);
    link.onclick = function () { audio.play(); }
    span.appendChild(audio);
    span.appendChild(link);
    return span;
}


function toggleActive(node) {
    var nodes = node.parentNode.childNodes;
    for (i = 0; i < nodes.length; i++) {
        nodes[i].removeAttribute('class');
    }
    node.setAttribute('class', 'active');
}

function clickHandler(lesson, node) {
    renderLetters(lesson.BOX);
    renderWords(lesson.BOX);
    toggleActive(node);
    clearPhonics();

}