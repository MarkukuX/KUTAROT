let deck = [];
const cardSound = document.getElementById('cardSound');

function initDeck() {
    // 确保深拷贝牌组数据
    deck = [...tarotData.majorArcana, ...tarotData.minorArcana];
    console.log("初始化牌组数量：", deck.length); // 用于调试
    shuffleDeck();
}

function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    console.log("洗牌后牌组数量：", deck.length); // 用于调试
}

function createCardElement(card, isReversed = false) {
    const cardDiv = document.createElement('div');
    cardDiv.className = `tarot-card ${isReversed ? 'reversed' : ''}`;
    
    cardDiv.innerHTML = `
        <div class="card-inner">
            <div class="card-front">
                <img src="${card.image}" class="card-image" alt="${card.name}">
                <div class="card-name">${card.name}</div>
                <div class="card-position">${isReversed ? '逆位' : '正位'}</div>
            </div>
            <div class="card-back"></div>
        </div>
    `;

    return cardDiv;
}

async function drawOneCard() {
    if (deck.length === 0) {
        alert('牌组已空！请重新洗牌');
        return;
    }

    const cardsContainer = document.getElementById('cardsContainer');
    cardsContainer.innerHTML = '';
    
    const card = deck.pop();
    const isReversed = Math.random() < 0.5;
    
    await playDrawAnimation();
    
    const cardElement = createCardElement(card, isReversed);
    cardsContainer.appendChild(cardElement);
    
    setTimeout(() => {
        cardElement.classList.add('flipped');
        cardSound.play();
        showDescription(card, isReversed);
    }, 500);
}

async function drawThreeCards() {
    console.log("当前牌组数量：", deck.length); // 用于调试
    
    if (deck.length < 3) {
        alert('牌组剩余不足！请重新洗牌');
        return;
    }

    const cardsContainer = document.getElementById('cardsContainer');
    cardsContainer.innerHTML = '';
    
    // 一次性抽取三张牌
    const drawnCards = [];
    for (let i = 0; i < 3; i++) {
        const card = deck.pop();
        drawnCards.push({
            card: card,
            isReversed: Math.random() < 0.5
        });
    }
    
    // 依次显示每张牌
    for (let i = 0; i < drawnCards.length; i++) {
        const { card, isReversed } = drawnCards[i];
        
        await playDrawAnimation();
        
        const cardElement = createCardElement(card, isReversed);
        cardsContainer.appendChild(cardElement);
        
        await new Promise(resolve => {
            setTimeout(() => {
                cardElement.classList.add('flipped');
                showDescription(card, isReversed);
                resolve();
            }, 500);
        });
        
        await new Promise(resolve => setTimeout(resolve, 300));
    }
}

function playDrawAnimation() {
    return new Promise(resolve => {
        const animation = document.getElementById('drawAnimation');
        animation.classList.add('drawing');
        
        setTimeout(() => {
            animation.classList.remove('drawing');
            resolve();
        }, 300);
    });
}

function showDescription(card, isReversed) {
    const descriptionDiv = document.getElementById('cardDescription');
    const existingContent = descriptionDiv.innerHTML;
    
    const newContent = `
        <div class="card-reading">
            <h3>${card.name} ${isReversed ? '(逆位)' : '(正位)'}</h3>
            <p>${isReversed ? card.description.reversed : card.description.upright}</p>
        </div>
    `;
    
    // 对于多张牌，保留之前的描述
    descriptionDiv.innerHTML = existingContent + newContent;
    descriptionDiv.style.display = 'block';
}

function reshuffleDeck() {
    initDeck();
    document.getElementById('cardsContainer').innerHTML = '';
    document.getElementById('cardDescription').innerHTML = '';
    document.getElementById('cardDescription').style.display = 'none';
}

// 确保在页面加载时初始化牌组
document.addEventListener('DOMContentLoaded', () => {
    initDeck();
    console.log("页面加载完成，牌组初始化完毕");
}); 