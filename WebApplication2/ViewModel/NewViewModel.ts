/// <reference path="lib/require.d.ts" />
/// <reference path="lib/jquery.d.ts" />
/// <reference path="lib/knockout.d.ts" />

var $: JQueryStatic = require('jquery'),
    ko: KnockoutStatic = require('knockout');

class Info {
    constructor(n, e, c, s) {
        this.Name = n;
        this.Email = e;
        this.Chosen = c;
        this.Suggestion = s;
        this.Time = new Date().toLocaleTimeString();
    }
    public Name;
    public Email;
    public Chosen;
    public Suggestion;
    public Time;
}
class NewViewModel {

    public webschool = ko.observable();
    public typescript = ko.observable();
    public content1 = ko.observable();
    public content2 = ko.observable();
    public contact = ko.observable();
    public name = ko.observable();
    public email = ko.observable();
    public interest = ko.observable();
    public suggestion = ko.observable();
    public submit = ko.observable();
    public Name = ko.observable();
    public Email = ko.observable();
    public Interests = ko.observableArray();
    public Chosen = ko.observableArray();
    public Suggestion = ko.observable();
    public Console = ko.computed(function () {
        var info = new Info(this.Name(), this.Email(), this.Chosen(), this.Suggestion());
        var send = JSON.stringify(info);
        var tmp = "";
        if (this.Console != null)
            tmp += this.Console();
        tmp += "Stringify: " + send + "\r\n";
        return tmp;
    }, this);

    constructor() {

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

    OnClick = (e: number) => {
        $("#vid").fadeToggle(e);
    }

    OnScroll = (e) => {
        event.preventDefault();
        $('html, body').animate({ scrollTop: $(e).offset().top }, 'slow');
    }

    OnService = (e) => {
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

    OnGetInfo = () => {
        var info = new Info(this.Name(), this.Email(), this.Chosen(), this.Suggestion());
        var send = JSON.stringify(info);
        document.location.assign("mailto:windowsyuli@dbis.nankai.edu.cn;?subject=Feedback&body=" + send);
    }
}
ko.applyBindings(new NewViewModel());