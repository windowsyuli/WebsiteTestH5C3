/// <reference path="lib/require.d.ts" />
/// <reference path="lib/jquery.d.ts" />
/// <reference path="lib/knockout.d.ts" />
var $ = require('jquery'), ko = require('knockout');

var Info = (function () {
    function Info(n, e, c, s) {
        this.Name = n;
        this.Email = e;
        this.Chosen = c;
        this.Suggestion = s;
        this.Time = new Date().toLocaleTimeString();
    }
    return Info;
})();
var NewViewModel = (function () {
    function NewViewModel() {
        var _this = this;
        this.webschool = ko.observable();
        this.typescript = ko.observable();
        this.content1 = ko.observable();
        this.content2 = ko.observable();
        this.contact = ko.observable();
        this.name = ko.observable();
        this.email = ko.observable();
        this.interest = ko.observable();
        this.suggestion = ko.observable();
        this.submit = ko.observable();
        this.Name = ko.observable();
        this.Email = ko.observable();
        this.Interests = ko.observableArray();
        this.Chosen = ko.observableArray();
        this.Suggestion = ko.observable();
        this.Console = ko.computed(function () {
            var info = new Info(this.Name(), this.Email(), this.Chosen(), this.Suggestion());
            var send = JSON.stringify(info);
            var tmp = "";
            if (this.Console != null)
                tmp += this.Console();
            tmp += "Stringify: " + send + "\r\n";
            return tmp;
        }, this);
        this.OnClick = function (e) {
            $("#vid").fadeToggle(e);
        };
        this.OnScroll = function (e) {
            event.preventDefault();
            $('html, body').animate({ scrollTop: $(e).offset().top }, 'slow');
        };
        this.OnService = function (e) {
            var ArrayList = new Array();
            var URL = "/Service/WebService.asmx/" + e;
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("POST", URL, false);
            xmlhttp.send(null);
            var xmlDoc = xmlhttp.responseXML.documentElement;
            var arr = xmlDoc.getElementsByTagName('string');
            for (var i = 0; i < arr.length; ++i)
                ArrayList[i] = arr[i].textContent;
            return ArrayList;
        };
        this.OnGetInfo = function () {
            var info = new Info(_this.Name(), _this.Email(), _this.Chosen(), _this.Suggestion());
            var send = JSON.stringify(info);
            document.location.assign("mailto:windowsyuli@dbis.nankai.edu.cn;?subject=Feedback&body=" + send);
        };
        var ws = this.OnService("WebSchool");
        this.webschool(ws[0]);

        var ts = this.OnService("TypeScript");
        this.typescript(ts[0]);
        this.content1(ts[1]);
        this.content2(ts[2]);

        var kno = this.OnService("Contact");
        this.contact(kno[0]);
        this.name(kno[1]);
        this.email(kno[3]);
        this.interest(kno[5]);
        this.suggestion(kno[7]);
        this.submit(kno[10]);
        this.Interests(kno[6].split(" "));
        this.Chosen.push(this.Interests()[0]);
        this.Chosen.push(this.Interests()[1]);
        this.Suggestion(kno[8]);
    }
    return NewViewModel;
})();
ko.applyBindings(new NewViewModel());
//# sourceMappingURL=NewViewModel.js.map
