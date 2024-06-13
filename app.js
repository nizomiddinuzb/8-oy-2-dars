var users = JSON.parse(localStorage.getItem('users') || '[]');
var userCards = document.getElementById('userCards');
var submitButton = document.getElementById('submit');
submitButton.addEventListener('click', function () {
    var nameInput = document.getElementById('name');
    var surnameInput = document.getElementById('surname');
    var ageInput = document.getElementById('age');
    var unmarriedInput = document.getElementById('unmarried');
    var jobInput = document.getElementById('job');
    var hobbieInput = document.getElementById('hobbie');
    var name = nameInput.value;
    var surname = surnameInput.value;
    var age = parseInt(ageInput.value);
    var unmarried = unmarriedInput.value;
    var job = jobInput.value;
    var hobbie = hobbieInput.value;
    if (name && surname && !isNaN(age) && unmarried && job && hobbie) {
        var newUser = { name: name, surname: surname, age: age, unmarried: unmarried, job: job, hobbie: hobbie };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        displayUser(newUser);
    }
});
function displayUser(user) {
    var userCard = document.createElement('div');
    userCard.innerHTML = "\n    <div class=\"w-[300px] mx-auto border-double border-4 border-sky-500 p-4 mt-4\">\n        <h3 class=\"font-bold\">".concat(user.name, " ").concat(user.surname, "</h3>\n        <p>Age: ").concat(user.age, "</p>\n        <p>Unmarried: ").concat(user.unmarried, "</p>\n        <p>Job: ").concat(user.job, "</p>\n        <p>Hobbie: ").concat(user.hobbie, "</p>\n        <button class=\"delete-button bg-red-500 text-white px-4 py-2 mt-4\">Delete</button>\n    </div>\n    ");
    var deleteButton = userCard.querySelector('.delete-button');
    deleteButton.addEventListener('click', function () {
        var index = users.indexOf(user);
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
