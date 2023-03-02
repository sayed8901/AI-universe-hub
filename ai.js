// fetching the ai universe url to get data from it.
const loadData = async() => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayData(data.data.tools);
    }
    catch(error){
        console.log(error);
    }
}

const displayData = data => {
    console.log(data);
    const cardContainer = document.getElementById('card-container');
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
        cardContainer.appendChild(cardDiv);
    });
}



loadData()