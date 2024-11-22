Here's the raw Markdown content for the README.md file:

# Gym Membership Management System

## Description

The Gym Membership Management System is a lightweight RESTful API built with Node.js and Express.js. It provides efficient endpoints for managing gym memberships, including registration, updating start dates, viewing member details, and canceling memberships. The system uses in-memory storage for simplicity.

## Installation Instructions

1. Clone the repository:

```shellscript
git clone <repository-url>
cd <project-folder>
```


2. Install dependencies:

```shellscript
npm install
```


3. Set up the environment:

1. Create a `.env` file in the root directory
2. Add necessary environment variables (e.g., DB_HOST, DB_PORT, etc.)





## Running the Application

Start the application:

```shellscript
npm start
```

Run tests:

```shellscript
npm test
```

## API Endpoints

### POST /register

- **Method:** POST
- **URL:** `/register`
- **Description:** Registers a new member in the gym.
- **Example Request:**

```json
{
  "name": "Test User",
  "email": "testuser@example.com",
  "startDate": "2024-11-25"
}
```


- **Example Response:**

```json
{
  "message": "Membership registered successfully.",
  "member": {
    "name": "Test User",
    "email": "testuser@example.com",
    "startDate": "2024-11-25",
    "isActive": true
  }
}
```




### GET /members/email

- **Method:** GET
- **URL:** `/members/{email}`
- **Description:** Views details of a specific member by their email.
- **Example Request:** GET /members/testuser@example.com
- **Example Response:**

```json
{
  "name": "Test User",
  "email": "testuser@example.com",
  "startDate": "2024-11-25",
  "isActive": true
}
```




### GET /members

- **Method:** GET
- **URL:** `/members`
- **Description:** Returns a list of all active members.
- **Example Response:**

```json
[
  {
    "name": "Test User",
    "email": "testuser@example.com",
    "startDate": "2024-11-25",
    "isActive": true
  }
]
```




### PUT /members/email

- **Method:** PUT
- **URL:** `/members/{email}`
- **Description:** Updates the start date for a specific member.
- **Example Request:**

```json
{
  "newStartDate": "2024-12-01"
}
```


- **Example Response:**

```json
{
  "message": "Membership start date updated successfully.",
  "member": {
    "name": "Test User",
    "email": "testuser@example.com",
    "startDate": "2024-12-01",
    "isActive": true
  }
}
```




### DELETE /members/email

- **Method:** DELETE
- **URL:** `/members/{email}`
- **Description:** Cancels a membership for a specific member.
- **Example Response:**

```json
{
  "message": "Membership canceled successfully.",
  "member": {
    "name": "Test User",
    "email": "testuser@example.com",
    "startDate": "2024-11-25",
    "isActive": false
  }
}
```




### GET /members/nonExistentEmail

- **Method:** GET
- **URL:** `/members/{nonExistentEmail}`
- **Description:** Returns 404 error if no membership exists for the given email.
- **Example Response:**

```json
{
  "error": "No membership found for this email."
}
```




## Error Handling

The API returns appropriate HTTP status codes and error messages:

- 400: Bad Request (e.g., missing required fields)
- 404: Resource Not Found (e.g., member not found)


## Technologies Used

- Node.js
- Express.js
- Jest (for unit testing)
- Supertest (for API testing)


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.