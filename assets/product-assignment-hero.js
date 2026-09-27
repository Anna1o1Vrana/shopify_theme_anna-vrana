(function () {
  function initPdpHero(section) {
    if (!section || section.dataset.pdpHeroInit === 'true') return;
    section.dataset.pdpHeroInit = 'true';

    initGallery(section);
    initTabs(section);
  }

  function initGallery(section) {
    const mainImage = section.querySelector('.pdp-hero__main-image');
    const thumbs = section.querySelectorAll('[data-pdp-thumb]');

    if (!mainImage || !thumbs.length) return;

    thumbs.forEach((thumb) => {
      thumb.addEventListener('click', () => {
        const nextSrc = thumb.dataset.src;
        const nextSrcset = thumb.dataset.srcset;
        const nextAlt = thumb.dataset.alt;
        const mediaId = thumb.dataset.mediaId;

        if (!nextSrc) return;

        mainImage.src = nextSrc;
        if (nextSrcset) {
          mainImage.srcset = nextSrcset;
        } else {
          mainImage.removeAttribute('srcset');
        }
        if (nextAlt) {
          mainImage.alt = nextAlt;
        }

        thumbs.forEach((item) => {
          const isActive = item.dataset.mediaId === mediaId;
          item.classList.toggle('pdp-hero__grid-item--active', isActive);
          item.setAttribute('aria-current', isActive ? 'true' : 'false');
        });
      });
    });
  }

  function initTabs(section) {
    const tabList = section.querySelector('[data-pdp-tabs]');
    if (!tabList) return;

    const tabs = tabList.querySelectorAll('[data-pdp-tab]');
    const panels = section.querySelectorAll('[data-pdp-panel]');

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const panelId = tab.getAttribute('aria-controls');
        if (!panelId) return;

        tabs.forEach((item) => {
          const isSelected = item === tab;
          item.classList.toggle('pdp-hero__tab--active', isSelected);
          item.setAttribute('aria-selected', isSelected ? 'true' : 'false');
          item.setAttribute('tabindex', isSelected ? '0' : '-1');
        });

        panels.forEach((panel) => {
          const isVisible = panel.id === panelId;
          panel.classList.toggle('pdp-hero__tab-panel--active', isVisible);
          panel.hidden = !isVisible;
        });
      });
    });
  }

  function initAll() {
    document.querySelectorAll('[data-pdp-hero]').forEach(initPdpHero);
  }

  document.addEventListener('DOMContentLoaded', initAll);
  document.addEventListener('shopify:section:load', (event) => {
    const section = event.target.querySelector('[data-pdp-hero]') || event.target.closest('[data-pdp-hero]');
    if (section) initPdpHero(section);
  });
})();
