const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
   const authToken = req.headers.authorization;
   if (!authToken) {
      return res.status(401).json({ message: 'Unauthorized' });
   }

   const token = authToken.split(' ')[1];
   if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
   }

   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
   } catch (err) {
      return res.status(401).json({ message: 'Unauthorized' });
   }
};

module.exports = authMiddleware;
