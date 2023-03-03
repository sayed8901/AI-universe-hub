// fetching the ai universe url to get data from it.
const loadData = async(dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayData(data.data.tools, dataLimit);
        // console.log(data.data.tools);
    }
    catch(error){
        console.log(error);
    }
}


// display info in the cards
const displayData = (data, dataLimit) => {    
    // to get the container
    const cardContainer = document.getElementById('card-container');

    // to display first 6 cards only
    const showAll = document.getElementById('show-all');
    if(data.length > dataLimit){
        data= data.slice(0, dataLimit);
        // to make visible 'see more' button
        cardContainer.innerHTML = '';
        showAll.classList.remove('d-none');
    }
    else{
        cardContainer.innerHTML = '';
        showAll.classList.add('d-none');
    }

    // dynamically adding info to each card
    data.forEach(card => {
        const {id, name, image, features, published_in} = card;
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col');
        cardDiv.innerHTML = `
            <div class="card rounded-3 p-3">
                <img src="${image}" class="card-img-top rounded-3" alt="...">
                <div class="card-body px-0">
                    <h5 class="card-title fw-bold">Features</h5>
                    <div class="d-flex flex-column">
                        <small class="p-0 m-0">1. ${features[0]}</small>
                        <small class="p-0 m-0">2. ${features[1]}</small>
                        <small >3. ${features[2]}</small>
                    </div>
                </div>
                <div class="card-footer bg-white d-flex justify-content-between align-items-center">
                    <div>
                        <h4 class="card-title fw-bold">${name}</h4>
                        <i class="fa-regular fa-calendar-check"></i>
                        <small>${published_in}</small>
                    </div>
                    <button class="border-0 bg-danger-subtle rounded-circle text-danger" style="width: 50px; height: 50px;"
                    data-bs-toggle="modal" data-bs-target="#exampleModal"
                    onclick="loadDetails('${id}')">
                        <i class="text-center fa-solid fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        `;
        // adding each card to its parent container
        cardContainer.appendChild(cardDiv);

        // spinner ends
        toggleSpinner(false);
    });
}

// fetching the url by individual id to get data from the it.
const loadDetails = async(id) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayDetails(data.data);
        // console.log(data.data);
    }
    catch(error){
        console.log(error);
    }
}


const displayDetails = serviceId => {
    const {description, image_link, features, integrations, pricing, input_output_examples, accuracy} = serviceId;

    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = '';

    const modalDiv = document.createElement('div');
    modalDiv.classList.add('row', 'row-cols-1', 'row-cols-lg-2', 'g-3');

    modalDiv.innerHTML = `
        <div class="col">
            <div class="card bg-danger-subtle border border-danger rounded-3">
                <div class="card-body">
                    <h5 class="card-title fw-bold">
                        ${description ? description : 'More details area coming soon!'}
                    </h5>
                    <div class="d-flex gap-2 my-4 justify-content-center align-items-center text-center">
                        <div class="bg-white rounded-3 text-success fw-bold py-3 px-2">
                            <small class="p-0 m-0"> 
                                ${pricing[0].price == '0' || pricing[0].price == 'No cost' ? 'free of cost/' : pricing[0].price}
                                Basic
                            </small>
                        </div>
                        <div class="bg-white rounded-3 text-warning fw-bold py-3 px-2">
                            <small class="p-0 m-0"> 
                                ${pricing[1].price == '0' || pricing[1].price == 'No cost' ? 'free of cost/' : pricing[1].price}
                                Pro
                            </small>
                        </div>
                        <div class="bg-white rounded-3 text-danger fw-bold py-3 px-2">
                            <small class="p-0 m-0"> 
                                ${pricing[2].price == '0' || pricing[2].price == 'Contact us ' || pricing[2].price == 'Contact us for pricing'? 'free of cost/' : pricing[2].price}
                                Enterprise
                            </small>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center gap-4">
                        <div class="d-flex flex-column">
                            <h5 class="fw-bold">Features</h5>
                            <small class="p-0 m-0">* ${features[1].feature_name}</small>
                            <small class="p-0 m-0">* ${features[2].feature_name}</small>
                            <small>* ${features[3].feature_name}</small>
                        </div>
                        <div class="d-flex flex-column">
                            <h5 class="fw-bold">Integrations</h5>
                            <small class="p-0 m-0">* ${integrations[0]}</small>
                            <small class="p-0 m-0">* ${integrations[1]}</small>
                            <small>* ${integrations[2]}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="col">
            <div class="card rounded-3 p-3">
                <div class="position-relative">
                    <img src="${image_link[0] ? image_link[0] : image_link[1]}" class="card-img-top rounded-3" alt="...">
                    <button class="btn btn-danger btn-sm position-absolute" style="top:10px; right: 10px"> 
                        ${accuracy.score ? accuracy.score*100 +'%' : 'No data available regarding'}
                        Accuracy
                    </button>
                </div>
                <div class="card-body text-center">
                    <h5 class="card-title fw-bold my-3">
                        ${input_output_examples[0].input ? input_output_examples[0].input : 'Can you give any example?'}
                    </h5>
                    <p class="card-text">
                        ${input_output_examples[0].output ? input_output_examples[0].output : 'No! Nit yet! Take a break!!!'}
                    </p>
                </div>
            </div>
        </div>
    `;
    modalContainer.appendChild(modalDiv);
}

// spinner loading function
const toggleSpinner = isLoading => {
    const spinner = document.getElementById('spinner');
    if(isLoading){
        spinner.classList.remove('d-none');
    }
    else{
        spinner.classList.add('d-none');
    }
}


// to set how many cards want to display at first load
loadData(6);
// spinner starts
toggleSpinner(true);

// to show all by clicking on 'see more' button
document.getElementById('btn-show-all').addEventListener('click', function(){
    loadData();
    // spinner starts
    toggleSpinner(true);
})







// sort by date part
document.getElementById('sort-result-by-latest-date').addEventListener('click', function(dataLimit){
    // fetching the ai universe url to get data from it.
    const loadData = async(dataLimit) => {
        const url = `https://openapi.programming-hero.com/api/ai/tools`;
        try{
            const res = await fetch(url);
            const data = await res.json();
            sort(data.data.tools, dataLimit);
        }
        catch(error){
            console.log(error);
        }
    }

    // function to sort the objects on an array according to the latest date
    customSort = (a,b) => {
        const dateA = new Date(a.published_in);
        const dateB = new Date(b.published_in);
        if(dateA < dateB) return 1;
        else if(dateA > dateB) return -1;
        else return 0;
    }

    // soring the original url array using the above mentioned function
    const sort = (url, dataLimit) => {
        const sortedUrl = url.sort(customSort);
        displayData(sortedUrl, dataLimit);
    }


    // to set how many cards want to display at first load
    loadData(6);
    // spinner starts
    toggleSpinner(true);

    // to show all by clicking on 'see more' button
    document.getElementById('btn-show-all').addEventListener('click', function(){
        loadData();
        // spinner starts
        toggleSpinner(true);
    })
})
