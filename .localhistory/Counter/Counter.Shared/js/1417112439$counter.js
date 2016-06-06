function Counter(name, value) {

	this.element = null;
	this.id = 'Counter_' + Counter.lastId++;
	
	this.construct = function (name, value) {
	    Counter.list[this.id] = this;
	    console.log($(window).width() / 300);
	    console.log('Counter #' + Object.keys(Counter.list).length);
	    Log.info(Object.keys(Counter.list).length);
		
		this.element = $('#templates .counter').clone();
		this.setName(name);
		this.setValue(value);
		this.element.attr('rel', this.id);
		$('#counters').append(this.element);
		this.hooks();
		Counter.save();
	}

	this.setName = function (name) {
		this.element.find(".name").html(name);
	}
	
	this.getName = function () {
		return this.element.find(".name").html();
	}

	this.setValue = function (value) {
		this.element.find(".value").html(value);
	}

	this.getValue = function () {
		return this.element.find(".value").html();
	}

	this.add = function (value) {
	    this.element.find(".value").html(value + parseInt(this.element.find(".value").html()));
	    Counter.save();
		return parseInt(this.element.find(".value").html());
	}

	this.sub = function (value) {
		return this.add(value * (-1));
	}

	this.remove = function () {
	    delete Counter.list[this.id];
	    this.element.remove();
	    Counter.save();
	    $("#counters").css('column-count', Object.keys(Counter.list).length);
	    Log.info(Object.keys(Counter.list).length);
	}

	this.hooks = function () {
		this.element.find('.add').click(function () {
			var p = $(this).closest('.counter');
			Counter.get(p.attr('rel')).add(1);
		});
		this.element.find('.sub').click(function () {
		    var p = $(this).closest('.counter');
		    Counter.get(p.attr('rel')).sub(1);
		});
		this.element.find('.remove').click(function () {
		    var p = $(this).closest('.counter');
		    Counter.get(p.attr('rel')).remove();
		});
	}

	this.construct(name, value);
}

Counter.list = {};
Counter.lastId = 0;
Counter.storage = null;

Counter.get = function (id) {
	return Counter.list[id];
}

Counter.setStorage = function(s) {
    Counter.storage = s;
}

Counter.recreate = function () {
    var json = Counter.storage.get('data');
	var data = $.parseJSON(json);
	$(data).each(function (index, item) {
		new Counter(item.name, item.value);
	});
}

Counter.save = function() {
	var data = [];
	$(Object.keys(Counter.list)).each(function (index, key) {
		data.push({
			'name' : Counter.list[key].getName(),
			'value' : Counter.list[key].getValue()
		});
	});
	var out = JSON.stringify(data);
	Counter.storage.set('data', out);
}