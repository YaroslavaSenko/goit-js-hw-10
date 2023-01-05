import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;



const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');

input.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

const fetchCountries = (name) => {
    const BASE_URL = 'https://restcountries.com/v2'
    const FILTER_RESPONSE = 'name,capital,population,flag,languages'

    return fetch(`${BASE_URL}/name/${name}?fields=${FILTER_RESPONSE}`)
        .then(response => {
            if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();});    
}

function searchCountry(e) {    
    const countriName = e.target.value.trim();

    if (countriName === '') {
        return;
    }
    fetchCountries(countriName)
        .then(countries => {
            clear();
              if (countries.length > 10) {
                Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
                return;
              }
              if (countries.length > 1) {
                markupCountries(countries);
                return;
              }
              markupOneCountry(countries);
            })
            
            .catch(() => Notiflix.Notify.info("Oops, there is no country with that name"));
}

function markupCountries(countries) {
    info.innerHTML = '';
    const markup = countries
      .map(country => {
        return `<li class="country-list--item">
                  <img src='${country.flag}' 
                   alt='${country.name} flag' width='20' />
                  <p>${country.name}</p>
                </li>`;
      })
      .join('');
      info.innerHTML = markup;
  };
  
  function markupOneCountry(country) {
    list.innerHTML = '';
    const markup = country
      .map(country => {
        return `<div class="country">
                  <img src='${country.flag}' alt='${country.name} flag' width='70' />
                  <h2 class="country_name">${country.name}</h2>
                </div>
              <ul>
                  <li>Capital: ${country.capital}</span></li>
                  <li>Population: ${country.population}</span></li>
                  <li>Languages: ${country.languages.map(item => ` ${item.name}`)}</span></li>
              </ul>`
      })
      list.innerHTML = markup;
  };
function clear() {
    list.innerHTML = '';
    info.innerHTML = '';     
    }




    






