$(document).ready(function(){
	


$('#multi_status_select').multiselect({
		includeSelectAllOption : true,
		enableFiltering : true
	});

	/*$('#multi_course').multiselect({
		includeSelectAllOption : true,
		enableFiltering : true
	});*/
	$('#multi_div').multiselect({
		includeSelectAllOption : true,
		enableFiltering : true
	});
	/*$('#multi_standard').multiselect({
		includeSelectAllOption : true,
		enableFiltering : true
	});*/
/*	$('#multi_employee').multiselect({
		includeSelectAllOption : true,
		enableFiltering : true
	});*/
	/*$('#multi_emp_design').multiselect({
		includeSelectAllOption : true,
		enableFiltering : true
	});*/
	
	$('#multi_rec_status').multiselect({
		includeSelectAllOption : true,
		enableFiltering : true
	});
	$('#multi_pay_mode').multiselect({
		includeSelectAllOption : true,
		enableFiltering : true
	});
	
});

$(function() {

	var Accordion = function(el, multiple) {
		this.el = el || {};
		this.multiple = multiple || false;

		var links = this.el.find('.content-entry .accordian_title');
		links.on('click', {
			el : this.el,
			multiple : this.multiple
		}, this.dropdown)
	}

	Accordion.prototype.dropdown = function(e) {
		var $el = e.data.el;
		$this = $(this), $next = $this.next();

		$next.slideToggle();
		$this.parent().toggleClass('open');

		if (!e.data.multiple) {
			$el.find('.accordion-content').not($next).slideUp().parent()
					.removeClass('open');
		}
		;
	}
	var accordion = new Accordion($('.accordion-container'), false);
});

$('.accordian_title').on('click', function(event) {
	if (!$(event.target).closest('#accordion').length) {
		$this.parent().toggleClass('open');
	}
});