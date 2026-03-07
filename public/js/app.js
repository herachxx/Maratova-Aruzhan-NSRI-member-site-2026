/**
 * ================================================================
 * MAIN APPLICATION FILE (app.js)
 * 
 * Purpose: Initialize the application and handle user interactions
 * Loads on: Page load (after HTML is parsed)
 * 
 * This file:
 * 1. Waits for DOM to be fully loaded
 * 2. Fetches data from API
 * 3. Renders content on page
 * 4. Sets up event listeners for user interactions
 * 
 * Key Concepts:
 * - Event Listeners: Respond to user actions (clicks, form submissions)
 * - DOM Ready: DOMContentLoaded event fires when HTML is parsed
 * ================================================================
 */

/**
 * Initialize application when DOM is ready
 * This runs after all HTML elements are loaded
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Application initialized');
  
  // Initialize all features
  setupNavigation();
  loadAllData();
  setupFormHandlers();
});

/**
 * Setup navigation functionality
 * - Hamburger menu toggle
 * - Active link highlighting
 * - Smooth scrolling
 */
function setupNavigation() {
  // Get navigation elements
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.getElementById('navbar');
  
  // Hamburger menu toggle
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }
  
  // Close menu when link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Remove active class from all links
      navLinks.forEach(l => l.classList.remove('active'));
      
      // Add active class to clicked link
      link.classList.add('active');
      
      // Close hamburger menu
      navMenu.classList.remove('active');
      if (hamburger) hamburger.classList.remove('active');
    });
  });
  
  // Update active link on scroll
  window.addEventListener('scroll', () => {
    let current = '';
    
    // Get all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      // Check if section is in view
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    // Update active links
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
  
  // Add shadow to navbar on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });
}

/**
 * Load all data from API on page load
 * Shows loading states while fetching
 */
async function loadAllData() {
  // Show loading states
  setLoading('ambassadorsLoading', true);
  setLoading('projectsLoading', true);
  setLoading('blogLoading', true);
  
  // Fetch all data in parallel using Promise.all
  // This is faster than fetching one at a time
  const [ambassadors, projects, blogPosts] = await Promise.all([
    fetchAmbassadors(),
    fetchProjects(),
    fetchBlogPosts()
  ]);
  
  // Render fetched data on page
  renderAmbassadors(ambassadors);
  renderProjects(projects);
  renderBlogPosts(blogPosts);
  
  console.log('✅ All data loaded and rendered');
}

/**
 * Setup form event handlers
 * - Form submission
 * - Input validation
 * - Error/success messages
 */
function setupFormHandlers() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault(); // Prevent default form submission
      
      // Clear previous errors
      clearFormErrors('contactForm');
      
      // Get form data
      const formData = {
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        subject: document.getElementById('contactSubject').value,
        message: document.getElementById('contactMessage').value
      };
      
      // Validate form
      if (!validateContactForm(formData)) {
        return;
      }
      
      try {
        // Disable submit button while processing
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        // Submit form to API
        await submitContactForm(formData);
        
        // Show success message
        showMessage('✅ Message sent successfully! We\'ll get back to you soon.', 'success');
        
        // Reset form
        resetForm('contactForm');
        
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      } catch (error) {
        console.error('Error submitting form:', error);
        showMessage('❌ Error sending message. Please try again.', 'error');
        
        // Re-enable submit button
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  }
}

/**
 * Validate contact form
 * Checks all fields are filled and valid
 * 
 * @param {Object} data - Form data object
 * @returns {boolean} True if valid, false otherwise
 */
function validateContactForm(data) {
  let isValid = true;
  
  // Validate name (not empty)
  if (!data.name.trim()) {
    showFieldError('contactName', 'Name is required');
    isValid = false;
  }
  
  // Validate email (basic email regex)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    showFieldError('contactEmail', 'Please enter a valid email');
    isValid = false;
  }
  
  // Validate subject (not empty)
  if (!data.subject.trim()) {
    showFieldError('contactSubject', 'Subject is required');
    isValid = false;
  }
  
  // Validate message (at least 10 characters)
  if (data.message.trim().length < 10) {
    showFieldError('contactMessage', 'Message must be at least 10 characters');
    isValid = false;
  }
  
  return isValid;
}

/**
 * Utility function to log page analytics
 * Can be extended to track user behavior
 */
function trackPageView() {
  console.log('📊 Page view tracked:', {
    url: window.location.href,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent
  });
}

// Track page views
trackPageView();

/**
 * Error boundary - catch unhandled errors
 * Log them for debugging purposes
 */
window.addEventListener('error', (event) => {
  console.error('🚨 Uncaught error:', event.error);
  // In production, you might send this to an error tracking service
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('🚨 Unhandled promise rejection:', event.reason);
  event.preventDefault(); // Prevent browser from logging it again
});
