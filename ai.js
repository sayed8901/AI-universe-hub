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

    // description
    document.getElementById('description').innerText = `
        ${description ? description : 'More details area coming soon!'}
    `;

    // price
    document.getElementById('basic-price').innerText =
        `${pricing[0].price == '0' || pricing[0].price == 'No cost' ? 'free of cost/' : pricing[0].price} 
        basic`;
    document.getElementById('pro-price').innerText = 
        `${pricing[1].price == '0' || pricing[1].price == 'No cost' ? 'free of cost/' : pricing[1].price}
        Pro`;
    document.getElementById('enterprise-price').innerText = 
        `${pricing[2].price == '0' || pricing[2].price == 'Contact us ' || pricing[2].price == 'Contact us for pricing'? 'free of cost/' : pricing[2].price}
        Enterprise`;

    // features
    const featuresContainer = document.getElementById('features');
    featuresContainer.innerHTML = '';
    for(const feature in features){
        const featureItem = document.createElement('small');
        featureItem.innerText = `
            * ${features[feature].feature_name ? features[feature].feature_name : 'No data found'}
        `;
        featuresContainer.appendChild(featureItem);
    }

    // integrations
    const integrationsContainer = document.getElementById('integrations');
    integrationsContainer.innerHTML = '';
    for(const integration of integrations){
        const integrationItem = document.createElement('small');
        integrationItem.innerText = `
            * ${integration ? integration : 'No data found'}
        `;
        integrationsContainer.appendChild(integrationItem);
    }

    // modal image
    document.getElementById('modal-img').setAttribute('src',`${image_link[0] ? image_link[0] : image_link[1]}`);

    // accuracy notification
    const accuracyField = document.getElementById('accuracy');
    accuracyField.classList.remove('d-none');
    accuracyField.innerHTML = `
        ${accuracy.score ? accuracy.score*100 +'% accuracy' : 
        accuracyField.classList.add('d-none')}
    `;

    // example part
    document.getElementById('example-question').innerText = `
        ${input_output_examples[0].input ? input_output_examples[0].input : 'Can you give any example?'}
    `;
    document.getElementById('example-answer').innerText = `
        ${input_output_examples[0].output ? input_output_examples[0].output : 'Can you give any example?'}
    `;
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
