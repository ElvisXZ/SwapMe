/*
    test.js
    Model for test page
*/

// Get all Nativescript modules 
var firebase = require('nativescript-plugin-firebase'),
observableModule = require('data/observable'),
frameModule = require('ui/frame'),
gestures = require('ui/gestures'),

pageData = new observableModule.Observable(),
testPicturesUrl = 'https://s3.amazonaws.com/swapmeimg/objects';

// Query Firebase users
function queryItems(uid) {
firebase.query(result => {
    console.log('query result:', JSON.stringify(result));
    ding.push(result);
}, 
'/users', {
    orderBy: {
        type: firebase.QueryOrderByType.CHILD,
        value: 'uid'
    },
    limit: {
        type: firebase.QueryLimitType.LAST,
        value: 15
    }
});
}

// Test Page
exports.loaded = function(args) {
var _page = args.object;
_page.bindingContext = pageData;

// Get all xml page objects
var card = _page.getViewById("card"),
    img = _page.getViewById("item"),
    desc = _page.getViewById("desc"),
    name = _page.getViewById("name"),
    verdict = _page.getViewById("verdict"),

    // Item Descriptions for testing
    descriptions = [
        'Smoke free pet free couch, very comfy',
        'Vintage Lingerie Chest that\'s in great shape',
        'Rare mat imported from Persia',
        '2 Antique Tiger Oak Chairs that are in wonderful condition',
        'Really nice, very heavy water globe, by Heritage Gallery ',
        'White Corning with floral design coffee pot.',
        '19 Piece tea set made by Lefton. Rose Chintz pattern. 50 to 60 years old. ',
        'Mint Condition - #248 - Yankees Card',
        'Stihl blower, cranks easy, runs great',
        'College General Physics 201/202, 213/214',
        'Used this for community college 2 semesters, eco 231/232',
        'Brand New - Factory Sealed ',
        'Medline Walker-Folding Type, Adult size, With wheels',
        'New - Been on display',
        'He-Man Masters of The Universe'
    ],

    // Item Names for testing
    names = [
        'Couch',
              'Vintage Lingerie Chest',
              'Pretty Belgium Rug',
              '2 Antique Tiger Oak Chairs',
              'Beautiful Christmas Water Globe',
              'Corning Ware Coffee Pot',
              'Lefton China Tea Set',
              'Don Mattingly 1984 Donruss Rookie Baseball Card',
              'LEAF BLOWER Stihl BG 86C',
              'Physics Scientist Engineers 9th Edition',
              'Principles of Economics Book',
              'The Mummy 3 Tomb Of The Dragon Emperor DVD',
              'Walker',
              'Vintage 1983 Dr Seuss Cat in the Hat',
              'Vintage SKELETOR Action Figure'
          ],

    i = 0;

// Initialize card
img.src= testPicturesUrl + '/' + i + '.jpg'; 
desc.text = descriptions[i];
name.text = names[i];

// Listens for swipe event and records whether they liked the item or not
card.on(gestures.GestureTypes.swipe, function (args) {
    // Increment test index
    i = i + 1;
    
    // User liked the item -- right
    if(args.direction === 1) {

        // Alter actionbar to show like
        verdict.title='Liked!';
        
        // Animates swipe effect on card -- swipe right
        card.animate({ translate: { x: 1000, y: 100 } })
            .then(function () { return card.animate({ 
                translate: { x: 0, y: -2000 } 
            }); 
        })			    
        .then(function () { 
            return card.animate({ translate: { x: 0, y: 0 } }); 
        })			    
        .then(function () {
            img.src = testPicturesUrl + '/' + i + '.jpg'; 
            desc.text = descriptions[i];
            name.text = names[i];   
        })
        .catch(function (e) {
            console.log(e.message);
        });
    }
    // User dislikes an item -- left
    else {

        // Alter actionbar to show dislike            
        verdict.title='Disliked!';

        // Animates swipe effect on card -- swipe left           
        card.animate({ 
            translate: { x: -1000, y: 100 } 
        })
        .then(function () { 
            return card.animate({ translate: { x: 0, y: -2000 } }); 
        })			    
        .then(function () { 
            return card.animate({ translate: { x: 0, y: 0 } }); 
        })			    
        .then(function () {		
            img.src = testPicturesUrl + '/' + i + '.jpg';     
            desc.text = descriptions[i];
            name.text = names[i];                       	
        })
        .catch(function (e) {
            console.log(e.message);
        });
    }
  
});


};

// Navigate to profile module
exports.profilePage = function(args) {
const topFrame = frameModule.topmost();
const navEntry = {
    moduleName: "profile"
};
topFrame.navigate(navEntry);
}

// Navigate to chat module
exports.chatPage = function(args) {
const topFrame = frameModule.topmost();
const navEntry = {
    moduleName: "chat"
};
topFrame.navigate(navEntry);
}
