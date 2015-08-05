require.config({
    baseUrl: '../Js',
    paths: {
        jquery: 'jquery-2.1.4',
        obear:'obear',
        obmap: 'obear.map'
    }
});

require(['obmap'], function (obmap) {
    alert(obmap.O);
});