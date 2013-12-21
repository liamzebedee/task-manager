Tasks = new Meteor.Collection('tasks');
Tasks.allow({
	insert: function(){return true;},
	update: function(){return true;},
	remove: function(){return true;},
});

Tasks.URGENCY = ['Not urgent', 'Urgent'];
Tasks.IMPORTANCE = ['Not importance', 'Important'];

if (Meteor.isClient) {
  Template.AddTask.events({
    'click #add': function (e) {
    	console.log($('#importance').val());
      Tasks.insert({
      	description: $('#description').val(),
      	urgency: $('#urgency').val(),
      	importance: $('#importance').val()
      });
    }
  });

  Template.Tasks.all = function(){
  	return Tasks.find({}, {sort: [['importance', 'desc'],['urgency','desc']]});
  };
  Template.Tasks.getUrgency = function(urgencyVal){
  	return Tasks.URGENCY[urgencyVal];
  };
  Template.Tasks.getImportance = function(importanceVal){
  	return Tasks.IMPORTANCE[importanceVal];
  };
  Template.Tasks.events({
  	'click .control-done a': function(e) {
  	  taskId = $(e.target).closest('.task')[0].getAttribute('task-id');
  	  Tasks.remove({_id: taskId});
  	}
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
