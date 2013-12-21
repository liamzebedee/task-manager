Tasks = new Meteor.Collection('tasks');
Tasks.allow({
	insert: function(){return true;},
	update: function(){return true;},
	remove: function(){return true;},
});

Tasks.URGENCY = ['', 'Urgent'];
Tasks.IMPORTANCE = ['', 'Important'];

if (Meteor.isClient) {
	function addTask(e){
		Tasks.insert({
      	description: $('#description').val(),
      	urgency: $('#urgency').val(),
      	importance: $('#importance').val(),
      	complete: false
    });
    $('#AddTask #description').val('');
    $('#AddTask #importance').val('');
    $('#AddTask #urgency').val('');
	}
  Template.AddTask.events({
    'click #add': addTask,
    'keypress input#description': function(e) {
    	if (e.which === 13) { // if pressed enter
    	addTask(e);
    	}
    }
  });

  Template.Tasks.all = function(){
  	return Tasks.find({complete: false}, {sort: [['importance', 'desc'],['urgency','desc']]});
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
  	  Tasks.update({_id: taskId}, {$set:{complete: true}});
  	}
  });
  
  Template.TaskStats.numberIncomplete = function(){
  	return Tasks.find({complete: false}).count();
  };
  Template.TaskStats.numberComplete = function(){
  	return Tasks.find({complete: true}).count();
  };
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
