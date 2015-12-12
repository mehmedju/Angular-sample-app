(function (app) {
    'use strict';

    app.factory('ticketPricingService', [
        function () {
            //this should come from configuration
            var openingHours = 'Open';
            var closingHours = 'Close';
            var bulkPriceModifiers = {
                increase: 'increase',
                decrease: 'decrease',
                override: 'override'
            };

            var ticketClassesCollection = [{ 'id': 1, 'name': 'Adult' }, { 'id': 2, 'name': 'Child' }, { 'id': 3, 'name': 'Senior' }, { 'id': 4, 'name': 'Military' }, { 'id': 5, 'name': 'Student' }, 
										   { 'id': 6, 'name': 'Employee' }, { 'id': 7, 'name': 'Special' }, { 'id': 8, 'name': 'Special Student' }, { 'id': 9, 'name': 'Owner' }, { 'id': 10, 'name': 'Special Senior' }];

            var pricingData =
                [
                    { 'dayPart': { 'id': 1, 'name': 'All day', 'startTime': openingHours, 'endTime': closingHours }, 'TicketClass': { '1': 5.0000, '2': 4.5000, '3': 4.0000, '4': 4.0000, '5': 3.5000, '6': 2.5000, '7': 5.0000, '8': 4.5000, '9': 4.0000, '10': 4.0000} }
                ];

            var modifierCollection = [
                {
                    experience: 'Dbox Experience',
                    category: 'Feat',
                    name: 'Dbox experience',
                    description: 'D-BOX Simulators are the next Dimension of your cinematic experience. Taking you literally inside the movie.',
                    smallIcon: 'img/experiences/dbox.png',
                    largeIcon: '',
                    prices: {
                        modifierType: bulkPriceModifiers.increase,
                        ticketClasses: [{ id: 1, value: 1.00 }, { id: 2, value: 1.00 }, { id: 3, value: 1.00 }, { id: 4, value: 1.00 }, { id: 5, value: 1.25 }, { id: 6, value: 0.50 }, { id: 7, value: 1.00 }, { id: 8, value: 1.00 }, { id: 9, value: 1.00 }, { id: 10, value: 1.00 }, { id: 11, value: 1.25 }, { id: 12, value: 0.50 }]
                    }
                },
                {
                    experience: 'Imax Experience',
                    category: 'Aud',
                    name: 'Imax experience',
                    description: 'A process of film projection using a giant screen on which an image approximately ten times larger than standard is projected',
                    smallIcon: 'img/experiences/imax.png',
                    largeIcon: '',
                    prices: {
                        modifierType: bulkPriceModifiers.decrease,
                        ticketClasses: [{ id: 1, value: 1.00 }, { id: 2, value: 1.00 }, { id: 3, value: 1.00 }, { id: 4, value: 1.00 }, { id: 5, value: 0.75 }, { id: 6, value: 1.25 }, { id: 7, value: 1.00 }, { id: 8, value: 1.00 }, { id: 9, value: 1.00 }, { id: 10, value: 1.00 }, { id: 11, value: 1.25 }, { id: 12, value: 0.50 }]
                    }
                },
                {
                    experience: 'DD Experience',
                    category: 'Fe/Au',
                    name: 'DD experience',
                    description: 'Dolby Digital Cinema doesn\'t fade or scratch like traditional film prints. The hundredth showing of a movie looks and sounds as bright and clear as the first.',
                    smallIcon: 'img/experiences/dolbydig.jpg',
                    largeIcon: '',
                    prices: {
                        modifierType: bulkPriceModifiers.override,
                        ticketClasses: [{ id: 1, value: 1.50 }, { id: 2, value: 1.50 }, { id: 3, value: 1.50 }, { id: 4, value: 1.50 }, { id: 5, value: 1.25 }, { id: 6, value: 0.50 }, { id: 7, value: 1.00 }, { id: 8, value: 1.00 }, { id: 9, value: 1.00 }, { id: 10, value: 1.00 }, { id: 11, value: 1.25 }, { id: 12, value: 0.50 }]
                    }
                }
            ];

            var experienceCollection = [
                {
                    category: 'Feat',
                    name: 'Dbox Experience',
                    description: 'D-BOX Simulators are the next Dimension of your cinematic experience. Taking you literally inside the movie.',
                    smallIcon: 'img/experiences/dbox.png',
                    largeIcon: ''
                },
                {
                    category: 'Aud',
                    name: 'Imax Experience',
                    description: 'A process of film projection using a giant screen on which an image approximately ten times larger than standard is projected',
                    smallIcon: 'img/experiences/imax.png',
                    largeIcon: ''
                },
                {
                    category: 'Fe/Au',
                    name: 'DD Experience',
                    description: 'Dolby Digital Cinema doesn\'t fade or scratch like traditional film prints. The hundredth showing of a movie looks and sounds as bright and clear as the first.',
                    smallIcon: 'img/experiences/dolbydig.jpg',
                    largeIcon: ''
                }
            ];

            function getBulkPriceModifiers() {
                return bulkPriceModifiers;
            }

            function getTicketClasses() {
                return ticketClassesCollection;
            }

            function getPricing() {
                return pricingData;
            }

            function getModifiers() {
                return modifierCollection;
            }

            function addModifier(newModifier) {
                modifierCollection.push(newModifier);
            }

            function getExperiences() {
                return experienceCollection;
            }

            function addExperience(experience) {
                experienceCollection.push(experience);
            }

            function deleteExperience(experience) {
                experienceCollection.pop(experience);
            }

            function createEmptyPriceObject(ticketClasses, defaultModifier) {
                var prices = {
                        modifierType: defaultModifier || bulkPriceModifiers.increase,
                        ticketClasses: []
                    };
                _.each(ticketClasses, function (tc) {
                    prices.ticketClasses.push({ id: tc.id, value: null });
                });
                return prices;
            }

            return {
                getTicketClasses: getTicketClasses,
                getBulkPriceModifiers: getBulkPriceModifiers,
                getPricing: getPricing,
                getModifiers: getModifiers,
                addModifier: addModifier,
                getExperiences: getExperiences,
                addExperience: addExperience,
                deleteExperience: deleteExperience,
                createEmptyPriceObject: createEmptyPriceObject
            };
        }]);
})(angular.module('myApp'));