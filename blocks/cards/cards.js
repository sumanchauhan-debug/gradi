import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.replaceChildren(ul);


const cardContainers = document.querySelectorAll('.cards.marketing-service');

cardContainers.forEach((container) => {
  const ul = container.querySelector('ul');
  if (ul) {
    ul.classList.add('marketing-cards-list');
    const listItems = ul.querySelectorAll('li');
    listItems.forEach((li, index) => {
      li.classList.add('marketing-card-item');
      li.classList.add(`card-item-${index + 1}`);
    });
  }
});



}
