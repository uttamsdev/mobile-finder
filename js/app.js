const errorMsg = document.getElementById('error-msg');
// toggle spinner 
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
//toggle search result
const toggleSearchResult = displayStyle => {
    document.getElementById('search-result-toggle').style.display = displayStyle;
}
const loadPhones = () => {
    toggleSpinner('block');
    toggleSearchResult('none');
    const searchText = document.getElementById('input-field');
    const searchTextValue = (searchText.value).toLowerCase();
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchTextValue}`;
    // console.log(url);
    searchText.value = '';
    if(searchTextValue == ''){
        errorMsg.innerText = 'Search something... Input field cannot be empty.'
        toggleSpinner('none');
        return;
    }
    if(searchTextValue < 0){
        errorMsg.innerText = 'You cannot give negaitve value....'
        toggleSpinner('none');
        return;
    }
    fetch(url)
    .then(response => response.json())
    .then(data => displayPhones(data.data.slice(0,20)))
}

const displayPhones = phones => {
    console.log(phones);
    if(phones.length === 0){
        errorMsg.innerText = 'No phone found...';
        // return;
    }
    const divContainer = document.getElementById('search-result');
    divContainer.textContent = '';
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    phones.forEach(phone => {
        // console.log(phone);
        const div = document.createElement('div');
        div.className = "phone-container";
        div.innerHTML = `
        <div class="card border-0 text-center">
            <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <h6>${phone.brand}</h6>
                <a href="#" class="btn btn-danger" onclick="loadPhoneDetails('${phone.slug}')">Explore More</a>
            </div>
        </div>
        `;
        divContainer.appendChild(div);
        errorMsg.innerText = '';
        
    })
    toggleSpinner('none');
    toggleSearchResult('block');
}

const loadPhoneDetails = id => {
    // console.log(phoneId);
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
    .then(response => response.json())
    .then(data => displayPhoneDetails(data.data))
}

const displayPhoneDetails = phone => {
    console.log(phone.mainFeatures);
    const divContainer = document.getElementById('phone-details');
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <p class="text-danger"><span class="fw-bold text-black">Release date: </span>${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'}</p>
            <h4>Main Features: </h4>
            <p><span class="fw-bold">ChipSet : </span>${phone.mainFeatures.chipSet}</p>
            <p><span class="fw-bold">DisplaySize : </span>${phone.mainFeatures.displaySize}</p>
            <p><span class="fw-bold">Memory : </span>${phone.mainFeatures.memory}</p>
            <p><span class="fw-bold">Storage : </span>${phone.mainFeatures.storage}</p>
            </div>
        </div>
    `;
    divContainer.appendChild(div);
}