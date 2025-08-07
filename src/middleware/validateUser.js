

const validateUser = (req, res, next) => {
  const { name, email, password } = req.body;
  const error = [];
  if (!name || name.trim() === '') {
    return res.status(400).send('Name is required');
  }

  const nameRegex = /^[A-Za-z\s]+$/;
  if (!nameRegex.test(name)) {
    return res.status(400).send('Name only alphabets  ');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).send('Valid email is required');
  }

  if (!password || password.length < 4) {
    return res.status(400).send('Password must be at least 4 characters ');
  }
  next();
};

module.exports = validateUser;
