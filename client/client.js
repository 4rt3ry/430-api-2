const nameForm = document.querySelector("#nameForm");
const userForm = document.querySelector("#userForm");
const contentSection = document.querySelector("#content");
// const addUserBtn = nameForm.querySelector("input[type='submit']");
// const getUserBtn = userForm.querySelector("input[type='submit']");

const handleResponse = (response) => {
    response.text().then(text => {
        const headers = {
            200: 'Success',
            201: 'Created',
            204: 'Updated (no content)',
            400: 'Bad Request',
            404: 'Not Found'
        }

        if (response.status > 299) console.log(text)

        contentSection.innerHTML = "";

        const title = document.createElement("h1");
        const body = document.createElement("p");
        title.textContent = headers[response.status] || headers[404];

        if (text.length > 0) {
            try {
                const content = JSON.parse(text);
                if (content.message) body.textContent = `Message: ${content.message}`;
                else body.textContent = text;
            }
            catch {
                body.textContent = text;
            }
        }

        contentSection.appendChild(title);
        contentSection.appendChild(body);
    })
}

const requestGetUser = (formData) => {
    const request = formData.querySelector("#urlField").value;
    const method = formData.querySelector("#methodSelect").value;
    const content = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(request, content).then(handleResponse);
}

const requestAddUser = (formData) => {
    const name = formData.querySelector("#nameField").value;
    const age = Number(formData.querySelector("#ageField").value);

    const content = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, age }),
    }

    fetch('addUsers', content).then(handleResponse);
}

const setupUI = () => {
    const processForm = (callback) => (e) => {
        e.preventDefault();
        callback(e.target);
        return true;
    }
    nameForm.addEventListener('submit', processForm(requestAddUser));
    userForm.addEventListener('submit', processForm(requestGetUser));

}

setupUI();