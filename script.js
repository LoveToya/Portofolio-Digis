// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.querySelector('header');

// Toggle mobile menu
burger.addEventListener('click', () => {
  nav.classList.toggle('active');
  burger.classList.toggle('toggle');
  
  // Animate links
  navLinks.forEach((link, index) => {
    if (link.style.animation) {
      link.style.animation = '';
    } else {
      link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
    }
  });
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    burger.classList.remove('toggle');
    navLinks.forEach(link => {
      link.style.animation = '';
    });
  });
});

// Sticky header on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Enhanced smooth scrolling for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const headerHeight = header.offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scroll({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Update URL without reload
      history.pushState(null, null, targetId);
    }
  });
});

// Smooth scroll on page load if hash exists
window.addEventListener('DOMContentLoaded', () => {
  if (window.location.hash) {
    setTimeout(() => {
      const target = document.querySelector(window.location.hash);
      if (target) {
        const headerHeight = header.offsetHeight;
        window.scrollTo({
          top: target.offsetTop - headerHeight,
          behavior: 'smooth'
        });
      }
    }, 100);
  }
});

// Intersection Observer for section animations
const sections = document.querySelectorAll('.section');
const skillBars = document.querySelectorAll('.skill-level');

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

sections.forEach(section => {
  sectionObserver.observe(section);
});

// Animate skill bars when visible
const skillsObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.width = level;
      });
      observer.disconnect();
    }
  });
}, { threshold: 0.5 });

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
  skillsObserver.observe(skillsSection);
}

// Scroll progress indicator (optional)
window.addEventListener('scroll', () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = window.scrollY;
  
  // You can use this progress value to animate something
  const progress = (scrolled / scrollable) * 100;
  // console.log(progress);
}, { passive: true });

// Prevent rubber-band effect on iOS
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchmove', (e) => {
  if (window.scrollY === 0 && e.touches[0].clientY > touchStartY) {
    e.preventDefault();
  }
}, { passive: false });

// Initialize animations on load
window.addEventListener('load', () => {
  // Trigger a small timeout to ensure all elements are loaded
  setTimeout(() => {
    const scrollPosition = window.scrollY;
    if (scrollPosition === 0) {
      window.dispatchEvent(new Event('scroll'));
    }
  }, 300);
});