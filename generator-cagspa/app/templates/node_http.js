var connect = require('connect');
connect.createServer(
    connect.static('<full path to fixtures directory>')
).listen(8070);