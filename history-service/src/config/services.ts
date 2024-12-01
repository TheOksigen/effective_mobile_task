import dotenv from 'dotenv';
dotenv.config();

export const services = {
    inventoryService: process.env.INVENTORY_SERVICE_URL || 'http://localhost:3000'
};
