const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const deleteUserBtn = document.getElementById('delete-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();

// Fetch random user and add money
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    
    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }

    addData(newUser);
}

// Add new object to data array
function addData(obj) {
    data.push(obj);

    updateDOM();
}

// Delete Last User
function deleteLastUser() {
    data.splice(data.length - 1);

    updateDOM();
}

// Double everyone's money
function doubleMoney() {
    data = data.map((user) => {
        return { ...user, money: user.money * 2 }
    });

    updateDOM();
}

// Sorts user by wealth
function sortByRichest() {
    data.sort((a,b) => b.money - a.money);

    updateDOM();
}

// Show Millionaires
function filterByMillionaires() {
    data = data.filter((item) => item.money > 1000000);

    updateDOM();
}

// Calculate total wealth
function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc+=user.money), 0);

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthEl);
}

// Update DOM
function updateDOM(providedData = data) {
    // Clear main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    providedData.forEach((item) => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    });
}

// Format number as money
function formatMoney(number) {
    const curr = number.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR'
     });

    return curr;
}

// Event Listeners
addUserBtn.addEventListener('click', getRandomUser);
deleteUserBtn.addEventListener('click', deleteLastUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', filterByMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);