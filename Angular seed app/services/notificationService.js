(function (app) {
    'use strict';

    app.factory('notificationService', ['$modal',
        function ($modal) {
            function showModal(title, content, buttonOkText, buttonCancelText) {
                var modalInstance = $modal.open({
                    templateUrl: '../views/partials/confirmationModal.html',
                    controller: 'confirmationModalCtrl',
                    resolve: {
                        options: function () {
                            return {
                                title: title,
                                content: content,
                                buttonOk: buttonOkText,
                                buttonCancel: buttonCancelText
                            };
                        }
                    }
                });

                return modalInstance;
            }

            return {
                showModal: showModal
            };
        }]);
})(angular.module('myApp'));