
var grid = document.querySelector('.grid');

var iso = new Isotope(grid, {
  itemSelector: '.grid-item',
  layoutMode: 'masonry',
  filter: '.product'
});

imagesLoaded(grid).on('progress', function () {
  // layout Isotope after each image loads
  iso.layout();
});


// Bind filter button click
const filters = document.querySelector('#filters');
const filterButtons = filters.querySelectorAll('button');

for (const filterButton of filterButtons) {
  filterButton.addEventListener('click', (event) => {
    const filterValue = event.target.getAttribute('data-filter');
    iso.arrange({ filter: filterValue });
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

