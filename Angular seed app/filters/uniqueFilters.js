(function (app) {
    'use strict';

    app.filter('unique', function () {
        return function (input, key) {

            function mapMonths(month) {
                switch (month) {
                    case 0:
                        return 'Jan';
                    case 1:
                        return 'Feb';
                    case 2:
                        return 'Mar';
                    case 3:
                        return 'Apr';
                    case 4:
                        return 'May';
                    case 5:
                        return 'Jun';
                    case 6:
                        return 'Jul';
                    case 7:
                        return 'Aug';
                    case 8:
                        return 'Sep';
                    case 9:
                        return 'Oct';
                    case 10:
                        return 'Nov';
                    case 11:
                        return 'Dec';
                    default:
                        return '--';
                }

            }

            if (input) {
                var unique = {};
                var uniqueList = [];
                for (var i = 0; i < input.length; i++) {
                    if (typeof unique[input[i][key]] == "undefined") {
                        unique[input[i][key]] = "";

                        //var date = new Date(input[i][key]);
                        //if (date instanceof Date) {
                        //    var dateString = mapMonths(date.getMonth()) + ', ' + date.getDate().toString() + ' ' + date.getFullYear().toString();
                        //    input[i][key] = dateString;
                        //}

                        uniqueList.push(input[i][key]);
                    }
                }
                return uniqueList;
            }

        };
    });

})(angular.module('myApp'));