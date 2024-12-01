const { ZodError } = require('zod');

const validateRequest = (schema) => {
  return async (req, res, next) => {
    try {
      const validatedData = await schema.parseAsync({
        ...req.body,
        ...req.query,
        ...req.params,
      });
      
      // Add validated data to request
      req.validatedData = validatedData;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: 'Validation failed',
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        });
      }
      next(error);
    }
  };
};

module.exports = validateRequest;
