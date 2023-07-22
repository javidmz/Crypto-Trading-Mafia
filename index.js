import CRYPTO_API_KEY from "./apikey.js";

let page = 1, pageWord = 'one';
let starList, numbPreMark = 4;

if(window.outerWidth < 851) {
    scrollX();
}

if(window.outerWidth < 481) {
    document.querySelector('.fa-bars').classList.remove('passive');
}

window.addEventListener('resize', () => {
    if(window.outerWidth < 851) 
        scrollX();
    else {
        document.querySelector('.container').style.overflow = 'hidden';
        document.querySelector('.container').style.overflowX = 'hidden';    
    }

    if (window.outerWidth < 481) {
        document.querySelector('.fa-bars').classList.remove('passive');
        document.querySelector('.new-header-data').classList.remove('passive');
    }
    else {
        document.querySelector('.fa-bars').classList.add('passive');
        document.querySelector('.new-header-data').classList.add('passive');
    }
});

document.querySelector('.fa-bars').addEventListener('click', () => {
    document.querySelector('.new-menu').classList.add('active');
});

document.querySelector('.fa-x').addEventListener('click', () => {
    document.querySelector('.new-menu').classList.remove('active');
});

window.addEventListener('click', (e) => {
    if(e.target.classList.contains('menu-nav')) {
        document.querySelector('.new-menu').classList.remove('active');
        if(e.target.href.toString().includes('#cryptomarket'))
            displayMarket();
        if(e.target.href.toString().includes('#cryptomarket') && e.target.id == 'watch')
            displayWatchlist();
        if(e.target.href.toString().includes('#crypto-converter')) {
            document.querySelector('.market-container').classList.add('passive');
            document.querySelector('.market-converter').classList.add('active');
            calculator();
        }
    }

    if(e.target.classList.contains('new-header-data') && document.querySelector('.market-container').classList.contains('passive')) {
        document.querySelector('.market-container').classList.remove('passive');
        document.querySelector('.market-converter').classList.remove('active');    
    }

    if(e.target.classList.contains('fa-star') && !e.target.classList.contains('notChange')) {
        e.target.classList.toggle('fa-regular');
        e.target.classList.toggle('fa-solid');
        updateLocalStorage();
    }

    if(e.target.classList.contains('one')) {
        document.querySelector(`.${pageWord}`).style.backgroundColor = 'gray';
        document.querySelector('.one').style.backgroundColor = 'cadetblue';
        changePage(page, 1);
        page = 1;
        pageWord = 'one';
    }
    if(e.target.classList.contains('two')) {
        document.querySelector(`.${pageWord}`).style.backgroundColor = 'gray';
        document.querySelector('.two').style.backgroundColor = 'cadetblue';
        changePage(page, 2);
        page = 2;
        pageWord = 'two';
    }
    if(e.target.classList.contains('three')) {
        document.querySelector(`.${pageWord}`).style.backgroundColor = 'gray';
        document.querySelector('.three').style.backgroundColor = 'cadetblue';
        changePage(page, 3);
        page = 3;
        pageWord = 'three';
    }
    if(e.target.classList.contains('four')) {
        document.querySelector(`.${pageWord}`).style.backgroundColor = 'gray';
        document.querySelector('.four').style.backgroundColor = 'cadetblue';
        changePage(page, 4);
        page = 4;
        pageWord = 'four';
    }
    if(e.target.classList.contains('five')) {
        document.querySelector(`.${pageWord}`).style.backgroundColor = 'gray';
        document.querySelector('.five').style.backgroundColor = 'cadetblue';
        changePage(page, 5);
        page = 5;
        pageWord = 'five';
    }
});

window.addEventListener('scroll', () => {
    if(window.scrollY > 200)
        document.querySelector('nav').classList.add('sticky');
    else
        document.querySelector('nav').classList.remove('sticky');
});

document.querySelector('.watchlist').addEventListener('click', displayWatchlist);

document.querySelector('.market').addEventListener('click', displayMarket);

document.querySelector('.converter').addEventListener('click', () => {
    document.querySelector('.market-container').classList.add('passive');
    document.querySelector('.market-converter').classList.add('active');
    calculator();
});

