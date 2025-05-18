import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 3000;

export const APP_CONFIG = {
    port: PORT,
    jwt: {
        secretKey: process.env.JWT_SECRET_KEY || '200l@b.very-important-secret-key',
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    },
    db: {
        dsn: process.env.DATABASE_URL || 'mysql://root:my-root-pass@localhost:3306/cursor-demos',
    }
};