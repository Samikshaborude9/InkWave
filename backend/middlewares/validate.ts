// src/middlewares/validate.ts
import type { Request, Response, NextFunction } from "express";
import type { ZodObject } from "zod";

export const validate =
  (schema: ZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (err: any) {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: err.errors,
      });
    }
  };
