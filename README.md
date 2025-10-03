# Digital Movie Library

A comprehensive web application for exploring and querying movie databases with advanced search capabilities and complex data analysis features.

## What It Does

The Digital Movie Library is a full-stack application that provides users with an interactive interface to search and analyze movie data. The system allows users to:

- **Search Movies**: Find movies by title, director, and genre with real-time filtering
- **Execute Complex Queries**: Run 5 predefined analytical queries to discover patterns and relationships in movie data
- **Explore Movie Details**: View comprehensive information including plots, ratings, cast, and awards
- **Data Analysis**: Perform sophisticated database queries with exclusion criteria and multi-table joins

## How It Works

### Frontend (React.js)
The user interface is built with React and provides an intuitive web interface where users can:
- Enter search criteria through input fields
- Execute predefined analytical queries with custom parameters
- View query descriptions and results in real-time
- Browse movie information in a clean, responsive layout

### Backend (Node.js/Express)
The server-side application handles:
- **RESTful API endpoints** for movie searches and complex queries
- **MySQL database integration** with connection pooling
- **CORS support** for cross-origin requests
- **Dynamic SQL query generation** based on user parameters

### Database Layer (MySQL)
The application uses a normalized relational database with multiple interconnected tables:
- **MOVIEFINAL**: Core movie information (title, year, genre, awards, etc.)
- **CAST_DETAIL8**: Cast, writer, and director information
- **CRITIC_DETAIL2**: IMDb ratings and vote counts
- **STORY_DETAIL4**: Movie plots and poster information
- **LANGUAGE_FINAL15**: Language and country data
- **Relationship tables** connecting movies to cast, critics, and stories

### Data Processing
The system includes a Python-based data pipeline (Jupyter Notebook) that:
- **Imports CSV data** from multiple sources
- **Creates normalized database schema** with proper relationships
- **Handles data integrity** with error checking and duplicate prevention
- **Populates tables** with movie metadata from various sources

## Key Features

### 1. Basic Movie Search
- Search by movie title, director, and genre
- Real-time filtering with partial matches
- Results display with movie details and plots

### 2. Advanced Analytical Queries
The system provides 5 sophisticated queries:

- **Query 1**: Highest rated movies excluding those by a specific director
- **Query 2**: Movies of specific genre and language, excluding those with directors in cast
- **Query 3**: Award-winning movies in specific language, excluding certain directors
- **Query 4**: Movies from specific year with ratings, excluding director's cast appearances
- **Query 5**: Movies of specific genre with plots and directors, excluding certain languages

### 3. Interactive User Experience
- **Hover descriptions** for each query explaining its purpose
- **Dynamic input fields** that adapt based on selected query
- **Responsive design** with modern UI components
- **Real-time feedback** with error handling and success messages

## Tech Stack

### Frontend
- **React 18.2.0** - Modern JavaScript library for building user interfaces
- **Axios 1.4.0** - HTTP client for API communication
- **CSS3** - Styling with modern design patterns and responsive layout

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js 4.18.2** - Web application framework
- **MySQL 2.18.1** - Database driver for MySQL connections
- **CORS 2.8.5** - Cross-origin resource sharing middleware

### Database
- **MySQL** - Relational database management system
- **Normalized schema** with foreign key relationships
- **Indexed tables** for optimal query performance

### Data Processing
- **Python 3** - Data manipulation and analysis
- **Jupyter Notebook** - Interactive development environment
- **mysql-connector** - Python MySQL database connector
- **Pandas** - Data manipulation and analysis library
- **CSV processing** - Automated data import and validation

### Development Tools
- **React Scripts 5.0.1** - Build tools and development server
- **Jest** - JavaScript testing framework
- **ESLint** - Code linting and quality assurance

## Architecture

The application follows a three-tier architecture:

1. **Presentation Layer**: React frontend with component-based UI
2. **Application Layer**: Express.js API server with business logic
3. **Data Layer**: MySQL database with normalized schema

The system uses a RESTful API design with clear separation of concerns, making it maintainable and scalable for future enhancements.
