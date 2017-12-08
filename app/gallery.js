var observableModule = require('data/observable');
var frameModule = require("ui/frame");
var imagepicker = require("nativescript-imagepicker");
var list;
var imageSrc;

function pageLoaded(args) {
    var page = args.object;
    list = page.getViewById("urls-list");
    imageSrc = page.getViewById("imageSrc");
}
exports.pageLoaded = pageLoaded;
function onSelectMultipleTap(args) {
    var context = imagepicker.create({ mode: "multiple" });
    startSelection(context, false);
}
exports.onSelectMultipleTap = onSelectMultipleTap;
function onSelectSingleTap(args) {
    var context = imagepicker.create({ mode: "single" });
    startSelection(context, true);
}
exports.onSelectSingleTap = onSelectSingleTap;
function startSelection(context, isSingle) {
    context
        .authorize()
        .then(function () {
        list.items = [];
        return context.present();
    })
        .then(function (selection) {
        console.log("Selection done:");
        selection.forEach(function (selected) {
            console.log("----------------");
            console.log("uri: " + selected.uri);
            if (isSingle) {
                selected.getImage({ maxWidth: 200, maxHeight: 200, aspectRatio: 'fill' })
                    .then(function (imageSource) {
                    imageSrc.src = imageSource;
                });
            }
            else {
                imageSrc.visibility = 'hidden';
            }
        });
        list.items = selection;
    }).catch(function (e) {
        console.log(e);
    });
}

    

exports.profile = function(args){
	var topmost = frameModule.topmost();
    var navigationEntry = {
        moduleName: "profile"
    };
    topmost.navigate(navigationEntry);
};