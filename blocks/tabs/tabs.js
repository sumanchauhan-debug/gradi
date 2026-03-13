// eslint-disable-next-line import/no-unresolved
import { toClassName } from '../../scripts/aem.js';

export default async function decorate(block) {
  // build tablist
  const tablist = document.createElement('div');
  tablist.className = 'tabs-list';
  tablist.setAttribute('role', 'tablist');

  // decorate tabs and tabpanels
  const tabs = [...block.children].map((child) => child.firstElementChild);
  tabs.forEach((tab, i) => {
    const id = toClassName(tab.textContent);

    // decorate tabpanel
    const tabpanel = block.children[i];
    tabpanel.className = 'tabs-panel';
    tabpanel.id = `tabpanel-${id}`;
    tabpanel.setAttribute('aria-hidden', !!i);
    tabpanel.setAttribute('aria-labelledby', `tab-${id}`);
    tabpanel.setAttribute('role', 'tabpanel');

    // build tab button
    const button = document.createElement('button');
    button.className = 'tabs-tab';
    button.id = `tab-${id}`;
    button.innerHTML = tab.innerHTML;
    button.setAttribute('aria-controls', `tabpanel-${id}`);
    button.setAttribute('aria-selected', !i);
    button.setAttribute('role', 'tab');
    button.setAttribute('type', 'button');
    button.addEventListener('click', () => {
      block.querySelectorAll('[role=tabpanel]').forEach((panel) => {
        panel.setAttribute('aria-hidden', true);
      });
      tablist.querySelectorAll('button').forEach((btn) => {
        btn.setAttribute('aria-selected', false);
      });
      tabpanel.setAttribute('aria-hidden', false);
      button.setAttribute('aria-selected', true);
    });
    tablist.append(button);
    tab.remove();
  });

  block.prepend(tablist);


  // 1. Select all the divs that have the class 'tabs-panel'
const tabsPanels = document.querySelectorAll('.tabs-panel');

if (tabsPanels.length > 0) {
  const wrapper = document.createElement('div');
  wrapper.className = 'main-tabs-panel';
  const parent = tabsPanels[0].parentNode;

  parent.insertBefore(wrapper, tabsPanels[0]);

  tabsPanels.forEach(panel => {
    wrapper.appendChild(panel);
  });
}


document.querySelectorAll('.tabs-panel div:first-child p').forEach(p => {
    const text = p.innerText;
    // Regex to find "Label (Number)" format
    const match = text.match(/(.*)\s\((\d+)\)/);

    if (match) {
        const label = match[1];
        const percentage = match[2];

        // Create the progress bar HTML structure
        p.innerHTML = `
            <div class="stat-container">
                <div class="stat-info">
                    <span class="stat-label">${label}</span>
                    <span class="stat-percent">${percentage}%</span>
                </div>
                <div class="stat-bar-bg">
                    <div class="stat-bar-fill" style="width: 0%" data-target="${percentage}"></div>
                </div>
            </div>
        `;
    }
});

// Animation logic for the bars
const animateBars = () => {
    document.querySelectorAll('.stat-bar-fill').forEach(bar => {
        const target = bar.getAttribute('data-target');
        bar.style.width = target + '%';
    });
};

// Trigger animation when the tab is switched or on load
setTimeout(animateBars, 100);


}