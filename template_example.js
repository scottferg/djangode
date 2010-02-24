var sys = require('sys'),
    dj = require('djangode'),
    template_system = require('template/template');

// set template path
template_system.loader.set_path('template-demo');

// context to use when rendering template. In a real app this would likely come from a database
var test_context = {
    person_name: 'Thomas Hest',
    company: 'Tobis A/S',
    ship_date: new Date('12-02-1981'),
    item: 'XXX',
    item_list: [ 'Giraf', 'Fisk', 'Tapir'],
    ordered_warranty: true,
    ship: {
        name: 'M/S Martha',
        nationality: 'Danish'
    }
};


// make app
var app = dj.makeApp([
    ['^/(template-demo/.*)$', dj.serveFile],

    ['^/template$', function (req, res) {
        dj.serveFile(req, res, 'template-demo/template.html');
    }],

    ['^/text$', function (req, res) {
        template_system.load('template.html', function (error, template) {
            template.render(test_context, function (error, html) {
                dj.respond(res, html, 'text/plain');
            });
        })
    }],

    ['^/html$', function (req, res) {
        template_system.load('template.html', function (error, template) {
            template.render(test_context, function (error, html) {
                dj.respond(res, html, 'text/html');
            });
        })
    }]
]);

dj.serve(app, 8009);

