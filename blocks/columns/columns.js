export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }
    });
  });

const contentBlocks = document.querySelectorAll('.columns.marketing-plans div');

contentBlocks.forEach((block) => {
  const pTags = block.querySelectorAll('p');

  pTags.forEach((p) => {
    if (p.querySelector('picture')) {
      p.classList.add('p-icon-wrap');
    } 
    
    else if (p.querySelector('a')) {
      p.classList.add('p-title-wrap');
    } 
  
    else if (p.querySelector('code')) {
      p.classList.add('p-description-wrap');
    }
  });
});



const statsContainer = document.querySelector('.columns.elementor-widget-container');
const statItems = statsContainer.querySelectorAll(':scope > div');

const runCounter = (el) => {
    const h2 = el.querySelector('h2');
    const fullText = h2.innerText; // e.g., "300 K"
    const targetNum = parseInt(fullText.replace(/[^0-9]/g, '')); // Extracts 300
    const suffix = fullText.replace(/[0-9]/g, ''); // Extracts " K"
    
    let current = 0;
    const duration = 2000; // 2 seconds
    const frameRate = 1000 / 60; // 60 fps
    const totalFrames = Math.round(duration / frameRate);
    const increment = targetNum / totalFrames;

    const update = () => {
        current += increment;
        if (current < targetNum) {
            h2.innerText = Math.floor(current) + suffix;
            requestAnimationFrame(update);
        } else {
            h2.innerText = fullText; // Ensure it hits the final exact string
        }
    };
    update();
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            runCounter(entry.target);
            observer.unobserve(entry.target); 
        }
    });
}, { threshold: 0.7 });

statItems.forEach(item => observer.observe(item));

const professionalServicesContainer = document.querySelector('.professional-team .columns-wrapper .columns.block');

professionalServicesContainer.querySelectorAll(':scope > div').forEach((div) => {
  div.classList.add('professional-card-item');
});

}
