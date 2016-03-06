require.config({
    paths: {
        jquery: 'Lib/jquery',
        knockout: 'Lib/knockout',
        NewViewModel: 'NewViewModel'
    }
});
require(['jquery', 'knockout'], function ($) {
    require(['NewViewModel'])
});