
// grab all the divs with class wordswitch inside kijkgat_word
const words = document.querySelectorAll('.wordswitch');

let clickCount = 0;

// add event listener to each word
for (i = 0; i < words.length; i++) {
  words[i].addEventListener('click', function () {
    words[clickCount].classList.add('hidden');
    clickCount++;
    if (clickCount == words.length) {
      clickCount = 0;
    }
    words[clickCount].classList.remove('hidden');
  });
}

const grid = document.querySelector('.grid');

var iso = new Isotope(grid, {
  itemSelector: '.grid-item',
  layoutMode: 'masonry',
  filter: '.kader'
});

imagesLoaded(grid).on('progress', function () {
  // layout Isotope after each image loads
  iso.layout();
});


// Bind filter button click
const filters = document.querySelector('#filters');
const filterButtons = filters.querySelectorAll('button');
const filterText = document.querySelector('#filter-text');


// loop through through all p tags inside filterText
for (const p of filterText.querySelectorAll('p')) {
  // if p tag has a data-filter attribute
  if (p.hasAttribute('data-filter')) {
    // if p tag's data-filter attribute matches the filterValue
    if (p.getAttribute('data-filter') === '.kader') {
      // show p tag
      p.classList.remove('hidden');
    } else {
      // hide p tag
      p.classList.add('hidden');
    }
  }
}

for (const filterButton of filterButtons) {
  filterButton.addEventListener('click', (event) => {
    const filterValue = event.target.getAttribute('data-filter');
    iso.arrange({ filter: filterValue });

    // loop through through all p tags inside filterText
    for (const p of filterText.querySelectorAll('p')) {
      // if p tag has a data-filter attribute
      if (p.hasAttribute('data-filter')) {

        console.log(p.getAttribute('data-filter'));

        console.log(filterValue);
        // if p tag's data-filter attribute matches the filterValue
        if (p.getAttribute('data-filter') === filterValue) {
          // show p tag
          p.classList.remove('hidden');
        } else {
          // hide p tag
          p.classList.add('hidden');
        }
      }
    }

  });
}

// Change is-checked class on buttons
const buttonGroups = document.querySelectorAll('.button-group');

for (const buttonGroup of buttonGroups) {
  for (const button of buttonGroup.querySelectorAll('button')) {
    button.addEventListener('click', (event) => {
      buttonGroup.querySelector('.is-checked').classList.remove('is-checked');
      event.target.classList.add('is-checked');
    });
  }
}

