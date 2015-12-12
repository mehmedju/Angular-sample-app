(function (app) {
    'use strict';

    app.controller("ticketPricingCtrl", ['$scope', '$modal', 'notificationService', 'ticketPricingService',
        function ($scope, $modal, notificationService, ticketPricingService) {
            $scope.currencySymbol = '$'; //should be loaded from configuration
            $scope.openingHours = 'Open';
            $scope.closingHours = 'Close';

            $scope.editingMode = false;
            $scope.resett = false;
            $scope.resetForm = false;
            $scope.timePicker = {};

            $scope.timePickerOptions = {
                hStep: 1,
                mStep: 10,
                isMeridian: true
            };

            var priceTypes = {
                ticketClass: 'ticketClass',
                dayPart: 'dayPart'
            };

            var bulkPriceModifiers = ticketPricingService.getBulkPriceModifiers();

            var originalData;
            dummyServiceData();

            function dummyServiceData() {
                $scope.ticketClassData = ticketPricingService.getPricing();
                originalData = angular.copy($scope.ticketClassData);
            }

            $scope.ticketClasses = ticketPricingService.getTicketClasses();

            $scope.triggerEditTableMode = function () {
                $scope.editingMode = true;
            };

            //#region DayPartsEditing
            var dayPartsInEditMode = [];
            var tempDayPartName;

            $scope.startDayPartEditing = function (dayPart) {
                tempDayPartName = dayPart.name;
                $scope.closeAllHeaderEditing();
                dayPartsInEditMode.push(dayPart.id);
            };

            $scope.closeDayPartEditing = function (dayPart, revertOldName) {
                if (revertOldName) {
                    dayPart.name = tempDayPartName;
                    tempDayPartName = '';
                }
                var index = dayPartsInEditMode.indexOf(dayPart);
                dayPartsInEditMode.splice(index, 1);
                //No end time is indicator that new day part is created and timepicker needs to be raised automatically
                if (!dayPart.endTime) {
                    $scope.dayPartTimeEditing('startTime', dayPart);
                }

            };

            $scope.isDayPartInEditMode = function (dayPart) {
                return _.contains(dayPartsInEditMode, dayPart);
            };

            $scope.dayPartTimeEditing = function (type, dayPart) {
                if (dayPart.startTime == $scope.openingHours || dayPart.startTime == $scope.closingHours) {
                    notificationService.showModal('Information', 'You cannot edit opening hours', 'OK');
                    return;
                }
                $scope.dayPartTime = {
                    type: type,
                    id: dayPart.id
                };
                $scope.timePicker.value = dayPart[type];
            };

            $scope.cancelDayPartTimeEditing = function () {
                $scope.dayPartTime = undefined;
            };

            $scope.applyDayPartTimeEditing = function (dayPart) {
                var startTimeExist = _.find($scope.orderedTicketClassData, function (item) {
                    return _.isDate(item.dayPart.startTime) && item.dayPart.startTime.getTime() == $scope.timePicker.value.getTime();
                });

                if (startTimeExist && startTimeExist.dayPart.endTime) {
                    notificationService.showModal('Information', 'Day part with selected starting time already exist', 'OK');
                    return;
                }

                //dayPart[$scope.dayPartTime.type] = $scope.timePicker.value;
                var isExistingDayPart = dayPart.endTime;
                if (!isExistingDayPart) {
                    reshuffleTimeAllocation(dayPart, $scope.timePicker.value);
                } else {
                    for (var j = 1; j < $scope.orderedTicketClassData.length; j++) {
                        if ($scope.orderedTicketClassData[j].dayPart.id == dayPart.id) {
                            var previousDayPartStartTime = $scope.orderedTicketClassData[j - 1].dayPart.startTime;
                            var nextDayPartStartTime = $scope.orderedTicketClassData[j + 1] && $scope.orderedTicketClassData[j + 1].dayPart.startTime;
                            if (previousDayPartStartTime != $scope.openingHours && previousDayPartStartTime.getTime() > $scope.timePicker.value.getTime()) {
                                notificationService.showModal('Information', 'You cannot set start time earlier than previous day part', 'OK');
                                return;
                            } else if (nextDayPartStartTime && nextDayPartStartTime.getTime() < $scope.timePicker.value.getTime()) {
                                notificationService.showModal('Information', 'You cannot set start time later than next day part', 'OK');
                                return;
                            }

                            dayPart.startTime = $scope.timePicker.value;
                            $scope.orderedTicketClassData[j - 1].dayPart.endTime = new Date(dayPart.startTime - 1 * 60000);
                            break;
                        }
                    }
                }
                
                $scope.dayPartTime = undefined;
            };

            function reshuffleTimeAllocation(dayPart, timePicker) {
                if ($scope.orderedTicketClassData[0].dayPart.startTime == $scope.openingHours && $scope.orderedTicketClassData[0].dayPart.endTime == $scope.closingHours) {
                    dayPart.startTime = timePicker;
                    dayPart.endTime = $scope.orderedTicketClassData[0].dayPart.endTime;
                    $scope.orderedTicketClassData[0].dayPart.endTime = new Date(dayPart.startTime - 1 * 60000);
                } else {
                    var runningDayPart;
                    var middleTimeSpan = false;
                    var dayPartsLength = $scope.orderedTicketClassData.length;
                    for (var i = 0; i < dayPartsLength - 1; i++) {
                        runningDayPart = $scope.orderedTicketClassData[i].dayPart;

                        if (runningDayPart.startTime != $scope.openingHours && timePicker < runningDayPart.startTime) {
                            dayPart.startTime = timePicker;
                            dayPart.endTime = $scope.orderedTicketClassData[i - 1].dayPart.endTime;
                            $scope.orderedTicketClassData[i - 1].dayPart.endTime = new Date(dayPart.startTime - 1 * 60000);
                            middleTimeSpan = true;
                            break;
                        }
                    }

                    if (!middleTimeSpan) {
                        var closingTimeSpan = _.find($scope.orderedTicketClassData, function (item) {
                            return item.dayPart.endTime == $scope.closingHours;
                        });

                        dayPart.startTime = timePicker;
                        dayPart.endTime = closingTimeSpan.dayPart.endTime;
                        closingTimeSpan.dayPart.endTime = new Date(dayPart.startTime.getTime() - 1 * 60000);
                    }
                }
            }

            //#endregion

            //#region TicketClassEditing
            var ticketClassInEditMode = [];
            var tempTicketClassName;
            $scope.startTicketClassEditing = function (ticketClass) {
                tempTicketClassName = ticketClass.name;
                $scope.closeAllHeaderEditing();
                ticketClassInEditMode.push(ticketClass.id);
            };
            $scope.closeTicketClassEditing = function (ticketClass, revertOldName) {
                if (revertOldName) {
                    ticketClass.name = tempTicketClassName;
                    tempTicketClassName = '';
                }
                var index = ticketClassInEditMode.indexOf(ticketClass.id);
                ticketClassInEditMode.splice(index, 1);
            };
            $scope.isTicketClassInEditMode = function (ticketClass) {
                return _.contains(ticketClassInEditMode, ticketClass);
            };
            //#endregion

            //#region Bulk Price Modification
            $scope.bulkPriceEditing = function (elementType, elementId) {
                $scope.bulkPriceEdit = {
                    type: elementType,
                    id: $scope.bulkPriceEdit && $scope.bulkPriceEdit.id == elementId ? undefined : elementId,
                    modifier: bulkPriceModifiers.decrease
                };
            };

            $scope.cancelBulkPriceEditing = function () {
                $scope.bulkPriceEditing(undefined);
            };

            $scope.applyBulkPriceEditing = function () {
                if ($scope.bulkPriceEdit.type == priceTypes.ticketClass) {
                    _.each($scope.ticketClassData, function (row) {
                        row.TicketClass[$scope.bulkPriceEdit.id] = modifyPrice(row.TicketClass[$scope.bulkPriceEdit.id], $scope.bulkPriceEdit.amount, $scope.bulkPriceEdit.modifier);
                    });
                } else {
                    var singleRow = _.find($scope.ticketClassData, function (item) { return item.dayPart.id == $scope.bulkPriceEdit.id; });
                    for (var prop in singleRow.TicketClass) {
                        singleRow.TicketClass[prop] = modifyPrice(singleRow.TicketClass[prop], $scope.bulkPriceEdit.amount, $scope.bulkPriceEdit.modifier);
                    };
                }
                $scope.bulkPriceEditing(undefined);
            };

            function modifyPrice(price, amount, modifier) {
                var returnPrice = Number(price) || 0.00;
                amount = Number(amount) || 0.00;

                switch (modifier) {
                    case bulkPriceModifiers.increase:
                        return returnPrice + amount;
                    case bulkPriceModifiers.decrease:
                        return returnPrice - amount;
                    case bulkPriceModifiers.override:
                        return amount;
                    default:
                        console.warn("Unknown modifier!");
                        return 0;
                }
            }

            //#endregion

            //#region Headers
            $scope.focusedElement = {
                type: '',
                id: -1
            };

            $scope.setFocusOn = function (elementType, elementId) {
                $scope.focusedElement = {
                    type: elementType,
                    id: elementId
                };
            };

            $scope.addTicketClass = function () {
                var maxId = $scope.ticketClasses.length != 0 ?
                                _.max(_.pluck($scope.ticketClasses, 'id')) :
                                    0;
                var newTicketClass = { id: maxId + 1, name: 'New' + (maxId + 1).toString() };
                $scope.ticketClasses.push(newTicketClass);

                $scope.startTicketClassEditing(newTicketClass);
                $scope.setFocusOn(priceTypes.ticketClass, newTicketClass.id);

                if ($scope.visibleticketClasses.length == $scope.columnsPerPage && !$scope.isLastPage()) {
                    $scope.currentPage = $scope.ticketClasses.length - $scope.visibleticketClasses.length;
                }
            };

            $scope.removeTicketClass = function (ticketClassId) {
                var modalInstance = notificationService.showModal('Delete confirmation', 'Are you sure you want to delete entire column?', 'Yes', 'Cancel');
                modalInstance.result.then(deleteEntireColumn);

                function deleteEntireColumn() {
                    if ($scope.visibleticketClasses.length <= $scope.columnsPerPage && $scope.isLastPage() && $scope.currentPage > 0) {
                        $scope.currentPage--;
                    }

                    for (var i = 0; i < $scope.ticketClasses.length; i++) {
                        if ($scope.ticketClasses[i].id === ticketClassId) {
                            $scope.ticketClasses.splice(i, 1);
                            break;
                        }
                    }
                };
            };

            $scope.addDayPart = function () {
                var lastestDayPart = $scope.orderedTicketClassData[$scope.orderedTicketClassData.length - 1];
                var latestTime = lastestDayPart.dayPart.startTime == $scope.openingHours ? new Date() : lastestDayPart.dayPart.startTime;

                var maxId = $scope.ticketClassData.length != 0 ?
                                _.max(_.pluck(_.pluck($scope.ticketClassData, priceTypes.dayPart), 'id')) :
                                    0;

                var ticketClass = {};
                _.each($scope.ticketClasses, function (ticketClassItem) {
                    ticketClass[ticketClassItem.id] = null;
                });
                var newDayPart = {
                    dayPart: {
                        id: maxId + 1,
                        name: 'New' + (maxId + 1).toString(),
                        startTime: new Date(latestTime.getTime() + 5 * 60000)
                    },
                    TicketClass: ticketClass
                };
                $scope.ticketClassData.push(newDayPart);
                $scope.startDayPartEditing(newDayPart.dayPart);
                $scope.setFocusOn(priceTypes.dayPart, newDayPart.dayPart.id);
            };

            $scope.removeDayPart = function (dayPart) {
                var modalInstance = notificationService.showModal('Delete confirmation', 'Are you sure you want to delete entire row?', 'Yes', 'Cancel');
                modalInstance.result.then(deleteEntireRow);

                function deleteEntireRow() {
                    for (var i = 0; i < $scope.orderedTicketClassData.length; i++) {
                        if ($scope.orderedTicketClassData[i].dayPart.id === dayPart.id) {
                            if (dayPart.endTime) {
                                if (i == $scope.orderedTicketClassData.length - 1) {
                                    $scope.orderedTicketClassData[i - 1].dayPart.endTime = $scope.orderedTicketClassData[i].dayPart.endTime;
                                } else {
                                    $scope.orderedTicketClassData[i + 1].dayPart.startTime = $scope.orderedTicketClassData[i].dayPart.startTime;
                                }
                            }

                            for (var j = 0; j < $scope.ticketClassData.length; j++) {
                                if ($scope.ticketClassData[j].dayPart.id === dayPart.id) {
                                    $scope.ticketClassData.splice(j, 1);
                                    break;
                                }
                            }
                            break;
                        }
                    }
                };

            };

            $scope.closeAllHeaderEditing = function () {
                dayPartsInEditMode.length = 0;
                ticketClassInEditMode.length = 0;
            };
            //#endregion

            //#region Paging implementation
            $scope.currentPage = 0;
            $scope.columnsPerPage = 12;
            $scope.totalPages = function () {
                return Math.ceil($scope.ticketClasses.length / $scope.columnsPerPage);
            };

            $scope.previousPage = function () {
                $scope.currentPage -= 1;
            };

            $scope.nextPage = function () {
                $scope.currentPage += 1;
            };

            $scope.isLastPage = function () {
                return $scope.currentPage + $scope.columnsPerPage >= $scope.ticketClasses.length;
            };

            $scope.orderByStartTime = function (ticketClassData) {
                return ticketClassData.dayPart.startTime == $scope.openingHours || ticketClassData.dayPart.startTime;
            };
            //#endregion

            $scope.showHistoryModal = function (ticketType) {
                $modal.open({
                    templateUrl: '../views/partials/historyModal.html',
                    controller: 'historyModalCtrl',
                    backdrop: 'static',
                    resolve: {
                        ticketType: function () {
                            return ticketType;
                        }
                    }
                });
            };
        }]);

})(angular.module('myApp'));