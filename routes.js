module.exports.route = function (app, token, config) {
    app.get('/', (req, res) => {
        res.render("index", { token, url: config.url });
    });

    app.get('/timer', (req, res) => {
        res.render("timer", { token, url: config.url });
    });
}