module.exports = (req, res, next) => {
  try {
    //   Static Token Check, Can be replaced with JWT
    const token = req.headers.token;
    const auth = token === process.env.TOKEN;
    if (!auth) {
      throw 'Invalid Request';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: 'Invalid request!'
    });
  }
};