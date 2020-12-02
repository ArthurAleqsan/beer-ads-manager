const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const API = 'http://dev-admin-hm.yakovlev.studio/';

app.use('/public', express.static('public'));
app.use('/locales', express.static('locales'));
app.use('/assets', express.static('assets'));

app.use(
    '/video/list-images',
    createProxyMiddleware({
        target: API,
        changeOrigin: true
    })
);
app.use(
    '/video/list-video',
    createProxyMiddleware({
        target: API,
        changeOrigin: true
    })
);
app.use(
    '/video/load-video',
    createProxyMiddleware({
        target: API,
        changeOrigin: true
    })
);
app.use(
    '/video/add-video',
    createProxyMiddleware({
        target: API,
        changeOrigin: true
    })
);
app.use(
    '/video/list-tvtemplate',
    createProxyMiddleware({
        target: API,
        changeOrigin: true
    })
);
app.use(
    '/video/list-shop',
    createProxyMiddleware({
        target: API,
        changeOrigin: true
    })
);
app.use(
    '/video/list-product',
    createProxyMiddleware({
        target: API,
        changeOrigin: true
    })
);
app.use(
    '/video/add-producttotemplate',
    createProxyMiddleware({
        target: API,
        changeOrigin: true
    })
);
app.use(
    '/video/list-temlatetoshops',
    createProxyMiddleware({
        target: API,
        changeOrigin: true
    })
);
app.use(
    '/video/delete-image',
    createProxyMiddleware({
        target: API,
        changeOrigin: true
    })
);
app.use(
    '/video/delete-producttotemplate',
    createProxyMiddleware({
        target: API,
        changeOrigin: true
    })
);

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});



app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});

