Tasks = new Meteor.Collection('tasks');
Tasks.allow({
	insert: function(){return true;},
	update: function(){return true;},
	remove: function(){return true;},
});
  
if (Meteor.isClient) {
	function addTask(e){
		Tasks.insert({
		  	description: $('#description').val(),
		  	urgency: +$('#urgency').val(),
		  	importance: +$('#importance').val(),
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
  
  Template.Tasks.allUrgentAndImportant = function(){
  	return Tasks.find({complete: false, urgency: 1, importance: 1});
  };
  Template.Tasks.allImportant = function(){
  	return Tasks.find({complete: false, urgency: 0, importance: 1});
  };
  Template.Tasks.allUrgent = function(){
  	return Tasks.find({complete: false, urgency: 1, importance: 0});
  };
  Template.Tasks.allOthers = function(){
  	return Tasks.find({complete: false, urgency: 0, importance: 0});
  };
  
  Template.Buckets.events({
  	'dragover .bucket': function(e) {
  		e.preventDefault();
  		$(e.target).css('color', 'rgb(69, 130, 236)');
  		$(e.target).addClass('jiggly');
  	},
  	'dragleave .bucket': function(e) {
  		e.preventDefault();
  		$(e.target).css('color', 'rgb(51, 51, 51)');
  		$(e.target).removeClass('jiggly');
  	},
  	'drop .bucket': function(e) {
  		e.preventDefault();
  		$(e.target).css('color', 'rgb(51, 51, 51)');
  		$(e.target).removeClass('jiggly');
  		var taskId = e.dataTransfer.getData('text/plain');
  		if($(e.target).hasClass('done-bucket')) {
  			Tasks.update({_id: taskId}, {$set:{complete: true}});
  		} else {
  			Tasks.remove({_id: taskId});
  		}
  	}
  });
  
  Template.Task.events({
  	'dragstart .task': function(e) {
  		var task = $(e.target).closest('.task');
  		task.css('opacity', 0.4);
  		e.dataTransfer.effectAllowed = "move";
  		e.dataTransfer.setData("text/plain", task[0].getAttribute('task-id'));
  	},
  	'dragend .task': function(e) {
  		var task = $(e.target).closest('.task');
  		task.css('opacity', 1.0);
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
