/* * * * * * * * * * * * * * * * *
 * Pagination
 * javascript page navigation
 * * * * * * * * * * * * * * * * */

var Pagination = {

    code: '',

    // --------------------
    // Utility
    // --------------------

    // converting initialize data
    Extend: function (data) {
        data = data || {};
        Pagination.size = data.size || 300;
        Pagination.page = data.page || 1;
        Pagination.step = data.step || 3;
        Pagination.onClick = data.onClick || function () { };
    },

    // add pages by number (from [s] to [f])
    Add: function (s, f) {
        for (var i = s; i < f; i++) {
            Pagination.code += '<a>' + i + '</a>';
        }
    },

    // add last page with separator
    Last: function () {
        Pagination.code += '<i>...</i><a>' + Pagination.size + '</a>';
    },

    // add first page with separator
    First: function () {
        Pagination.code += '<a>1</a><i>...</i>';
    },



    // --------------------
    // Handlers
    // --------------------

    // change page
    Click: function () {
        Pagination.page = +this.innerHTML;
        Pagination.Start();
        Pagination.onClick(Pagination.page);
    },

    // previous page
    Prev: function () {
        Pagination.page--;
        if (Pagination.page < 1) {
            Pagination.page = 1;
        }
        Pagination.Start();
        Pagination.onClick(Pagination.page);
    },

    // next page
    Next: function () {
        Pagination.page++;
        if (Pagination.page > Pagination.size) {
            Pagination.page = Pagination.size;
        }
        Pagination.Start();
        Pagination.onClick(Pagination.page);
    },



    // --------------------
    // Script
    // --------------------

    // binding pages
    Bind: function () {
        var a = Pagination.e.getElementsByTagName('a');
        for (var i = 0; i < a.length; i++) {
            if (+a[i].innerHTML === Pagination.page) a[i].className = 'current';
            a[i].addEventListener('click', Pagination.Click, false);
        }
    },

    // write pagination
    Finish: function () {
        Pagination.e.innerHTML = Pagination.code;
        Pagination.code = '';
        Pagination.Bind();
    },

    // find pagination type
    Start: function () {
        if (Pagination.size < Pagination.step * 2 + 6) {
            Pagination.Add(1, Pagination.size + 1);
        }
        else if (Pagination.page < Pagination.step * 2 + 1) {
            Pagination.Add(1, Pagination.step * 2 + 4);
            Pagination.Last();
        }
        else if (Pagination.page > Pagination.size - Pagination.step * 2) {
            Pagination.First();
            Pagination.Add(Pagination.size - Pagination.step * 2 - 2, Pagination.size + 1);
        }
        else {
            Pagination.First();
            Pagination.Add(Pagination.page - Pagination.step, Pagination.page + Pagination.step + 1);
            Pagination.Last();
        }
        Pagination.Finish();
    },



    // --------------------
    // Initialization
    // --------------------

    // binding buttons
    Buttons: function (e) {
        var nav = e.getElementsByTagName('a');
        nav[0].addEventListener('click', Pagination.Prev, false);
        nav[1].addEventListener('click', Pagination.Next, false);
    },

    // create skeleton
    Create: function (e) {

        var html = [
            '<a>&#9668;</a>', // previous button
            '<span></span>',  // pagination container
            '<a>&#9658;</a>'  // next button
        ];

        e.innerHTML = html.join('');
        Pagination.e = e.getElementsByTagName('span')[0];
        Pagination.Buttons(e);
    },

    // init
    Init: function (e, data) {
        Pagination.Extend(data);
        Pagination.Create(e);
        Pagination.Start();
    }
};



/* * * * * * * * * * * * * * * * *
* Initialization
* * * * * * * * * * * * * * * * */




/* * * * * * * * * * * * * * * * *
 * Pagination2
 * javascript page navigation
 * * * * * * * * * * * * * * * * */

var Pagination2 = {

    code: '',

    // --------------------
    // Utility
    // --------------------

    // converting initialize data
    Extend: function (data) {
        data = data || {};
        Pagination2.size = data.size || 300;
        Pagination2.page = data.page || 1;
        Pagination2.step = data.step || 3;
        Pagination2.onClick = data.onClick || function () { };
    },

    // add pages by number (from [s] to [f])
    Add: function (s, f) {
        for (var i = s; i < f; i++) {
            Pagination2.code += '<a>' + i + '</a>';
        }
    },

    // add last page with separator
    Last: function () {
        Pagination2.code += '<i>...</i><a>' + Pagination2.size + '</a>';
    },

    // add first page with separator
    First: function () {
        Pagination2.code += '<a>1</a><i>...</i>';
    },



    // --------------------
    // Handlers
    // --------------------

    // change page
    Click: function () {
        Pagination2.page = +this.innerHTML;
        Pagination2.Start();
        Pagination2.onClick(Pagination2.page);
    },

    // previous page
    Prev: function () {
        Pagination2.page--;
        if (Pagination2.page < 1) {
            Pagination2.page = 1;
        }
        Pagination2.Start();
        Pagination2.onClick(Pagination2.page);
    },

    // next page
    Next: function () {
        Pagination2.page++;
        if (Pagination2.page > Pagination2.size) {
            Pagination2.page = Pagination2.size;
        }
        Pagination2.Start();
        Pagination2.onClick(Pagination2.page);
    },



    // --------------------
    // Script
    // --------------------

    // binding pages
    Bind: function () {
        var a = Pagination2.e.getElementsByTagName('a');
        for (var i = 0; i < a.length; i++) {
            if (+a[i].innerHTML === Pagination2.page) a[i].className = 'current';
            a[i].addEventListener('click', Pagination2.Click, false);
        }
    },

    // write pagination
    Finish: function () {
        Pagination2.e.innerHTML = Pagination2.code;
        Pagination2.code = '';
        Pagination2.Bind();
    },

    // find pagination type
    Start: function () {
        if (Pagination2.size < Pagination2.step * 2 + 6) {
            Pagination2.Add(1, Pagination2.size + 1);
        }
        else if (Pagination2.page < Pagination2.step * 2 + 1) {
            Pagination2.Add(1, Pagination2.step * 2 + 4);
            Pagination2.Last();
        }
        else if (Pagination2.page > Pagination2.size - Pagination2.step * 2) {
            Pagination2.First();
            Pagination2.Add(Pagination2.size - Pagination2.step * 2 - 2, Pagination2.size + 1);
        }
        else {
            Pagination2.First();
            Pagination2.Add(Pagination2.page - Pagination2.step, Pagination2.page + Pagination2.step + 1);
            Pagination2.Last();
        }
        Pagination2.Finish();
    },



    // --------------------
    // Initialization
    // --------------------

    // binding buttons
    Buttons: function (e) {
        var nav = e.getElementsByTagName('a');
        nav[0].addEventListener('click', Pagination2.Prev, false);
        nav[1].addEventListener('click', Pagination2.Next, false);
    },

    // create skeleton
    Create: function (e) {

        var html = [
            '<a>&#9668;</a>', // previous button
            '<span></span>',  // pagination container
            '<a>&#9658;</a>'  // next button
        ];

        e.innerHTML = html.join('');
        Pagination2.e = e.getElementsByTagName('span')[0];
        Pagination2.Buttons(e);
    },

    // init
    Init: function (e, data) {
        Pagination2.Extend(data);
        Pagination2.Create(e);
        Pagination2.Start();
    }
};



/* * * * * * * * * * * * * * * * *
* Initialization
* * * * * * * * * * * * * * * * */



