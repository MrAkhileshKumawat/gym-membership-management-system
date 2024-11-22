// index.js
const express = require("express");

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

// In-memory storage for gym members
const members = [];

// Utility function to find a member by email
const findMemberByEmail = (email) =>
  members.find((member) => member.email === email);

// 1. Register Membership API
app.post("/register", (req, res) => {
  const { name, email, startDate } = req.body;

  // Validation
  if (!name || !email || !startDate) {
    return res
      .status(400)
      .json({ error: "Name, email, and start date are required." });
  }

  if (findMemberByEmail(email)) {
    return res
      .status(400)
      .json({ error: "Membership already exists for this email." });
  }

  // Add member to the storage
  const newMember = { name, email, startDate, isActive: true };
  members.push(newMember);

  return res.status(201).json({
    message: "Membership registered successfully.",
    member: newMember,
  });
});

// 2. View Membership Details API
app.get("/members/:email", (req, res) => {
  const { email } = req.params;

  const member = findMemberByEmail(email);
  if (!member) {
    return res
      .status(404)
      .json({ error: "No membership found for this email." });
  }

  return res.status(200).json(member);
});

// 3. View All Active Members API
app.get("/members", (req, res) => {
  const activeMembers = members.filter((member) => member.isActive);

  return res.status(200).json(activeMembers);
});

// 4. Cancel Membership API
app.delete("/members/:email", (req, res) => {
  const { email } = req.params;

  const member = findMemberByEmail(email);
  if (!member) {
    return res
      .status(404)
      .json({ error: "No membership found for this email." });
  }

  member.isActive = false;

  return res.status(200).json({
    message: "Membership canceled successfully.",
    member,
  });
});

// 5. Modify Membership Start Date API
app.put("/members/:email", (req, res) => {
  const { email } = req.params;
  const { newStartDate } = req.body;

  if (!newStartDate) {
    return res.status(400).json({ error: "New start date is required." });
  }

  const member = findMemberByEmail(email);
  if (!member) {
    return res
      .status(404)
      .json({ error: "No membership found for this email." });
  }

  member.startDate = newStartDate;

  return res.status(200).json({
    message: "Membership start date updated successfully.",
    member,
  });
});

if (process.env.NODE_ENV !== "test") {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Gym Membership Management System is running on port ${PORT}`);
  });
}

module.exports = app;
