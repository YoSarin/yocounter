function Counter(name, value) {

	this.element = null;
	this.id = 'Counter_' + Counter.lastId++;
	
	this.construct = function (name, value) {
	    Counter.list[this.id] = this;
	    $("#counters").css('column-count', Object.keys(Counter.list).length);
	    console.log('Counter #' + Object.keys(Counter.list).length);
	    Log.info(Object.keys(Counter.list).length);
		
		this.element = $('#templates .counter').clone();
		this.setName(name);
		this.setValue(value);
		this.element.attr('rel', this.id);
		
		$('#counters').append(this.element);
		
		this.hooks();
	}

	this.setName = function (name) {
		this.element.find(".name").html(name);
	}

	this.setValue = function (value) {
		this.element.find(".value").html(value);
	}

	this.add = function (value) {
		this.element.find(".value").html(value + parseInt(this.element.find(".value").html()));
		return parseInt(this.element.find(".value").html());
	}

	this.sub = function (value) {
		return this.add(value * (-1));
	}

	this.remove = function () {
	    delete Counter.list[this.id];
	    this.element.remove();
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
Counter.settings = null;

Counter.get = function (id) {
	return Counter.list[id];
}

Counter.setSettingsHandler = function(sh) {
    Counter.settings = sh;
}

Counter.recreate = function() {
    new Counter('Světlí');
    new Counter('Tmaví');
}