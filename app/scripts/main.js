/* global Firebase $ jQuery:true*/

'use strict';
var studentsRef = new Firebase('https://shareclass.firebaseio.com/students');

$('.shareclasses').hide();

$('.submit').click(function() {
  console.log('start');
  var name = $('#full_name').val();
  //$('#full_name').val('');
  var classes = [];
  for (var i = 0; i < 6; i++) {
    var formval = $('#class_' + (i + 1)).val();
    //$('#class_' + (i+1)).val('');
    if (formval.length !== 0) {
      classes.push(formval);
    }
    $('#class_' + (i + 1)).val('');
  }

  $('#full_name').val('');


  if (name.length !== 0 && classes.length !== 0) {
    console.log('validated');
    studentsRef.child(name).set({
      name: name,
      classes: classes
    });
  }

  $('.sharedclasses').empty();

  jQuery('<ul/>', {
    'class': 'collection'
  }).appendTo('.sharedclasses');

  studentsRef.on('child_added', function(snapshot) {
    if (snapshot.key() === name) {
      return;
    }
    var val = snapshot.val();
    var classmate = snapshot.key();
    console.log(classmate + ': ');
    var snapclasses = val.classes;
    var classesIntersect = classes.filter(function(classname) {
      return snapclasses.indexOf(classname) !== -1;
    });
    console.log(classesIntersect);
    if (classesIntersect.length > 0) {
      for (i = 0; i < classesIntersect.length; i++) {
        $('.collection').append('<li class="collection-item">You share ' + classesIntersect[i] + ' with ' + classmate + '</li>');
      }
    }
  });

});
