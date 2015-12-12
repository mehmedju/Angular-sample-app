'use strict';

describe('filterByColumnController', function () {
    var controller, filter, scope, tableSource;

    //mock Application to allow us to inject our own dependencies
    //beforeEach(angular.mock.module("ms.common.controls"));
    window.beforeEach(function () {
        module('ms.common.controls');
    });

    //mock the controller, include $rootScope and $controller
    window.beforeEach(angular.mock.inject(function ($injector, $rootScope) {

        controller = $injector.get('$controller');
        filter = $injector.get('$filter');
        scope = $rootScope.$new();

        tableSource = [{ name: 'Joe' }, { name: 'Mark' }];
    }));

    window.describe('prepareFilterByColumn', function () {
        window.it("should have empty search-filters-while-you-type", function () {

            controller('filterByColumnController', {
                $scope: scope,
                $filter: filter
            });

            scope.tableSource = tableSource;

            scope.prepareFilterByColumn('name');
            expect(scope.filterText).toBeNull(true);
        });

        window.it("should create filtrerable array of items", function () {

            controller('filterByColumnController', {
                $scope: scope,
                $filter: filter
            });

            scope.tableSource = tableSource;

            scope.prepareFilterByColumn('name');
            expect(scope.filterableItems).not.toBeNull();
            expect(scope.filterableItems.length).toBeGreaterThan(0);

        });

        window.it("should create list of filterable items of same length as source's unique item list", function () {

            controller('filterByColumnController', {
                $scope: scope,
                $filter: filter
            });

            scope.tableSource = tableSource;

            scope.prepareFilterByColumn('name');
            var uniqueItems = _.uniq(_.pluck(tableSource, 'name'));
            expect(scope.filterableItems.length).toEqual(uniqueItems.length);
        });

        window.it("should create list of filterable items containing unique values from source table", function () {

            controller('filterByColumnController', {
                $scope: scope,
                $filter: filter
            });

            scope.tableSource = tableSource;

            scope.prepareFilterByColumn('name');
            expect(scope.filterableItems[0].name).toContain('Joe');
            expect(scope.filterableItems[1].name).toContain('Mark');

        });

        window.it("should apply format filterable options when transformFunction provided", function () {

            controller('filterByColumnController', {
                $scope: scope,
                $filter: filter
            });

            scope.tableSource = tableSource;

            scope.transformFunction = function (object) {
                if (!object.item) {
                    object.item = '';
                }
                return '***' + object.item + '****';
            };

            scope.prepareFilterByColumn('name');
            var uniqueItems = _.uniq(_.pluck(tableSource, 'name'));
            var filterItems = _.pluck(scope.filterableItems, 'name');

            for (var i = 0; i < uniqueItems.length; i++) {
                expect(filterItems).toContain('***' + uniqueItems[i] + '****');
            }
        });

        window.it("should create emtpy list item when source table is null or undefined", function () {

            controller('filterByColumnController', {
                $scope: scope,
                $filter: filter
            });

            tableSource.push({ name: null }, { age: 18 });
            scope.tableSource = tableSource;

            scope.prepareFilterByColumn('name');
            var filterItems = _.pluck(scope.filterableItems, 'name');
            expect(filterItems).toContain(undefined);
        });
    });

    window.describe('cancelColumnFilterSelection', function () {
        window.it("should close filter form", function () {

            controller('filterByColumnController', {
                $scope: scope,
                $filter: filter
            });

            scope.tableSource = tableSource;

            scope.prepareFilterByColumn('name');
            scope.cancelColumnFilterSelection();
            expect(scope.allowPropagation).toBe(true);
        });
        window.it("should return false if tableSource is empty", function () {

            controller('filterByColumnController', {
                $scope: scope,
                $filter: filter
            });
            scope.tableSource = tableSource;
            scope.prepareFilterByColumn('name');
            scope.cancelColumnFilterSelection();

            expect(scope.allowPropagation).toBe(true);

        });
    });

    window.describe('applyColumnFilters', function () {
        window.it("should close filter form after filtering", function () {

            controller('filterByColumnController', {
                $scope: scope,
                $filter: filter
            });

            scope.tableSource = tableSource;

            scope.prepareFilterByColumn('name');
            scope.applyColumnFilters();
            expect(scope.allowPropagation).toBe(true);
        });
    });

    window.describe('addAllColumnFilters', function () {
        window.it("should have all items checked", function () {

            controller('filterByColumnController', {
                $scope: scope,
                $filter: filter
            });

            scope.tableSource = tableSource;
            scope.prepareFilterByColumn('name');
            scope.addAllColumnFilters();
            var temp = [];

            _.each(scope.tableSource, function (filterableItem) {
                filterableItem.checked = true;
                temp.push(filterableItem);
            });
            expect(temp.length).toEqual(2);

        });

    });

    window.describe('clearAllColumnFilters', function () {
        window.it("should clear previously set filters", function () {
            controller('filterByColumnController', {
                $scope: scope,
                $filter: filter
            });

            scope.tableSource = tableSource;

            scope.prepareFilterByColumn('name');
            scope.clearAllColumnFilters();
            expect(scope.filterableItems).not.toBeNull();
            var notClearedFilter = _.find(scope.filterableItems, function (item) {
                return item.checked == true;
            });
            expect(notClearedFilter).not.toBeDefined();
        });

        window.it("should keep items available for later filtering", function () {
            controller('filterByColumnController', {
                $scope: scope,
                $filter: filter
            });

            scope.tableSource = tableSource;

            scope.prepareFilterByColumn('name');
            scope.clearAllColumnFilters();
            expect(scope.filterableItems).not.toBeNull();
            expect(scope.filterableItems.length).not.toBe(0);
        });

        window.it("should have all items be unchecked", function () {

            controller('filterByColumnController', {
                $scope: scope,
                $filter: filter
            });

            scope.tableSource = tableSource;
            scope.prepareFilterByColumn('name');
            scope.clearAllColumnFilters();
            var temp = [];
            temp.push(tableSource[0]);
            temp.push(tableSource[1]);

            _.each(scope.tableSource, function (filterableItem) {
                filterableItem.checked = false;
                temp.pop(filterableItem);
            });
            expect(temp.length).toEqual(0);

        });
    });

    window.describe('addColumnFilter', function () {
        window.it("should check which of items is selected", function () {

            controller('filterByColumnController', {
                $scope: scope,
                $filter: filter
            });

            scope.tableSource = tableSource;
            scope.prepareFilterByColumn('name');
            scope.addColumnFilter(tableSource[0].name);

            var specificFilter = _.find(scope.tableSource.filters, function (a) {
                return a.filterBy == scope.tableSource.activeFilter;
            });
            expect(specificFilter).toBeUndefined();
        });

    });

    window.describe('isFilteredBy', function () {
        window.it("should return false if provided value is not found in filtered items list", function () {

            controller('filterByColumnController', {
                $scope: scope,
                $filter: filter
            });

            scope.tableSource = tableSource;
            scope.prepareFilterByColumn('name');
            var isFilteredBy = scope.isFilteredBy('name');

            expect(isFilteredBy).toBe(false);
        });

        window.it("should return true if provided value is found in filtered items list", function () {

            controller('filterByColumnController', {
                $scope: scope,
                $filter: filter
            });

            scope.tableSource = tableSource;
            scope.prepareFilterByColumn('name');
            scope.addAllColumnFilters();

            var isFilteredBy = scope.isFilteredBy('name');
            expect(isFilteredBy).toBe(true);
        });
    });

    window.describe('sort', function () {
        window.it("should tableSource be by default null", function () {
            controller('filterByColumnController', {
                $scope: scope,
                $filter: filter
            });

            scope.tableSource = tableSource;
            var sortedSource = filter('orderBy')(scope.tableSource, 'name', true);

            scope.prepareFilterByColumn('name');
            scope.sort('name', true);

            expect(scope.tableSource.length).toEqual(sortedSource.length);
        });
        
        window.it("should be ordered ascending in sorted array when is parameter reverse false", function () {
            controller('filterByColumnController', {
                $scope: scope,
                $filter: filter
            });

            scope.tableSource = tableSource;
            scope.sortedSource = filter('orderBy')(scope.tableSource, 'name', false);

            scope.prepareFilterByColumn('name');
            scope.sort('name', true);

            expect(scope.sortedSource[0].name).toEqual('Joe');
            expect(scope.sortedSource[1].name).toEqual('Mark');

        });
        
        window.it("should be ordered descending in sorted array when is parameter reverse true ", function () {
            controller('filterByColumnController', {
                $scope: scope,
                $filter: filter
            });

            scope.tableSource = tableSource;
            scope.sortedSource = filter('orderBy')(scope.tableSource, 'name', true);

            scope.prepareFilterByColumn('name');
            scope.sort('name', true);

            expect(scope.sortedSource[0].name).toEqual('Mark');
            expect(scope.sortedSource[1].name).toEqual('Joe');

        });
    });

    window.describe('applyOutsideFiltering', function () {
        window.it("should always return true for items previously selected as filters", function () {

            controller('filterByColumnController', {
                $scope: scope,
                $filter: filter
            });

            scope.tableSource = tableSource;
            scope.prepareFilterByColumn('name');

            expect(scope.filterableItems).not.toBeNull(true);
            expect(scope.filterableItems.length).not.toEqual(0);
            scope.filterableItems[0].checked = true;
            expect(scope.applyOutsideFiltering(scope.filterableItems[0])).toBe(true);
        });

        window.it("should always return true if customFiltering is not provided", function () {

            controller('filterByColumnController', {
                $scope: scope,
                $filter: filter
            });

            scope.tableSource = tableSource;
            scope.prepareFilterByColumn('name');

            expect(scope.filterableItems).not.toBeNull(true);
            expect(scope.filterableItems.length).not.toEqual(0);
            expect(scope.applyOutsideFiltering(scope.filterableItems[0])).toBe(true);
        });

        window.it("should return false if no appropriate item is found to the checked filter option", function () {

            controller('filterByColumnController', {
                $scope: scope,
                $filter: filter
            });

            scope.tableSource = tableSource;
            scope.prepareFilterByColumn('name');
            
            expect(scope.filterableItems).not.toBeNull(true);
            expect(scope.filterableItems.length).not.toEqual(0);
            
            scope.customFiltering = function() { return true; };
            expect(scope.applyOutsideFiltering({name: "fake", checked: false})).toBe(false);
        });
        
        window.it("should return true when filter option fulfils applyOutsideFiltering's logic", function () {

            controller('filterByColumnController', {
                $scope: scope,
                $filter: filter
            });

            scope.tableSource = tableSource;
            scope.prepareFilterByColumn('name');

            expect(scope.filterableItems).not.toBeNull(true);
            expect(scope.filterableItems.length).not.toEqual(0);

            scope.customFiltering = function (item) {
                return item.tableItem.name == scope.filterableItems[0].name;
            };

            expect(scope.applyOutsideFiltering(scope.filterableItems[0])).toBe(true);
        });

        window.it("should return false when filter option doesn't fulfil applyOutsideFiltering's logic", function () {

            controller('filterByColumnController', {
                $scope: scope,
                $filter: filter
            });

            scope.tableSource = tableSource;
            scope.prepareFilterByColumn('name');

            expect(scope.filterableItems).not.toBeNull(true);
            expect(scope.filterableItems.length).not.toEqual(0);

            scope.customFiltering = function (item) {
                return item.tableItem.name == "mocked name";
            };

            expect(scope.applyOutsideFiltering(scope.filterableItems[0])).toBe(false);
        });
    });

    window.describe('clearFilters $watch', function () {
        window.it('should clear selected filters when set to true', function () {
            controller('filterByColumnController', {
                $scope: scope,
                $filter: filter
            });
            scope.clearFilters = false;
            scope.tableSource = tableSource;
            scope.prepareFilterByColumn('name');

            scope.clearFilters = true;
            scope.$apply();
            expect(scope.clearFilters).not.toBe(true);
            
        });

        window.it('should clear omit flags from all table items', function () {
            controller('filterByColumnController', {
                $scope: scope,
                $filter: filter
            });
            scope.clearFilters = false;
            scope.tableSource = tableSource;
            scope.prepareFilterByColumn('name');

            scope.tableSource[0].omit = true;

            scope.clearFilters = true;
            scope.$apply();
            
            var hasSourceBeenCleared = _.find(scope.tableSource, function (item) {
                return item.omit;
            });
            expect(hasSourceBeenCleared).toBe(undefined);

        });

    });
});