// fetching the ai universe url to get data from it.
const loadData = async(dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayData(data.data.tools, dataLimit);
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
        const {name, image, features, published_in} = card;
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
                    <button class="border-0 bg-danger-subtle rounded-circle text-danger" style="width: 50px; height: 50px;">
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
        console.log(sortedUrl);
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
