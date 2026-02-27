// Seeder script to create a test user in Supabase
const supabase = require('./supabaseClient');
const bcrypt = require('bcrypt');

async function seedUser() {
  const email = 'test@example.com';
  const password = 'password123';
  const password_hash = await bcrypt.hash(password, 10);

  // Insert user into 'users' table
  const { data, error } = await supabase
    .from('users')
    .insert([{ email, password_hash }]);

  if (error) {
    console.error('Error seeding user:', error);
  } else {
    console.log('User seeded:', data);
  }
}

seedUser();
