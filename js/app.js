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
    fetch(url)
    .then(response => response.json())
    .then(data => displayPhones(data.data.slice(0,20)))
    searchText.value = '';
}

const displayPhones = phones => {
    console.log(phones);
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
        
    })
    toggleSpinner('none');
    toggleSearchResult('block');
}