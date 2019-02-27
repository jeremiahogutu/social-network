exports.createPostValidator = (req, res, next) => {
    req.check('title', 'write a title').notEmpty();
    req.check('title', 'title must be between 4 and 150 characters long').isLength({
        min: 4,
        max: 150
    });

    req.check('description', 'write a description').notEmpty();
    req.check('description', 'description must be between 4 and 2000 characters long').isLength({
        min: 4,
        max: 2000
    });

    // check errors
    const errors = req.validationErrors();

    // Show errors as they happen and limit to the first one
    if (errors) {
        const firstError = errors.map((error) => error.msg)[0];
        return res.status(400).json({error: firstError})
    }

    // proceed to next middleware
    next();
};


exports.userSignupValidator = (req, res, next) => {
    // email is not null, valid and normalized
    req.check('email', 'Email must be between 3 to 32 characters')
        .matches(/.+@.+\..+/)
        .withMessage('Email must contain @')
        .isLength({
            min: 4,
            max: 2000
        });
    // check for password
    req.check('password')
        .isLength({min: 8})
        .withMessage('Password must contain at least 8 characters')
        .matches(/\d/)
        .withMessage('Password must contain a number');
    // check errors
    const errors = req.validationErrors();

    // Show errors as they happen and limit to the first one
    if (errors) {
        const firstError = errors.map((error) => error.msg)[0];
        return res.status(400).json({error: firstError})
    }

    // proceed to next middleware
    next();

};