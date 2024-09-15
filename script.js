// assert { type: "json" } script.js:1  Uncaught SyntaxError: Unexpected identifier 'assert'
// assert must be change to with {type: "json"}
import goods from "./goods.json" with { type: "json" };
import selectOptions from "./select-options.json" with {type: "json"};

const cardsList = document.querySelector('.cards-list');
const filtersForm = document.querySelector('.filters-form');

console.log(goods);

function setSingleCard(el) {
  const cardImageSrc = el.name.split(' ').map(item => item.toLowerCase()).join('-');

  let popularityString = "";
  for (let i = 0; i < el.popularity; i++) {
    popularityString += `<img src="img/star.png" alt="" class="star">`;
  }

  const singleCard = `<li class="card-item">
                        <a href="" class="card-link">
                          <h3 class="card-title">${el.name}</h3>
                          <div class="card-img-wrapper">
                            <img
                              src="img/cards/${cardImageSrc}.jpg"
                              alt="${el.name}"
                              class="card-img"
                            />
                          </div>
                          <p class="card-price">${el.price}$</p>
                          <button class="wish" role="button" area-label="choose as a favorite"></button>
                          <p class="card-popularity">${popularityString}</p>
                        </a>
                      </li>`;
  return singleCard;
}

function setCards(parent, arr) {
  arr.forEach((card) => parent.insertAdjacentHTML('afterbegin', setSingleCard(card)))
}

setCards(cardsList, goods)

// filters

function setOptions(optionsObj) {
  const optionsName = setUpperCaseLetter(optionsObj.name);
  const selectCard = document.createElement('div');
  const selectLabel = document.createElement('label');
  selectLabel.classList.add("filter-label");
  selectLabel.textContent = optionsName;
  selectLabel.setAttribute('for', optionsObj.name);
  selectCard.append(selectLabel);
  const select = document.createElement('select');
  select.classList.add("filter");
  select.setAttribute('name', optionsObj.name);
  select.setAttribute('id', optionsObj.name);
  select.addEventListener("change", function(event) {
    const optionValue = event.target.value;
    //console.log(optionValue);
    const valueName = event.target.name;
    let selectedGoods;

    if (optionValue !=="all" && (valueName === "popularity" || valueName === "price")) {
      console.log(optionValue !=="all" && (valueName === "popularity" || valueName === "price"))
      selectedGoods = sortGoods(goods, valueName, optionValue)
    }
    else if (optionValue === "all") {
      selectedGoods = goods;
      console.log(selectedGoods)
      console.log(optionValue ==="all")

    }
    else {
      selectedGoods = goods.filter(good => {
        if (good[valueName] === optionValue) {
          return good;
        }
      });
    }

    cardsList.innerHTML = '';
    setCards(cardsList, selectedGoods);

  });

  optionsObj.options.forEach(opt => {
    const option = `<option value="${opt}">${setUpperCaseLetter(opt)}</option>`;
    select.insertAdjacentHTML("beforeend", option);
  });

  selectCard.append(selectLabel);
  selectCard.append(select);

  return selectCard;
}


selectOptions.forEach(opt => {
  filtersForm.append(setOptions(opt));
})


function sortGoods(arr, valueName, optionValue) {
    let sortedGoods;
    //console.log(optionValue)
    if (optionValue === "more") {
      sortedGoods = arr.sort((a, b) => Number(a[valueName]) - Number(b[valueName]));
    }
    else if (optionValue === "less") {
      sortedGoods = arr.sort((a, b) => Number(b[valueName]) - Number(a[valueName]));
    }
    else {
      sortedGoods = goods;
    }
    return sortedGoods
  }


function setUpperCaseLetter(word) {
  return word[0].toUpperCase() + word.slice(1)
}
