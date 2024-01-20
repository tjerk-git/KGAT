const scrollChevron = document.getElementById('scrollDown');

scrollChevron.addEventListener('click', () => {
  scrollToSmoothly(900, 1000);
});


function scrollToSmoothly(pos, time) {
  var currentPos = window.pageYOffset;
  var start = null;
  if (time == null) time = 500;
  pos = +pos, time = +time;
  window.requestAnimationFrame(function step(currentTime) {
    start = !start ? currentTime : start;
    var progress = currentTime - start;
    if (currentPos < pos) {
      window.scrollTo(0, ((pos - currentPos) * progress / time) + currentPos);
    } else {
      window.scrollTo(0, currentPos - ((currentPos - pos) * progress / time));
    }
    if (progress < time) {
      window.requestAnimationFrame(step);
    } else {
      window.scrollTo(0, pos);
    }
  });
}


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