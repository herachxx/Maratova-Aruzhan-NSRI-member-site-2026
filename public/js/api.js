/**
 * ================================================================
 * API FUNCTIONS (api.js)
 * 
 * Purpose: Handle all HTTP requests to the backend
 * Uses: Fetch API for making HTTP requests
 * 
 * This file contains functions that communicate with the Express.js
 * backend server. Each function corresponds to a backend endpoint.
 * 
 * Key Concepts:
 * - Fetch API: Modern JavaScript HTTP client
 * - Async/Await: Makes asynchronous code look synchronous
 * - Error Handling: Try-catch blocks for robust error management
 * - JSON Parsing: Converting between JSON and JavaScript objects
 * ================================================================
 */

// Base URL for API requests
// In development: localhost:3000
// In production: your-domain.com
const API_BASE_URL = 'http://localhost:3000/api';

/**
 * Fetch all ambassadors from database
 * GET /api/ambassadors
 * 
 * @returns {Promise<Array>} Array of ambassador objects
 * @example
 * const ambassadors = await fetchAmbassadors();
 */
async function fetchAmbassadors() {
  try {
    const response = await fetch(`${API_BASE_URL}/ambassadors`);
    
    // Check if response is ok (status 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ Ambassadors fetched:', data);
    return data;
  } catch (error) {
    console.error('❌ Error fetching ambassadors:', error);
    return [];
  }
}

/**
 * Fetch single ambassador by ID
 * GET /api/ambassadors/:id
 * 
 * @param {number} id - Ambassador ID
 * @returns {Promise<Object>} Ambassador object
 */
async function fetchAmbassadorById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/ambassadors/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`❌ Error fetching ambassador ${id}:`, error);
    return null;
  }
}

/**
 * Create new ambassador (Admin only)
 * POST /api/ambassadors
 * 
 * @param {Object} ambassadorData - Ambassador information
 * @param {string} ambassadorData.name - Full name
 * @param {string} ambassadorData.school - School name
 * @param {string} ambassadorData.country - Country
 * @param {string} ambassadorData.bio - Biography
 * @param {string} ambassadorData.avatar_url - Profile image URL
 * @returns {Promise<Object>} Created ambassador with ID
 */
async function createAmbassador(ambassadorData) {
  try {
    const response = await fetch(`${API_BASE_URL}/ambassadors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ambassadorData)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ Ambassador created:', data);
    return data;
  } catch (error) {
    console.error('❌ Error creating ambassador:', error);
    return null;
  }
}

/**
 * Fetch all research projects
 * GET /api/projects
 * 
 * @returns {Promise<Array>} Array of project objects
 */
async function fetchProjects() {
  try {
    const response = await fetch(`${API_BASE_URL}/projects`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ Projects fetched:', data);
    return data;
  } catch (error) {
    console.error('❌ Error fetching projects:', error);
    return [];
  }
}

/**
 * Create new research project
 * POST /api/projects
 * 
 * @param {Object} projectData - Project information
 * @param {string} projectData.title - Project title
 * @param {string} projectData.description - Detailed description
 * @param {number} projectData.researcher_id - Researcher's ID
 * @param {string} projectData.category - Research category
 * @param {string} projectData.status - Project status (in_progress, completed)
 * @param {string} projectData.start_date - Start date
 * @param {string} projectData.image_url - Project image URL
 * @returns {Promise<Object>} Created project with ID
 */
async function createProject(projectData) {
  try {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(projectData)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ Project created:', data);
    return data;
  } catch (error) {
    console.error('❌ Error creating project:', error);
    return null;
  }
}

/**
 * Fetch all published blog posts
 * GET /api/blog
 * 
 * @returns {Promise<Array>} Array of blog post objects
 */
async function fetchBlogPosts() {
  try {
    const response = await fetch(`${API_BASE_URL}/blog`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ Blog posts fetched:', data);
    return data;
  } catch (error) {
    console.error('❌ Error fetching blog posts:', error);
    return [];
  }
}

/**
 * Create new blog post (Admin only)
 * POST /api/blog
 * 
 * @param {Object} postData - Blog post information
 * @param {string} postData.title - Post title
 * @param {string} postData.content - Post content
 * @param {number} postData.author_id - Author's user ID
 * @param {string} postData.featured_image - Featured image URL
 * @param {string} postData.category - Post category
 * @param {boolean} postData.published - Is published
 * @returns {Promise<Object>} Created blog post with ID
 */
async function createBlogPost(postData) {
  try {
    const response = await fetch(`${API_BASE_URL}/blog`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ Blog post created:', data);
    return data;
  } catch (error) {
    console.error('❌ Error creating blog post:', error);
    return null;
  }
}

/**
 * Submit contact form
 * POST /api/contact
 * 
 * This is a public endpoint - no authentication required
 * The message is stored in the database and accessible to admins
 * 
 * @param {Object} contactData - Contact information
 * @param {string} contactData.name - Sender's name
 * @param {string} contactData.email - Sender's email
 * @param {string} contactData.subject - Message subject
 * @param {string} contactData.message - Message content
 * @returns {Promise<Object>} Response with message ID
 */
async function submitContactForm(contactData) {
  try {
    // Validate all required fields
    if (!contactData.name || !contactData.email || !contactData.subject || !contactData.message) {
      throw new Error('All fields are required');
    }
    
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contactData)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ Contact form submitted:', data);
    return data;
  } catch (error) {
    console.error('❌ Error submitting contact form:', error);
    throw error; // Re-throw so caller can handle it
  }
}

/**
 * Fetch all contact messages (Admin only)
 * GET /api/contact
 * 
 * @returns {Promise<Array>} Array of contact messages
 */
async function fetchContactMessages() {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ Contact messages fetched:', data);
    return data;
  } catch (error) {
    console.error('❌ Error fetching contact messages:', error);
    return [];
  }
}
