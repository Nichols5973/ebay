import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-deals-image';
      else div.className = 'cards-deals-body';
    });
    // badge = italic-only paragraph, price = bold-only paragraph, first other = title
    let titled = false;
    li.querySelectorAll('.cards-deals-body > p').forEach((p) => {
      const child = p.children.length === 1 ? p.firstElementChild : null;
      const only = child && p.textContent.trim() === child.textContent.trim() ? child.tagName : '';
      if (only === 'EM') p.className = 'cards-deals-badge';
      else if (only === 'STRONG') p.className = 'cards-deals-price';
      else if (!titled) { p.className = 'cards-deals-title'; titled = true; }
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.textContent = '';
  block.append(ul);
}
