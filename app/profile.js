var observableModule = require('data/observable');
var frameModule = require("ui/frame");
var pageData = new observableModule.Observable();
var firebase = require("nativescript-plugin-firebase");
var camera = require("nativescript-camera");
var imageModule = require("ui/image");

//Profile page should show info retrieved from info, so this function retrieves relevant info
function queryUsers(uid) {
    firebase.query(result => {
        //console.log("query result:", JSON.stringify(result));
        var field = result.value;
        console.log("nameeee: ", field['name']);
        
        return result;
    }, "/users", {
            orderBy: {
                type: firebase.QueryOrderByType.CHILD,
                value: 'uid'
            },
            ranges: [
                {
                    type: firebase.QueryRangeType.START_AT,
                    value: uid
                },
                {
                    type: firebase.QueryRangeType.END_AT,
                    value: uid
                }
            ]
    });
}

//This function displays user's name, picture and info in the profile page. 
exports.pageLoaded = function(args) {

    var page = args.object;
    page.bindingContext = pageData;
    getProf = page.getViewById('profile');

    var itsame = queryUsers('eneup101');
    var profile = page.getViewById("profile");
    var picture = page.getViewById("profilePicture");
    var description = page.getViewById("profileDescription");

    description.text= "I am a RPI student about to graduate looking to trade items! :D";

    picture.src = "https://s3.amazonaws.com/swapmeimg/objects/donnie.jpg";
    
};

/*Profile page consist of inventory where users can add item. Function accessed user's camera so user
can upload piture of items they want to trade*/
exports.addItem = function(args) {
    var page = args.object;
    page.bindingContext = pageData;
    getProf = page.getViewById('profile');
    
    //ask camera persmissin
    camera.requestPermissions();
    var options = { width: 300, height: 300, keepAspectRatio: false, saveToGallery: true };
    camera.takePicture(options).then(function (imageAsset) {
        console.log("Size: " + imageAsset.options.width + "x" + imageAsset.options.height);
        console.log("keepAspectRatio: " + imageAsset.options.keepAspectRatio);
        console.log("Photo saved in Photos/Gallery for Android or in Camera Roll for iOS");
    }).catch(function (err) {
        console.log("Error -> " + err.message);
    });
}
 
exports.gallery = function(args){
	var topmost = frameModule.topmost();
    var navigationEntry = {
        moduleName: "gallery"
    };
    topmost.navigate(navigationEntry);
};

exports.swipe = function(args){
	var topmost = frameModule.topmost();
    var navigationEntry = {
        moduleName: "test"
    };
    topmost.navigate(navigationEntry);
};


