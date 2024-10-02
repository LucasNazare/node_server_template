const authRouter = require('./authRouter');

const routers = [
    {
        path: 'auth',
        router: authRouter,
    },
]

module.exports = (app) => {
    routers.forEach((r) => {
        console.log(`Adding route ${r.path}`);
        app.use(`/api/${r.path}`, r.router);
    });
}