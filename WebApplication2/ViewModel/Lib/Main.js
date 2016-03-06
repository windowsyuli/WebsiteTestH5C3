function onclickplay(time) {
    $("#vid").fadeToggle(time);
}
function scroll(classname) {
    $(classname).click(function (event) {
        event.preventDefault();
        $('body').animate({
            scrollTop: $(this.hash).offset().top
        }, 1500);
    });
}
function webservice(functionname) {
    var ArrayList = new Array();
    var URL = "/Service/WebService.asmx/" + functionname;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", URL, false);
    xmlhttp.send(null);
    var xmlDoc = xmlhttp.responseXML.documentElement;
    var arr = xmlDoc.getElementsByTagName('string');
    for (var i = 0; i < arr.length; ++i)
        ArrayList[i] = arr[i].textContent;
    return ArrayList;
}
var viewModel = {
    webschool: ko.observable(webservice("WebSchool")[0]),
    typescript: ko.observable(),
    content1: ko.observable(),
    content2: ko.observable(),
    contact: ko.observable(),
    name: ko.observable(),
    email: ko.observable(),
    interest: ko.observable(),
    suggestion: ko.observable(),
    submit: ko.observable(),
    Name: ko.observable(),
    Email: ko.observable(),
    Interests: ko.observableArray(),
    chosen: ko.observableArray(),
    Suggestion: ko.observable(),
};

viewModel.Console = ko.dependentObservable({
    read: function () {
        return Cal();
    },
    write: function (value) {

    },
    owner: viewModel
});
function Cal() {
    var Info = {
        Name: viewModel.Name(),
        Email: viewModel.Email(),
        chosen: viewModel.chosen(),
        Suggestion: viewModel.Suggestion(),
    };
    var send = JSON.stringify(Info);
    var tmp = "";
    if (viewModel.Console != null)
        tmp += viewModel.Console();
    tmp += new Date().toLocaleTimeString() + " stringify: " + send + "\r\n";
    return tmp;
}
function GetInfo() {
    var Info = {
        Name: viewModel.Name(),
        Email: viewModel.Email(),
        chosen: viewModel.chosen(),
        Suggestion: viewModel.Suggestion(),
    };
    document.location = "mailto:windowsyuli@dbis.nankai.edu.cn;?subject=Feedback&body=" + JSON.stringify(Info);
}

function viewmodel() {

    var ts = webservice("TypeScript");
    viewModel.typescript(ts[0]);
    viewModel.content1(ts[1]);
    viewModel.content2(ts[2]);

    var kno = webservice("Contact");
    viewModel.contact(kno[0]);
    viewModel.name(kno[1]);
    viewModel.email(kno[3]);
    viewModel.interest(kno[5]);
    viewModel.suggestion(kno[7]);
    viewModel.submit(kno[10]);
    viewModel.Interests(kno[6].split(" "));
    viewModel.chosen.push(viewModel.Interests()[0]);
    viewModel.chosen.push(viewModel.Interests()[1]);
    viewModel.Suggestion(kno[8]);
    ko.applyBindings(viewModel);
}
$(document).ready(function ($) {
    scroll('.scroll');
    onclickplay(1);
    viewmodel();
});