document.querySelector('#amount').addEventListener('change', calculator);

document.querySelector('#fromCurrency').addEventListener('change', calculator);

document.querySelector('#toCurrency').addEventListener('change', calculator);

document.querySelector('.arrow-container').addEventListener('click', () => {
    let temp = document.getElementById('fromCurrency').value;
    document.getElementById('fromCurrency').value = document.getElementById('toCurrency').value;
    document.getElementById('toCurrency').value = temp;
    calculator();
});

async function uploadData() {
    const url = 'https://coingecko.p.rapidapi.com/coins/markets?vs_currency=usd&page=1&per_page=100&order=market_cap_desc';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': CRYPTO_API_KEY,
            'X-RapidAPI-Host': 'coingecko.p.rapidapi.com',
            'Content-type': 'application/json'
        }
    };
    const response = await fetch(url, options);
    const results = await response.json();
    if(response.status == 200) {
        document.querySelector('.market-loader').remove();

        if(window.outerWidth < 481) {
            document.querySelector('.new-header-data').classList.remove('passive');
        }

        results.forEach((result, index) => {
            let obj = {
                name: result.name,
                img: result.image,
                currentPrice: result.current_price,
                todayVolumeChange: result.market_cap_change_percentage_24h,
                marketCup: result.market_cap
            };

            if(index < numbPreMark)
                preMarket(obj);
            box(obj);
        });
        toggleVisibility(page);
    }
}

function preMarket(obj) {
    let newColumn = document.createElement('div');
    let newName = document.createElement('div');
    let newImg = document.createElement('img');
    let newTodayVolumeChange = document.createElement('div');
    let newPrice = document.createElement('div');
    let newDiv = document.createElement('div');
    newImg.src = obj.img;
    newName.textContent = obj.name;
    newTodayVolumeChange.textContent = `${obj.todayVolumeChange.toFixed(2)}%`;
    newTodayVolumeChange.style.color = Number(obj.todayVolumeChange) < 0 ? 'red' : 'green';
    newPrice.textContent = `$ ${obj.currentPrice.toFixed(2)}`;
    newDiv.appendChild(newName);
    newDiv.appendChild(newTodayVolumeChange);
    newColumn.appendChild(newImg);
    newColumn.appendChild(newDiv);
    newColumn.appendChild(newPrice);
    newColumn.classList.add('header-data');
    newDiv.classList.add('header-data-div');
    document.querySelector('.header-market').appendChild(newColumn);
}

function box(obj) {
    let newRow = document.createElement('div');
    let newCoin = document.createElement('div');
    let newName = document.createElement('div');
    let newPrice = document.createElement('div');
    let newTodayVolumeChange = document.createElement('div');
    let newMarketCup = document.createElement('div');
    let newImg = document.createElement('img');
    let newStarIcon = document.createElement('i');
    newImg.src = obj.img;
    newName.innerText += obj.name;
    newName.id = obj.name;
    newPrice.innerText = `$ ${obj.currentPrice.toFixed(2)}`;
    newTodayVolumeChange.innerText = `${obj.todayVolumeChange.toFixed(2)}%`;
    newTodayVolumeChange.style.color = Number(obj.todayVolumeChange) < 0 ? 'red' : 'green';
    newMarketCup.innerText = `$ ${obj.marketCup}`;
    newImg.src = obj.img;
    newRow.appendChild(newStarIcon);
    newCoin.appendChild(newImg);
    newCoin.appendChild(newName);
    newRow.appendChild(newCoin);
    newRow.appendChild(newPrice);
    newRow.appendChild(newTodayVolumeChange);
    newRow.appendChild(newMarketCup);
    newCoin.classList.add('coin');
    newPrice.classList.add('center');
    newTodayVolumeChange.classList.add('center');
    newMarketCup.classList.add('center');
    newStarIcon.classList.add('fa-regular');
    newStarIcon.classList.add('fa-star');
    newRow.classList.add('newRow');
    document.querySelector('.container-body').appendChild(newRow);
}

