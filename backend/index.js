const express = require("express");
const app = express();
const cors = require("cors");

const bcrypt = require("bcrypt");

const db = require("./db");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send({ message: "Hello World!" });
});

app.get('/api/user', (req, res) => {

  const sql = 'SELECT * FROM users WHERE name = ?';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send({ error: 'Database error' });
    }
    if (results.length ===  0) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.status(200).send(results[0]);
  });
});

app.post("/register", (req, res) => {
    let name = req.body.name;
    let password = req.body.password;
    let email = req.body.email;
    let dob = req.body.dob;
    let contact = req.body.contact;
  
    // Validate the data here (e.g., check for empty fields, correct formats, etc.)
  
    bcrypt.hash(password,  10, (err, hash) => {
      if (err) {
        console.log(err);
        res.status(500).send({ error: "Error hashing password" });
        return;
      }
  
      // Update the SQL query to include the new fields
      db.query(
        "INSERT INTO users(name, password, email, dob, contact) VALUES (?, ?, ?, ?, ?)",
        [name, hash, email, dob, contact],
        (err, result) => {
          if (err) {
            if (err.code === "ER_DUP_ENTRY") {
              res.status(409).send({ error: "User already exists" });
            } else {
              res.status(500).send({ error: "Database error" });
            }
          } else {
            res.status(201).send({ message: "User registered successfully" });
            console.log(result);
          }
        }
      );
    });
  });

app.post("/login", (req, res) => {
    
  let name = req.body.email;
  // console.log(name);
  let password = req.body.password;
  db.query(
    // "SELECT * FROM users WHERE name=? AND password=?",
    "SELECT * FROM users WHERE email=?",
    name,
    (err, result) => {
      if (err) console.log(err);

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            console.log(result);
            res.send(result);
          } else {
            res.send({ msg: "WRONG username/password combination" });
          }
        });
      } else {
        res.send({ msg: "user doesn't exist." });
      }
    }
  );
});

app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, contact, email } = req.body;

  // Create the SQL query string
  const sql = 'UPDATE users SET name = ?, contact = ?, email = ? WHERE id = ?';

  // Execute the query with the provided user details
  db.query(sql, [name, contact, email, id], (error, result) => {
    if (error) {
      res.status(500).json({ message: 'Server error updating user', error });
    } else if (result.affectedRows ===   0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(200).json({ message: 'User updated successfully' });
    }
  });
});


app.get('/api/users', (req, res) => {
  // Create the SQL query string
  const sql = 'SELECT * FROM users';

  // Execute the query to get all users
  db.query(sql, (error, results) => {
    if (error) {
      res.status(500).json({ message: 'Server error retrieving users', error });
    } else {
      res.status(200).json(results);
    }
  });
});

app.listen(5000);