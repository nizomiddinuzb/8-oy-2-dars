interface User {
    name: string;
    surname: string;
    age: number;
    unmarried: string;
    job: string;
    hobbie: string;
}

const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
const userCards = document.getElementById('userCards') as HTMLDivElement;

const submitButton = document.getElementById('submit') as HTMLButtonElement;
submitButton.addEventListener('click', () => {
    const nameInput = document.getElementById('name') as HTMLInputElement;
    const surnameInput = document.getElementById('surname') as HTMLInputElement;
    const ageInput = document.getElementById('age') as HTMLInputElement;
    const unmarriedInput = document.getElementById('unmarried') as HTMLInputElement;
    const jobInput = document.getElementById('job') as HTMLInputElement;
    const hobbieInput = document.getElementById('hobbie') as HTMLInputElement;

    const name = nameInput.value;
    const surname = surnameInput.value;
    const age = parseInt(ageInput.value);
    const unmarried = unmarriedInput.value;
    const job = jobInput.value;
    const hobbie = hobbieInput.value;

    if (name && surname && !isNaN(age) && unmarried && job && hobbie) {
        const newUser: User = { name, surname, age, unmarried, job, hobbie };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        displayUser(newUser);
    }
});

function displayUser(user: User) {
    const userCard = document.createElement('div');
    userCard.innerHTML = `
    <div class="w-[300px] mx-auto border-double border-4 border-sky-500 p-4 mt-4">
        <h3 class="font-bold">${user.name} ${user.surname}</h3>
        <p>Age: ${user.age}</p>
        <p>Unmarried: ${user.unmarried}</p>
        <p>Job: ${user.job}</p>
        <p>Hobbie: ${user.hobbie}</p>
        <button class="delete-button bg-red-500 text-white px-4 py-2 mt-4">Delete</button>
    </div>
    `;

    const deleteButton = userCard.querySelector('.delete-button') as HTMLButtonElement;
    deleteButton.addEventListener('click', () => {
        const index = users.indexOf(user);
        if (index > -1) {
            users.splice(index, 1);
            localStorage.setItem('users', JSON.stringify(users));
        }
        userCards.removeChild(userCard);
    });

    userCards.appendChild(userCard);
}

// Initial rendering of users from Local Storage
users.forEach(displayUser);
