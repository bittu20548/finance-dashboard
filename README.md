# 💰 Finance Dashboard

A personal finance tracking web application built with *React* and *Vite*.

## 📋 About

This project is a responsive finance dashboard that helps users track their income, expenses, and savings. It includes data visualizations, transaction management, and spending insights — all in a clean dark-themed UI.

## ✨ Features

- *Dashboard* — Overview of balance, total income, total expenses, balance trend chart, and spending breakdown donut chart
- *Transactions* — View, search, filter, sort, add and delete transactions
- *Insights* — Category-wise spending bars, savings rate, month-over-month comparison, and key observations
- *Role-based Access* — Admin can add/delete transactions; Viewer has read-only access
- *Responsive Design* — Works on mobile and desktop

## 🛠️ Tech Stack

- React (with Hooks — useState, useMemo)
- Vite
- Pure CSS (inline styles, no external UI library)
- SVG charts (custom built, no chart library)

## 🚀 How to Run

1. Clone the repository
bash
git clone https://github.com/bittu20548/finance-dashboard.git


2. Install dependencies
bash
npm install


3. Start the development server
bash
npm run dev


4. Open your browser at http://localhost:5173

## 📁 Project Structure


finance-dashboard/
├── index.html
├── src/
│   ├── main.jsx       # Entry point
│   ├── App.jsx        # Main dashboard component
│   └── App.css        # Global styles
├── package.json
└── README.md


## 📊 Pages

| Page | Description |
|------|-------------|
| Dashboard | Summary cards, trend chart, donut chart, recent transactions |
| Transactions | Full transaction table with search, filter and sort |
| Insights | Spending analysis, category breakdown, savings rate |