const cards_template = [
    { status: null, original: 'sun', translations: ['сонце'], img: 'img/sun.jpg' },
    { status: null, original: 'car', translations: ['автомобіль', 'авто', 'машина'], img: 'img/car.jpg' },
    { status: null, original: 'cat', translations: ['кіт','кішка'], img: 'img/cat.jpg' },
    { status: null, original: 'house', translations: ['будинок', 'дім'], img: 'img/house.jpg' },
    { status: null, original: 'tree', translations: ['дерево'], img: 'img/tree.jpg' },
    { status: null, original: 'bun', translations: ['булочка','булка'], img: 'img/bun.jpg' },
    { status: null, original: 'book', translations: ['книга'], img: 'img/book.jpg' },
    { status: null, original: 'fish', translations: ['риба','рибина'], img: 'img/fish.jpg' },
    { status: null, original: 'dog', translations: ['собака','пес'], img: 'img/dog.jpg' },
    { status: null, original: 'flower', translations: ['квітка'], img: 'img/flower.jpg' },
];

let cards = [];

let data = {
    correct: 0,
    incorrect: 0,
    pos: 0,
}
function shuffleCards() {
    cards = [...cards_template];
    let currIdx = cards.length, rndIdx;
    while (currIdx !== 0) {
        rndIdx = Math.floor(Math.random() * currIdx);
        currIdx--;
        [cards[currIdx], cards[rndIdx]] = [cards[rndIdx], cards[currIdx]];
    }
}
function nextCard() {
    if (data.pos < cards.length - 1) {
        data.pos++;
        loadContents();
    }
}

function prevCard() {
    if (data.pos > 0) {
        data.pos--;
        loadContents();
    }
}


function isAllCardsNotNull() {
    let cnt = 0;
    cards.forEach(e => {
        if (e.status !== null) ++cnt;
    });

    return cnt === 10;
}

function check() {
    let answer = $('#enter input').val().toLowerCase().trim();
    $('#enter input').val(null);
    if (cards[data.pos].translations.includes(answer)) {
        data.correct++;
        cards[data.pos].status = true;
    } else {
        data.incorrect++;
        cards[data.pos].status = false;
    }

    if (isAllCardsNotNull()) {
        $('#again-modalw .text').text(`Ви вгадали ${data.correct}/10!`);
        $('#again-modalw').show();
        return;
    }

    data.pos++;
    loadContents();
}

function disableEnter() {
    $('#enter button').prop('disabled', true);
    $('#enter input').prop('disabled', true);
}

function enableEnter() {
    $('#enter button').prop('disabled', false);
    $('#enter input').prop('disabled', false);
}

function loadContents(idx = null) {
    $('#stat > .correct').text(`Правильно ${data.correct}/10`);
    $('#stat > .incorrect').text(`Неправильно ${data.incorrect}/10`);

    if (idx === null) idx = data.pos;

    $('#guess-block img').attr('src', cards[idx].img);
    $('#guess-block img').attr('alt', cards[idx].original);
    $('#guess-block .word').text(cards[idx].original);

    if (cards[idx].status === true) {
        $('#guess-block').addClass('correct');
        disableEnter();
    } else if (cards[idx].status === false) {
        $('#guess-block').addClass('incorrect');
        disableEnter();
    } else {
        enableEnter();
        $('#guess-block').removeClass('correct');
        $('#guess-block').removeClass('incorrect');
    }
    $('#card-nav .card-pos').text(`${idx+1}/10`);
}

$('#again-modalw').hide();
$('#again-modalw button').click(() => window.location.reload());
shuffleCards();
$('#submit').click(check);
$(document).on('keypress', (ev) => {
    if (ev.defaultPrevented) return;
    if (ev.key === 'Enter') check();
});
loadContents();

