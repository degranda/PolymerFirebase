(function(document) {
  'use strict';

  var app = document.querySelector('#app');
  
})(document);

app.items = [];

app.updateItems = function(snapshot) {
  this.items = [];
  snapshot.forEach(function(childSnapshot) {
    var item = childSnapshot.val();
    item.uid = childSnapshot.key();
    this.push('items', item);
  }.bind(this));
};

app.addItem = function(event) {
  event.preventDefault(); // Don't send the form!
  this.push('items', {
    done: false,
    text: app.newItemValue
  });
  this.newItemValue = '';
};

app.toggleItem = function(event) {
  event.model.set('done', !event.model.item.done);
};
app.deleteItem = function(event) {
  this.splice('items', event.model.index, 1);
};

app.firebaseURL = 'https://<YOUR FIREBASE NAME>.firebaseio.com';
app.firebaseProvider = 'anonymous';

app.onFirebaseError = function(event) {
  this.$.errorToast.text = event.detail.message;
  this.$.errorToast.show();
};

app.onFirebaseLogin = function(event) {
  this.ref = new Firebase(this.firebaseURL + '/user/' + 
                                                  event.detail.user.uid);
  this.ref.on('value', function(snapshot) {
    this.updateItems(snapshot);
  });
};