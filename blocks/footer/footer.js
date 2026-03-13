import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);
  

  const section = document.querySelector('.footer-wrapper .footer-logo.block');
  section.querySelector('p').classList.add('footer-logo-text');

  const listsec = document.querySelector('.footer-wrapper .footer-nav-one');
  listsec.querySelector('p').classList.add('footer-nav-item-one');

  const listsec2 = document.querySelector('.footer-wrapper .footer-nav-two'); 
  listsec2.querySelector('p').classList.add('footer-nav-item-two');

    const listsec3 = document.querySelector('.footer-wrapper .footer-nav-three'); 
  listsec3.querySelector('p').classList.add('footer-nav-item-three');

  const socialLinks = document.querySelectorAll('.footer-logo ul li');

socialLinks.forEach((li) => {
  const platform = li.textContent.trim().toLowerCase();
  // Add a specific class for each platform
  li.classList.add('social-icon', `social-${platform}`);
  // Clear the text content so we can use pseudo-elements
  li.textContent = ''; 
});

const footerContainer = document.querySelector('.footer-logo');

if (footerContainer) {
    const icons = {
        facebook: '<svg viewBox="0 0 320 512" width="16" height="16"><path fill="currentColor" d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 159.4v42.1H14v97.8H80z"/></svg>',
        google: '<svg viewBox="0 0 488 512" width="16" height="16"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/></svg>',
        twitter: '<svg viewBox="0 0 512 512" width="16" height="16"><path fill="currentColor" d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>',
        pinterest: '<svg viewBox="0 0 496 512" width="16" height="16"><path fill="currentColor" d="M496 256c0 137-111 248-248 248-25.6 0-50.2-3.9-73.4-11.1 10.1-16.5 25.2-43.5 30.8-65 3-11.6 15.4-59 15.4-59s4.8-9.1 7.6-15.5c17.5 33.2 54.1 46.4 83.1 46.4 81 0 138.3-74.8 138.3-162.7 0-77.4-62.3-145.4-159.3-145.4-106.4 0-165.7 75-165.7 152.8 0 38.6 14.7 72.9 46.1 85.8 4.5 1.9 8.5 1 9.8-4.3 .9-3.4 3-12.4 3.9-16.1 1.3-5.1 .6-6.9-3.2-11.4-9.6-11.6-15.7-26.6-15.7-48 0-61.7 46-116.8 122.3-116.8 66.7 0 103.4 40.8 103.4 95.3 0 71.5-31.9 121.1-79.3 121.1-24.6 0-43.1-20.4-37.2-45.4 7.1-29.8 20.8-61.9 20.8-83.5 0-19.2-10.3-35.3-31.7-35.3-25.1 0-45.3 26-45.3 60.8 0 22.1 7.5 37.1 7.5 37.1s-25.1 106.1-29.6 124.8c-8.9 37.6-1.3 83.6-.7 87.7-124-44.8-213.3-162.7-213.3-301.9C0 114.6 114.6 0 256 0S512 114.6 512 256z"/></svg>'
    };

    footerContainer.querySelectorAll('ul li').forEach(li => {
        // Find platform name from classes like "social-facebook"
        const platform = Object.keys(icons).find(key => li.classList.contains(`social-${key}`));
        if (platform) {
            li.innerHTML = icons[platform];
        }
    });
}

}
