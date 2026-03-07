# Aruzhan Maratova - NSRI Ambassador Website

A modern, full-stack web application showcasing NSRI (National Student Research Institute) ambassadors, research projects, and the global research community.

## 🎯 Project Overview

This is a complete full-stack website built with:
- **Frontend:** HTML5, CSS3, JavaScript
- **Backend:** Node.js with Express.js
- **Database:** SQLite
- **Architecture:** REST API with Single Page Application (SPA)

## 📁 Project Structure

```
aruzhan-nsri-website/
├── server.js                 # Main backend server (Express.js)
├── package.json             # npm dependencies
├── .env.example             # Environment variables template
├── public/                  # Frontend files (served as static)
│   ├── index.html          # Main HTML page
│   ├── css/
│   │   └── styles.css      # All CSS styling
│   ├── js/
│   │   ├── app.js          # Main application logic
│   │   ├── api.js          # API communication functions
│   │   └── ui.js           # UI rendering functions
│   └── images/             # Image assets
├── src/                    # Source code (future use)
├── config/                 # Configuration files
├── database/               # Database files
│   └── aruzhan.db         # SQLite database
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone or extract the project:**
```bash
cd aruzhan-nsri-website
```

2. **Install dependencies:**
```bash
npm install
```

3. **Setup environment variables:**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Start the server:**
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

5. **Access the website:**
Open `http://localhost:3000` in your browser

## 🛠️ Technology Stack

### Frontend
- **HTML5:** Semantic markup for accessibility
- **CSS3:** Modern styling with variables, flexbox, grid
- **JavaScript:** Vanilla JS (no dependencies)
  - Fetch API for HTTP requests
  - DOM manipulation for dynamic content
  - Event listeners for interactivity

### Backend
- **Node.js:** JavaScript runtime
- **Express.js:** Web framework for routing and middleware
- **SQLite3:** Lightweight relational database
- **CORS:** Enable cross-origin requests
- **Body Parser:** Parse JSON request bodies

## 📚 API Endpoints

### Ambassadors
- `GET /api/ambassadors` - Get all ambassadors
- `GET /api/ambassadors/:id` - Get single ambassador
- `POST /api/ambassadors` - Create new ambassador

### Research Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project

### Blog Posts
- `GET /api/blog` - Get published posts
- `POST /api/blog` - Create blog post

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get contact messages (admin only)

## 🎨 Design System

### Color Palette
- Primary: `#3b82f6` (Blue)
- Dark: `#0f172a` (Very Dark Blue)
- Light: `#f8fafc` (Off-white)
- Success: `#10b981` (Green)
- Warning: `#f59e0b` (Amber)
- Error: `#ef4444` (Red)

### Typography
- Headings: Montserrat (Bold, Modern)
- Body: Poppins (Contemporary)
- Accents: Playfair Display (Elegant)

### Spacing
Uses 8px based scale (8px, 16px, 24px, 32px, 48px, 64px)

## 🔧 Development Guide

### Adding a New Section
1. Add HTML in `public/index.html`
2. Add CSS in `public/css/styles.css`
3. Add JavaScript in `public/js/app.js` or create new file

### Adding a New API Endpoint
1. Create route in `server.js`
2. Create API function in `public/js/api.js`
3. Create UI function in `public/js/ui.js`

### Database Operations
SQLite database is created automatically. Access it via:
```bash
sqlite3 database/aruzhan.db
```

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  username TEXT UNIQUE,
  email TEXT UNIQUE,
  password TEXT,
  role TEXT,
  created_at DATETIME
)
```

### Ambassadors Table
```sql
CREATE TABLE ambassadors (
  id INTEGER PRIMARY KEY,
  name TEXT,
  school TEXT,
  country TEXT,
  bio TEXT,
  avatar_url TEXT,
  joined_date DATETIME,
  role TEXT
)
```

### Research Projects Table
```sql
CREATE TABLE research_projects (
  id INTEGER PRIMARY KEY,
  title TEXT,
  description TEXT,
  researcher_id INTEGER,
  category TEXT,
  status TEXT,
  start_date DATETIME,
  end_date DATETIME,
  image_url TEXT,
  created_at DATETIME
)
```

### Blog Posts Table
```sql
CREATE TABLE blog_posts (
  id INTEGER PRIMARY KEY,
  title TEXT,
  content TEXT,
  author_id INTEGER,
  featured_image TEXT,
  category TEXT,
  published BOOLEAN,
  created_at DATETIME,
  updated_at DATETIME
)
```

### Contact Messages Table
```sql
CREATE TABLE contact_messages (
  id INTEGER PRIMARY KEY,
  name TEXT,
  email TEXT,
  subject TEXT,
  message TEXT,
  status TEXT,
  created_at DATETIME
)
```

## 🔐 Security Notes

This is a development/educational project. For production:
- Add authentication system
- Implement password hashing
- Add input validation and sanitization
- Use HTTPS
- Implement rate limiting
- Add CSRF protection
- Store sensitive data securely

## 📈 Performance Considerations

- CSS Custom Properties for consistent theming
- CSS-only animations for performance
- Fetch API for async data loading
- Parallel data loading with Promise.all
- Semantic HTML for accessibility
- Mobile-first responsive design

## 🚀 Deployment

### Option 1: Heroku
```bash
heroku create
git push heroku main
```

### Option 2: Vercel/Netlify
- Frontend: Deploy `public` folder
- Backend: Deploy to separate service

### Option 3: VPS/Cloud Server
```bash
npm install
npm start
```

## 📝 License

This project is created by Aruzhan Maratova, NSRI Director.

## 🤝 Contributing

For contributions or issues, please contact the project owner.

## 📞 Support

For questions about NSRI:
- Website: https://divine-set-544592.framer.app/
- Discord: https://discord.gg/DZ9FwNYSeJ
- LinkedIn: https://www.linkedin.com/company/nsri-official/

---

**Created:** March 2026
**Version:** 1.0.0
**Status:** Active Development
