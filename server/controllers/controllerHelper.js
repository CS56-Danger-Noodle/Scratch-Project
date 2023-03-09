const createErrorObject = (error, methodName) => {
    return {
        log: error,
        message: { err: `Error in ${methodName}: ` + error },
    };
};

module.exports = createErrorObject;