/**
 * ARUZHAN MARATOVA - NSRI AMBASSADOR WEBSITE
 * Main Server File (server.js)
 * 
 * Technology Stack:
 * - Node.js: Runtime environment
 * - Express.js: Web framework for handling HTTP requests
 * - SQLite: Lightweight database for storing data
 * - CORS: Cross-Origin Resource Sharing middleware
 * - Body Parser: Middleware for parsing JSON request bodies
 * 
 * Purpose: 
 * This is the entry point for the backend server. It initializes the Express app,
 * sets up middleware, connects to the database, defines routes, and starts the server.
 * 
 * Port: 3000 (default, changeable via .env)
 */

// ============================================================================
// IMPORTS & DEPENDENCIES
// ============================================================================

const express = require('express');          // Web framework
const cors = require('cors');                 // Enable CORS
const bodyParser = require('body-parser');   // Parse JSON bodies
const path = require('path');                 // Path utilities
const dotenv = require('dotenv');             // Environment variables
const sqlite3 = require('sqlite3').verbose(); // SQLite database

// Load environment variables from .env file
dotenv.config();

// ============================================================================
// INITIALIZE EXPRESS APP
// ============================================================================

const app = express();

// Define port - use PORT from .env, default to 3000
const PORT = process.env.PORT || 3000;

// ============================================================================
// MIDDLEWARE SETUP
// ============================================================================

// CORS Middleware - Allow requests from different origins
// This enables frontend (on different port) to communicate with backend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body Parser Middleware - Parse JSON and URL-encoded request bodies
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Static Files Middleware - Serve static files from 'public' directory
// This allows frontend HTML, CSS, JS files to be accessed
app.use(express.static(path.join(__dirname, 'public')));

// ============================================================================
// DATABASE SETUP
// ============================================================================

// Connect to SQLite database
const db = new sqlite3.Database('./database/aruzhan.db', (err) => {
  if (err) {
    console.error('❌ Database connection error:', err.message);
    process.exit(1);
  } else {
    console.log('✅ Connected to SQLite database');
  }
});

// Initialize database tables on startup
const initializeDatabase = () => {
  // Enable foreign keys
  db.run('PRAGMA foreign_keys = ON');

  // Create users table (for admin authentication)
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'user',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create ambassadors table (NSRI ambassadors)
  db.run(`
    CREATE TABLE IF NOT EXISTS ambassadors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      school TEXT NOT NULL,
      country TEXT NOT NULL,
      bio TEXT,
      avatar_url TEXT,
      joined_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      role TEXT DEFAULT 'ambassador'
    )
  `);

  // Create research_projects table (Research projects showcase)
  db.run(`
    CREATE TABLE IF NOT EXISTS research_projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      researcher_id INTEGER,
      category TEXT,
      status TEXT DEFAULT 'in_progress',
      start_date DATETIME,
      end_date DATETIME,
      image_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(researcher_id) REFERENCES ambassadors(id)
    )
  `);

  // Create blog_posts table (Blog/news posts)
  db.run(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      author_id INTEGER,
      featured_image TEXT,
      category TEXT,
      published BOOLEAN DEFAULT FALSE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(author_id) REFERENCES users(id)
    )
  `);

  // Create contact_messages table (Contact form submissions)
  db.run(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'unread',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log('✅ Database tables initialized');
};

// Call initialization function
initializeDatabase();

// ============================================================================
// API ROUTES
// ============================================================================

// ===== HOME ROUTE =====
// Returns basic API information
app.get('/api', (req, res) => {
  res.json({
    message: 'Aruzhan Maratova - NSRI Ambassador Website API',
    version: '1.0.0',
    endpoints: {
      ambassadors: '/api/ambassadors',
      projects: '/api/projects',
      blog: '/api/blog',
      contact: '/api/contact'
    }
  });
});

// ===== AMBASSADORS ROUTES =====
// Get all ambassadors
app.get('/api/ambassadors', (req, res) => {
  db.all('SELECT * FROM ambassadors', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Get single ambassador by ID
app.get('/api/ambassadors/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM ambassadors WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!row) {
      res.status(404).json({ error: 'Ambassador not found' });
    } else {
      res.json(row);
    }
  });
});

// Create new ambassador (Admin only)
app.post('/api/ambassadors', (req, res) => {
  const { name, school, country, bio, avatar_url, role } = req.body;
  
  // Validate required fields
  if (!name || !school || !country) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  db.run(
    `INSERT INTO ambassadors (name, school, country, bio, avatar_url, role) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [name, school, country, bio, avatar_url, role || 'ambassador'],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({ id: this.lastID, message: 'Ambassador created' });
      }
    }
  );
});

// ===== RESEARCH PROJECTS ROUTES =====
// Get all projects
app.get('/api/projects', (req, res) => {
  db.all(`
    SELECT rp.*, a.name as researcher_name 
    FROM research_projects rp 
    LEFT JOIN ambassadors a ON rp.researcher_id = a.id
  `, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Create new project
app.post('/api/projects', (req, res) => {
  const { title, description, researcher_id, category, status, start_date, image_url } = req.body;
  
  if (!title || !description) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  db.run(
    `INSERT INTO research_projects (title, description, researcher_id, category, status, start_date, image_url) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [title, description, researcher_id, category, status || 'in_progress', start_date, image_url],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({ id: this.lastID, message: 'Project created' });
      }
    }
  );
});

// ===== BLOG POSTS ROUTES =====
// Get published blog posts
app.get('/api/blog', (req, res) => {
  db.all(
    `SELECT bp.*, u.username as author_name 
     FROM blog_posts bp 
     LEFT JOIN users u ON bp.author_id = u.id
     WHERE bp.published = TRUE
     ORDER BY bp.created_at DESC`,
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(rows);
      }
    }
  );
});

// Create blog post (Admin only)
app.post('/api/blog', (req, res) => {
  const { title, content, author_id, featured_image, category, published } = req.body;
  
  if (!title || !content) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  db.run(
    `INSERT INTO blog_posts (title, content, author_id, featured_image, category, published) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [title, content, author_id, featured_image, category, published || false],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({ id: this.lastID, message: 'Blog post created' });
      }
    }
  );
});

// ===== CONTACT FORM ROUTES =====
// Submit contact form
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  
  // Validate required fields
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  db.run(
    `INSERT INTO contact_messages (name, email, subject, message) 
     VALUES (?, ?, ?, ?)`,
    [name, email, subject, message],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({ 
          id: this.lastID, 
          message: 'Message received. Thank you for contacting us!' 
        });
      }
    }
  );
});

// Get contact messages (Admin only)
app.get('/api/contact', (req, res) => {
  db.all('SELECT * FROM contact_messages ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// ============================================================================
// SERVE FRONTEND (SPA ROUTING)
// ============================================================================

// Catch-all route for single-page application
// This ensures all unmatched routes serve index.html so client-side routing works
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ============================================================================
// ERROR HANDLING
// ============================================================================

// 404 Error Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('🚨 Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// ============================================================================
// START SERVER
// ============================================================================

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║  🎓 ARUZHAN MARATOVA - NSRI AMBASSADOR WEBSITE             ║
║  Backend Server Running                                     ║
╠════════════════════════════════════════════════════════════╣
║  🌐 Server: http://localhost:${PORT}                       ║
║  📁 Database: ./database/aruzhan.db                         ║
║  📚 API Docs: http://localhost:${PORT}/api                 ║
╚════════════════════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n👋 Shutting down gracefully...');
  db.close();
  process.exit(0);
});

module.exports = app;
