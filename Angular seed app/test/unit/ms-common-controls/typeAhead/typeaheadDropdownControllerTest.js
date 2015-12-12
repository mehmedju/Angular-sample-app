'use strict';

describe('typeAheadDropDownController', function () {
    var controller, scope;

    window.beforeEach(function () {
        module('ms.common.controls');
    });
    window.beforeEach(angular.mock.inject(function ($injector, $rootScope) {

        controller = $injector.get('$controller');
        scope = $rootScope.$new();

        scope.listOfItems = [{
            id: 1,
            name: "The Monuments Men"
        }, {
            id: 2,
            name: "Divergent"
        }, {
            id: 3,
            name: "Robocop"
        }, {
            id: 4,
            name: "Non-Stop"
        }, {
            id: 5,
            name: "Prisoners"
        }, {
            id: 6,
            name: "American Hustle"
        }];

        scope.selectedItem = {
            id: 1,
            name: "The Monuments Men"
        };

        scope.ngModel = scope.listOfItems;
    }));

    window.describe('getIndexOfListItem', function () {
        window.it("should selected item ID to be 3 when is selected second item in dropdown list", function () {
            controller('typeAheadDropDownController', {
                $scope: scope
            });
            scope.getIndexOfListItem(scope.listOfItems[2].id);
            expect(scope.idOfSelectedItem).toEqual(3);
        });
    });

    window.describe('toggleDropdown', function () {
        window.it("should activeIdx to be set on 0 when is clicked on input field", function () {
            controller('typeAheadDropDownController', {
                $scope: scope
            });
            var event = {
                preventDefault: function () { },
                stopPropagation: function () { }
            };
            scope.toggleDropdown(event);
            expect(scope.activeIdx).toEqual(0);
        });
        window.it("should dropdown list to be opened if it was before closed", function () {
            controller('typeAheadDropDownController', {
                $scope: scope
            });
            var event = {
                preventDefault: function () { },
                stopPropagation: function () { }
            };
            scope.status.isopen = false;
            scope.toggleDropdown(event);
            expect(scope.status.isopen).toBeTruthy();
        });
    });

    window.describe('selectChoice', function () {
        window.it("should ngModel to have selected item", function () {
            controller('typeAheadDropDownController', {
                $scope: scope
            });
            scope.selectChoice(scope.listOfItems[0]);
            expect(scope.ngModel[0].name).toEqual("The Monuments Men");
        });
        window.it("should check whether new selected item has already existed in ngModel items", function () {
            controller('typeAheadDropDownController', {
                $scope: scope
            });
            scope.selectChoice(scope.selectedItem);
            var isThereSameItemAsSelected = _.find(scope.ngModel, function (item) { return item == scope.selectedItem; });
            expect(isThereSameItemAsSelected).not.toBeNull();
        });
        window.it("should add new selected item to ngModel items if it doesn't exist from earlier", function () {
            controller('typeAheadDropDownController', {
                $scope: scope
            });
            scope.selectChoice(scope.selectedItem);
            scope.tempItem = "The November Men";
            var isThereSameItemAsSelected = _.find(scope.ngModel, function (item) { return item == scope.tempItem; });
            scope.selectChoice(scope.tempItem);
            expect(isThereSameItemAsSelected).toBeUndefined();
            expect(scope.ngModel).toContain("The November Men");
        });
    });

    window.describe('ngModel $watch', function () {
        window.it("should typeAheadModel to be empty whenever are modified items in ngModel", function () {
            controller('typeAheadDropDownController', {
                $scope: scope
            });
            scope.typeAheadLabel = 'name';
            scope.typeAheadModel = 'some value';
            scope.$digest();
            expect(scope.typeAheadModel).toEqual('');
        });
    });

    window.describe('ngModel.length $watch', function () {
        window.it("should enable input field if selected item is deleted/ ngModel length is 0", function () {
            controller('typeAheadDropDownController', {
                $scope: scope
            });
            scope.typeAheadLabel = 'name';
            scope.typeAheadModel = '';
            scope.ngModel.length = 0;

            scope.$digest();
            expect(scope.disabledInput).toBeFalsy();
        });
    });

    window.describe('ngModel.length $watch', function () {
        window.it("should set 'enable input flag' to false when there are selected items", function () {
            controller('typeAheadDropDownController', {
                $scope: scope
            });
            scope.typeAheadLabel = 'name';
            scope.typeAheadModel = '';

            scope.$digest();
            expect(scope.disabledInput).toBeTruthy();
        });
    });

    window.describe('ngModel.length $watch', function () {
        window.it("should always set 'enable 'input flag' to true when there are selected items and multiple seletion flag is set to true", function () {
            controller('typeAheadDropDownController', {
                $scope: scope
            });
            scope.typeAheadLabel = 'name';
            scope.typeAheadModel = '';
            scope.enableMultipleSelection = true;
            
            scope.$digest();
            expect(scope.disabledInput).toBeFalsy();
        });
    });

    window.describe('typeAheadModel $watch', function () {
        window.it("should filterText object to contain value of typeAheadLabel as attribute", function () {
            controller('typeAheadDropDownController', {
                $scope: scope
            });
            scope.typeAheadLabel = 'name';
            var object = { name: '' };
            scope.$digest();
            expect(scope.filterText).toEqual(object);
        });
    });
});
