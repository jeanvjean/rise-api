export default {
  createUser: `
        INSERT INTO users(
            first_name,
            last_name,
            email,
            password
        ) VALUES(
          $/first_name/,
          $/last_name/,
          $/email/,
          $/password/
        )
        RETURNING *
    `,

  getUser: `
    SELECT 
      first_name, 
      last_name,
      email, 
      password
    FROM users 
    WHERE email = $/email/ 
    LIMIT 1
    `,

    getUsers: `
      SELECT
          id,
          first_name,
          last_name,
          email
      FROM users
    `
};
