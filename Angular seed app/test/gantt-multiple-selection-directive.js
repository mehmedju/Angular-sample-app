(function (app) {
	'use strict';

	app.directive('ganttMultipleSelection', ['$window', '$timeout', function ($window, $timeout) {
		return {
			require: 'gantt',
			link: function (scope, element) {
				var selection = {
					dragging: false
				};
				var ganttScope = element.find("div").scope();

				var allDivs = element.find("div");
				var bodyContentDiv = _.find(allDivs, function (d) {
					return angular.element(d).hasClass("gantt-body-content");
				});

				scope.$watch('isInCopyMode',
							 function (newValue, oldValue) {
								 var rowDivs = angular.element(bodyContentDiv).children();
								 angular.element(bodyContentDiv).bind("mousedown", mouseDownHandler);
								 //angular.element(bodyContentDiv).bind("mousemove", mouseMoveHandler);
								 //if (newValue) {
								 //    angular.element(bodyContentDiv).bind("mousedown", mouseDownHandler);
								 //    //_.each(rowDivs, function (d) {
								 //    //    if (angular.element(d).hasClass("gantt-row")) {
								 //    //        angular.element(d).bind("mousedown", mouseDownHandler);
								 //    //        //angular.element(d).bind("mouseup", mouseUpHandler);
								 //    //        //angular.element(d).bind("mousemove", mouseMoveHandler);
								 //    //    }
								 //    //});
								 //} else {
								 //    angular.element(bodyContentDiv).unbind("mousedown", mouseDownHandler);
								 //    //_.each(rowDivs, function (d) {
								 //    //    if (angular.element(d).hasClass("gantt-row")) {
								 //    //        angular.element(d).unbind("mousedown", mouseDownHandler);
								 //    //        //angular.element(d).unbind("mouseup", mouseUpHandler);
								 //    //        //angular.element(d).unbind("mousemove", mouseMoveHandler);
								 //    //    }
								 //    //});
								 //}
							 });


				var initialW, initialH;
				var mouseDownHandler = function (event) {
					//debugger
					selection = {
						dragging: true
					};

					var x = calculateXCoordinate(this, event);
					var xInEm = x / ganttScope.getPxToEmFactor();

					var downRow = angular.element(event.target).scope().row;
					var date = ganttScope.gantt.getDateByPosition(xInEm);

					//console.info("downElements", date);
					var dragStart = {
						date: date,
						row: downRow
					};
					selection.start = dragStart;

					//////////////////////////////////////
					angular.element(document.querySelector("#big-ghost")).remove();

					angular.element(document.querySelector(".ghost-select")).addClass("ghost-active");

					angular.element(document.querySelector(".ghost-select")).css({
						'left': event.layerX + 'px', //x + 'px', //event.pageX + 'px',
						'top': (event.pageY - 300) + 'px' //event.offsetY + 'px' //(event.pageY - 300) + 'px'
					});

					initialW = event.pageX; //x;//event.pageX;
					initialH = (event.pageY - 300); //event.offsetY; //event.pageY - 300;
					//////////////////////////////////////

					var rowDivs = angular.element(bodyContentDiv).children();

					angular.element(bodyContentDiv).bind("mouseup", mouseUpHandler);
					angular.element(bodyContentDiv).bind("mousemove", mouseMoveHandler);
				};


				var mouseMoveHandler = function (event) {
					//debugger;
					//alert(event.pageX + ' - ' + event.pageY);
					openSelector(event);
				};


				var mouseUpHandler = function (event) {
					angular.element(bodyContentDiv).unbind("mouseup", mouseUpHandler);
					angular.element(bodyContentDiv).unbind("mousemove", mouseMoveHandler);

					var x = calculateXCoordinate(this, event);
					var xInEm = x / ganttScope.getPxToEmFactor();

					var upRow = angular.element(event.target).scope().row;
					var date = ganttScope.gantt.getDateByPosition(xInEm);

					//console.info("upElements", date);
					var dragEnd = {
						date: date,
						row: upRow
					};
					selection.end = dragEnd;
					selection.dragging = false;

					scope.$apply(function() {
						selectPerformances();
					});

					angular.element(document.querySelector(".ghost-select")).removeClass("ghost-active");
					angular.element(document.querySelector(".ghost-select")).css({
						'width': '0px',
						'height': '0px'
					});
				};


				function calculateXCoordinate(obj, event) {
					var offset = obj.getClientRects()[0];
					return event.clientX - offset.left;
				}

				function selectPerformances() {
					var minDate, maxDate, minRow, maxRow;
					minDate = selection.start.date > selection.end.date ? selection.end.date : selection.start.date;
					maxDate = selection.start.date < selection.end.date ? selection.end.date : selection.start.date;
					minRow = selection.start.row.order > selection.end.row.order ? selection.end.row.order : selection.start.row.order;
					maxRow = selection.start.row.order < selection.end.row.order ? selection.end.row.order : selection.start.row.order;

					_.each(scope.data, function (r) {
					    _.each(r.tasks, function (t) {
					        t.data.copying = false;
					    });
					});
					//console.log("Select performances based on parameter object: ", minDate, maxDate, minRow, maxRow, selection);
					_.each(scope.data, function (r) {
						if (r.order >= minRow && r.order <= maxRow) {
							_.each(r.tasks, function (t) {
								if ((t.from >= minDate && t.from <= maxDate) || (t.to >= minDate && t.to <= maxDate) ||
									(t.from <= minDate && minDate <= t.to & t.from <= maxDate && maxDate <= t.to)) {
									//console.log("t", t.subject);
									t.data.copying = true;
								}
							});
						}
					});
				}

				function openSelector(e) {
					var w = Math.abs(initialW - e.pageX);
					var h = Math.abs(initialH - e.pageY + 300);

					angular.element(document.querySelector(".ghost-select")).css({
						'width': w + 'px',
						'height': h + 'px'
					});

					var yOffset = e.offsetY + e.target.offsetHeight;

					if (e.pageX <= initialW && (e.pageY - 300) >= initialH) {
						angular.element(document.querySelector(".ghost-select")).css({
							'left': e.layerX + 'px'
						});
					} else if ((e.pageY - 300) <= initialH && e.pageX >= initialW) {
						angular.element(document.querySelector(".ghost-select")).css({
							'top': (e.pageY - 300) + 'px'
						});
					} else if ((e.pageY - 300) <= initialH && e.pageX <= initialW) {
						angular.element(document.querySelector(".ghost-select")).css({
							'left': e.layerX + 'px',
							'top': (e.pageY - 300) + 'px'
						});
					}
				}
			}
		};
	}]);
})(angular.module('msGantt'));

