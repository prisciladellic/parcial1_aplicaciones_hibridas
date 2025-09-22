import cityRouter from './cityRouter.js';
// import landmarkRouter from './landmarkRouter.js';

const routerAPI = (app) => {
    // definir endpoints
    app.use('/api/cities', cityRouter);
    // app.use('/api/landmarks', landmarkRouter);
}

export default routerAPI;