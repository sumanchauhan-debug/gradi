/*
 * Accordion Block
 * Recreate an accordion
 * https://www.hlx.live/developer/block-collection/accordion
 */

export default function decorate(block) {
const allDetails = [];

  [...block.children].forEach((row) => {
    // 1. Decorate accordion item label
    const label = row.children[0];
    const summary = document.createElement('summary');
    summary.className = 'accordion-item-label';
    summary.append(...label.childNodes);

    // 2. Decorate accordion item body
    const body = row.children[1];
    body.className = 'accordion-item-body';

    // 3. Decorate accordion item
    const details = document.createElement('details');
    details.className = 'accordion-item';
    details.append(summary, body);

    // 4. Exclusive Toggle Logic
    details.addEventListener('toggle', (e) => {
      // Only trigger logic when the item is being opened
      if (details.open) {
        allDetails.forEach((item) => {
          if (item !== details && item.open) {
            item.open = false;
          }
        });
      }
    });

    allDetails.push(details);
    row.replaceWith(details);
  });

  const section = document.querySelector('.marketing-accordion');
const contentWrapper = section.querySelector('.default-content-wrapper');
const accordionWrapper = section.querySelector('.accordion-wrapper');

// 1. Create the two main columns
const imageCol = document.createElement('div');
imageCol.className = 'marketing-image-col';

const textCol = document.createElement('div');
textCol.className = 'marketing-text-col';

// 2. Identify and move the picture paragraph to the image column
const picturePara = contentWrapper.querySelector('p:has(picture)');
if (picturePara) {
    imageCol.appendChild(picturePara);
}

// 3. Move h4, h2, the remaining p, and the accordion to the text column
const remainingElements = Array.from(contentWrapper.children);
remainingElements.forEach(el => textCol.appendChild(el));
textCol.appendChild(accordionWrapper);

// 4. Clear the original wrapper and append the new columns
contentWrapper.innerHTML = '';
contentWrapper.appendChild(imageCol);
contentWrapper.appendChild(textCol);
}