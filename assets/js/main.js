/**
* Template Name: Personal
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Updated: Mar 17 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)

    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '#navbar .nav-link', function(e) {
    let section = select(this.hash)
    if (section) {
      e.preventDefault()

      let navbar = select('#navbar')
      let header = select('#header')
      let sections = select('section', true)
      let navlinks = select('#navbar .nav-link', true)

      navlinks.forEach((item) => {
        item.classList.remove('active')
      })

      this.classList.add('active')

      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }

      if (this.hash == '#header') {
        header.classList.remove('header-top')
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        return;
      }

      if (!header.classList.contains('header-top')) {
        header.classList.add('header-top')
        setTimeout(function() {
          sections.forEach((item) => {
            item.classList.remove('section-show')
          })
          section.classList.add('section-show')

        }, 350);
      } else {
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        section.classList.add('section-show')
      }

      scrollto(this.hash)
    }
  }, true)

  /**
   * Activate/show sections on load with hash links
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      let initial_nav = select(window.location.hash)

      if (initial_nav) {
        let header = select('#header')
        let navlinks = select('#navbar .nav-link', true)

        header.classList.add('header-top')

        navlinks.forEach((item) => {
          if (item.getAttribute('href') == window.location.hash) {
            item.classList.add('active')
          } else {
            item.classList.remove('active')
          }
        })

        setTimeout(function() {
          initial_nav.classList.add('section-show')
        }, 350);

        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  
  window.addEventListener('load', () => {
    let portfolioContainer = document.querySelector('.portfolio-container');
    if (portfolioContainer) {
      let masonry = new Masonry(portfolioContainer, {
        itemSelector: '.grid-item',
        columnWidth: '.grid-item',
        percentPosition: true
      });
  
      let portfolioFilters = document.querySelectorAll('#portfolio-flters li');
  
      portfolioFilters.forEach(filter => {
        filter.addEventListener('click', function(e) {
          e.preventDefault();
          portfolioFilters.forEach(el => {
            el.classList.remove('filter-active');
          });
          this.classList.add('filter-active');
          let filterValue = this.getAttribute('data-filter');
  
          // Iterate over each item and check if it matches the filter
          masonry.getItemElements().forEach(item => {
            if (filterValue === '*' || item.classList.contains(filterValue.slice(1))) {
              item.style.transition = 'opacity 0.5s ease';
              item.style.opacity = '1';
            } else {
              item.style.transition = 'opacity 0.5s ease';
              item.style.opacity = '0';
            }
          });
  
          // Layout Masonry after filtering
          setTimeout(() => {
            masonry.layout();
          }, 500); // Delay layout to match the transition duration
        });
      });
  
      // Adicionando evento de clique para abrir e fechar a galeria de portfólio
      let portfolioItems = document.querySelectorAll('.portfolio-item');
      portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
          let portfolioWrap = this.querySelector('.portfolio-wrap');
          portfolioWrap.classList.toggle('portfolio-wrap-open');
  
          // Salvar a posição atual da página antes de abrir o lightbox
          if (portfolioWrap.classList.contains('portfolio-wrap-open')) {
            this.dataset.scrollPos = window.scrollY;
            // Se a imagem foi aberta, adicione um estado ao histórico do navegador
            history.pushState({ portfolioOpen: true }, '');
          } else {
            // Se a imagem foi fechada, remova o último estado do histórico do navegador
            history.back();
          }
        });
      });
  
      // Adicionando evento popstate para controlar o histórico do navegador
      window.addEventListener('popstate', function(event) {
        // Verifica se o estado do histórico do navegador indica que a imagem estava aberta
        if (event.state && event.state.portfolioOpen) {
          // Se a imagem estava aberta, feche-a
          let portfolioWrap = document.querySelector('.portfolio-wrap-open');
          if (portfolioWrap) {
            portfolioWrap.classList.remove('portfolio-wrap-open');
          }
        }
      });
  
      // Suavizar o carregamento de imagens
      let portfolioImages = document.querySelectorAll('.portfolio-item img');
      portfolioImages.forEach(img => {
        img.addEventListener('load', function() {
          this.style.opacity = '1'; // Aplicar opacidade após a imagem carregar
        });
      });
  
      // Adicionando evento ao fechar o lightbox para restaurar a posição da página
      document.addEventListener('glightbox-closed', function() {
        let openItem = document.querySelector('.portfolio-item .portfolio-wrap-open');
        if (openItem) {
          let scrollPos = openItem.dataset.scrollPos || 0;
          window.scrollTo({
            top: scrollPos,
            behavior: 'smooth'
          });
        }
      });
    }
  });
  
  
  
  
  
  
  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()