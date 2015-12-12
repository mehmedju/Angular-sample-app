!function(a){"use strict";a.controller("addExperienceCtrl",["$scope","$modalInstance",function(a,b){a.closeModal=function(){b.dismiss()}}])}(angular.module("myApp")),function(a){"use strict";a.controller("bookingCtrl",["$scope","$modal","bookingService","$translate","$filter","msConstants",function(a,b,c,d,e,f){function g(a,b){var c={},d=[];return a.forEach(function(a){var e=b(a);c[e]||(d.push(e),c[e]=!0)}),d}function h(b,c){for(var d=[],e=0,f=a.moviesTable.length;f>e;e++)for(var g in a.moviesTable[e])g==b&&a.moviesTable[e][g]==c&&d.push(a.moviesTable[e]);a.moviesTable=d}a.isTemplateFormVisible=!1,a.$on("closeNewBookingForm",function(){a.isTemplateFormVisible=!1}),c.getMovies().then(function(b){a.movies=b,a.moviesTable=angular.copy(a.movies)}),a.newTemplate=function(){a.isTemplateFormVisible=!0,a.newBookingAddMode=!0,a.$broadcast("contentOfSelectedRowInTable")},a.newEditTemplate=function(b,c){a.isTemplateFormVisible=!0,a.selectedRow=c,a.newBookingAddMode=!1,a.contentOfSelectedRow=b,a.$broadcast("contentOfSelectedRowInTable")},a.sort=function(b){if(a.moviesTable.columnFilters)var c=a.moviesTable.columnFilters;a.moviesTable=e("orderBy")(a.moviesTable,b,a.isClickedOnIcon),a.moviesTable.columnFilters=c||{}},a.setFilter=function(b){a.filteredItems={items:g(a.movies,function(a){return a[b]}),context:b}},a.changeClassOnIcon=function(){a.isClickedOnIcon=!a.isClickedOnIcon},a.selectByFilterItem=function(a,b){h(b,a[b])},a.clearFilters=function(){a.moviesTable=a.movies,a.filters={},a.clearColumnFilters=!0,a.searchFilter=null},a.changeLanguage=function(a){d.use(a)},a.$on(f.events.columnFilters,function(){a.isTemplateFormVisible=!1,a.contentOfSelectedRow=void 0}),a.openBookingModal=function(){b.open({templateUrl:"../views/partials/bookingModal.html",controller:"tagsDirectiveController",backdrop:"static"})},a.formatDateFilter=function(a){return e("date")(a,"MMM, d yyyy")},a.formatSiteFilter=function(a){return a||(a=""),"^"+a+"^"},a.tableFilter=function(b){return!a.searchFilter||-1!=b.feature.indexOf(a.searchFilter)}}])}(angular.module("myApp")),function(a){"use strict";a.controller("confirmationModalCtrl",["$scope","$modalInstance","options",function(a,b,c){a.options=c,a.ok=function(){b.close()},a.cancel=function(){b.dismiss()}}])}(angular.module("myApp")),function(a){"use strict";a.controller("editModifierCtrl",["$scope","$modal","$modalInstance","modifier","ticketClasses","ticketPricingService",function(a,b,c,d,e,f){a.selectedExperience=[],a.isVisible=!0,a.ticketClasses=e,a.modifier=angular.copy(d),a.experienceCollection=f.getExperiences();var g=d.name?!0:!1;if(g){var h=_.find(a.experienceCollection,function(a){return a.name===d.experience});h&&a.selectedExperience.push(h)}a.closeModal=function(){c.dismiss()},a.addModifier=function(){c.close(a.modifier)},a.manageExperiences=function(){a.isVisible=!1;var c=b.open({templateUrl:"../views/partials/manageExperiencesModal.html",controller:"manageExperiencesModalCtrl",backdrop:"static",size:"lg"});c.result.then(function(b){a.isVisible=!0,a.selectedExperience.push(b)},function(){a.isVisible=!0})},a.$watchCollection("selectedExperience",function(b){b.length&&b[0]&&(angular.extend(a.modifier,b[0]),a.modifier.experience=b[0].name)})}])}(angular.module("myApp")),function(a){"use strict";a.controller("featureCtrl",["$scope","featureService","$filter",function(a,b,c){a.valueOfItem={},a.isClickedOnIcon=!1,b.getNamesOfFeatures().then(function(b){a.namesOfMovies=b,a.featuresTable=angular.copy(a.namesOfMovies)}),a.markRow=function(b){a.valueOfItem=b},a.changeClassOnIcon=function(){a.isClickedOnIcon=!a.isClickedOnIcon},a.applyFilter=function(){var b=c("filter")(a.namesOfMovies,a.searchFeature);a.featuresTable.length=0,_.each(b,function(b){a.featuresTable.push(angular.copy(b))})},a.resetFilter=function(){a.searchFeature="",a.clearColumnFilters=!0,a.featuresTable=angular.copy(a.namesOfMovies)},a.sort=function(b){if(a.featuresTable.columnFilters)var d=a.featuresTable.columnFilters;a.featuresTable=c("orderBy")(a.featuresTable,b,a.isClickedOnIcon),a.featuresTable.columnFilters=d||{}},a.saveFeature=function(){var b={id:2,feature:"Her",studio:"Sony",rating:"R",sites:"Marietta",start_date:"2013-12-20T23:00:00.000Z",end_date:"2014-02-06T22:00:00.000Z",release_date:"2013-12-20",booking_terms:"Tiered 70/60/50"};a.namesOfMovies.push(b),a.featuresTable.push(b)}}])}(angular.module("myApp")),function(a){"use strict";a.controller("historyModalCtrl",["$scope","$modalInstance","ticketType",function(a,b,c){a.ticketType=c,a.close=function(){b.close()}}])}(angular.module("myApp")),function(a){"use strict";a.controller("manageExperiencesModalCtrl",["$scope","$modal","$modalInstance","ticketPricingService","notificationService",function(a,b,c,d,e){function f(){return a.category.feature&&a.category.auditorium?"Fe/Au":a.category.feature&&!a.category.auditorium?"Feat":!a.category.feature&&a.category.auditorium?"Aud":"N/A"}var g="img/experiences/imax.png";a.selectedExperience=[],a.editingExperience={},a.category={},a.experienceCollection=d.getExperiences(),a.getIconNameFromUrl=function(a){return a?a.split("/").pop():""},a.$watchCollection("selectedExperience",function(b){switch(a.editingExperience=b.length>0?angular.copy(b[0]):{smallIcon:g},a.editingExperience.category){case"Fe/Au":a.category.feature=!0,a.category.auditorium=!0;break;case"Feat":a.category.feature=!0,a.category.auditorium=!1;break;case"Aud":a.category.feature=!1,a.category.auditorium=!0;break;default:a.category.feature=!1,a.category.auditorium=!1}}),a.closeModal=function(){c.dismiss()},a.apply=function(b){if(a.selectedExperience.length>0){for(var g=0;g<a.experienceCollection.length;g++)if(a.experienceCollection[g].$$hashKey===a.selectedExperience[0].$$hashKey){a.editingExperience.category=f(),a.experienceCollection[g]=angular.copy(a.editingExperience);break}a.selectedExperience.length=0}else{if(!a.editingExperience.name)return void e.showModal("Information","Select existing experience or create new one!","Ok");a.editingExperience.category=f(),d.addExperience(a.editingExperience)}b&&c.close(a.editingExperience)},a.deleteExperience=function(){a.editingExperience&&(d.deleteExperience(a.editingExperience),a.selectedExperience.length=0)},a.clearForm=function(){a.selectedExperience.length=0}}])}(angular.module("myApp")),function(a){"use strict";a.controller("newBookingController",["$scope","bookingService",function(a,b){function c(){a.newBooking={},a.addForm.submitted=!1}function d(b){for(var c in a.datepickers)a.datepickers[c]=!1,c===b&&(a.datepickers[c]=!0)}a.newBooking={},b.getFeatures().then(function(b){a.featuremodels=b}),b.getStudios().then(function(b){a.studios=b}),b.getRatings().then(function(b){a.ratings=b}),a.$on("contentOfSelectedRowInTable",function(){a.newBookingAddMode?(a.newBooking={},a.newBooking.endDate=new Date,a.newBooking.releaseDate=new Date,a.newBooking.startDate=new Date):(a.newBooking.releaseDate=new Date(a.contentOfSelectedRow.release_date),a.newBooking.startDate=new Date(a.contentOfSelectedRow.start_date),a.newBooking.endDate=new Date(a.contentOfSelectedRow.end_date),a.newBooking.feature=a.contentOfSelectedRow.feature,a.newBooking.studio=a.contentOfSelectedRow.studio,a.newBooking.site=a.contentOfSelectedRow.sites,a.newBooking.booking=a.contentOfSelectedRow.booking_terms,a.newBooking.rating=a.contentOfSelectedRow.rating)}),a.reset=function(){a.selectedRow&&(a.selectedRow.index=-1),c(),a.$emit("closeNewBookingForm")},a.book=function(b){var d=new Date(a.newBooking.releaseDate),e=d.getFullYear()+"-"+("0"+(d.getMonth()+1)).slice(-2)+"-"+("0"+d.getDate()).slice(-2);if(a.addForm.$valid){var f={id:a.moviesTable.length+1,feature:a.newBooking.feature.name,studio:a.newBooking.studio.name,release_date:e,rating:a.newBooking.rating,sites:a.newBooking.site,start_date:a.newBooking.startDate,end_date:a.newBooking.endDate,booking_terms:a.newBooking.booking};a.moviesTable.push(f);for(var g=0;g<a.featuremodels.length;g++)a.featuremodels[g].name===f.feature&&a.featuremodels.splice(g,1);c(),b&&a.$emit("closeNewBookingForm")}else a.addForm.submitted=!0},a.save=function(){a.selectedRow.index=-1;var b=new Date(a.newBooking.releaseDate),c=b.getFullYear()+"-"+("0"+(b.getMonth()+1)).slice(-2)+"-"+("0"+b.getDate()).slice(-2);a.addForm.$valid?(a.contentOfSelectedRow.release_date=c,a.contentOfSelectedRow.start_date=a.newBooking.startDate,a.contentOfSelectedRow.end_date=a.newBooking.endDate,a.contentOfSelectedRow.rating=a.newBooking.rating,a.contentOfSelectedRow.sites=a.newBooking.site,a.contentOfSelectedRow.booking_terms=a.newBooking.booking,a.reset()):a.addForm.submitted=!0},a.showDatepicker=function(a,b){a.preventDefault(),a.stopPropagation(),d(b)},a.formats=["dd-MMMM-yyyy","yyyy-MMMM-dd","dd.MM.yyyy","shortDate"],a.format=a.formats[0],a.delete=function(){for(var b=0;b<a.moviesTable.length;b++)if(a.moviesTable[b].feature==a.newBooking.feature){a.moviesTable.splice(b,1);break}},a.datepickers={openedReleaseDate:!1,openedStartDate:!1,openedEndDate:!1},a.datePickerOptions={"show-weeks":"'false'"}}])}(angular.module("myApp")),function(a){"use strict";a.controller("scheduleCtrl",["$scope","bookingService",function(a,b){a.sites=[{id:1,name:"Alpharetta Theater",address:"Alpharetta 123",city:"Atlanta",state:"Georgia"},{id:2,name:"Buckhead Amphitheater",address:"Alpharetta 123",city:"Atlanta",state:"Georgia"},{id:3,name:"San Fierro Grand Hall",address:"San Andreas 123",city:"San Andreas",state:"San Andreas"}],b.getMoviesCollection().then(function(b){a.movies=b}),a.removeSelectedSite=function(b){var c=a.newSchedule.sites.indexOf(b);a.newSchedule.sites.splice(c,1)},a.removeSelectedFeature=function(b){var c=a.newSchedule.features.indexOf(b);a.newSchedule.features.splice(c,1)},a.addNew=function(){a.newSchedule.sites.length=0;var b=_.find(a.sites,function(a){return 2==a.id});a.newSchedule.sites.push(b)}}])}(angular.module("myApp")),function(a){"use strict";a.controller("scheduleGanttCtrl",["$scope","$timeout","$modal","$templateCache","$locale","ganttService","scheduleService","notificationService","commonService","$window",function(a,b,c,d,e,f,g,h,i){function j(a){d.remove("template/datepicker/day.html"),d.put("template/datepicker/day.html",a.dayTemplate.override),d.remove("template/datepicker/month.html"),d.put("template/datepicker/month.html",a.monthTemplate.override),d.remove("template/datepicker/year.html"),d.put("template/datepicker/year.html",a.yearTemplate.override)}function k(){i.revertTemplates()}function l(){L=!0;var c=new Date(a.currentDate);c.setDate(c.getDate()+1),f.getGanttContent(a.currentDate).then(function(d){a.loadedDays=[a.currentDate,c],a.calender.focusedDate=_.min(a.loadedDays),a.data=d,a.zoom.isZoomInMode?(a.calender.focusedDate=_.min(a.loadedDays),m(!0)):(E(c,function(){x(a.currentDate)}),b(function(){L=!1},1e3))})}function m(c){var d=a.setScrollerPosition();if(c){r(!0),a.editForm.visibility=!1,d.scrollLeft=1,a.originData=angular.copy(a.data);for(var e=0;e<a.data.length;e++)a.data[e].tasks.length=0;for(var f=0;f<a.originData.length;){var g=_.filter(a.originData[f].tasks,function(b){return a.calender.focusedDate.getDate()==b.from.getDate()&&a.calender.focusedDate.getMonth()==b.from.getMonth()&&a.calender.focusedDate.getYear()==b.from.getYear()});a.data[f].tasks=g,f++}a.loadedDays=[a.calender.focusedDate]}else{d.scrollLeft=d.scrollLeft/2,x(a.calender.focusedDate),a.performancesFromOneDay=a.data,a.data=angular.copy(a.originData);for(var h=0;h<a.data.length;h++)for(var i=a.data[h].tasks.length;i--;)if(a.data[h].tasks[i].from.getDate()==a.calender.focusedDate.getDate()&&a.calender.focusedDate.getMonth()==a.data[h].tasks[i].from.getMonth()&&a.calender.focusedDate.getYear()==a.data[h].tasks[i].from.getYear()){var j=a.data[h].tasks.indexOf(a.data[h].tasks[i]);a.data[h].tasks.splice(j,1)}_.each(a.performancesFromOneDay,function(b,c){_.each(b.tasks,function(b){a.data[c].tasks.push(b)})}),a.currentDate=a.calender.focusedDate,a.loadedDays=[a.currentDate];var k=new Date(a.currentDate);k.setDate(k.getDate()+1),E(k,function(){b(function(){x(a.currentDate)},500)}),a.loadedDays.push(k)}q()}function n(b){a.isPreviewingCopiedData||(b.task.data.copying=!b.task.data.copying,a.copyTo.backToDate=b.task.from);var c=I.indexOf(b.task.row.id);-1!==c&&I.splice(c,1)}function o(a){a.evt.target.dataset.revertSingle?u(a.task.id):(z(a),a.task.data.isActive=!0,p(a))}function p(c){k(),a.selectedTask=c,a.mode.isAddingNewFeatureMode=!1,a.experiences.isShownAllModifiers=!1,a.editForm.visibility=!0,a.experiences.isExperiencesVisible=!0;var d=_.find(a.data,function(a){return a.id==c.task.row.id}),e=_.find(a.allExistingFeatures,function(a){return a.id==c.task.data.movieId});_.each(a.data,function(b){if(b.id==c.task.row.id){var d=_.find(b.tasks,function(a){return a.id==c.task.id});a.selectedFeature=angular.copy(d),a.$broadcast("selectedFrom",a.selectedFeature.from)}}),b(function(){a.newSchedule.feature=[e],a.newSchedule.auditoriums=[d]},0)}function q(c){var d=_.min(a.loadedDays),e=_.max(a.loadedDays);a.ganttFromDate=new Date(d.getFullYear(),d.getMonth(),d.getDate()),a.ganttToDate=new Date(e.getFullYear(),e.getMonth(),e.getDate()+1),_.each(a.data,function(b){_.each(b.tasks,function(c){c.data.overlapping=!1,f.setOverlappingFlags(c,a.data,b)})}),b(function(){a.clearData(),a.loadData(a.data),c&&c()},0)}function r(b){b&&a.selectedTask&&_.each(a.data,function(b){b.id==a.selectedTask.task.row.id&&delete a.selectedTask.task.data.isActive}),a.refreshGrid()}function s(a){delete a.data.preview,delete a.data.overlapping}function t(b,c){if(b.from=b.data.unmodifiedValues.from,b.to=b.data.unmodifiedValues.to,c.id!=b.data.unmodifiedValues.rowId){var d=c.tasks.indexOf(b);c.tasks.splice(d,1);var e=_.find(a.data,function(a){return a.id==b.data.unmodifiedValues.rowId});e.tasks.push(b)}s(b),delete b.data.unmodifiedValues}function u(b){var c;_.each(a.data,function(a){_.each(a.tasks,function(d){d.data.preview&&(b?b==d.id:!0)&&(c=!0,t(d,a))})}),c&&q()}function v(b){for(var c=0;c<a.data.length;c++)for(var d=a.data[c],e=0;e<d.tasks.length;e++)if(d.tasks[e].id===b.id){var f=w(b).tasks[0];if(f.data.unmodifiedValues||(f.data.unmodifiedValues={from:d.tasks[e].from,to:d.tasks[e].to,rowId:d.id,rowOrder:d.order,rowDesc:d.description}),d.tasks.splice(e,1),d.id===b.row.id)d.tasks.push(f);else{var g=_.find(a.data,function(a){return a.id===b.row.id});g.tasks.push(f)}return}}function w(a){return{id:a.row.id,description:a.row.description,order:a.row.order,tasks:[{id:a.id,subject:a.subject,from:a.from,to:a.to,data:a.data}]}}function x(c){var d=new Date(c.getFullYear(),c.getMonth(),c.getDate(),18,0);b(function(){a.scrollToToday(d)},0)}function y(){a.workHours=_.range(0,24)}function z(c){a.editForm.visibility=!0,a.focusOn.dateField=!0,a.zoom.isZoomInMode||b(function(){a.scrollToToday(c.task.from)},0);for(var d=0;d<a.data.length;d++)for(var e=a.data[d],f=0;f<e.tasks.length;f++)e.tasks[f].data.isActive=e.tasks[f].id===c.task.id?!0:!1}function A(a){return""+a.getFullYear()+a.getMonth()+a.getDate()+a.getHours()}function B(a){var b;if(_.contains(I,a.row.id)){var c=I.indexOf(a.row.id);-1!==c&&I.splice(c,1),b=!1}else I.push(a.row.id),b=!0;_.each(a.row.tasks,function(a){a.data.copying=b})}function C(c){var d,e=A(c.column.date);if(_.contains(J,e)){var f=J.indexOf(e);-1!==f&&J.splice(f,1),d=!1}else J.push(e),d=!0;_.each(a.data,function(a){_.each(a.tasks,function(a){var e=new Date(c.column.date);e.setHours(c.column.date.getHours()+1),(a.from<c.column.date&&c.column.date<=a.to||a.from<=e&&e<a.to)&&b(function(){a.data.copying=d},0)})})}function D(c){if(angular.equals(c.direction,"left")){var d=new Date(_.min(a.loadedDays));d.setDate(d.getDate()-1),E(d,function(){x(d)})}else if(angular.equals(c.direction,"right")){var e=new Date(_.max(a.loadedDays));e.setDate(e.getDate()+1),E(e,function(){L=!0,x(e),b(function(){L=!1},500)})}}function E(b,c){f.getGanttContent(b).then(function(d){var e=!1;d&&d.length>0&&(e=_.some(d,function(a){return a.tasks.length>0})),e?(F(d),a.loadedDays.push(b),q(c)):(a.loadedDays.push(b),q(c))})}function F(b){_.each(b,function(b){var c=_.find(a.data,function(a){return a.id===b.id});c?_.each(b.tasks,function(a){var b=_.find(c.tasks,function(b){return b.id==a.id});b?console.warn("Skiped adding performance - there is already added one with same id",a):c.tasks.push(a)}):a.data.push(b)})}a.ganttHighlightTask=a.ganttHighlightTask||{},i.getOverrideTemplates().then(function(a){j(a)}),a.focusOn={dateField:!0},a.showCalender=function(){a.datepickers.calender=!a.datepickers.calender};var G,H;a.getLoadedRange=function(){var b=_.min(a.loadedDays),c=_.max(a.loadedDays);return[b,c]},a.ganttConfig={scale:"hour",mode:"custom"},a.editForm={visibility:!1},a.newSchedule={auditoriums:[],feature:[]},a.newFeature={modifiers:[]},a.experiences={isExperiencesVisible:!1,isShownAllModifiers:!1,remainingInvisibleModifiers:0,underLimitOfDisplayingModifiers:5},a.mode={isAddingNewFeatureMode:!1},a.currentDate=new Date(2013,9,22),a.copyTo={date:new Date(2013,9,25)},a.zoom={isZoomInMode:!1,zoomInTitle:"Zoom in",zoomOutTitle:"Zoom out",zoomInSizeType:"%",zoomOutSizeType:"em",zoomInColumnWidth:4.166667,zoomOutColumnWidth:8},a.timePickerOptions={ismeridian:!1,hstep:1,mstep:5},a.timepicker={},a.zoomTitle=a.zoom.zoomOutTitle,a.setColumnWidth=a.zoom.zoomOutColumnWidth,a.selectedFeature={},f.getExistingFeatures().then(function(b){a.allExistingFeatures=b}),a.loadedDays=[],a.zoomConfiguration=function(){a.zoom.isZoomInMode=!a.zoom.isZoomInMode,a.zoomTitle=a.zoom.isZoomInMode?a.zoom.zoomInTitle:a.zoom.zoomOutTitle,a.setColumnWidth=a.zoom.isZoomInMode?a.zoom.zoomInColumnWidth:a.zoom.zoomOutColumnWidth,m(a.zoom.isZoomInMode),q(),r(a.zoom.isZoomInMode)},a.addNewFeature=function(){k(),b(function(){a.selectedFeature={},a.selectedFeature.from=a.currentDate,a.selectedFeature.to=new Date,a.selectedFeature.data={}},100),a.experiences.isExperiencesVisible=!1,a.editForm.visibility=!0,a.mode.isAddingNewFeatureMode=!0,a.newSchedule.feature.length=0,a.newSchedule.auditoriums=0,a.$broadcast("resetTime")},a.showMoreExp=function(){return a.selectedFeature.data&&a.selectedFeature.data.modifiers?a.experiences.remainingInvisibleModifiers=a.selectedFeature.data.modifiers.length>a.experiences.underLimitOfDisplayingModifiers?a.selectedFeature.data.modifiers.length-a.experiences.underLimitOfDisplayingModifiers:0:0},a.taskEvent=function(b){b&&b.evt&&b.evt.target&&(b.evt.target.dataset.info||b.task.data.isMoved||(a.isInCopyMode?n(b):o(b)))},a.taskMoveBegin=function(a){G=w(a.task),a.task.data.isMoved=!1},a.taskMoveEnd=function(b){var c=b.task,d=!1;(G.id!=c.row.id||G.tasks[0].from.getTime()!=c.from.getTime()||G.tasks[0].to.getTime()!=c.to.getTime())&&(d=!0),!d||a.isInCopyMode||c.data.preview||(c.data.preview=!0),v(b.task),d&&(b.task.data.isMoved=!0),q()},a.refreshGrid=function(){q()},window.onresize=function(){var b=a.setScrollerPosition();b.scrollLeft++,b.scrollLeft--},a.saveGridChanges=function(){var b;_.each(a.data,function(a){_.each(a.tasks,function(a){a.data.preview&&(b=!0,delete a.data.isMoved,delete a.data.preview,delete a.data.unmodifiedValues)})}),b&&q(),y()},a.prepareTaskForGrid=function(a,b){return{id:a.id,description:a.description,order:a.order,tasks:[b]}},a.resetGridChanges=function(){u()},a.showPreviewPricingModal=function(){c.open({templateUrl:"../views/partials/schedulePreviewPricingModal.html",controller:"schedulePreviewPricingModalCtrl",backdrop:"static",size:"lg"})},a.showSwapPerfomancesModal=function(){return a.editForm.visibility=!1,f.checkForUnsavedChanges(a.data)?void h.showModal("Warning","You have unsaved changes","OK"):void c.open({templateUrl:"../views/partials/scheduleSwapPerformancesModal.html",controller:"schedulePreviewPricingModalCtrl",backdrop:"static",size:"lg"})},a.setScrollerPosition=function(){var a=angular.element(document.querySelector(".gantt-scrollable"))[0];return a},a.removeTaskFromGrid=function(b){for(var c=0;c<a.data.length;c++)for(var d=a.data[c],e=0;e<d.tasks.length;e++)if(d.tasks[e].id===b.task.id){d.tasks.splice(e,1);break}var f=[{id:b.task.row.id,tasks:[{id:b.task.id}]}];a.removeData(f)};var I=[],J=[];a.datepickers={openedReleaseDate:!1,openedStartDate:!1,openedEndDate:!1},a.datePickerOptions={"show-weeks":"'false'",format:"dd-MMMM-yyyy"},a.showDatepicker=function(b,c){b.preventDefault(),b.stopPropagation(),a.datepickers[c]=!0},a.isRowSelectedForCopy=function(b,c){if(!a.isInCopyMode||a.isPreviewingCopiedData)return!1;var d=_.contains(I,b);return c&&(d=!d),d},a.isColumnSelectedForCopy=function(b,c){if(!a.isInCopyMode||a.isPreviewingCopiedData)return!1;var d=_.contains(J,A(b));return c&&(d=!d),d},a.setCopyMode=function(){if(a.calender.date=a.calender.focusedDate,k(),r(!0),a.editForm.visibility=!1,f.checkForUnsavedChanges(a.data)){var b=h.showModal("Warning","You have unsaved changes","Save changes and proceed","Go back");b.result.then(function(){a.saveGridChanges(),a.isInCopyMode=!0})}else a.isInCopyMode=!0},a.labelEvent=function(b){a.isInCopyMode&&!a.isPreviewingCopiedData&&(b.row.hasOwnProperty("date")?(b.column=b.row,delete b.row,C(b)):B(b))},a.cancelCopy=function(){a.isInCopyMode=!1,a.isPreviewingCopiedData=!1,H&&H.data&&(a.data=angular.copy(H.data)),_.each(a.data,function(a){_.each(a.tasks,function(a){a.data.copying&&(delete a.data.copying,delete a.data.isActive)})})},a.copyPerformances=function(c){a.isCopiedSomePerformance=!0;var d=a.copyTo.date;a.calender.focusedDate=d;var e=[];_.each(a.data,function(a){var b=_.map(a.tasks,function(a){return a.data.copying?a.from.getFullYear().toString()+a.from.getMonth().toString()+a.from.getDate().toString():null});e.push.apply(e,b)});var g=_.size(_.uniq(_.reject(e,function(a){return!a})));if(g>1)return void h.showModal("Information","You need to select performances you want to copy from single day","OK");var i=f.prepareCopyData(a.data,d,c);if(!i.anythingToCopy)return void h.showModal("Information","You must select performances you want to copy","OK");if(c?(a.isPreviewingCopiedData=!0,H={data:angular.copy(a.data),loadedDays:a.loadedDays}):(a.isInCopyMode=!1,y()),f.getGanttContent(d).then(function(b){_.each(b,function(a){if(a.tasks.length>0){var b=_.find(i.data,function(b){return b.id===a.id});b.tasks.unshift.apply(b.tasks,a.tasks)}}),a.data=i.data,a.loadedDays=[d],q()}),!a.zoom.isZoomInMode){a.currentDate=a.calender.focusedDate;var j=new Date(a.currentDate);j.setDate(j.getDate()+1),E(j,function(){b(function(){x(a.currentDate)},500)}),a.loadedDays.push(j)}},a.previewCopy=function(){a.copyPerformances(!0)},a.backToCopy=function(){a.isPreviewingCopiedData=!1,a.data=angular.copy(H.data),a.loadedDays=H.loadedDays,q(function(){a.scrollToToday(a.copyTo.backToDate)})},a.applyPreviewedCopy=function(){_.each(a.data,function(a){_.each(a.tasks,function(a){delete a.data.preview,delete a.data.copying,delete a.data.unmodifiedValues})}),a.isPreviewingCopiedData=!1,a.isInCopyMode=!1,y()};var K=_.debounce(D,300),L=!1;a.scrollEvent=function(b){return L||a.isCopiedSomePerformance||a.zoom.isZoomInMode?void(a.isCopiedSomePerformance=!1):void K(b)},a.scheduledDays=function(){var a=[],b=f.getAllSchedules();return _.each(b,function(b){b.performances&&b.performances.length>0&&a.push(b.date.replace(/-/g,""))}),a.sort(),a},a.calender={date:a.currentDate,focusedDate:null},a.multiSelecting=function(){var b=!1;return a.multiSelectedFeatures=[],_.each(a.data,function(c){_.each(c.tasks,function(c){c.data.copying&&(a.multiSelectedFeatures.push(c),a.multiSelectedFeatures.length>1&&(b=!0))})}),b},a.$watchCollection("multiSelecting()",function(c){var d={},e=!1,f=!1,h=!1;if(c&&(a.editForm.visibility=!0,a.multiSelectedFeatures)){for(var i=[],j=0;j<a.multiSelectedFeatures.length;)_.each(a.data,function(b){_.each(b.tasks,function(c){c.id==a.multiSelectedFeatures[j].id&&i.push(b)})}),j++;for(var k=1;k<i.length;k++)i[0].id!=i[k].id&&(a.newSchedule.auditoriums=g.setAuditorium(d),h=!0);for(var l=1;l<a.multiSelectedFeatures.length;l++)a.multiSelectedFeatures[0].subject!=a.multiSelectedFeatures[l].subject?(a.newSchedule.feature=g.setFeature(d),e=!0):a.multiSelectedFeatures[0].from!=a.multiSelectedFeatures[l].from&&(a.selectedFeature.from=g.setPerformanceDate(""),f=!0);h||b(function(){a.newSchedule.auditoriums=g.setAuditorium(i[0])},0),e?f||(a.selectedFeature.from=a.multiSelectedFeatures[0].from):b(function(){var b=_.find(a.allExistingFeatures,function(b){return b.id==a.multiSelectedFeatures[0].data.movieId});a.newSchedule.feature=g.setFeature(b)},0),a.allMultiSelectedFeatures=g.setMultiSelectedFeatures(a.multiSelectedFeatures)}}),a.$watch("calender.date",function(b){a.currentDate=b,l(),a.datepickers.calender=!1}),a.loadPreviousAvailableDay=function(){if(a.zoom.isZoomInMode)a.calender.focusedDate.setDate(a.calender.focusedDate.getDate()-1),a.calender.date=a.calender.focusedDate,E(a.calender.focusedDate,function(){x(a.currentDate)}),m(!0);else{var b=new Date(_.min(a.loadedDays).getTime());a.calender.date=new Date(b.getFullYear(),b.getMonth(),b.getDate()-1)}},a.loadNextAvailableDay=function(){a.zoom.isZoomInMode?(a.calender.focusedDate.setDate(a.calender.focusedDate.getDate()+1),a.calender.date=a.calender.focusedDate,E(a.calender.focusedDate,function(){x(a.currentDate)}),m(!0)):a.calender.date=_.max(a.loadedDays)};var M={fr:{DATETIME_FORMATS:{AMPMS:["AM","PM"],DAY:["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],MONTH:["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"],SHORTDAY:["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],SHORTMONTH:["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc."],fullDate:"EEEE d MMMM y",longDate:"d MMMM y",medium:"d MMM y HH:mm:ss",mediumDate:"d MMM y",mediumTime:"HH:mm:ss","short":"dd/MM/yy HH:mm",shortDate:"dd/MM/yy",shortTime:"HH:mm"},NUMBER_FORMATS:{CURRENCY_SYM:"€",DECIMAL_SEP:",",GROUP_SEP:" ",PATTERNS:[{gSize:3,lgSize:3,macFrac:0,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,macFrac:0,maxFrac:2,minFrac:2,minInt:1,negPre:"(",negSuf:" ¤)",posPre:"",posSuf:" ¤"}]},id:"fr-fr",pluralCat:function(a){return a>=0&&2>=a&&2!=a?PLURAL_CATEGORY.ONE:PLURAL_CATEGORY.OTHER}},en:{DATETIME_FORMATS:{AMPMS:["AM","PM"],DAY:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],MONTH:["January","February","March","April","May","June","July","August","September","October","November","December"],SHORTDAY:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],SHORTMONTH:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],fullDate:"EEEE, MMMM d, y",longDate:"MMMM d, y",medium:"MMM d, y h:mm:ss a",mediumDate:"MMM d, y",mediumTime:"h:mm:ss a","short":"M/d/yy h:mm a",shortDate:"M/d/yy",shortTime:"h:mm a"},NUMBER_FORMATS:{CURRENCY_SYM:"$",DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{gSize:3,lgSize:3,macFrac:0,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,macFrac:0,maxFrac:2,minFrac:2,minInt:1,negPre:"(¤",negSuf:")",posPre:"¤",posSuf:""}]},id:"en-us",pluralCat:function(a){return 1==a?PLURAL_CATEGORY.ONE:PLURAL_CATEGORY.OTHER}}};a.currentLanguage="en",angular.copy(M.en,e),a.setLang=function(b){a.currentLanguage=b,angular.copy(M[b],e)}}])}(angular.module("myApp")),function(a){"use strict";a.controller("schedulePreviewPricingModalCtrl",["$scope","$modalInstance",function(a,b){a.cancel=function(){b.dismiss()}}])}(angular.module("myApp")),function(a){"use strict";a.controller("scheduleRightEditPanelCtrl",["$scope","$timeout","ganttService",function(a,b,c){var d=function(){function a(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return function(){return a()+a()+"-"+a()+"-"+a()+"-"+a()+"-"+a()+a()+a()}}();c.getGanttAllFeatures().then(function(b){a.allFeatures=b}),a.save=function(b){if(b&&(a.editForm.visibility=!1),_.each(a.data,function(b){if(a.mode.isAddingNewFeatureMode)a.selectedFeature.id=d(),a.selectedFeature.data.movieId=a.newSchedule.feature[0].id;else for(var c=0;c<b.tasks.length;c++)if(b.tasks[c].id==a.selectedTask.task.id){b.tasks.splice(c,1);break}b.id==a.newSchedule.auditoriums[0].id&&b.tasks.push(a.selectedFeature),delete a.selectedFeature.data.unmodifiedValues,delete a.selectedFeature.data.preview,delete a.selectedFeature.data.isActive}),a.ganttHighlightTask.id=a.selectedFeature.id,!a.zoom.isZoomInMode){var c=a.setScrollerPosition();c.scrollLeft++,a.putFocusOnNewAddedFeature(a.selectedFeature.from)}a.refreshGrid()},a.putFocusOnNewAddedFeature=function(c){var d=new Date(c.getFullYear(),c.getMonth(),c.getDate(),c.getHours(),c.getMinutes());b(function(){a.scrollToToday(d)},0)},a.saveAndNew=function(){delete a.selectedFeature.data.isActive,_.each(a.data,function(b){if(!a.mode.isAddingNewFeatureMode)for(var c=0;c<b.tasks.length;c++)if(b.tasks[c].id==a.selectedTask.task.id){b.tasks.splice(c,1);break}a.selectedFeature.id=d(),a.selectedFeature.data.movieId=a.newSchedule.feature[0].id,b.id==a.newSchedule.auditoriums[0].id&&b.tasks.push(a.selectedFeature)}),a.ganttHighlightTask.id=a.selectedFeature.id,a.selectedFeature=angular.copy(a.selectedFeature),a.refreshGrid()},a.shouldDisableSaveButtons=function(){return newSchedule.feature.length<=0||newSchedule.auditoriums.length<=0?!0:!1},a.cancel=function(){a.editForm.visibility=!1,a.mode.isAddingNewFeatureMode||_.each(a.data,function(b){b.id==a.selectedTask.task.row.id&&delete a.selectedTask.task.data.isActive,a.refreshGrid()});var b=a.setScrollerPosition();b.scrollLeft++},a.delete=function(){a.editForm.visibility=!1;var b=a.setScrollerPosition();b.scrollLeft++,a.removeTaskFromGrid(a.selectedTask)},a.deleteSelectedAuditorium=function(){a.newSchedule.auditoriums.splice(0,1)},a.deleteSelectedFeature=function(){a.newSchedule.features.splice(0,1)},a.openModifiersPopover=function(){a.experiences.isShownAllModifiers=!0},a.closeModifiersPopover=function(){a.experiences.isShownAllModifiers=!1},a.$on("selectedFrom",function(b){a.selectedFeature.from=b.targetScope.selectedFeature.from}),a.$on("resetTime",function(){a.selectedFeature.from=a.currentDate}),a.$watch("newSchedule.feature",function(b){if(b&&b[0]){a.temp=!1;var c=b[0];a.selectedFeature.data=a.selectedFeature.data||{},a.selectedFeature.subject=c.name,a.selectedFeature.data.image=c.image,a.selectedFeature.data.movieId=c.id,a.selectedFeature.data.duration=c.duration,a.selectedFeature.data.rating=c.rating,a.selectedFeature.data.duration&&(a.selectedFeature.to=new Date(a.selectedFeature.from.getTime()+6e4*a.selectedFeature.data.duration)),_.each(a.data,function(b){var d=_.find(b.tasks,function(a){return a.data.movieId==c.id});d&&(a.temp=!0,a.selectedFeature.data.modifiers=d.data.modifiers)}),a.temp||(a.selectedFeature.data.modifiers=[]),a.refreshGrid()}},!0),a.$watch("selectedFeature.from",function(b){b&&a.selectedFeature&&a.selectedFeature.data&&a.selectedFeature.data.duration&&(a.selectedFeature.to=new Date(a.selectedFeature.from.getTime()+6e4*a.selectedFeature.data.duration))}),a.showDatepicker=function(b,c){b.preventDefault(),b.stopPropagation(),a.datepickers[c]=!a.datepickers[c]}}])}(angular.module("myApp")),function(a){"use strict";a.controller("startPageController",["$scope","carouselService",function(a,b){b.getSlideContent().then(function(b){a.slideContent=b})}])}(angular.module("myApp")),function(a){"use strict";a.controller("tagsDirectiveController",["$scope","tagsService","$modalInstance","$modal",function(a,b,c,d){function e(b){for(var c in a.datepickers)a.datepickers[c]=!1,c===b&&(a.datepickers[c]=!0)}b.getAllFeatures().then(function(b){a.features=b}),a.isModalVisible=!1,a.tagsCollection=[],a.insertedTag={},a.addFeature=function(){a.doubleInput=!1,angular.forEach(a.tagsCollection,function(b){b==a.insertedTag.name&&(a.doubleInput=!0,a.insertedTag={})}),!a.doubleInput&&a.insertedTag.name&&a.insertedTag.name.name&&(a.tagsCollection.push(a.insertedTag.name),a.insertedTag=""),a.insertedTag={}},a.openDatepicker=function(a,b){a.preventDefault(),a.stopPropagation(),e(b)},a.datepickers={openedReleaseDate:!1,openedStartDate:!1,openedEndDate:!1},a.openFeatureModal=function(){d.open({templateUrl:"../views/partials/featureModal.html",controller:"tagsDirectiveController",backdrop:"static"})
},a.close=function(){c.close()}}])}(angular.module("myApp")),function(a){"use strict";a.controller("ticketPricingCtrl",["$scope","$modal","notificationService","ticketPricingService",function(a,b,c,d){function e(){a.ticketClassData=d.getPricing(),h=angular.copy(a.ticketClassData)}function f(b,c){if(a.orderedTicketClassData[0].dayPart.startTime==a.openingHours&&a.orderedTicketClassData[0].dayPart.endTime==a.closingHours)b.startTime=c,b.endTime=a.orderedTicketClassData[0].dayPart.endTime,a.orderedTicketClassData[0].dayPart.endTime=new Date(b.startTime-6e4);else{for(var d,e=!1,f=a.orderedTicketClassData.length,g=0;f-1>g;g++)if(d=a.orderedTicketClassData[g].dayPart,d.startTime!=a.openingHours&&c<d.startTime){b.startTime=c,b.endTime=a.orderedTicketClassData[g-1].dayPart.endTime,a.orderedTicketClassData[g-1].dayPart.endTime=new Date(b.startTime-6e4),e=!0;break}if(!e){var h=_.find(a.orderedTicketClassData,function(b){return b.dayPart.endTime==a.closingHours});b.startTime=c,b.endTime=h.dayPart.endTime,h.dayPart.endTime=new Date(b.startTime.getTime()-6e4)}}}function g(a,b,c){var d=Number(a)||0;switch(b=Number(b)||0,c){case j.increase:return d+b;case j.decrease:return d-b;case j.override:return b;default:return console.warn("Unknown modifier!"),0}}a.currencySymbol="$",a.openingHours="Open",a.closingHours="Close",a.editingMode=!1,a.resett=!1,a.resetForm=!1,a.timePicker={},a.timePickerOptions={hStep:1,mStep:10,isMeridian:!0};var h,i={ticketClass:"ticketClass",dayPart:"dayPart"},j=d.getBulkPriceModifiers();e(),a.ticketClasses=d.getTicketClasses(),a.triggerEditTableMode=function(){a.editingMode=!0};var k,l=[];a.startDayPartEditing=function(b){k=b.name,a.closeAllHeaderEditing(),l.push(b.id)},a.closeDayPartEditing=function(b,c){c&&(b.name=k,k="");var d=l.indexOf(b);l.splice(d,1),b.endTime||a.dayPartTimeEditing("startTime",b)},a.isDayPartInEditMode=function(a){return _.contains(l,a)},a.dayPartTimeEditing=function(b,d){return d.startTime==a.openingHours||d.startTime==a.closingHours?void c.showModal("Information","You cannot edit opening hours","OK"):(a.dayPartTime={type:b,id:d.id},void(a.timePicker.value=d[b]))},a.cancelDayPartTimeEditing=function(){a.dayPartTime=void 0},a.applyDayPartTimeEditing=function(b){var d=_.find(a.orderedTicketClassData,function(b){return _.isDate(b.dayPart.startTime)&&b.dayPart.startTime.getTime()==a.timePicker.value.getTime()});if(d&&d.dayPart.endTime)return void c.showModal("Information","Day part with selected starting time already exist","OK");var e=b.endTime;if(e){for(var g=1;g<a.orderedTicketClassData.length;g++)if(a.orderedTicketClassData[g].dayPart.id==b.id){var h=a.orderedTicketClassData[g-1].dayPart.startTime,i=a.orderedTicketClassData[g+1]&&a.orderedTicketClassData[g+1].dayPart.startTime;if(h!=a.openingHours&&h.getTime()>a.timePicker.value.getTime())return void c.showModal("Information","You cannot set start time earlier than previous day part","OK");if(i&&i.getTime()<a.timePicker.value.getTime())return void c.showModal("Information","You cannot set start time later than next day part","OK");b.startTime=a.timePicker.value,a.orderedTicketClassData[g-1].dayPart.endTime=new Date(b.startTime-6e4);break}}else f(b,a.timePicker.value);a.dayPartTime=void 0};var m,n=[];a.startTicketClassEditing=function(b){m=b.name,a.closeAllHeaderEditing(),n.push(b.id)},a.closeTicketClassEditing=function(a,b){b&&(a.name=m,m="");var c=n.indexOf(a.id);n.splice(c,1)},a.isTicketClassInEditMode=function(a){return _.contains(n,a)},a.bulkPriceEditing=function(b,c){a.bulkPriceEdit={type:b,id:a.bulkPriceEdit&&a.bulkPriceEdit.id==c?void 0:c,modifier:j.decrease}},a.cancelBulkPriceEditing=function(){a.bulkPriceEditing(void 0)},a.applyBulkPriceEditing=function(){if(a.bulkPriceEdit.type==i.ticketClass)_.each(a.ticketClassData,function(b){b.TicketClass[a.bulkPriceEdit.id]=g(b.TicketClass[a.bulkPriceEdit.id],a.bulkPriceEdit.amount,a.bulkPriceEdit.modifier)});else{var b=_.find(a.ticketClassData,function(b){return b.dayPart.id==a.bulkPriceEdit.id});for(var c in b.TicketClass)b.TicketClass[c]=g(b.TicketClass[c],a.bulkPriceEdit.amount,a.bulkPriceEdit.modifier)}a.bulkPriceEditing(void 0)},a.focusedElement={type:"",id:-1},a.setFocusOn=function(b,c){a.focusedElement={type:b,id:c}},a.addTicketClass=function(){var b=0!=a.ticketClasses.length?_.max(_.pluck(a.ticketClasses,"id")):0,c={id:b+1,name:"New"+(b+1).toString()};a.ticketClasses.push(c),a.startTicketClassEditing(c),a.setFocusOn(i.ticketClass,c.id),a.visibleticketClasses.length!=a.columnsPerPage||a.isLastPage()||(a.currentPage=a.ticketClasses.length-a.visibleticketClasses.length)},a.removeTicketClass=function(b){function d(){a.visibleticketClasses.length<=a.columnsPerPage&&a.isLastPage()&&a.currentPage>0&&a.currentPage--;for(var c=0;c<a.ticketClasses.length;c++)if(a.ticketClasses[c].id===b){a.ticketClasses.splice(c,1);break}}var e=c.showModal("Delete confirmation","Are you sure you want to delete entire column?","Yes","Cancel");e.result.then(d)},a.addDayPart=function(){var b=a.orderedTicketClassData[a.orderedTicketClassData.length-1],c=b.dayPart.startTime==a.openingHours?new Date:b.dayPart.startTime,d=0!=a.ticketClassData.length?_.max(_.pluck(_.pluck(a.ticketClassData,i.dayPart),"id")):0,e={};_.each(a.ticketClasses,function(a){e[a.id]=null});var f={dayPart:{id:d+1,name:"New"+(d+1).toString(),startTime:new Date(c.getTime()+3e5)},TicketClass:e};a.ticketClassData.push(f),a.startDayPartEditing(f.dayPart),a.setFocusOn(i.dayPart,f.dayPart.id)},a.removeDayPart=function(b){function d(){for(var c=0;c<a.orderedTicketClassData.length;c++)if(a.orderedTicketClassData[c].dayPart.id===b.id){b.endTime&&(c==a.orderedTicketClassData.length-1?a.orderedTicketClassData[c-1].dayPart.endTime=a.orderedTicketClassData[c].dayPart.endTime:a.orderedTicketClassData[c+1].dayPart.startTime=a.orderedTicketClassData[c].dayPart.startTime);for(var d=0;d<a.ticketClassData.length;d++)if(a.ticketClassData[d].dayPart.id===b.id){a.ticketClassData.splice(d,1);break}break}}var e=c.showModal("Delete confirmation","Are you sure you want to delete entire row?","Yes","Cancel");e.result.then(d)},a.closeAllHeaderEditing=function(){l.length=0,n.length=0},a.currentPage=0,a.columnsPerPage=12,a.totalPages=function(){return Math.ceil(a.ticketClasses.length/a.columnsPerPage)},a.previousPage=function(){a.currentPage-=1},a.nextPage=function(){a.currentPage+=1},a.isLastPage=function(){return a.currentPage+a.columnsPerPage>=a.ticketClasses.length},a.orderByStartTime=function(b){return b.dayPart.startTime==a.openingHours||b.dayPart.startTime},a.showHistoryModal=function(a){b.open({templateUrl:"../views/partials/historyModal.html",controller:"historyModalCtrl",backdrop:"static",resolve:{ticketType:function(){return a}}})}}])}(angular.module("myApp")),function(a){"use strict";a.controller("ticketPricingModifiersCtrl",["$scope","$modal","ticketPricingService",function(a,b,c){a.modifiers=c.getModifiers(),a.showEditModifierModal=function(c,d){var e=b.open({templateUrl:"../views/partials/editModifierModal.html",controller:"editModifierCtrl",backdrop:"static",size:"lg",resolve:{modifier:function(){return c},ticketClasses:function(){return a.ticketClasses}}});e.result.then(function(b){if(d){for(var e=0;e<a.modifiers.length;e++)if(a.modifiers[e].$$hashKey===c.$$hashKey){a.modifiers[e]=angular.copy(b);break}}else a.modifiers.push(b)})},a.addNewModifier=function(){var b={prices:c.createEmptyPriceObject(a.ticketClasses)};a.showEditModifierModal(b)},a.deleteModifier=function(b){var c=a.modifiers.indexOf(b);a.modifiers.splice(c,1)},a.getModifierForTicketClass=function(a,b){var c=_.find(b.prices.ticketClasses,function(b){return b.id==a.id});return c}}])}(angular.module("myApp"));