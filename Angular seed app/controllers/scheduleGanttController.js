(function (app) {
    'use strict';

    app.controller("scheduleGanttCtrl", ['$scope', '$timeout', '$modal', '$templateCache', '$locale', 'ganttService', 'scheduleService', 'notificationService', 'commonService', '$window',
        function ($scope, $timeout, $modal, $templateCache, $locale, ganttService, scheduleService, notificationService, commonService, $window) {
            $scope.ganttHighlightTask = $scope.ganttHighlightTask || {};

            commonService.getOverrideTemplates().then(function (datepickerOverridenTemplates) {
                prepareTemplates(datepickerOverridenTemplates);
            });

            $scope.focusOn = {
                dateField: true
            };

            function prepareTemplates(datepickerOverridenTemplates) {
                $templateCache.remove("template/datepicker/day.html");
                $templateCache.put("template/datepicker/day.html", datepickerOverridenTemplates.dayTemplate.override);
                $templateCache.remove("template/datepicker/month.html");
                $templateCache.put("template/datepicker/month.html", datepickerOverridenTemplates.monthTemplate.override);
                $templateCache.remove("template/datepicker/year.html");
                $templateCache.put("template/datepicker/year.html", datepickerOverridenTemplates.yearTemplate.override);
            }

            function replaceDatepickerTemplates() {
                commonService.revertTemplates();
            }

            $scope.showCalender = function () {
                $scope.datepickers.calender = !$scope.datepickers.calender;
            };

            var movingTask;
            var preCopyState;

            $scope.getLoadedRange = function () {
                var min = _.min($scope.loadedDays);
                var max = _.max($scope.loadedDays);
                return [min, max];
            };

            $scope.ganttConfig = {
                scale: 'hour',
                mode: 'custom'
            };
            $scope.editForm = {
                visibility: false
            };
            $scope.newSchedule = {
                auditoriums: [],
                feature: []
            };
            $scope.newFeature = {
                modifiers: []
            };
            $scope.experiences = {
                isExperiencesVisible: false,
                isShownAllModifiers: false,
                remainingInvisibleModifiers: 0,
                underLimitOfDisplayingModifiers: 5
            };
            $scope.mode = {
                isAddingNewFeatureMode: false
            };

            $scope.currentDate = new Date(2013, 9, 22);
            $scope.copyTo = {
                date: new Date(2013, 9, 25)
            };
            $scope.zoom = {
                isZoomInMode: false,
                zoomInTitle: 'Zoom in',
                zoomOutTitle: 'Zoom out',
                zoomInSizeType: '%',
                zoomOutSizeType: 'em',
                zoomInColumnWidth: 4.166667,
                zoomOutColumnWidth: 8
            };
            $scope.timePickerOptions = {
                ismeridian: false,
                hstep: 1,
                mstep: 5
            };
            $scope.timepicker = {};

            $scope.zoomTitle = $scope.zoom.zoomOutTitle;
            $scope.setColumnWidth = $scope.zoom.zoomOutColumnWidth;
            $scope.selectedFeature = {};

            ganttService.getExistingFeatures().then(function (data) {
                $scope.allExistingFeatures = data;
            });

            $scope.loadedDays = [];

            function initGrid() {
                addingDaysInProgress = true;
                var nextDay = new Date($scope.currentDate);
                nextDay.setDate(nextDay.getDate() + 1);
                ganttService.getGanttContent($scope.currentDate).then(function (data) {
                    $scope.loadedDays = [$scope.currentDate, nextDay];
                    $scope.calender.focusedDate = _.min($scope.loadedDays);
                    $scope.data = data;

                    if (!$scope.zoom.isZoomInMode) {

                        addAnotherDay(nextDay, function () {
                            jumpToCenter($scope.currentDate);
                        });

                        $timeout(function () {
                            addingDaysInProgress = false;
                        }, 1000);
                    } else {
                        $scope.calender.focusedDate = _.min($scope.loadedDays);
                        setDataChangingZoomMode(true);
                    }
                });
            };

            function setDataChangingZoomMode(zoomModeType) {
                var setScroller = $scope.setScrollerPosition();
                if (zoomModeType) {
                    removeActiveClassOnSelecetedFeature(true);
                    $scope.editForm.visibility = false;
                    setScroller.scrollLeft = 1;
                    $scope.originData = angular.copy($scope.data);
                    for (var i = 0; i < $scope.data.length; i++) {
                        $scope.data[i].tasks.length = 0;
                    }
                    for (var j = 0; j < $scope.originData.length;) {
                        var taskFromFocusedDate = _.filter($scope.originData[j].tasks, function (item) {
                            return $scope.calender.focusedDate.getDate() == item.from.getDate() && $scope.calender.focusedDate.getMonth() == item.from.getMonth() && $scope.calender.focusedDate.getYear() == item.from.getYear();
                        });
                        $scope.data[j].tasks = taskFromFocusedDate;
                        j++;
                    }
                    $scope.loadedDays = [$scope.calender.focusedDate];

                } else {
                    setScroller.scrollLeft = setScroller.scrollLeft / 2;
                    jumpToCenter($scope.calender.focusedDate);
                    $scope.performancesFromOneDay = $scope.data;
                    $scope.data = angular.copy($scope.originData);

                    for (var k = 0; k < $scope.data.length; k++) {
                        for (var m = $scope.data[k].tasks.length; m--;) {
                            if ($scope.data[k].tasks[m].from.getDate() == $scope.calender.focusedDate.getDate() && $scope.calender.focusedDate.getMonth() == $scope.data[k].tasks[m].from.getMonth() && $scope.calender.focusedDate.getYear() == $scope.data[k].tasks[m].from.getYear()) {
                                var ind = $scope.data[k].tasks.indexOf($scope.data[k].tasks[m]);
                                $scope.data[k].tasks.splice(ind, 1);
                            }
                        }
                    }
                    _.each($scope.performancesFromOneDay, function (row, rowInd) {
                        _.each(row.tasks, function (task) {
                            $scope.data[rowInd].tasks.push(task);
                        });
                    });
                    $scope.currentDate = $scope.calender.focusedDate;
                    $scope.loadedDays = [$scope.currentDate];
                    var nextLoadedDay = new Date($scope.currentDate);
                    nextLoadedDay.setDate(nextLoadedDay.getDate() + 1);

                    addAnotherDay(nextLoadedDay, function () {
                        $timeout(function () {
                            jumpToCenter($scope.currentDate);
                        }, 500);
                    });
                    $scope.loadedDays.push(nextLoadedDay);
                }
                refreshGrid();
            }

            function handleTaskEventForCopyMode(event) {
                if (!$scope.isPreviewingCopiedData) {
                    event.task.data.copying = !event.task.data.copying;
                    $scope.copyTo.backToDate = event.task.from;
                }

                var index = selectedRowsForCopy.indexOf(event.task.row.id);
                if (index !== -1) {
                    selectedRowsForCopy.splice(index, 1);
                }
            }

            function handleTaskEventForNormalMode(event) {
                if (event.evt.target.dataset.revertSingle) {
                    revertChanges(event.task.id);
                } else {
                    showEditPanel(event);
                    event.task.data.isActive = true;
                    prepareDataforEditPanel(event);
                }
            }

            function prepareDataforEditPanel(event) {
                replaceDatepickerTemplates();
                $scope.selectedTask = event;
                $scope.mode.isAddingNewFeatureMode = false;
                $scope.experiences.isShownAllModifiers = false;
                $scope.editForm.visibility = true;
                $scope.experiences.isExperiencesVisible = true;

                var featureAuditorium = _.find($scope.data, function (r) {
                    return r.id == event.task.row.id;
                });

                var featureName = _.find($scope.allExistingFeatures, function (r) {
                    return r.id == event.task.data.movieId;
                });

                _.each($scope.data, function (aud) {
                    if (aud.id == event.task.row.id) {
                        var task = _.find(aud.tasks, function (t) {
                            return t.id == event.task.id;
                        });
                        $scope.selectedFeature = angular.copy(task);
                        $scope.$broadcast('selectedFrom', $scope.selectedFeature.from);
                    }
                });
                $timeout(function () {
                    $scope.newSchedule.feature = [featureName];
                    $scope.newSchedule.auditoriums = [featureAuditorium];
                }, 0);
            }

            function refreshGrid(callback) {
                var minLoadedDay = _.min($scope.loadedDays);
                var maxLoadedDay = _.max($scope.loadedDays);
                $scope.ganttFromDate = new Date(minLoadedDay.getFullYear(), minLoadedDay.getMonth(), minLoadedDay.getDate());
                $scope.ganttToDate = new Date(maxLoadedDay.getFullYear(), maxLoadedDay.getMonth(), maxLoadedDay.getDate() + 1);

                _.each($scope.data, function (row) {
                    _.each(row.tasks, function (task) {
                        task.data.overlapping = false;
                        ganttService.setOverlappingFlags(task, $scope.data, row);
                    });
                });

                $timeout(function () {
                    $scope.clearData();
                    $scope.loadData($scope.data);

                    if (callback) callback();
                }, 0);
            }

            function removeActiveClassOnSelecetedFeature(zoomMode) {
                if (zoomMode && $scope.selectedTask) {
                    _.each($scope.data, function (r) {
                        if (r.id == $scope.selectedTask.task.row.id) {
                            delete $scope.selectedTask.task.data.isActive;
                        }
                    });
                }
                $scope.refreshGrid();
            }

            $scope.zoomConfiguration = function () {
                $scope.zoom.isZoomInMode = !$scope.zoom.isZoomInMode;
                $scope.zoomTitle = $scope.zoom.isZoomInMode ? $scope.zoom.zoomInTitle : $scope.zoom.zoomOutTitle;
                $scope.setColumnWidth = $scope.zoom.isZoomInMode ? $scope.zoom.zoomInColumnWidth : $scope.zoom.zoomOutColumnWidth;

                setDataChangingZoomMode($scope.zoom.isZoomInMode);
                refreshGrid();
                removeActiveClassOnSelecetedFeature($scope.zoom.isZoomInMode);
            };

            $scope.addNewFeature = function () {
                replaceDatepickerTemplates();
                $timeout(function () {
                    $scope.selectedFeature = {};
                    $scope.selectedFeature.from = $scope.currentDate;
                    $scope.selectedFeature.to = new Date();
                    $scope.selectedFeature.data = {};
                }, 100);
                $scope.experiences.isExperiencesVisible = false;
                $scope.editForm.visibility = true;
                $scope.mode.isAddingNewFeatureMode = true;
                $scope.newSchedule.feature.length = 0;
                $scope.newSchedule.auditoriums = 0;
                $scope.$broadcast('resetTime');
            };

            $scope.showMoreExp = function () {
                if (!$scope.selectedFeature.data || !$scope.selectedFeature.data.modifiers) {
                    return 0;
                }
                return $scope.experiences.remainingInvisibleModifiers = $scope.selectedFeature.data.modifiers.length > $scope.experiences.underLimitOfDisplayingModifiers ?
                    $scope.selectedFeature.data.modifiers.length - $scope.experiences.underLimitOfDisplayingModifiers :
                        0;
            };

            $scope.taskEvent = function (event) {
                if (!event || !event.evt || !event.evt.target) {
                    return;
                }

                if (event.evt.target.dataset.info || event.task.data.isMoved) return;

                if ($scope.isInCopyMode) {
                    handleTaskEventForCopyMode(event);
                } else {
                    handleTaskEventForNormalMode(event);
                }

            };

            $scope.taskMoveBegin = function (event) {
                movingTask = createNewTask(event.task);
                event.task.data.isMoved = false;
            };

            $scope.taskMoveEnd = function (event) {
                var currentTask = event.task;

                var hasTaskMoved = false;
                if (movingTask.id != currentTask.row.id ||
                        movingTask.tasks[0].from.getTime() != currentTask.from.getTime() ||
                            movingTask.tasks[0].to.getTime() != currentTask.to.getTime()) {
                    hasTaskMoved = true;
                }

                if (hasTaskMoved && !$scope.isInCopyMode && !currentTask.data.preview) {
                    currentTask.data.preview = true;
                }

                updateInitalCollection(event.task);

                if (hasTaskMoved) {
                    event.task.data.isMoved = true;
                }
                refreshGrid();
            };

            $scope.refreshGrid = function () {
                refreshGrid();
            };

            window.onresize = function () {
                var setScroller = $scope.setScrollerPosition();
                setScroller.scrollLeft++;
                setScroller.scrollLeft--;
            };

            $scope.saveGridChanges = function () {
                var shouldRefresh;
                _.each($scope.data, function (row) {
                    _.each(row.tasks, function (task) {
                        if (task.data.preview) {
                            shouldRefresh = true;

                            delete task.data.isMoved;
                            delete task.data.preview;
                            delete task.data.unmodifiedValues;
                        }
                    });
                });
                if (shouldRefresh) refreshGrid();
                setWorkingHours();
            };

            $scope.prepareTaskForGrid = function (row, task) {
                return {
                    id: row.id,
                    description: row.description,
                    order: row.order,
                    tasks: [task]
                };
            };

            $scope.resetGridChanges = function () {
                revertChanges();
            };

            $scope.showPreviewPricingModal = function () {
                $modal.open({
                    templateUrl: '../views/partials/schedulePreviewPricingModal.html',
                    controller: 'schedulePreviewPricingModalCtrl',
                    backdrop: 'static',
                    size: 'lg'
                });
            };

            $scope.showSwapPerfomancesModal = function () {
                $scope.editForm.visibility = false;
                if (ganttService.checkForUnsavedChanges($scope.data)) {
                    notificationService.showModal('Warning', 'You have unsaved changes', 'OK');
                    return;
                } else {
                    $modal.open({
                        templateUrl: '../views/partials/scheduleSwapPerformancesModal.html',
                        controller: 'schedulePreviewPricingModalCtrl',
                        backdrop: 'static',
                        size: 'lg'
                    });
                }
            };

            $scope.setScrollerPosition = function () { // var grid serves for access to scroller and manually handling of its position when form is being closed
                var grid = angular.element(document.querySelector('.gantt-scrollable'))[0];
                return grid;
            };

            $scope.removeTaskFromGrid = function (event) {
                for (var i = 0; i < $scope.data.length; i++) {
                    var row = $scope.data[i];
                    for (var j = 0; j < row.tasks.length; j++) {
                        if (row.tasks[j].id === event.task.id) {
                            row.tasks.splice(j, 1);
                            break;
                        }
                    }
                }
                var objToDelete = [
                    {
                        "id": event.task.row.id,
                        "tasks": [{ "id": event.task.id }]
                    }
                ];
                $scope.removeData(objToDelete);
            };

            function clearTaskCustomAttributes(task) {
                delete task.data.preview;
                delete task.data.overlapping;
            }

            function revertTask(task, row) {
                task.from = task.data.unmodifiedValues.from;
                task.to = task.data.unmodifiedValues.to;
                if (row.id != task.data.unmodifiedValues.rowId) {
                    var index = row.tasks.indexOf(task);
                    row.tasks.splice(index, 1);
                    var rowToAdd = _.find($scope.data, function (r) {
                        return r.id == task.data.unmodifiedValues.rowId;
                    });
                    rowToAdd.tasks.push(task);
                }
                clearTaskCustomAttributes(task);
                delete task.data.unmodifiedValues;
            }

            function revertChanges(id) {
                var shouldRefresh;

                _.each($scope.data, function (row) {
                    _.each(row.tasks, function (task) {
                        if (task.data.preview && (id ? id == task.id : true)) {
                            shouldRefresh = true;
                            revertTask(task, row);
                        }
                    });
                });

                if (shouldRefresh) refreshGrid();
            }

            function updateInitalCollection(task) {
                for (var i = 0; i < $scope.data.length; i++) {
                    var row = $scope.data[i];
                    for (var j = 0; j < row.tasks.length; j++) {
                        if (row.tasks[j].id === task.id) {
                            var createdTask = createNewTask(task).tasks[0];

                            if (!createdTask.data.unmodifiedValues) {
                                createdTask.data.unmodifiedValues = {
                                    from: row.tasks[j].from,
                                    to: row.tasks[j].to,
                                    rowId: row.id,
                                    rowOrder: row.order,
                                    rowDesc: row.description
                                };
                            }

                            row.tasks.splice(j, 1);
                            if (row.id === task.row.id) {
                                row.tasks.push(createdTask);
                            } else {
                                var newRow = _.find($scope.data, function (runningRow) {
                                    return runningRow.id === task.row.id;
                                });
                                newRow.tasks.push(createdTask);
                            }
                            return;
                        }
                    }
                }
            }

            function createNewTask(task) {
                return {
                    "id": task.row.id,
                    "description": task.row.description,
                    "order": task.row.order,
                    "tasks": [
                        {
                            "id": task.id,
                            "subject": task.subject,
                            "from": task.from,
                            "to": task.to,
                            data: task.data
                        }
                    ]
                };
            }

            function jumpToCenter(date) {
                var centeredHours = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 18, 0);
                $timeout(function () {
                    $scope.scrollToToday(centeredHours);
                }, 0);
            }

            function setWorkingHours() {
                //var minHour;
                //var maxHour;

                //_.each($scope.data, function (row) {
                //    var minHourLooped = _.min(_.pluck(row.tasks, 'from'));
                //    var maxHourLooped = _.max(_.pluck(row.tasks, 'to'));

                //    minHour = !minHour || minHourLooped < minHour ? minHourLooped : minHour;
                //    maxHour = !maxHour || maxHourLooped > maxHour ? maxHourLooped : maxHour;
                //});
                //minHour = minHour && angular.isDate(minHour) ? minHour.getHours() : 0;
                //maxHour = maxHour && angular.isDate(maxHour) ? maxHour.getHours() : 0;
                //$scope.workHours = _.range(minHour, maxHour);
                $scope.workHours = _.range(0, 24);
            }

            function showEditPanel(event) {
                $scope.editForm.visibility = true;
                $scope.focusOn.dateField = true;

                if (!$scope.zoom.isZoomInMode) {
                    $timeout(function () {
                        $scope.scrollToToday(event.task.from);
                    }, 0);
                };

                for (var i = 0; i < $scope.data.length; i++) {
                    var row = $scope.data[i];
                    for (var j = 0; j < row.tasks.length; j++) {
                        if (row.tasks[j].id === event.task.id) {
                            row.tasks[j].data.isActive = true;
                        } else {
                            row.tasks[j].data.isActive = false;
                        }
                    }
                }
            }

            //#region Copy
            var selectedRowsForCopy = [];
            var selectedColumnsForCopy = [];

            $scope.datepickers = {
                openedReleaseDate: false,
                openedStartDate: false,
                openedEndDate: false
            };

            $scope.datePickerOptions = {
                "show-weeks": "'false'",
                format: 'dd-MMMM-yyyy'
            };

            $scope.showDatepicker = function ($event, datePickerInstance) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.datepickers[datePickerInstance] = true;
            };

            function createStringRepresentationFromDate(date) {
                return '' + date.getFullYear() + date.getMonth() + date.getDate() + date.getHours();
            }

            $scope.isRowSelectedForCopy = function (rowId, reverse) {
                if (!$scope.isInCopyMode || $scope.isPreviewingCopiedData) {
                    return false;
                }
                var showCheckMark = _.contains(selectedRowsForCopy, rowId);
                if (reverse) {
                    showCheckMark = !showCheckMark;
                }

                return showCheckMark;
            };

            $scope.isColumnSelectedForCopy = function (date, reverse) {
                if (!$scope.isInCopyMode || $scope.isPreviewingCopiedData) {
                    return false;
                }

                var showCheckMark = _.contains(selectedColumnsForCopy, createStringRepresentationFromDate(date));
                if (reverse) {
                    showCheckMark = !showCheckMark;
                }
                return showCheckMark;
            };

            $scope.setCopyMode = function () {
                $scope.calender.date = $scope.calender.focusedDate;
                replaceDatepickerTemplates();
                removeActiveClassOnSelecetedFeature(true);
                $scope.editForm.visibility = false;

                if (ganttService.checkForUnsavedChanges($scope.data)) {
                    var modalInstance = notificationService.showModal('Warning', 'You have unsaved changes', 'Save changes and proceed', 'Go back');
                    modalInstance.result.then(function () {
                        $scope.saveGridChanges();
                        $scope.isInCopyMode = true;
                    });

                } else {
                    $scope.isInCopyMode = true;
                }
            };

            $scope.labelEvent = function (event) {
                if (!$scope.isInCopyMode || $scope.isPreviewingCopiedData) {
                    return;
                }

                if (event.row.hasOwnProperty('date')) {
                    event.column = event.row;
                    delete event.row;
                    handleColumnEvent(event);
                } else {
                    handleRowEvent(event);
                }
            };

            function handleRowEvent(event) {
                var flagToSet;
                if (_.contains(selectedRowsForCopy, event.row.id)) {
                    var index = selectedRowsForCopy.indexOf(event.row.id);
                    if (index !== -1) {
                        selectedRowsForCopy.splice(index, 1);
                    }
                    flagToSet = false;
                } else {
                    selectedRowsForCopy.push(event.row.id);
                    flagToSet = true;
                }

                _.each(event.row.tasks, function (task) {
                    task.data.copying = flagToSet;
                });
            }

            function handleColumnEvent(event) {
                var flagToSet;
                var stringMark = createStringRepresentationFromDate(event.column.date);
                if (_.contains(selectedColumnsForCopy, stringMark)) {
                    var index = selectedColumnsForCopy.indexOf(stringMark);
                    if (index !== -1) {
                        selectedColumnsForCopy.splice(index, 1);
                    }
                    flagToSet = false;
                } else {
                    selectedColumnsForCopy.push(stringMark);
                    flagToSet = true;
                }

                _.each($scope.data, function (row) {
                    _.each(row.tasks, function (task) {
                        var hourAfter = new Date(event.column.date);
                        hourAfter.setHours(event.column.date.getHours() + 1);

                        if ((task.from < event.column.date && event.column.date <= task.to) || (task.from <= hourAfter && hourAfter < task.to)) {
                            $timeout(function () {
                                task.data.copying = flagToSet;
                            }, 0);
                        }
                    });
                });
            }

            $scope.cancelCopy = function () {
                $scope.isInCopyMode = false;
                $scope.isPreviewingCopiedData = false;

                if (preCopyState && preCopyState.data) {
                    $scope.data = angular.copy(preCopyState.data);
                }

                _.each($scope.data, function (row) {
                    _.each(row.tasks, function (task) {
                        if (task.data.copying) {
                            delete task.data.copying;
                            delete task.data.isActive;
                        }
                    });
                });
            };

            $scope.copyPerformances = function (preview) {
                $scope.isCopiedSomePerformance = true;
                var copyDate = $scope.copyTo.date;
                $scope.calender.focusedDate = copyDate;
                var dates = [];

                _.each($scope.data, function (row) {
                    var formattedDates = _.map(row.tasks, function (t) {
                        if (!t.data.copying) return null;
                        return t.from.getFullYear().toString() + t.from.getMonth().toString() + t.from.getDate().toString();
                    });
                    dates.push.apply(dates, formattedDates);
                });
                var uniqueDates = _.size(_.uniq(_.reject(dates, function (d) { return !d; })));

                if (uniqueDates > 1) {
                    notificationService.showModal('Information', 'You need to select performances you want to copy from single day', 'OK');
                    return;
                }

                var copySet = ganttService.prepareCopyData($scope.data, copyDate, preview);
                if (!copySet.anythingToCopy) {
                    notificationService.showModal('Information', 'You must select performances you want to copy', 'OK');
                    return;
                }

                if (preview) {
                    $scope.isPreviewingCopiedData = true;
                    preCopyState = {
                        data: angular.copy($scope.data),
                        loadedDays: $scope.loadedDays
                    };
                } else {
                    $scope.isInCopyMode = false;
                    setWorkingHours();
                }

                ganttService.getGanttContent(copyDate).then(function (data) {
                    // var onlyCopiedPerformances = angular.copy(copySet.data);
                    _.each(data, function (r) {
                        if (r.tasks.length > 0) {
                            var copiedRow = _.find(copySet.data, function (copyRow) {
                                return copyRow.id === r.id;
                            });
                            copiedRow.tasks.unshift.apply(copiedRow.tasks, r.tasks);
                        }
                    });

                    $scope.data = copySet.data;
                    $scope.loadedDays = [copyDate];
                    refreshGrid();
                    //_.each(onlyCopiedPerformances, function (row) {
                    //    _.each(row.tasks, function (task) {
                    //        var pickTask = pickPerformance(task.id);
                    //        var t = pickTask.task;
                    //        t.row = pickTask.row;

                    //        ganttService.setOverlappingFlags(t, $scope.data);
                    //    });
                    //});
                });
                if (!$scope.zoom.isZoomInMode) {
                    $scope.currentDate = $scope.calender.focusedDate;
                    var nextLoadedDay = new Date($scope.currentDate);
                    nextLoadedDay.setDate(nextLoadedDay.getDate() + 1);

                    addAnotherDay(nextLoadedDay, function () {
                        $timeout(function () {
                            jumpToCenter($scope.currentDate);
                        }, 500);
                    });
                    $scope.loadedDays.push(nextLoadedDay);
                }
            };

            $scope.previewCopy = function () {
                $scope.copyPerformances(true);
            };

            $scope.backToCopy = function () {
                $scope.isPreviewingCopiedData = false;
                $scope.data = angular.copy(preCopyState.data);
                $scope.loadedDays = preCopyState.loadedDays;

                refreshGrid(function () {
                    $scope.scrollToToday($scope.copyTo.backToDate);
                });
            };

            $scope.applyPreviewedCopy = function () {
                _.each($scope.data, function (row) {
                    _.each(row.tasks, function (task) {
                        delete task.data.preview;
                        delete task.data.copying;
                        delete task.data.unmodifiedValues;
                    });
                });
                $scope.isPreviewingCopiedData = false;
                $scope.isInCopyMode = false;
                setWorkingHours();
            };
            //#endregion

            var debounced = _.debounce(scrollEvent, 300);
            var addingDaysInProgress = false;
            $scope.scrollEvent = function (event) {
                if (!addingDaysInProgress && !$scope.isCopiedSomePerformance && !$scope.zoom.isZoomInMode) {
                    debounced(event);
                } else {
                    $scope.isCopiedSomePerformance = false;
                    return;
                }
            };

            function scrollEvent(event) {
                if (angular.equals(event.direction, "left")) {
                    var minDate = new Date(_.min($scope.loadedDays));
                    minDate.setDate(minDate.getDate() - 1);
                    addAnotherDay(minDate, function () {
                        jumpToCenter(minDate);
                    });
                } else if (angular.equals(event.direction, "right")) {
                    var maxDate = new Date(_.max($scope.loadedDays));
                    maxDate.setDate(maxDate.getDate() + 1);
                    addAnotherDay(maxDate, function () {
                        addingDaysInProgress = true;
                        jumpToCenter(maxDate);
                        $timeout(function () {
                            addingDaysInProgress = false;
                        }, 500);
                    });
                }
            }

            function addAnotherDay(date, callback) {
                ganttService.getGanttContent(date).then(function (data) {
                    var hasData = false;
                    if (data && data.length > 0) {
                        hasData = _.some(data, function (row) {
                            return row.tasks.length > 0;
                        });
                    }

                    if (hasData) {
                        addMoreData(data);
                        $scope.loadedDays.push(date);
                        refreshGrid(callback);
                    } else {
                        $scope.loadedDays.push(date);
                        refreshGrid(callback);
                    }
                });
            }

            function addMoreData(data) {
                _.each(data, function (row) {
                    var rowToAdd = _.find($scope.data, function (sourceRow) {
                        return sourceRow.id === row.id;
                    });

                    if (rowToAdd) {
                        _.each(row.tasks, function (task) {
                            var exist = _.find(rowToAdd.tasks, function (t) {
                                return t.id == task.id;
                            });
                            if (!exist) {
                                rowToAdd.tasks.push(task);
                            } else {
                                console.warn("Skiped adding performance - there is already added one with same id", task);
                            }
                        });
                    } else {
                        $scope.data.push(row);
                    }
                });
            }

            $scope.scheduledDays = function () {
                var scheduledDays = [];

                var schedules = ganttService.getAllSchedules();
                _.each(schedules, function (schedule) {
                    if (schedule.performances && schedule.performances.length > 0) {
                        scheduledDays.push(schedule.date.replace(/-/g, ''));
                    }
                });
                scheduledDays.sort();
                return scheduledDays;
            };

            $scope.calender = {
                date: $scope.currentDate,
                focusedDate: null
            };

            $scope.multiSelecting = function () {
                var isThereSelectedFeatures = false;
                $scope.multiSelectedFeatures = [];
                _.each($scope.data, function (auditorium) {
                    _.each(auditorium.tasks, function (task) {
                        if (task.data.copying) {
                            $scope.multiSelectedFeatures.push(task);
                            if ($scope.multiSelectedFeatures.length > 1) {
                                isThereSelectedFeatures = true;
                            }
                        }
                    });
                });
                return isThereSelectedFeatures;
            }

            $scope.$watchCollection('multiSelecting()', function (newVal) {
                debugger;
                var emptyObject = {};
                var areFeaturesDifferent = false;
                var areDatesDifferent = false;
                var areAuditoriumsDifferent = false;

                if (newVal) {
                    $scope.editForm.visibility = true;
                    if ($scope.multiSelectedFeatures) {
                        var allAuditoriums = [];
                        for (var m = 0; m < $scope.multiSelectedFeatures.length;) {

                            _.each($scope.data, function (aud) {
                                _.each(aud.tasks, function (task) {
                                    if (task.id == $scope.multiSelectedFeatures[m].id) {
                                        allAuditoriums.push(aud);
                                    }
                                });
                            });
                            m++;
                        }
                        for (var n = 1; n < allAuditoriums.length; n++) {
                            if (allAuditoriums[0].id != allAuditoriums[n].id) {
                                $scope.newSchedule.auditoriums = scheduleService.setAuditorium(emptyObject);
                                areAuditoriumsDifferent = true;
                            }
                        }
                        for (var i = 1; i < $scope.multiSelectedFeatures.length; i++) {
                            if ($scope.multiSelectedFeatures[0].subject != $scope.multiSelectedFeatures[i].subject) {
                                $scope.newSchedule.feature = scheduleService.setFeature(emptyObject);
                                areFeaturesDifferent = true;
                            }
                            else if ($scope.multiSelectedFeatures[0].from != $scope.multiSelectedFeatures[i].from) {
                                $scope.selectedFeature.from = scheduleService.setPerformanceDate('');
                                areDatesDifferent = true;
                            }
                        }

                        if (!areAuditoriumsDifferent) {
                            $timeout(function () {
                                $scope.newSchedule.auditoriums = scheduleService.setAuditorium(allAuditoriums[0]);
                            }, 0);
                        }

                        if (!areFeaturesDifferent) {
                            $timeout(function () {
                                var performanceName = _.find($scope.allExistingFeatures, function (r) {
                                    return r.id == $scope.multiSelectedFeatures[0].data.movieId;
                                });
                                $scope.newSchedule.feature = scheduleService.setFeature(performanceName);

                            }, 0);
                        } else if (!areDatesDifferent) {
                            $scope.selectedFeature.from = $scope.multiSelectedFeatures[0].from;
                        }
                        $scope.allMultiSelectedFeatures = scheduleService.setMultiSelectedFeatures($scope.multiSelectedFeatures);
                    }
                }
            });


            $scope.$watch('calender.date', function (date) {
                $scope.currentDate = date;
                initGrid();
                $scope.datepickers.calender = false;

            });

            $scope.loadPreviousAvailableDay = function () {
                if ($scope.zoom.isZoomInMode) {
                    $scope.calender.focusedDate.setDate($scope.calender.focusedDate.getDate() - 1);
                    $scope.calender.date = $scope.calender.focusedDate;

                    addAnotherDay($scope.calender.focusedDate, function () {
                        jumpToCenter($scope.currentDate);
                    });
                    setDataChangingZoomMode(true);
                }
                else {
                    var minDate = new Date(_.min($scope.loadedDays).getTime());
                    $scope.calender.date = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate() - 1);
                }
            };

            $scope.loadNextAvailableDay = function () {

                if ($scope.zoom.isZoomInMode) {
                    $scope.calender.focusedDate.setDate($scope.calender.focusedDate.getDate() + 1);
                    $scope.calender.date = $scope.calender.focusedDate;
                    addAnotherDay($scope.calender.focusedDate, function () {
                        jumpToCenter($scope.currentDate);
                    });
                    setDataChangingZoomMode(true);
                }
                else {
                    $scope.calender.date = _.max($scope.loadedDays);
                }
            };

            //#region Calender i18n
            var locales = {
                fr: {
                    "DATETIME_FORMATS": {
                        "AMPMS": [
                          "AM",
                          "PM"
                        ],
                        "DAY": [
                          "dimanche",
                          "lundi",
                          "mardi",
                          "mercredi",
                          "jeudi",
                          "vendredi",
                          "samedi"
                        ],
                        "MONTH": [
                          "janvier",
                          "f\u00e9vrier",
                          "mars",
                          "avril",
                          "mai",
                          "juin",
                          "juillet",
                          "ao\u00fbt",
                          "septembre",
                          "octobre",
                          "novembre",
                          "d\u00e9cembre"
                        ],
                        "SHORTDAY": [
                          "dim.",
                          "lun.",
                          "mar.",
                          "mer.",
                          "jeu.",
                          "ven.",
                          "sam."
                        ],
                        "SHORTMONTH": [
                          "janv.",
                          "f\u00e9vr.",
                          "mars",
                          "avr.",
                          "mai",
                          "juin",
                          "juil.",
                          "ao\u00fbt",
                          "sept.",
                          "oct.",
                          "nov.",
                          "d\u00e9c."
                        ],
                        "fullDate": "EEEE d MMMM y",
                        "longDate": "d MMMM y",
                        "medium": "d MMM y HH:mm:ss",
                        "mediumDate": "d MMM y",
                        "mediumTime": "HH:mm:ss",
                        "short": "dd/MM/yy HH:mm",
                        "shortDate": "dd/MM/yy",
                        "shortTime": "HH:mm"
                    },
                    "NUMBER_FORMATS": {
                        "CURRENCY_SYM": "\u20ac",
                        "DECIMAL_SEP": ",",
                        "GROUP_SEP": "\u00a0",
                        "PATTERNS": [
                          {
                              "gSize": 3,
                              "lgSize": 3,
                              "macFrac": 0,
                              "maxFrac": 3,
                              "minFrac": 0,
                              "minInt": 1,
                              "negPre": "-",
                              "negSuf": "",
                              "posPre": "",
                              "posSuf": ""
                          },
                          {
                              "gSize": 3,
                              "lgSize": 3,
                              "macFrac": 0,
                              "maxFrac": 2,
                              "minFrac": 2,
                              "minInt": 1,
                              "negPre": "(",
                              "negSuf": "\u00a0\u00a4)",
                              "posPre": "",
                              "posSuf": "\u00a0\u00a4"
                          }
                        ]
                    },
                    "id": "fr-fr",
                    "pluralCat": function (n) {
                        if (n >= 0 && n <= 2 && n != 2) {
                            return PLURAL_CATEGORY.ONE;
                        }
                        return PLURAL_CATEGORY.OTHER;
                    }
                },
                en: {
                    "DATETIME_FORMATS": {
                        "AMPMS": [
                          "AM",
                          "PM"
                        ],
                        "DAY": [
                          "Sunday",
                          "Monday",
                          "Tuesday",
                          "Wednesday",
                          "Thursday",
                          "Friday",
                          "Saturday"
                        ],
                        "MONTH": [
                          "January",
                          "February",
                          "March",
                          "April",
                          "May",
                          "June",
                          "July",
                          "August",
                          "September",
                          "October",
                          "November",
                          "December"
                        ],
                        "SHORTDAY": [
                          "Sun",
                          "Mon",
                          "Tue",
                          "Wed",
                          "Thu",
                          "Fri",
                          "Sat"
                        ],
                        "SHORTMONTH": [
                          "Jan",
                          "Feb",
                          "Mar",
                          "Apr",
                          "May",
                          "Jun",
                          "Jul",
                          "Aug",
                          "Sep",
                          "Oct",
                          "Nov",
                          "Dec"
                        ],
                        "fullDate": "EEEE, MMMM d, y",
                        "longDate": "MMMM d, y",
                        "medium": "MMM d, y h:mm:ss a",
                        "mediumDate": "MMM d, y",
                        "mediumTime": "h:mm:ss a",
                        "short": "M/d/yy h:mm a",
                        "shortDate": "M/d/yy",
                        "shortTime": "h:mm a"
                    },
                    "NUMBER_FORMATS": {
                        "CURRENCY_SYM": "$",
                        "DECIMAL_SEP": ".",
                        "GROUP_SEP": ",",
                        "PATTERNS": [
                          {
                              "gSize": 3,
                              "lgSize": 3,
                              "macFrac": 0,
                              "maxFrac": 3,
                              "minFrac": 0,
                              "minInt": 1,
                              "negPre": "-",
                              "negSuf": "",
                              "posPre": "",
                              "posSuf": ""
                          },
                          {
                              "gSize": 3,
                              "lgSize": 3,
                              "macFrac": 0,
                              "maxFrac": 2,
                              "minFrac": 2,
                              "minInt": 1,
                              "negPre": "(\u00a4",
                              "negSuf": ")",
                              "posPre": "\u00a4",
                              "posSuf": ""
                          }
                        ]
                    },
                    "id": "en-us",
                    "pluralCat": function (n) {
                        if (n == 1) {
                            return PLURAL_CATEGORY.ONE;
                        }
                        return PLURAL_CATEGORY.OTHER;
                    }
                }
            };
            $scope.currentLanguage = 'en';
            angular.copy(locales['en'], $locale);
            // locale change
            $scope.setLang = function (lang) {
                $scope.currentLanguage = lang;
                // changes $locale
                angular.copy(locales[lang], $locale);
            };
            //#endregion Calender i18n
        }]);
})(angular.module('myApp'));