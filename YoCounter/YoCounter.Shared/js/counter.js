function Counter(name, value) {

    this.element = null;
    this.timer = null;
	this.id = 'Counter_' + Counter.lastId++;
	
	this.construct = function (name, value) {
	    Counter.list[this.id] = this;
	    Log.info(Object.keys(Counter.list).length);
		
	    this.element = $('#templates .counter').clone();
	    Style.apply(this.element);
		this.setName(name);
		this.setValue(value);
		this.element.attr('rel', this.id);
		$('#counters').append(this.element);
		this.hooks();
	    recalculateColumns();
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

	this.merge = function () {
	    clearTimeout(this.timer);
	    var temp = this.element.find(".temp");
	    var main = this.element.find(".value");
	    var current = parseInt(main.html());
	    if (isNaN(current)) {
	        current = 0;
	    }
	    var addition = parseInt(temp.html());
	    if (isNaN(addition)) {
	        addition = 0;
	    }
	    main.html(current + addition);
	    temp.html("");
	    Counter.save();
	}

	this.add = function (value) {
	    clearTimeout(this.timer);
	    var temp = this.element.find(".temp");
	    var current = parseInt(temp.html());
	    if (isNaN(current)) {
	        current = 0;
	    }
	    console.log(value, current);
	    if (value + current > 0) {
	        temp.html("+" + (value + current));
	    } else if (value + current < 0) {
	            temp.html(value + current);
	    } else {
	        temp.html("");
	    }
	    var item = this;
	    this.timer = setTimeout(function () { item.merge() }, 3000)
	}

	this.sub = function (value) {
		return this.add(value * (-1));
	}

	this.remove = function () {
	    delete Counter.list[this.id];
	    this.element.remove();
	    Counter.save();
	    recalculateColumns();
	    Log.info(Object.keys(Counter.list).length);
	}

	this.hooks = function () {
	    this.element.find('.add').click(function () {
	        var p = $(this).closest('.counter');
	        Counter.get(p.attr('rel')).add(1);
	    });
	    this.element.find('.add5').click(function () {
	        var p = $(this).closest('.counter');
	        Counter.get(p.attr('rel')).add(5);
	    });
	    this.element.find('.add10').click(function () {
	        var p = $(this).closest('.counter');
	        Counter.get(p.attr('rel')).add(10);
	    });
	    this.element.find('.sub').click(function () {
	        var p = $(this).closest('.counter');
	        Counter.get(p.attr('rel')).sub(1);
	    });
	    this.element.find('.sub5').click(function () {
	        var p = $(this).closest('.counter');
	        Counter.get(p.attr('rel')).sub(5);
	    });
	    this.element.find('.sub10').click(function () {
	        var p = $(this).closest('.counter');
	        Counter.get(p.attr('rel')).sub(10);
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
    Log.info(json);
    try {
        var data = $.parseJSON(json);
        $(data).each(function (index, item) {
            new Counter(item.name, item.value);
        });
    } catch (e) {
        // pass
    }
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