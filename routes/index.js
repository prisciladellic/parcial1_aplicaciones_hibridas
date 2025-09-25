import cityRouter from './cityRouter.js';
import landmarkRouter from './landmarkRouter.js';
import userRouter from './userRouter.js';

const routerAPI = (app) => {
    // definir endpoints
    app.use('/api/cities', cityRouter);
    app.use('/api/landmarks', landmarkRouter);
    app.use('/api/users', userRouter);
}

export default routerAPI;