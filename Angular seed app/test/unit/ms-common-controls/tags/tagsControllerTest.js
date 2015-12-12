'use strict';

describe('tagsController', function () {
    var controller, scope;

    window.beforeEach(function () {
        module('ms.common.controls');
    });

    window.beforeEach(angular.mock.inject(function ($injector, $rootScope) {

        controller = $injector.get('$controller');
        scope = $rootScope.$new();

        scope.defaultTags = [{
            id: 1,
            name: "3D"
        }, {
            id: 2,
            name: "Imax"
        }, {
            id: 3,
            name: "D-Box"

        }];

        scope.tags = [{
            id: 1,
            name: "3D"
        }];

    }));

    window.describe('addNewTag', function () {
        window.it("should selectedTag has inserted value", function () {

            controller('tagsController', {
                $scope: scope
            });
            scope.addNewTag();
            expect(scope.selectedTags).not.toBeNull();

        });
    });

    window.it("should input field be empty if inserted value is same as some existing ", function () {

        controller('tagsController', {
            $scope: scope
        });

        scope.selectedTags = scope.defaultTags;
        if (scope.insertedTag == '3D') {

            scope.addNewTag();
            expect(scope.insertedTag).toBeNull();
        }
    });

    window.it("should selectedTags be length 3 if is added all existing tags from defaultTags ", function () {

        controller('tagsController', {
            $scope: scope
        });

        scope.selectedTags = scope.defaultTags;
        scope.addNewTag();
        expect(scope.selectedTags.length).toEqual(3);

    });

    window.describe('addTagFromDefaultTags ', function () {
        window.it("should icon for remove feature be visible", function () {

            controller('tagsController', {
                $scope: scope
            });

            var selectedtags = scope.tags;
            var event = {
                preventDefault: function () { }
            };
            scope.addTagFromDefaultTags(event, selectedtags, 1);
            expect(scope.isDeleteIconVisible).toBeTruthy();

        });
    });
    window.it("should length of selectedTags be 1 if is added only one tag from defaultTags", function () {

        controller('tagsController', {
            $scope: scope
        });

        var selectedtags = scope.tags;
        var event = {
            preventDefault: function () { }
        };

        scope.addTagFromDefaultTags(event, selectedtags, 1);
        expect(scope.selectedTags.length).toEqual(1);

    });

    window.it("should selectedTags contain selected tag from defaultTags", function () {

        controller('tagsController', {
            $scope: scope
        });

        var selectedtags = scope.tags;
        var event = {
            preventDefault: function () { }
        };

        scope.addTagFromDefaultTags(event, selectedtags, 1);
        expect(scope.selectedTags).toContain(selectedtags);
    });

    window.describe('remove', function () {
        window.it("should remove selected tag", function () {

            controller('tagsController', {
                $scope: scope
            });

            var selectedTag = scope.tags;
            scope.selectedTags = scope.defaultTags;
            scope.remove(selectedTag, 1);
            expect(scope.selectedTags.length).toEqual(2);
        });
    });
    window.it("should not selectedTags contain removed tag", function () {

        controller('tagsController', {
            $scope: scope
        });

        var tagsCollection = scope.tags;
        scope.tagsCollection = scope.defaultTags;
        scope.remove(tagsCollection, 1);

        expect(scope.selectedTags).not.toContain(tagsCollection);

    });
    window.describe('clear', function () {
        window.it("should clear content within input field", function () {

            controller('tagsController', {
                $scope: scope
            });
            scope.clear();
            expect(scope.insertedTag).not.toBeNull();

        });
    });
});