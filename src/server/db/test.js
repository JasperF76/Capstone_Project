const { createUser } = require('./users_db.js'); // Import the createUser function
const db = require('./client.js'); // Import your database connection module

const testCreateUser = async () => {
    try {
        const user = await createUser({
            username: 'TestUser',
            email: 'testuser@example.com',
            password: 'testpassword',
            isAdmin: false, // or true
        });
        console.log('User created:', user);
    } catch (err) {
        console.error('Error during user creation:', err);
    }
};

db.connect() // Make sure to connect to the database
    .then(() => testCreateUser())
    .catch(err => console.error('Error connecting to the database:', err));