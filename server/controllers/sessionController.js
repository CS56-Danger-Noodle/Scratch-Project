const sessionController = {};

/**
 * isLoggedIn - find the appropriate session for this request in the database, then
 * verify whether or not the session is still valid.
 */
sessionController.isLoggedIn = (req, res, next) => {
  console.log("running sessionControlled.isLoggedIn");
  console.log("session object: ", req.session);
  if (req.session.username) return next();
  return next({
    log: "'No username value in session object. User NOT logged in.'",
    message: { err: 'User is not logged in.' },
  });
};

/**
 * startSession - create and save a new Session into the database.
 */
sessionController.startSession = (req, res, next) => {
  console.log("running sessionController.startSession");

  const createErrorObject = (error) => {
    return {
      log: "error in sessionController.startSession",
      message: { err: "sessionController.startSession" + error },
    };
  }
  // Per docs: regenerate the session, which is good practice to help
  // guard against forms of session fixation
  req.session.regenerate(error => {
    if (error) return next(createErrorObject(error));
    req.session.username = res.locals.user.username;
    req.session.save(error => {
      if (error) return next(createErrorObject(error));
      return next();
    })
  });
};

module.exports = sessionController;
