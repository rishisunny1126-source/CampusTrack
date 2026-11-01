# CampusTrack — Campus Equipment Management API

## Project Overview

CampusTrack is a backend application developed to manage equipment and resources within educational institutions.

It provides RESTful APIs to create, retrieve, update and delete equipment records using Node.js, Express.js and SQLite.

## Problem Statement

Educational institutions often maintain equipment records manually. This makes it difficult to track inventory, monitor equipment availability and maintain accurate records.

CampusTrack provides a centralized backend solution for managing campus equipment.

## Objectives

- Develop a REST API using Express.js.
- Connect the application to an SQLite database.
- Implement CRUD operations.
- Validate incoming data.
- Handle invalid requests and missing records.
- Test API endpoints.

## Technologies Used

- Node.js
- Express.js
- JavaScript
- SQLite
- npm
- PowerShell for API testing
- Git and GitHub

## Project Structure

```text
CampusTrack/
├── lab-01/
│   └── app.js
├── lab-02/
│   ├── database/
│   │   └── database.js
│   ├── routes/
│   │   └── equipment.js
│   └── app.js
├── package.json
└── README.md
```

## Installation

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

3. Start Lab 01:

```bash
npm start
```

4. Start Lab 02:

```bash
npm run lab2
```

Lab 01 runs on port 3000.

Lab 02 runs on port 3001.

The SQLite database is initialized automatically when Lab 02 starts.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/equipment | Add equipment |
| GET | /api/equipment | Retrieve all equipment |
| GET | /api/equipment/:id | Retrieve equipment by ID |
| PUT | /api/equipment/:id | Update equipment |
| DELETE | /api/equipment/:id | Delete equipment |
| GET | /api/status | Check API and database status |

## Validation

- Required fields are checked.
- Negative quantities are rejected.
- Invalid equipment IDs are rejected.
- Missing equipment records return 404.
- Parameterized SQL queries are used.

## Database

Database: SQLite

Table: equipment

Columns:
- id
- name
- category
- quantity
- location
- status

## Project Status

Lab 01: Completed

Lab 02: Completed

CRUD operations: Tested

Input validation: Tested