# Budget & Investment Advisory Frontend

## Overview
A React-based frontend application for personal budget management and investment tracking. This application interfaces with the [Budget & Investment Advisory API](https://icapital-budget-be.onrender.com/).

## Live Links
- Deployed Site: [https://djoyner-icapital-budget-app.netlify.app/]
- Backend API: [https://icapital-budget-be.onrender.com/](https://icapital-budget-be.onrender.com/)

## Tech Stack
### Frontend Framework
- **React**: JavaScript library for building user interfaces
- **Vite**: Next-generation frontend tooling
- **React Router DOM**: Declarative routing for React applications

### Data Visualization
- **Chart.js**: JavaScript charting library
- **React Chart.js 2**: React wrapper for Chart.js
- **Polygon.io API**: Real-time and historical financial data

### State Management & Data Fetching
- **React Context**: Application state management
- **Axios**: Promise-based HTTP client

### Styling & UI
- **SCSS**: CSS preprocessor
- **React Icons**: Icon components library
- **Google Fonts**: Web font library (Inter & Open Sans)

### Development Tools
- **Git**: Version control
- **npm**: Package management
- **Chrome DevTools**: Debugging and development

### Environment Management
- **dotenv**: Environment variable management

### Deployment
- **Netlify**: Cloud hosting platform

## Features

### User Authentication & Security
- User registration with email verification
- Secure login system
- Protected routes for authenticated users
- Email verification status tracking
- Password reset functionality
- Session management with JWT tokens

### Budget Management
- Budget tracking interface
- Income and expense management
- Financial reports with detailed insights
- Group by category line graph for visualizing spending trends

<!-- ### Investment Tracking
- Integration with Polygon.io API for real-time stock data
- Weekly stock price visualization
- Volume trading analysis -->
### Investment Returns Calculator
The Investment Returns Calculator helps users estimate potential stock investments based on their savings. Using real-time data from Financial Modeling Prep API, users can:

- View current stock prices and earnings per share (EPS) for popular companies
- Calculate how many shares they can buy with different percentages of their savings:
  - Conservative (15% of savings)
  - Moderate (30% of savings)
  - Aggressive (50% of savings)
- See projected annual and monthly earnings based on current EPS
- Get recommendations if they can't afford shares
- View company financial metrics in real-time

#### Data Source
- Stock data provided by Financial Modeling Prep API
- Endpoints used:
  - `/api/v3/quote/${ticker}` for real-time stock price and EPS
  - Data includes: current price, EPS, company name, and other metrics

#### Investment Calculations
- Number of possible shares = (savings × investment percentage) ÷ share price
- Annual projected earnings = number of shares × EPS
- Monthly projected earnings = annual earnings ÷ 12

#### Prerequisites
1. Sign up for a free API key at [Financial Modeling Prep](https://financialmodelingprep.com/developer)
2. Add your API key to the `.env` file as `VITE_FMP_API_KEY`

## Installation

# Clone repository
git clone https://github.com/DestinyJoyner/iCapital-Budget-FE.git

# Install dependencies
npm install

# Start development server
npm run dev

## Environment Variables
VITE_API_URL=http://localhost:3001

VITE_FMP_API_KEY=your_financial_modeling_prep_api_key

<!-- VITE_POLYGON_API_KEY=your_polygon_api_key_here -->

## Usage
- **Financial Reports**: Access detailed financial reports to track your budget and investments.
- **Category Line Graph**: Visualize your spending trends over time with a line graph grouped by category.
- **Stock Data**: View real-time stock data using the Polygon.io API to make informed investment decisions.
