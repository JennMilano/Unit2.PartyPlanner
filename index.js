const API_URL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2411-FSA-ET-WEB-PT-jm/events';

// fetch data and show as list
// delete button for each event
// data entered in form should create new event

/**
 * 👉 STEP 1: Create an object called state that holds an array for parties
 */
const state = {
    parties: [],
}

/**
 * 👉 STEP 2: Complete the function so that it:
 *    - uses `fetch` to make a GET request to the API
 *    - turns the response into json
 *    - stores the json of parties into state
 *    - calls `renderAllParties`
 */

const fetchAllParties = async () => {
    try {
        const response = await fetch(API_URL);
        const json = await response.json();

        state.parties = json.data;
        console.log(state.parties)

        renderAllParties();
    } catch (error) {
        console.log("ERROR in fetchAllParties", error);
    }
};

/**
 * 👉 STEP 3: Complete the function so that it:
 *    - uses `fetch` to make a POST request to the API sending the data passed in the body of the request
 *    - turns the response into json
 *    - calls `fetchAllParties`
 *
 * Note: date isn't used in this API but you will need to know how to work with it in the workshop
 */

const createNewParty = async (name, description, date, location) => {
    try {
        await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify({
                name,
                description,
                date: new Date(date).toISOString(),
                location,
            }),
            headers: {
                "content-type": "application/json"
            },

        });
        fetchAllParties();
    } catch (error) {
        console.log("ERROR in createNewParty", error);
    }
};

/**
 * 👉 STEP 4: Complete the function so that it:
 *    - uses `fetch` to make a DELETE request to the API to delete a party with the id passed to the function
 *    - calls `fetchAllParties`
 */

const removeParty = async (id) => {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });
        fetchAllParties();
    } catch (error) {
        console.log("ERROR in removeParty", error);
    }
};


// render all parties on the page

const renderAllParties = () => {
    const partyContainer = document.getElementById("party-container");
    const partyList = state.parties;

    if (!partyList || partyList.length === 0) {
        partyContainer.innerHTML = "<h3>No parties found.</h3>";
        return;
    }
//resets html of all parties
partyContainer.innterHTML = "";

partyList.forEach((party) => {
    const partyElement = document.createElement("div");
    // const nameLabel = document.createElement('nameLabel');
    partyElement.classList.add("party-card");
    partyElement.innerHTML = `
    <h4>${party.name}</h4>
    <p>${party.description}<p>
    <p>${party.date}<p>
    <p>${party.location}<p>
    <button class = "delete-button" data-id ="${party.id}">Remove</button>
    `;
    partyContainer.appendChild(partyElement);
    const deleteButton = partyElement.querySelector(".delete-button");

    deleteButton.addPartyListener("click", (occur) => {
        try{
            occur.preventDefault();
            removeParty(party.id);
        } catch (error) {
            console.log(error);
        }
    });
});
};

// adds a listener to our form so when we subnit the form we create a new party

const addListenerToForm = () => {
    const form = document.querySelector("#new-party-form");

    form.addEventListener("submit", async (occurance) => {
        occurance.preventDefault();

        await createNewParty(
            form.name.value,
            form.description.value,
            form.date.value,
            form.location.value
        );
        // clears form after new event is created
        form.name.value = "";
        form.description.value = "";
        form.date.value = "";
        form.location.value = "";
    });
};


// initial function when page loads
const init = async () => {
    // gets all the parties from the API
    await fetchAllParties

    // adds a listener to the forms o we can add a party when the user submits the form
    addListenerToForm();
};

init();