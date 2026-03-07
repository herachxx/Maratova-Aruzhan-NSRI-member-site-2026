# ARUZHAN MARATOVA - NSRI AMBASSADOR WEBSITE
## Complete Project Documentation

**Version:** 1.0.0  
**Created:** March 7, 2026  
**Developer:** Aruzhan Maratova - NSRI Director  
**Project Type:** Full-Stack Web Application  

---

## TABLE OF CONTENTS

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [File Structure](#file-structure)
4. [Installation & Setup](#installation--setup)
5. [Backend Documentation](#backend-documentation)
6. [Frontend Documentation](#frontend-documentation)
7. [Database Schema](#database-schema)
8. [API Reference](#api-reference)
9. [Code Walkthrough](#code-walkthrough)
10. [Customization Guide](#customization-guide)
11. [Deployment Guide](#deployment-guide)
12. [Troubleshooting](#troubleshooting)

---

## PROJECT OVERVIEW

### Purpose
This is a complete full-stack web application that showcases NSRI (National Student Research Institute) school ambassadors, research projects, and blog posts. It serves as the digital presence for NSRI and allows students to learn about research opportunities, connect with ambassadors, and submit inquiries.

### Key Features
- **Responsive Design:** Works on desktop, tablet, and mobile devices
- **Dynamic Content Loading:** Data loaded from backend via REST API
- **Contact Form:** Public inquiries with validation and storage
- **Ambassador Directory:** Browse researchers from around the world
- **Research Showcase:** Display ongoing and completed projects
- **Blog System:** Share news and updates with the community
- **Admin Panel Ready:** Architecture prepared for future admin features

### Users
- **Students:** Browse opportunities, learn about research
- **Ambassadors:** Represented in directory
- **Admins:** (Future) Manage content and messages

---

## TECHNOLOGY STACK

### Frontend
| Technology | Purpose | Why Chosen |
|---|---|---|
| **HTML5** | Semantic markup | Better SEO, accessibility, future-proof |
| **CSS3** | Styling & layout | Modern CSS Grid/Flexbox, variables, animations |
| **JavaScript (ES6+)** | Interactivity | No dependencies, lightweight, fast loading |
| **Fetch API** | HTTP requests | Native browser API, no jQuery needed |

### Backend
| Technology | Purpose | Why Chosen |
|---|---|---|
| **Node.js** | Runtime environment | JavaScript on server, large ecosystem |
| **Express.js** | Web framework | Lightweight, flexible, industry standard |
| **SQLite** | Database | Lightweight, no setup, perfect for this scale |
| **CORS** | Security | Enable safe cross-origin requests |
| **Body Parser** | Request parsing | Handle JSON payloads |

### Development Tools
| Tool | Purpose |
|---|---|
| **npm** | Package manager |
| **nodemon** | Auto-reload in development |
| **dotenv** | Environment variables |

---

## FILE STRUCTURE

```
aruzhan-nsri-website/
│
├── 📄 server.js                 [Main backend server file - 400+ lines]
├── 📄 package.json             [NPM dependencies and scripts]
├── 📄 .env.example             [Environment configuration template]
├── 📄 README.md                [Project overview and quick start]
│
├── 📁 public/                  [Frontend files served to browser]
│   ├── 📄 index.html          [Main HTML page - 400+ lines]
│   ├── 📁 css/
│   │   └── 📄 styles.css      [All CSS styling - 1000+ lines]
│   ├── 📁 js/
│   │   ├── 📄 api.js          [API functions - 300+ lines]
│   │   ├── 📄 ui.js           [UI rendering - 250+ lines]
│   │   └── 📄 app.js          [Main app logic - 200+ lines]
│   └── 📁 images/             [Asset storage]
│
├── 📁 src/                     [Source code (future use)]
│   ├── 📁 routes/             [API route handlers]
│   ├── 📁 controllers/        [Business logic]
│   ├── 📁 models/             [Data models]
│   └── 📁 middleware/         [Custom middleware]
│
├── 📁 config/                  [Configuration files]
│   └── database.js            [Database setup]
│
├── 📁 database/               [Database files]
│   └── aruzhan.db            [SQLite database file]
│
└── 📁 assets/                 [Static assets]
    └── [images, documents]
```

---

## INSTALLATION & SETUP

### Prerequisites
- Node.js v14+ (https://nodejs.org/)
- npm v6+ (included with Node.js)
- Basic command line knowledge

### Step-by-Step Installation

#### 1. Extract Project
```bash
unzip aruzhan-nsri-website.zip
cd aruzhan-nsri-website
```

#### 2. Install Dependencies
```bash
npm install
```

This installs:
- express (4.18.2)
- cors (2.8.5)
- body-parser (1.20.2)
- sqlite3 (5.1.6)
- dotenv (16.0.3)
- nodemon (2.0.22) - dev only

#### 3. Configure Environment
```bash
cp .env.example .env
# Edit .env with your settings
```

Key variables:
- `PORT=3000` - Server port
- `NODE_ENV=development` - Environment mode
- `FRONTEND_URL=http://localhost:3000` - Frontend origin for CORS

#### 4. Initialize Database
```bash
# Database is created automatically on first run
npm start
```

#### 5. Access Website
```
http://localhost:3000
```

---

## BACKEND DOCUMENTATION

### server.js (Main Server File)

#### Structure
```
Imports & Dependencies (30 lines)
  ↓
Initialize Express App (10 lines)
  ↓
Middleware Setup (25 lines)
  ↓
Database Setup (35 lines)
  ↓
API Routes (300+ lines)
  ↓
Error Handling (15 lines)
  ↓
Start Server (20 lines)
```

#### Key Sections

##### 1. Imports
```javascript
const express = require('express');          // Web framework
const cors = require('cors');                 // CORS middleware
const bodyParser = require('body-parser');   // Parse request bodies
const path = require('path');                 // Path utilities
const dotenv = require('dotenv');             // Environment vars
const sqlite3 = require('sqlite3').verbose(); // Database
```

##### 2. Middleware
- **CORS:** Allows frontend to communicate with backend
- **Body Parser:** Converts JSON request bodies to JS objects
- **Static Files:** Serves HTML, CSS, JS from `public` folder

##### 3. Database Initialization
Creates SQLite database with 5 tables:
- `users` - Admin accounts
- `ambassadors` - NSRI ambassadors directory
- `research_projects` - Ongoing research projects
- `blog_posts` - Blog/news articles
- `contact_messages` - Contact form submissions

##### 4. API Routes

**GET Routes (Fetch Data):**
- `GET /api` - API info
- `GET /api/ambassadors` - All ambassadors
- `GET /api/ambassadors/:id` - Single ambassador
- `GET /api/projects` - All projects
- `GET /api/blog` - Published blog posts
- `GET /api/contact` - Contact messages (admin)

**POST Routes (Create Data):**
- `POST /api/ambassadors` - Create ambassador
- `POST /api/projects` - Create project
- `POST /api/blog` - Create blog post
- `POST /api/contact` - Submit contact form

#### Database Operations

**Reading Data (SELECT):**
```javascript
db.all('SELECT * FROM ambassadors', (err, rows) => {
  // rows contains array of results
});
```

**Creating Data (INSERT):**
```javascript
db.run(
  'INSERT INTO ambassadors (name, school, country) VALUES (?, ?, ?)',
  [name, school, country],
  function(err) {
    // this.lastID contains new record ID
  }
);
```

**Error Handling:**
- HTTP 400: Bad request (missing fields)
- HTTP 404: Not found
- HTTP 500: Server error

#### Running Server

Development (with auto-reload):
```bash
npm run dev
```

Production:
```bash
npm start
```

---

## FRONTEND DOCUMENTATION

### File Organization

#### index.html (Main HTML)
**Purpose:** Structure of the entire website
**Size:** ~400 lines
**Sections:**
1. `<head>` - Meta tags, fonts, CSS link (50 lines)
2. `<body>` - Content sections (350 lines)
   - Navigation bar
   - Hero section
   - About section
   - Ambassadors section
   - Projects section
   - Blog section
   - Contact section
   - Footer

**Key Elements:**
```html
<section id="home"> - Hero/home section
<section id="about"> - About/skills section
<section id="ambassadors"> - Ambassadors grid
<section id="projects"> - Projects grid
<section id="blog"> - Blog posts grid
<section id="contact"> - Contact form
```

**JavaScript Hooks:**
```html
<div id="ambassadorsGrid"> - Target for rendering
<form id="contactForm"> - Contact form
<div id="hamburger"> - Mobile menu toggle
```

#### styles.css (All CSS)
**Purpose:** Complete styling for entire site
**Size:** ~1000 lines
**Organization:**

```
CSS Variables (50 lines)
  ├── Colors
  ├── Spacing scale
  ├── Typography
  └── Effects

Global Styles (50 lines)
  ├── Reset
  ├── Body
  ├── Typography
  └── Links

Component Styles (900 lines)
  ├── Navigation (100 lines)
  ├── Hero section (100 lines)
  ├── Sections (200 lines)
  ├── Cards (200 lines)
  ├── Forms (100 lines)
  ├── Footer (50 lines)
  └── Responsive (250 lines)
```

**CSS Variables System:**
```css
:root {
  --color-primary: #3b82f6;      /* Blue */
  --color-primary-dark: #1e40af; /* Dark blue */
  --color-primary-light: #dbeafe;/* Light blue */
  --font-primary: 'Montserrat';  /* Headings */
  --font-secondary: 'Poppins';   /* Body */
  --space-md: 1rem;              /* 16px spacing */
  /* ... more variables */
}
```

**Grid System:**
- Main container: 1200px max-width
- Cards grid: `repeat(auto-fill, minmax(280px, 1fr))`
- Responsive breakpoints: 1200px, 768px, 480px

**Animations:**
```css
@keyframes fadeIn { /* Fade in effect */
@keyframes slideInLeft { /* Slide from left */
@keyframes slideInRight { /* Slide from right */
@keyframes spin { /* Loading spinner */
```

#### api.js (API Communication)
**Purpose:** All HTTP requests to backend
**Size:** ~300 lines
**Functions:**

```javascript
fetchAmbassadors()        // GET all ambassadors
fetchAmbassadorById(id)   // GET single ambassador
createAmbassador(data)    // POST new ambassador
fetchProjects()           // GET all projects
createProject(data)       // POST new project
fetchBlogPosts()          // GET blog posts
createBlogPost(data)      // POST blog post
submitContactForm(data)   // POST contact form
fetchContactMessages()    // GET messages (admin)
```

**Error Handling:**
```javascript
try {
  const response = await fetch(url);
  if (!response.ok) throw new Error(...);
  const data = await response.json();
  return data;
} catch (error) {
  console.error('Error:', error);
  return [];
}
```

**Request Format:**
```javascript
fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
```

#### ui.js (UI Rendering)
**Purpose:** Convert data to HTML and update page
**Size:** ~250 lines
**Main Functions:**

```javascript
renderAmbassadors(data)   // Create ambassador cards
renderProjects(data)      // Create project cards
renderBlogPosts(data)     // Create blog post cards
showMessage(msg, type)    // Show success/error popup
resetForm(formId)         // Clear form fields
clearFormErrors(formId)   // Remove error highlighting
```

**Rendering Example:**
```javascript
function renderAmbassadors(ambassadors) {
  const grid = document.getElementById('ambassadorsGrid');
  grid.innerHTML = ''; // Clear old content
  
  ambassadors.forEach(ambassador => {
    const card = document.createElement('div');
    card.className = 'ambassador-card';
    card.innerHTML = `
      <h3>${ambassador.name}</h3>
      <p>${ambassador.school}</p>
    `;
    grid.appendChild(card);
  });
}
```

#### app.js (Application Logic)
**Purpose:** Initialize app and handle interactions
**Size:** ~200 lines
**Key Functions:**

```javascript
setupNavigation()         // Initialize navbar
loadAllData()            // Fetch all data on load
setupFormHandlers()      // Handle form submission
validateContactForm()    // Validate contact form
trackPageView()          // Analytics
```

**Initialization:**
```javascript
document.addEventListener('DOMContentLoaded', () => {
  // Runs when HTML is fully loaded
  setupNavigation();
  loadAllData();
  setupFormHandlers();
});
```

**Data Loading Pattern:**
```javascript
async function loadAllData() {
  // Show loading states
  setLoading('ambassadorsLoading', true);
  
  // Fetch data in parallel
  const [ambassadors, projects] = await Promise.all([
    fetchAmbassadors(),
    fetchProjects()
  ]);
  
  // Render data
  renderAmbassadors(ambassadors);
  renderProjects(projects);
}
```

---

## DATABASE SCHEMA

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'user',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```
**Purpose:** Admin authentication (future)  
**Fields:** id, username, email, password, role, created_at

### Ambassadors Table
```sql
CREATE TABLE ambassadors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  school TEXT NOT NULL,
  country TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  joined_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  role TEXT DEFAULT 'ambassador'
)
```
**Purpose:** Directory of NSRI school ambassadors  
**Example:**
```json
{
  "name": "Aruzhan Maratova",
  "school": "Aqbobek International School",
  "country": "Kazakhstan",
  "bio": "Cybersecurity researcher...",
  "role": "director"
}
```

### Research Projects Table
```sql
CREATE TABLE research_projects (
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
```
**Purpose:** Showcase ongoing research  
**Status Values:** in_progress, completed, paused

### Blog Posts Table
```sql
CREATE TABLE blog_posts (
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
```
**Purpose:** Blog/news articles  
**Note:** published field determines visibility

### Contact Messages Table
```sql
CREATE TABLE contact_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```
**Purpose:** Store contact form submissions  
**Status Values:** unread, read, replied

---

## API REFERENCE

### Base URL
```
http://localhost:3000/api
```

### Authentication
Currently no authentication. Future implementation needed for admin endpoints.

### Response Format
```json
{
  "status": "success",
  "data": {},
  "error": null
}
```

### Error Codes
- **200** - OK
- **201** - Created
- **400** - Bad Request (validation failed)
- **404** - Not Found
- **500** - Server Error

### Endpoints

#### GET /api/ambassadors
**Description:** Get all ambassadors  
**Response:**
```json
[
  {
    "id": 1,
    "name": "Aruzhan Maratova",
    "school": "AIS",
    "country": "Kazakhstan",
    "role": "director"
  }
]
```

#### POST /api/ambassadors
**Description:** Create new ambassador  
**Body:**
```json
{
  "name": "John Doe",
  "school": "MIT",
  "country": "USA",
  "bio": "Computer science researcher",
  "avatar_url": "https://...",
  "role": "ambassador"
}
```

#### GET /api/projects
**Description:** Get all research projects  
**Response:**
```json
[
  {
    "id": 1,
    "title": "Cybersecurity in IoT",
    "description": "...",
    "status": "in_progress",
    "researcher_name": "Aruzhan Maratova"
  }
]
```

#### POST /api/blog
**Description:** Create blog post  
**Body:**
```json
{
  "title": "Latest NSRI Updates",
  "content": "...",
  "author_id": 1,
  "published": true
}
```

#### POST /api/contact
**Description:** Submit contact form (Public)  
**Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "subject": "Question about NSRI",
  "message": "I'm interested in..."
}
```

---

## CODE WALKTHROUGH

### Example: Loading and Displaying Ambassadors

#### 1. HTML (index.html)
```html
<section id="ambassadors">
  <h2>NSRI Ambassadors</h2>
  <div id="ambassadorsGrid">
    <!-- Content loaded by JavaScript -->
  </div>
</section>
```

#### 2. Fetch Data (api.js)
```javascript
async function fetchAmbassadors() {
  const response = await fetch(`${API_BASE_URL}/ambassadors`);
  const data = await response.json();
  return data;
}
```

#### 3. Render UI (ui.js)
```javascript
function renderAmbassadors(ambassadors) {
  const grid = document.getElementById('ambassadorsGrid');
  ambassadors.forEach(ambassador => {
    const card = document.createElement('div');
    card.className = 'ambassador-card';
    card.innerHTML = `
      <div class="ambassador-card-header">
        <h3>${ambassador.name}</h3>
      </div>
      <div class="ambassador-card-body">
        <p><strong>School:</strong> ${ambassador.school}</p>
        <p><strong>Country:</strong> ${ambassador.country}</p>
      </div>
    `;
    grid.appendChild(card);
  });
}
```

#### 4. Initialize (app.js)
```javascript
async function loadAllData() {
  const ambassadors = await fetchAmbassadors();
  renderAmbassadors(ambassadors);
}

document.addEventListener('DOMContentLoaded', loadAllData);
```

#### 5. Style (styles.css)
```css
.ambassador-card {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.ambassador-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0,0,0,0.2);
}
```

---

## CUSTOMIZATION GUIDE

### Changing Colors
Edit CSS variables in `styles.css`:
```css
:root {
  --color-primary: #3b82f6;      /* Change primary blue */
  --color-warning: #f59e0b;      /* Change accent color */
}
```

### Adding a New Section
1. Add HTML section with unique ID
2. Add CSS styles with class selectors
3. Create rendering function in ui.js
4. Call function from app.js

### Adding a New API Endpoint

**Backend (server.js):**
```javascript
app.get('/api/new-endpoint', (req, res) => {
  // Handle request
  res.json(data);
});
```

**Frontend (api.js):**
```javascript
async function fetchNewData() {
  const response = await fetch(`${API_BASE_URL}/new-endpoint`);
  return await response.json();
}
```

**Rendering (ui.js):**
```javascript
function renderNewData(data) {
  const container = document.getElementById('container-id');
  // Generate HTML from data
}
```

### Customizing the Database
**Add new table:**
```javascript
db.run(`
  CREATE TABLE new_table (
    id INTEGER PRIMARY KEY,
    field TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);
```

---

## DEPLOYMENT GUIDE

### Option 1: Heroku
```bash
heroku login
heroku create app-name
git push heroku main
heroku open
```

### Option 2: Digital Ocean
1. Create VPS
2. Install Node.js
3. Clone repository
4. Set environment variables
5. Run: `npm install && npm start`
6. Use PM2 for process management

### Option 3: AWS
1. Create EC2 instance
2. Install Node.js
3. Deploy code
4. Use RDS for database
5. Configure security groups

### Environment Variables for Production
```
NODE_ENV=production
PORT=80
FRONTEND_URL=https://your-domain.com
DB_PATH=/var/lib/app/aruzhan.db
DEBUG=false
```

---

## TROUBLESHOOTING

### Common Issues

**Issue:** Port 3000 already in use
**Solution:**
```bash
# Find process using port
lsof -i :3000
# Kill process
kill -9 PID
# Or use different port
PORT=3001 npm start
```

**Issue:** Database not found
**Solution:** Database is created automatically on first run. Check database folder exists:
```bash
mkdir -p database
npm start
```

**Issue:** CORS error
**Solution:** Check FRONTEND_URL in .env matches your frontend origin

**Issue:** Static files not serving
**Solution:** Ensure public folder exists with all files:
```bash
ls public/index.html
ls public/css/styles.css
ls public/js/*.js
```

**Issue:** Data not loading
**Solution:** Check browser console for errors. Verify:
1. Backend is running
2. API endpoints work: curl http://localhost:3000/api
3. Database is populated with test data

---

## FUTURE ENHANCEMENTS

- [ ] User authentication system
- [ ] Admin dashboard
- [ ] Password reset functionality
- [ ] Email notifications
- [ ] Image upload system
- [ ] Search functionality
- [ ] Advanced filtering
- [ ] Comments on blog posts
- [ ] User profiles
- [ ] Research matching algorithm
- [ ] Real-time notifications
- [ ] Mobile app

---

## MAINTENANCE

### Regular Tasks
- **Weekly:** Check contact messages
- **Monthly:** Backup database
- **Quarterly:** Review and update content
- **Annually:** Security audit

### Monitoring
- Server logs: Check for errors
- Database size: Monitor growth
- Performance: Track load times
- Security: Keep dependencies updated

---

## CONTACT & SUPPORT

**Project Owner:** Aruzhan Maratova  
**NSRI Website:** https://divine-set-544592.framer.app/  
**Discord:** https://discord.gg/DZ9FwNYSeJ  
**Email:** For NSRI info - mkang351@gatech.edu  

---

**Last Updated:** March 7, 2026  
**Document Version:** 1.0  
**Status:** Complete
