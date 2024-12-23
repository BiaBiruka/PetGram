const { body } = require('express-validator');

const photoInsertValidation = () => {
  return [
    body('title')
      .not()
      .equals('undefined')
      .withMessage('Title cannot be empty.')
      .isString()
      .withMessage('Title cannot be empty.')
      .isLength({ min: 3 })
      .withMessage('Title must be at least 3 characters long.'),

    body('image').custom((value, { req }) => {
      if (!req.file) {
        throw new Error('Photo cannot be empty.');
      }
      return true;
    }),
  ];
};

const photoUpdateValidation = () => {
  return [
    body('title')
      .isString()
      .withMessage('Title cannot be empty.')
      .isLength({ min: 3 })
      .withMessage('Title must be at least 3 characters long.'),
  ];
};

const commentValidation = () => {
  return [body('comment').isString().withMessage('Comment cannot be empty.')];
};

module.exports = {
  photoInsertValidation,
  photoUpdateValidation,
  commentValidation,
};
