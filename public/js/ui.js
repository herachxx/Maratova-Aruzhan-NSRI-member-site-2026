/**
 * ================================================================
 * UI FUNCTIONS (ui.js)
 * 
 * Purpose: Update the DOM (Document Object Model) based on data
 * Uses: DOM manipulation to display content dynamically
 * 
 * This file contains functions that take data from the API and
 * convert it into HTML elements to display on the page.
 * 
 * Key Concepts:
 * - DOM Manipulation: Creating and updating HTML elements
 * - Template Literals: Using backticks for multi-line strings
 * - innerHTML: Setting HTML content of elements
 * ================================================================
 */

/**
 * Display loading state in a container
 * 
 * @param {string} containerId - ID of the container element
 * @param {boolean} isLoading - true to show loading, false to hide
 */
function setLoading(containerId, isLoading) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  if (isLoading) {
    container.classList.remove('hidden');
  } else {
    container.classList.add('hidden');
  }
}

/**
 * Render ambassadors in the grid
 * Converts ambassador data into HTML cards
 * 
 * @param {Array} ambassadors - Array of ambassador objects
 */
function renderAmbassadors(ambassadors) {
  const grid = document.getElementById('ambassadorsGrid');
  
  // Hide loading state
  setLoading('ambassadorsLoading', false);
  
  // Clear existing content
  grid.innerHTML = '';
  
  // Check if ambassadors array is empty
  if (!ambassadors || ambassadors.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
        <p style="color: #999; font-size: 1.1rem;">
          No ambassadors found yet. Check back soon!
        </p>
      </div>
    `;
    return;
  }
  
  // Create HTML for each ambassador
  ambassadors.forEach(ambassador => {
    const card = document.createElement('div');
    card.className = 'ambassador-card';
    card.innerHTML = `
      <div class="ambassador-card-header">
        <h3>${ambassador.name}</h3>
        <p style="margin: 0; opacity: 0.9;">${ambassador.country}</p>
      </div>
      <div class="ambassador-card-body">
        <div class="ambassador-info">
          <span><strong>School:</strong> ${ambassador.school}</span>
        </div>
        <p style="color: #666; font-size: 0.95rem; margin-bottom: 1rem;">
          ${ambassador.bio || 'No bio available'}
        </p>
        <span class="ambassador-badge">${ambassador.role || 'Ambassador'}</span>
      </div>
    `;
    grid.appendChild(card);
  });
}

/**
 * Render research projects in the grid
 * Converts project data into HTML cards
 * 
 * @param {Array} projects - Array of project objects
 */
function renderProjects(projects) {
  const grid = document.getElementById('projectsGrid');
  
  // Hide loading state
  setLoading('projectsLoading', false);
  
  // Clear existing content
  grid.innerHTML = '';
  
  // Check if projects array is empty
  if (!projects || projects.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
        <p style="color: #999; font-size: 1.1rem;">
          No research projects available yet.
        </p>
      </div>
    `;
    return;
  }
  
  // Create HTML for each project
  projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    // Format status text
    const statusText = project.status ? project.status.replace('_', ' ').toUpperCase() : 'IN PROGRESS';
    
    card.innerHTML = `
      <div class="project-image">
        📚
      </div>
      <div class="project-content">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">
          ${project.description}
        </p>
        <div class="project-meta">
          <span style="font-size: 0.9rem; color: #666;">
            ${project.researcher_name || 'Unknown Researcher'}
          </span>
          <span class="project-status">${statusText}</span>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

/**
 * Render blog posts
 * Converts blog post data into HTML cards
 * 
 * @param {Array} posts - Array of blog post objects
 */
function renderBlogPosts(posts) {
  const grid = document.getElementById('blogGrid');
  
  // Hide loading state
  setLoading('blogLoading', false);
  
  // Clear existing content
  grid.innerHTML = '';
  
  // Check if posts array is empty
  if (!posts || posts.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
        <p style="color: #999; font-size: 1.1rem;">
          No blog posts yet. Check back soon!
        </p>
      </div>
    `;
    return;
  }
  
  // Create HTML for each blog post
  posts.forEach(post => {
    const card = document.createElement('div');
    card.className = 'blog-card';
    
    // Format date
    const date = new Date(post.created_at);
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    card.innerHTML = `
      <div class="blog-image">
        ✍️
      </div>
      <div class="blog-content">
        <div class="blog-date">${formattedDate}</div>
        <h3 class="blog-title">${post.title}</h3>
        <p class="blog-excerpt">
          ${post.content.substring(0, 150)}...
        </p>
        <a href="#" class="blog-link">Read More →</a>
      </div>
    `;
    grid.appendChild(card);
  });
}

/**
 * Show success or error message
 * Displays temporary feedback to user
 * 
 * @param {string} message - Message text
 * @param {string} type - 'success' or 'error'
 * @param {number} duration - Display duration in ms (default 5000)
 */
function showMessage(message, type = 'success', duration = 5000) {
  // Create message element
  const messageEl = document.createElement('div');
  messageEl.className = `form-message show ${type}`;
  messageEl.textContent = message;
  messageEl.style.position = 'fixed';
  messageEl.style.top = '100px';
  messageEl.style.left = '50%';
  messageEl.style.transform = 'translateX(-50%)';
  messageEl.style.zIndex = '9999';
  messageEl.style.minWidth = '300px';
  messageEl.style.maxWidth = '500px';
  
  document.body.appendChild(messageEl);
  
  // Remove after duration
  setTimeout(() => {
    messageEl.remove();
  }, duration);
}

/**
 * Format date to readable format
 * 
 * @param {string} dateString - Date string from database
 * @returns {string} Formatted date (e.g., "March 7, 2026")
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Truncate text to specified length
 * 
 * @param {string} text - Text to truncate
 * @param {number} length - Max length
 * @returns {string} Truncated text with ellipsis
 */
function truncateText(text, length = 150) {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
}

/**
 * Reset form to empty state
 * 
 * @param {string} formId - ID of the form element
 */
function resetForm(formId) {
  const form = document.getElementById(formId);
  if (form) {
    form.reset();
  }
}

/**
 * Show form validation error
 * 
 * @param {string} fieldId - ID of the form field
 * @param {string} message - Error message
 */
function showFieldError(fieldId, message) {
  const field = document.getElementById(fieldId);
  if (field) {
    field.style.borderColor = '#ef4444';
    
    // Remove existing error message
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }
    
    // Create error message element
    const errorEl = document.createElement('p');
    errorEl.className = 'error-message';
    errorEl.style.color = '#ef4444';
    errorEl.style.fontSize = '0.875rem';
    errorEl.style.marginTop = '0.25rem';
    errorEl.textContent = message;
    
    field.parentElement.appendChild(errorEl);
  }
}

/**
 * Clear form validation errors
 * 
 * @param {string} formId - ID of the form element
 */
function clearFormErrors(formId) {
  const form = document.getElementById(formId);
  if (form) {
    // Remove error styles from all inputs
    form.querySelectorAll('input, textarea').forEach(field => {
      field.style.borderColor = '';
    });
    
    // Remove all error messages
    form.querySelectorAll('.error-message').forEach(el => {
      el.remove();
    });
  }
}
