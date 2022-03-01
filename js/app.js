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
    phones.forEach(phone => {
        // console.log(phone);
        const div = document.createElement('div');
        div.className = "phone-container";
        div.innerHTML = `
        <div class="card border-0">
            <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <h6>${phone.brand}</h6>
                <a href="#" class="btn btn-danger">Explore More</a>
            </div>
        </div>
        `;
        divContainer.appendChild(div);
        errorMsg.innerText = '';
        
    })
    toggleSpinner('none');
    toggleSearchResult('block');
}