function toggleVisibility(page) {
    document.querySelectorAll('.newRow').forEach((row, index) => {
        if(index < page * 20 && index >= (page - 1) * 20)
            row.classList.toggle('active');
    });
}

function changePage(fromPage, toPage) {
    toggleVisibility(fromPage);
    toggleVisibility(toPage);
}

function displayWatchlist() {
    if(document.querySelector('.market-container').classList.contains('passive')) {
        document.querySelector('.market-converter').classList.remove('active');
        document.querySelector('.market-container').classList.remove('passive');
    }
    document.querySelectorAll('.newRow').forEach(row => {
        if(row.firstChild.classList.contains('fa-solid'))
            row.classList.add('active');
        else 
            row.classList.remove('active');
    });

    document.querySelector('.pages-container').classList.add('passive');
}

function displayMarket() {
    if(document.querySelector('.market-container').classList.contains('passive')) {
        document.querySelector('.market-converter').classList.remove('active');
        document.querySelector('.market-container').classList.remove('passive');
    }
    document.querySelectorAll('.newRow.active').forEach(row => {
        row.classList.remove('active');
    });

    toggleVisibility(page);
    document.querySelector('.pages-container').classList.remove('passive');
}

const currencyMap = new Map([
    ['BTC', 'Bitcoin'],
    ['ETH', 'Ethereum'],
    ['USD', 'Tether'],
    ['BNB', 'BNB'],
    ['XRP', 'XRP'],
    ['SOL', 'Solona'],
    ['ADA', 'Cardona'],
    ['DOGE', 'Dogecoin'],
    ['MATIC', 'Polygon']
]);

async function calculator() {
    const firstCurrency = document.querySelector('#fromCurrency').value;
    const secondCurrency = document.querySelector('#toCurrency').value;
    const amount = document.querySelector('#amount').value;
    document.querySelector('.first-price').innerText = `${amount} ${currencyMap.get(firstCurrency)} (${firstCurrency})`;
    document.querySelector('.price-loader').innerText = '';
    document.querySelector('.price-loader').classList.add('active');
    document.querySelector('.second-price').innerText = ` ${currencyMap.get(secondCurrency)} (${secondCurrency})`;
    
    if(window.outerWidth < 480) {
        document.querySelector('.first-price').innerText = `${amount} ${firstCurrency}`;
        document.querySelector('.second-price').innerText = ` ${secondCurrency}`;
    }

    const url = 'https://alpha-vantage.p.rapidapi.com/query?from_currency=BTC&function=CURRENCY_EXCHANGE_RATE&to_currency=USD';
    let newUrl = url;
    newUrl = newUrl.replace('BTC', firstCurrency);
    newUrl = newUrl.replace('USD', secondCurrency);

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': CRYPTO_API_KEY,
            'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com',
            'Content-type': 'application/json'
        }
    };
    const response = await fetch(newUrl, options);
    const result = await response.json();
    if(response.status === 200) {
        console.log(result);
        document.querySelector('.price-loader').classList.remove('active');
        document.querySelector('.price-loader').textContent = `${(amount * result["Realtime Currency Exchange Rate"]["5. Exchange Rate"]).toFixed(2)}`;
    }
}

function updateLocalStorage() {
    starList = [];

    let stars = document.querySelectorAll('.newRow .fa-solid');
    for(let index = 0; index < stars.length; index++) {
        starList.push({
            id: stars[index].nextSibling.lastChild.id
        });
    }
    localStorage.setItem('favList', JSON.stringify(starList));
}

function displayFavCoins() {
    starList = JSON.parse(localStorage.getItem('favList'));
    let coins = document.querySelectorAll('.newRow .coin');

    if(starList) {
        starList.forEach(star => {
            for(let index = 0; index < coins.length; index++) {
                if(coins[index].lastChild.id === star.id) {
                    coins[index].parentElement.firstChild.classList.toggle('fa-regular');
                    coins[index].parentElement.firstChild.classList.toggle('fa-solid');
                }
            }
        });
    }
}

function scrollX() {
    document.querySelector('.container').style.overflow = 'hidden';
    document.querySelector('.container').style.overflowX = 'scroll';
}

await uploadData();
displayFavCoins();