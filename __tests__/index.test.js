const request = require('supertest')
const app = require('../index.js')

let server;

beforeAll(() => {
  // Start the server manually for testing
  server = app.listen(3000);
});

afterAll(() => {
  // Close the server after tests are done
  server.close();
});

describe('Gym Membership Management System API', () => {
  let email = "testuser@example.com";

  // 1. Test Register Membership
  test('Register Membership - should register a new member', async () => {
    const response = await request(server).post('/register').send({
      name: "Test User",
      email,
      startDate: "2024-11-25"
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("message", "Membership registered successfully.");
    expect(response.body.member).toEqual({
      name: "Test User",
      email,
      startDate: "2024-11-25",
      isActive: true
    });
  });

  // 2. Test View Membership Details
  test('View Membership Details - should return member details', async () => {
    const response = await request(server).get(`/members/${email}`);
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      name: "Test User",
      email,
      startDate: "2024-11-25",
      isActive: true
    });
  });

  // 3. Test View All Active Members
  test('View All Active Members - should return all active members', async () => {
    const response = await request(server).get('/members');
    
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toContainEqual({
      name: "Test User",
      email,
      startDate: "2024-11-25",
      isActive: true
    });
  });

  // 4. Test Modify Membership Start Date
  test('Modify Membership Start Date - should update start date', async () => {
    const response = await request(server).put(`/members/${email}`).send({
      newStartDate: "2024-12-01"
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("message", "Membership start date updated successfully.");
    expect(response.body.member.startDate).toBe("2024-12-01");
  });

  // 5. Test Cancel Membership
  test('Cancel Membership - should cancel the membership', async () => {
    const response = await request(server).delete(`/members/${email}`);
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("message", "Membership canceled successfully.");
    expect(response.body.member.isActive).toBe(false);
  });

  // 6. Test View Membership Details (non-existent member)
  test('View Membership Details - should return 404 for non-existent member', async () => {
    const nonExistentEmail = "nonexistent@example.com";
    const response = await request(server).get(`/members/${nonExistentEmail}`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("error", "No membership found for this email.");
  });

  // 7. Test Register Membership with missing fields
  test('Register Membership - should return error for missing fields', async () => {
    const response = await request(server).post('/register').send({
      name: "Test User",
      email: ""
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("error", "Name, email, and start date are required.");
  });

  // 8. Test Register Membership with existing email
  test('Register Membership - should return error for existing email', async () => {
    await request(server).post('/register').send({
      name: "Test User",
      email,
      startDate: "2024-11-25"
    });

    const response = await request(server).post('/register').send({
      name: "Another User",
      email,
      startDate: "2024-11-25"
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("error", "Membership already exists for this email.");
  });
});
