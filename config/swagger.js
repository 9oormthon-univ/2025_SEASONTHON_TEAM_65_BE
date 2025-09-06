'use strict';
import dotenv from 'dotenv';
dotenv.config();    

import swaggerUi from 'swagger-ui-express'; 
import swaggerJsdoc from 'swagger-jsdoc';

const setupSwagger = (app, serverPort) => {
    const options = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'ItDa Project API',
                version: '1.0.0',
                description: 'A simple API for ItDa Project',
            },
            servers: [
                {
                    url: `http://localhost:${serverPort}/ItDa/api/v1`
                }
            ],
        },
        apis: ['./controller/*.js', './repository/*.js'], // controller와 repository 폴더 모두 포함
    };

    const specs = swaggerJsdoc(options);
    app.use('/ItDa/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}

export { setupSwagger };