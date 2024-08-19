// lib/middleware/authMiddleware.ts

import { NextApiRequest, NextApiResponse } from 'next';
// import jwt from 'jsonwebtoken';

export const protect = async (req: NextApiRequest, res: NextApiResponse) => {
  // Your existing logic for authentication
};

export const authorize = (...roles: string[]) => {
  return (req: NextApiRequest, res: NextApiResponse) => {
    // Your existing logic for authorization
  };
};
