
module.exports = app => {
    app.get('/atendimentos', (req, res) => res.send('Você esta na area de atendimentos e realizando um GET'));

    app.post('/atendimentos', (req, res) => {
        console.log(req.body);
        
        res.send('Você esta na area de atendimentos e esta realizando um POST');
    })
}