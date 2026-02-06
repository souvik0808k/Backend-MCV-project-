import { ZodError } from "zod";

export const validate = (schema) => (req, res, next) => {
  try {
    // validate request body
    schema.parse(req.body);
    next();
  } catch (err) {
    console.log("ZOD ERROR:", err);

    if (err instanceof ZodError) {
      return res.status(400).json({
        message: "Validation failed",
        errors: err.issues, // important for frontend
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
//this is a cutom validation middleware that uses tha zod schema to validate the incming request body if the data is valied the request proced the next controller 
