import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (err.code === "P2025") {
    return res.status(404).json({
      success: false,
      message: "Student not found.",
    });
  }

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error.",
  });
};
