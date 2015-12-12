(function (app) {
    'use strict';

    app.controller("scheduleRightEditPanelCtrl", ['$scope', '$timeout', 'ganttService',
    function ($scope, $timeout, ganttService) {
        //TODO: move to service..
        var guid = (function () {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                           .toString(16)
                           .substring(1);
            }
            return function () {
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                       s4() + '-' + s4() + s4() + s4();
            };
        })();

        ganttService.getGanttAllFeatures().then(function (data) {
            $scope.allFeatures = data;
        });

        $scope.save = function (item) {

            if (item) {
                $scope.editForm.visibility = false;
            }
            _.each($scope.data, function (r) {
                if ($scope.mode.isAddingNewFeatureMode) {
                    //$scope.selectedFeature = angular.copy($scope.selectedFeature);
                    $scope.selectedFeature.id = guid();
                    $scope.selectedFeature.data.movieId = $scope.newSchedule.feature[0].id;
                } else {
                    for (var k = 0; k < r.tasks.length; k++) {
                        if (r.tasks[k].id == $scope.selectedTask.task.id) {
                            r.tasks.splice(k, 1);
                            break;
                        }
                    }
                }

                if (r.id == $scope.newSchedule.auditoriums[0].id) {
                    r.tasks.push($scope.selectedFeature);
                }
                delete $scope.selectedFeature.data.unmodifiedValues;
                delete $scope.selectedFeature.data.preview;
                delete $scope.selectedFeature.data.isActive;
            });
            $scope.ganttHighlightTask.id = $scope.selectedFeature.id;
            if (!$scope.zoom.isZoomInMode) {
                var setScroller = $scope.setScrollerPosition();
                setScroller.scrollLeft++;
                $scope.putFocusOnNewAddedFeature($scope.selectedFeature.from);
            }
            $scope.refreshGrid();
        };

        $scope.putFocusOnNewAddedFeature = function (date) {
            var centeredHours = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());
            $timeout(function () {
                $scope.scrollToToday(centeredHours);
            }, 0);
        };

        $scope.saveAndNew = function () {
            delete $scope.selectedFeature.data.isActive;
            _.each($scope.data, function (r) {

                if (!$scope.mode.isAddingNewFeatureMode) {
                    for (var k = 0; k < r.tasks.length; k++) {
                        if (r.tasks[k].id == $scope.selectedTask.task.id) {
                            r.tasks.splice(k, 1);
                            break;
                        }
                    }
                };
                $scope.selectedFeature.id = guid();
                $scope.selectedFeature.data.movieId = $scope.newSchedule.feature[0].id;

                if (r.id == $scope.newSchedule.auditoriums[0].id) {
                    r.tasks.push($scope.selectedFeature);
                }
            });
            $scope.ganttHighlightTask.id = $scope.selectedFeature.id;
            $scope.selectedFeature = angular.copy($scope.selectedFeature);
            $scope.refreshGrid();
        };

        $scope.shouldDisableSaveButtons = function () {
            if (newSchedule.feature.length <= 0 || newSchedule.auditoriums.length <= 0) {
                return true;
            } else {
                return false;
            }
        };

        $scope.cancel = function () {
            $scope.editForm.visibility = false;
            if (!$scope.mode.isAddingNewFeatureMode) {
                _.each($scope.data, function (r) {
                    if (r.id == $scope.selectedTask.task.row.id) {
                        delete $scope.selectedTask.task.data.isActive;
                    }
                    $scope.refreshGrid();
                });
            }
            var setScroller = $scope.setScrollerPosition();
            setScroller.scrollLeft++;
        };

        $scope.delete = function () {
            $scope.editForm.visibility = false;
            var setScroller = $scope.setScrollerPosition();
            setScroller.scrollLeft++;
            $scope.removeTaskFromGrid($scope.selectedTask);
        };

        $scope.deleteSelectedAuditorium = function () {
            $scope.newSchedule.auditoriums.splice(0, 1);
        };

        $scope.deleteSelectedFeature = function () {
            $scope.newSchedule.features.splice(0, 1);
        };

        $scope.openModifiersPopover = function () {
            $scope.experiences.isShownAllModifiers = true;
        };

        $scope.closeModifiersPopover = function () {
            $scope.experiences.isShownAllModifiers = false;
        };

        $scope.$on('selectedFrom', function (a) {
            $scope.selectedFeature.from = a.targetScope.selectedFeature.from;
        });

        $scope.$on('resetTime', function () {
            $scope.selectedFeature.from = $scope.currentDate;
        });

        $scope.$watch('newSchedule.feature', function (newValue) {

            if (newValue && newValue[0]) {
                $scope.temp = false;
                var selectedMovie = newValue[0];
                $scope.selectedFeature.data = $scope.selectedFeature.data || {};
                $scope.selectedFeature.subject = selectedMovie.name;
                $scope.selectedFeature.data.image = selectedMovie.image;
                $scope.selectedFeature.data.movieId = selectedMovie.id;
                $scope.selectedFeature.data.duration = selectedMovie.duration;
                $scope.selectedFeature.data.rating = selectedMovie.rating;
                if ($scope.selectedFeature.data.duration) {
                    $scope.selectedFeature.to = new Date($scope.selectedFeature.from.getTime() + 60000 * $scope.selectedFeature.data.duration);
                }

                _.each($scope.data, function (r) {
                    var task = _.find(r.tasks, function (t) {
                        return t.data.movieId == selectedMovie.id;
                    });
                    if (task) {
                        $scope.temp = true;
                        $scope.selectedFeature.data.modifiers = task.data.modifiers;
                    }
                });

                if (!$scope.temp) {
                    $scope.selectedFeature.data.modifiers = [];
                }
                $scope.refreshGrid();
            }

        }, true);

        $scope.$watch('selectedFeature.from', function (newVal) {
            if (!newVal || !$scope.selectedFeature || !$scope.selectedFeature.data) {
                return;
            }
            if ($scope.selectedFeature.data.duration) {
                $scope.selectedFeature.to = new Date($scope.selectedFeature.from.getTime() + 60000 * $scope.selectedFeature.data.duration);
            }
        });

        $scope.showDatepicker = function ($event, datePickerInstance) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.datepickers[datePickerInstance] = !$scope.datepickers[datePickerInstance];
        };
    }]);

})(angular.module('myApp'));