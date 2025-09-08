function verifyCsrf(req, res, next) {
  const sessionId = req.cookies.sessionId;
  const sentToken = req.headers['x-csrf-token']; // ou dans body/query

  const validToken = csrfTokens.get(sessionId);

  if (!sessionId || !sentToken || sentToken !== validToken) {
    return res.status(403).json({ message: 'CSRF token invalide' });
  }

  next();
}
