(function (app) {
    'use strict';

    app.factory('ganttService', ['$q', '$timeout', '$http',
        function ($q, $timeout, $http) {

            var auditoriums = [
            {
                description: "Auditorium 1",
                id: "2f85dbeb-0845-404e-934e-218bf39750c0",
                order: 0
            },
            {
                description: "Auditorium 2",
                id: "b8d10927-cf50-48bd-a056-3554decab824",
                order: 1
            },
            {
                description: "Auditorium 3",
                id: "c65c2672-445d-4297-a7f2-30de241b3145",
                order: 2
            },
            {
                description: "Auditorium 4",
                id: "dd2e7a97-1622-4521-a807-f29960218785",
                order: 3
            },
            {
                description: "Auditorium 5",
                id: "dd2e7a97-1622-4521-a807-f299602187856",
                order: 4
            },
            {
                description: "Auditorium 6",
                id: "dd2e7a97-1622-4521-a807-f2996021878568",
                order: 5
            }
            ];

            var schedules = [
            {
                date: '2013-10-22',
                performances: [
                {
                    id: "f55549b5-e449-4b0c-9f4b-8b33381f7d76",
                    movieId: 4,
                    auditorium: "2f85dbeb-0845-404e-934e-218bf39750c0",
                    from: "2013-10-22T06:00:00.549Z",
                    modifiers: [
                        {
                            "name": "D-Box",
                            "icon": "../app/img/experiences/dbox.png"
                        },
                        {
                            "name": "Imax",
                            "icon": "../app/img/experiences/imax.png"
                        },
                        {
                            "name": "Thx",
                            "icon": "../app/img/experiences/thx.png"
                        },
                        {
                            "name": "3D",
                            "icon": "../app/img/experiences/3d.png"
                        },
                        {
                            "name": "4D",
                            "icon": "../app/img/experiences/4d.png"
                        },
                        {
                            "name": "CC",
                            "icon": "../app/img/experiences/cc.png"
                        },
                        {
                            "name": "5D",
                            "icon": "../app/img/experiences/5d.png"
                        }
                    ]
                },
                {
                    id: "5e997eb3-4311-46b1-a1b4-7e8663ea8b0b",
                    movieId: 3,
                    auditorium: "2f85dbeb-0845-404e-934e-218bf39750c0",
                    from: "2013-10-22T14:05:00.549Z",
                    modifiers: [
                        {
                            "name": "D-Box",
                            "icon": "../app/img/experiences/dbox.png"
                        },
                        {
                            "name": "Imax",
                            "icon": "../app/img/experiences/imax.png"
                        },
                        {
                            "name": "Thx",
                            "icon": "../app/img/experiences/thx.png"
                        },
                        {
                            "name": "3D",
                            "icon": "../app/img/experiences/3d.png"
                        },
                        {
                            "name": "4D",
                            "icon": "../app/img/experiences/4d.png"
                        }
                    ]
                },
                {
                    id: "b6a1c25c-85ae-4991-8502-b2b5127bc47c",
                    movieId: 2,
                    auditorium: "2f85dbeb-0845-404e-934e-218bf39750c0",
                    from: "2013-10-22T16:30:56.549Z",
                    modifiers: [
                        {
                            "name": "D-Box",
                            "icon": "../app/img/experiences/dbox.png"
                        },
                        {
                            "name": "Imax",
                            "icon": "../app/img/experiences/imax.png"
                        },
                        {
                            "name": "Thx",
                            "icon": "../app/img/experiences/thx.png"
                        },
                        {
                            "name": "3D",
                            "icon": "../app/img/experiences/3d.png"
                        },
                        {
                            "name": "4D",
                            "icon": "../app/img/experiences/4d.png"
                        }
                    ]
                },
                {
                    id: "301d781f-1ef0-4c35-8398-478b641c0658",
                    movieId: 5,
                    auditorium: "b8d10927-cf50-48bd-a056-3554decab824",
                    from: "2013-10-22T09:15:56.549Z",
                    modifiers: [
                        {
                            "name": "D-Box",
                            "icon": "../app/img/experiences/dbox.png"
                        },
                        {
                            "name": "Imax",
                            "icon": "../app/img/experiences/imax.png"
                        },
                        {
                            "name": "Thx",
                            "icon": "../app/img/experiences/thx.png"
                        },
                        {
                            "name": "3D",
                            "icon": "../app/img/experiences/3d.png"
                        },
                        {
                            "name": "4D",
                            "icon": "../app/img/experiences/4d.png"
                        },
                        {
                            "name": "CC",
                            "icon": "../app/img/experiences/cc.png"
                        },
                        {
                            "name": "5D",
                            "icon": "../app/img/experiences/5d.png"
                        }
                    ]
                },
                {
                    id: "0fbf344a-cb43-4b20-8003-a789ba803ad8",
                    movieId: 1,
                    auditorium: "b8d10927-cf50-48bd-a056-3554decab824",
                    from: "2013-10-22T21:05:00.000Z",
                    modifiers: [
                        {
                            "name": "Imax",
                            "icon": "../app/img/experiences/imax.png"
                        },
                        {
                            "name": "Thx",
                            "icon": "../app/img/experiences/thx.png"
                        },
                        {
                            "name": "3D",
                            "icon": "../app/img/experiences/3d.png"
                        },
                        {
                            "name": "4D",
                            "icon": "../app/img/experiences/4d.png"
                        },
                        {
                            "name": "CC",
                            "icon": "../app/img/experiences/cc.png"
                        },
                        {
                            "name": "5D",
                            "icon": "../app/img/experiences/5d.png"
                        }
                    ]
                },
                {
                    id: "73294eca-de4c-4f35-aa9b-ae25481067ba",
                    movieId: 10,
                    auditorium: "b8d10927-cf50-48bd-a056-3554decab824",
                    from: "2013-10-22T17:25:00.000Z",
                    modifiers: [
                        {
                            "name": "D-Box",
                            "icon": "../app/img/experiences/dbox.png"
                        },
                        {
                            "name": "Imax",
                            "icon": "../app/img/experiences/imax.png"
                        },
                        {
                            "name": "Thx",
                            "icon": "../app/img/experiences/thx.png"
                        },
                        {
                            "name": "3D",
                            "icon": "../app/img/experiences/3d.png"
                        },
                        {
                            "name": "4D",
                            "icon": "../app/img/experiences/4d.png"
                        },
                        {
                            "name": "5D",
                            "icon": "../app/img/experiences/5d.png"
                        }
                    ]
                },
                {
                    id: "3ade9339-f7d7-4b03-a89f-e491e12f691a",
                    movieId: 16,
                    auditorium: "c65c2672-445d-4297-a7f2-30de241b3145",
                    from: "2013-10-22T15:45:00.000Z",
                    modifiers: [
                        {
                            "name": "D-Box",
                            "icon": "../app/img/experiences/dbox.png"
                        },
                        {
                            "name": "Imax",
                            "icon": "../app/img/experiences/imax.png"
                        },
                        {
                            "name": "3D",
                            "icon": "../app/img/experiences/3d.png"
                        },
                        {
                            "name": "4D",
                            "icon": "../app/img/experiences/4d.png"
                        },
                        {
                            "name": "CC",
                            "icon": "../app/img/experiences/cc.png"
                        },
                        {
                            "name": "5D",
                            "icon": "../app/img/experiences/5d.png"
                        }
                    ]
                },
                {
                    id: "4e197e4d-02a4-490e-b920-4881c3ba8eb7",
                    movieId: 7,
                    auditorium: "c65c2672-445d-4297-a7f2-30de241b3145",
                    from: "2013-10-22T14:05:00.000Z",
                    modifiers: [
                        {
                            "name": "D-Box",
                            "icon": "../app/img/experiences/dbox.png"
                        },
                        {
                            "name": "Imax",
                            "icon": "../app/img/experiences/imax.png"
                        },
                        {
                            "name": "3D",
                            "icon": "../app/img/experiences/3d.png"
                        },
                        {
                            "name": "4D",
                            "icon": "../app/img/experiences/4d.png"
                        },
                        {
                            "name": "CC",
                            "icon": "../app/img/experiences/cc.png"
                        },
                        {
                            "name": "5D",
                            "icon": "../app/img/experiences/5d.png"
                        }
                    ]
                },
                {
                    id: "451046c0-9b17-4eaf-aee0-4e17fcfce6ae",
                    movieId: 18,
                    auditorium: "c65c2672-445d-4297-a7f2-30de241b3145",
                    from: "2013-10-22T11:00:00.000Z",
                    modifiers: [
                        {
                            "name": "D-Box",
                            "icon": "../app/img/experiences/dbox.png"
                        },
                        {
                            "name": "Imax",
                            "icon": "../app/img/experiences/imax.png"
                        },
                        {
                            "name": "Thx",
                            "icon": "../app/img/experiences/thx.png"
                        },
                        {
                            "name": "3D",
                            "icon": "../app/img/experiences/3d.png"
                        },
                        {
                            "name": "4D",
                            "icon": "../app/img/experiences/4d.png"
                        },
                        {
                            "name": "CC",
                            "icon": "../app/img/experiences/cc.png"
                        }
                    ]
                },
                {
                    id: "fcc568c5-53b0-4046-8f19-265ebab34c0b",
                    movieId: 8,
                    auditorium: "c65c2672-445d-4297-a7f2-30de241b3145",
                    from: "2013-10-22T18:05:00.000Z",
                    modifiers: [
                        {
                            "name": "3D",
                            "icon": "../app/img/experiences/3d.png"
                        },
                        {
                            "name": "Imax",
                            "icon": "../app/img/experiences/imax.png"
                        }
                    ]
                },
                {
                    id: "cd3b9015-66d4-4f97-be83-cb24c0de30b6",
                    movieId: 13,
                    auditorium: "dd2e7a97-1622-4521-a807-f29960218785",
                    from: "2013-10-22T17:05:00.000Z",
                    modifiers: [
                        {
                            "name": "D-Box",
                            "icon": "../app/img/experiences/dbox.png"
                        },
                        {
                            "name": "Imax",
                            "icon": "../app/img/experiences/imax.png"
                        },
                        {
                            "name": "Thx",
                            "icon": "../app/img/experiences/thx.png"
                        },
                        {
                            "name": "3D",
                            "icon": "../app/img/experiences/3d.png"
                        },
                        {
                            "name": "CC",
                            "icon": "../app/img/experiences/cc.png"
                        },
                        {
                            "name": "5D",
                            "icon": "../app/img/experiences/5d.png"
                        }
                    ]
                },
                {
                    id: "047399bf-e927-4fa1-8a56-09e8cf78bcbe",
                    movieId: 14,
                    auditorium: "dd2e7a97-1622-4521-a807-f299602187856",
                    from: "2013-10-22T19:30:00.000Z",
                    modifiers: [
                        {
                            "name": "D-Box",
                            "icon": "../app/img/experiences/dbox.png"
                        },
                        {
                            "name": "Imax",
                            "icon": "../app/img/experiences/imax.png"
                        },
                        {
                            "name": "Thx",
                            "icon": "../app/img/experiences/thx.png"
                        },
                        {
                            "name": "3D",
                            "icon": "../app/img/experiences/3d.png"
                        },
                        {
                            "name": "4D",
                            "icon": "../app/img/experiences/4d.png"
                        },
                        {
                            "name": "5D",
                            "icon": "../app/img/experiences/5d.png"
                        }
                    ]
                },
                {
                    id: "9c17a6c8-ce8c-4426-8693-a0965ff0fe69AA5A8",
                    movieId: 9,
                    auditorium: "dd2e7a97-1622-4521-a807-f2996021878568",
                    from: "2013-10-22T18:00:00.000Z",
                    modifiers: [
                        {
                            "name": "D-Box",
                            "icon": "../app/img/experiences/dbox.png"
                        },
                        {
                            "name": "Imax",
                            "icon": "../app/img/experiences/imax.png"
                        },
                        {
                            "name": "4D",
                            "icon": "../app/img/experiences/4d.png"
                        },
                        {
                            "name": "CC",
                            "icon": "../app/img/experiences/cc.png"
                        },
                        {
                            "name": "5D",
                            "icon": "../app/img/experiences/5d.png"
                        }
                    ]
                }
                ]
            },
            {
                date: '2013-10-23',
                performances: [
                {
                    id: "108cb727-7a77-4cd7-9afb-3e98d554ae7f",
                    movieId: 4,
                    auditorium: "2f85dbeb-0845-404e-934e-218bf39750c0",
                    from: "2013-10-23T06:00:00.549Z",
                    modifiers: [
                        {
                            "name": "D-Box",
                            "icon": "../app/img/experiences/dbox.png"
                        },
                        {
                            "name": "Imax",
                            "icon": "../app/img/experiences/imax.png"
                        },
                        {
                            "name": "Thx",
                            "icon": "../app/img/experiences/thx.png"
                        },
                        {
                            "name": "3D",
                            "icon": "../app/img/experiences/3d.png"
                        },
                        {
                            "name": "4D",
                            "icon": "../app/img/experiences/4d.png"
                        },
                        {
                            "name": "CC",
                            "icon": "../app/img/experiences/cc.png"
                        },
                        {
                            "name": "5D",
                            "icon": "../app/img/experiences/5d.png"
                        }
                    ]
                },
                {
                    id: "d871ebcd-e177-448e-853f-4aeabb42bc64",
                    movieId: 10,
                    auditorium: "b8d10927-cf50-48bd-a056-3554decab824",
                    from: "2013-10-23T17:25:00.000Z",
                    modifiers: [
                        {
                            "name": "D-Box",
                            "icon": "../app/img/experiences/dbox.png"
                        },
                        {
                            "name": "Imax",
                            "icon": "../app/img/experiences/imax.png"
                        },
                        {
                            "name": "Thx",
                            "icon": "../app/img/experiences/thx.png"
                        },
                        {
                            "name": "3D",
                            "icon": "../app/img/experiences/3d.png"
                        },
                        {
                            "name": "4D",
                            "icon": "../app/img/experiences/4d.png"
                        },
                        {
                            "name": "5D",
                            "icon": "../app/img/experiences/5d.png"
                        }
                    ]
                },
                {
                    id: "379374c1-5310-4858-9efa-e24ce702ba44",
                    movieId: 16,
                    auditorium: "c65c2672-445d-4297-a7f2-30de241b3145",
                    from: "2013-10-23T15:45:00.000Z",
                    modifiers: [
                        {
                            "name": "D-Box",
                            "icon": "../app/img/experiences/dbox.png"
                        },
                        {
                            "name": "Imax",
                            "icon": "../app/img/experiences/imax.png"
                        },
                        {
                            "name": "3D",
                            "icon": "../app/img/experiences/3d.png"
                        },
                        {
                            "name": "4D",
                            "icon": "../app/img/experiences/4d.png"
                        },
                        {
                            "name": "CC",
                            "icon": "../app/img/experiences/cc.png"
                        },
                        {
                            "name": "5D",
                            "icon": "../app/img/experiences/5d.png"
                        }
                    ]
                },
                {
                    id: "0c6949df-d6b5-4c56-a2ef-601c8e097142",
                    movieId: 8,
                    auditorium: "c65c2672-445d-4297-a7f2-30de241b3145",
                    from: "2013-10-23T18:05:00.000Z",
                    modifiers: [
                        {
                            "name": "3D",
                            "icon": "../app/img/experiences/3d.png"
                        },
                        {
                            "name": "Imax",
                            "icon": "../app/img/experiences/imax.png"
                        }
                    ]
                },
                {
                    id: "dfbffa6b-33b5-418f-b016-0840f58e925d",
                    movieId: 13,
                    auditorium: "dd2e7a97-1622-4521-a807-f29960218785",
                    from: "2013-10-23T17:05:00.000Z",
                    modifiers: [
                        {
                            "name": "D-Box",
                            "icon": "../app/img/experiences/dbox.png"
                        },
                        {
                            "name": "Imax",
                            "icon": "../app/img/experiences/imax.png"
                        },
                        {
                            "name": "Thx",
                            "icon": "../app/img/experiences/thx.png"
                        },
                        {
                            "name": "3D",
                            "icon": "../app/img/experiences/3d.png"
                        },
                        {
                            "name": "CC",
                            "icon": "../app/img/experiences/cc.png"
                        },
                        {
                            "name": "5D",
                            "icon": "../app/img/experiences/5d.png"
                        }
                    ]
                },
                {
                    id: "763973c6-9c6b-409a-8f5d-c3e2fbcc1b38",
                    movieId: 14,
                    auditorium: "dd2e7a97-1622-4521-a807-f299602187856",
                    from: "2013-10-23T19:30:00.000Z",
                    modifiers: [
                        {
                            "name": "D-Box",
                            "icon": "../app/img/experiences/dbox.png"
                        },
                        {
                            "name": "Imax",
                            "icon": "../app/img/experiences/imax.png"
                        },
                        {
                            "name": "Thx",
                            "icon": "../app/img/experiences/thx.png"
                        },
                        {
                            "name": "3D",
                            "icon": "../app/img/experiences/3d.png"
                        },
                        {
                            "name": "4D",
                            "icon": "../app/img/experiences/4d.png"
                        },
                        {
                            "name": "5D",
                            "icon": "../app/img/experiences/5d.png"
                        }
                    ]
                },
                {
                    id: "641ec7c8-e0f0-4bb9-9a40-4e73eaf9a58f",
                    movieId: 9,
                    auditorium: "dd2e7a97-1622-4521-a807-f2996021878568",
                    from: "2013-10-23T18:00:00.000Z",
                    modifiers: [
                        {
                            "name": "D-Box",
                            "icon": "../app/img/experiences/dbox.png"
                        },
                        {
                            "name": "Imax",
                            "icon": "../app/img/experiences/imax.png"
                        },
                        {
                            "name": "4D",
                            "icon": "../app/img/experiences/4d.png"
                        },
                        {
                            "name": "CC",
                            "icon": "../app/img/experiences/cc.png"
                        },
                        {
                            "name": "5D",
                            "icon": "../app/img/experiences/5d.png"
                        }
                    ]
                }
                ]

            },
            {
                date: '2013-10-24',
                performances: [
                {
                    id: "2ff448be-3dea-41cc-bf18-689e7ca322f3",
                    movieId: 4,
                    auditorium: "2f85dbeb-0845-404e-934e-218bf39750c0",
                    from: "2013-10-24T06:00:00.549Z",
                    modifiers: [
                        {
                            "name": "D-Box",
                            "icon": "../app/img/experiences/dbox.png"
                        },
                        {
                            "name": "Imax",
                            "icon": "../app/img/experiences/imax.png"
                        },
                        {
                            "name": "Thx",
                            "icon": "../app/img/experiences/thx.png"
                        },
                        {
                            "name": "3D",
                            "icon": "../app/img/experiences/3d.png"
                        },
                        {
                            "name": "4D",
                            "icon": "../app/img/experiences/4d.png"
                        },
                        {
                            "name": "CC",
                            "icon": "../app/img/experiences/cc.png"
                        },
                        {
                            "name": "5D",
                            "icon": "../app/img/experiences/5d.png"
                        }
                    ]
                },
                {
                    id: "64e45a9d-551b-47cf-ad6c-a54495ca9aab",
                    movieId: 10,
                    auditorium: "b8d10927-cf50-48bd-a056-3554decab824",
                    from: "2013-10-24T17:05:00.000Z",
                    modifiers: [
                        {
                            "name": "D-Box",
                            "icon": "../app/img/experiences/dbox.png"
                        },
                        {
                            "name": "Imax",
                            "icon": "../app/img/experiences/imax.png"
                        },
                        {
                            "name": "Thx",
                            "icon": "../app/img/experiences/thx.png"
                        },
                        {
                            "name": "3D",
                            "icon": "../app/img/experiences/3d.png"
                        },
                        {
                            "name": "4D",
                            "icon": "../app/img/experiences/4d.png"
                        },
                        {
                            "name": "5D",
                            "icon": "../app/img/experiences/5d.png"
                        }
                    ]
                },
                {
                    id: "3d3fbe82-e6e6-4b21-90eb-6254b1eda0c2",
                    movieId: 16,
                    auditorium: "c65c2672-445d-4297-a7f2-30de241b3145",
                    from: "2013-10-24T15:45:00.000Z",
                    modifiers: [
                        {
                            "name": "D-Box",
                            "icon": "../app/img/experiences/dbox.png"
                        },
                        {
                            "name": "Imax",
                            "icon": "../app/img/experiences/imax.png"
                        },
                        {
                            "name": "3D",
                            "icon": "../app/img/experiences/3d.png"
                        },
                        {
                            "name": "4D",
                            "icon": "../app/img/experiences/4d.png"
                        },
                        {
                            "name": "CC",
                            "icon": "../app/img/experiences/cc.png"
                        },
                        {
                            "name": "5D",
                            "icon": "../app/img/experiences/5d.png"
                        }
                    ]
                },
                {
                    id: "32993b64-b6a2-41b0-86a0-85bdbb7afe8d",
                    movieId: 8,
                    auditorium: "c65c2672-445d-4297-a7f2-30de241b3145",
                    from: "2013-10-24T18:05:00.000Z",
                    modifiers: [
                        {
                            "name": "3D",
                            "icon": "../app/img/experiences/3d.png"
                        },
                        {
                            "name": "Imax",
                            "icon": "../app/img/experiences/imax.png"
                        }
                    ]
                },
                {
                    id: "19a04ecb-ec00-4774-8692-8b5f4570a3a4",
                    movieId: 13,
                    auditorium: "dd2e7a97-1622-4521-a807-f29960218785",
                    from: "2013-10-24T17:05:00.000Z",
                    modifiers: [
                        {
                            "name": "D-Box",
                            "icon": "../app/img/experiences/dbox.png"
                        },
                        {
                            "name": "Imax",
                            "icon": "../app/img/experiences/imax.png"
                        },
                        {
                            "name": "Thx",
                            "icon": "../app/img/experiences/thx.png"
                        },
                        {
                            "name": "3D",
                            "icon": "../app/img/experiences/3d.png"
                        },
                        {
                            "name": "CC",
                            "icon": "../app/img/experiences/cc.png"
                        },
                        {
                            "name": "5D",
                            "icon": "../app/img/experiences/5d.png"
                        }
                    ]
                },
                {
                    id: "2929d9d2-3ba6-4532-a730-7c3310d07180",
                    movieId: 14,
                    auditorium: "dd2e7a97-1622-4521-a807-f299602187856",
                    from: "2013-10-24T19:30:00.000Z",
                    modifiers: [
                        {
                            "name": "D-Box",
                            "icon": "../app/img/experiences/dbox.png"
                        },
                        {
                            "name": "Imax",
                            "icon": "../app/img/experiences/imax.png"
                        },
                        {
                            "name": "Thx",
                            "icon": "../app/img/experiences/thx.png"
                        },
                        {
                            "name": "3D",
                            "icon": "../app/img/experiences/3d.png"
                        },
                        {
                            "name": "4D",
                            "icon": "../app/img/experiences/4d.png"
                        },
                        {
                            "name": "5D",
                            "icon": "../app/img/experiences/5d.png"
                        }
                    ]
                },
                {
                    id: "bcd3e1a8-28c8-4671-91e7-6f0144b621d0",
                    movieId: 9,
                    auditorium: "dd2e7a97-1622-4521-a807-f2996021878568",
                    from: "2013-10-24T18:00:00.000Z",
                    modifiers: [
                        {
                            "name": "D-Box",
                            "icon": "../app/img/experiences/dbox.png"
                        },
                        {
                            "name": "Imax",
                            "icon": "../app/img/experiences/imax.png"
                        },
                        {
                            "name": "4D",
                            "icon": "../app/img/experiences/4d.png"
                        },
                        {
                            "name": "CC",
                            "icon": "../app/img/experiences/cc.png"
                        },
                        {
                            "name": "5D",
                            "icon": "../app/img/experiences/5d.png"
                        }
                    ]
                }
                ]

            },
            {
                date: '2013-10-25',
                performances: [
                {
                    id: "2b9cf62e-062d-477d-8abc-57d6b6d9830d",
                    movieId: 11,
                    auditorium: "b8d10927-cf50-48bd-a056-3554decab824",
                    from: "2013-10-25T16:00:00.000Z",
                    modifiers: [
                        {
                            "name": "D-Box",
                            "icon": "../app/img/experiences/dbox.png"
                        },
                        {
                            "name": "Imax",
                            "icon": "../app/img/experiences/imax.png"
                        },
                        {
                            "name": "Thx",
                            "icon": "../app/img/experiences/thx.png"
                        },
                        {
                            "name": "3D",
                            "icon": "../app/img/experiences/3d.png"
                        },
                        {
                            "name": "4D",
                            "icon": "../app/img/experiences/4d.png"
                        },
                        {
                            "name": "CC",
                            "icon": "../app/img/experiences/cc.png"
                        },
                        {
                            "name": "5D",
                            "icon": "../app/img/experiences/5d.png"
                        }
                    ]
                }
                ]

            }
            ];

            function formatDate(inputDate) {
                var pattern = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d{3})?/;

                var dt = inputDate.match(pattern);
                if (dt && dt.length > 0) {
                    return new Date(dt[1], dt[2] - 1, dt[3], dt[4], dt[5], 0);
                }
                return null;
            }

            function getGanttContent(date) {
                var data = [];
                var stringDate = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + date.getDate();

                var deferred = $q.defer();
                $timeout(function () {
                    $http.get('../data/moviesCollection.json').success(function (movies) {
                        _.each(auditoriums, function (aud) {
                            data.push({
                                id: aud.id,
                                description: aud.description,
                                order: aud.order,
                                tasks: []
                            });
                        });

                        var schedule = _.find(schedules, function (s) {
                            return s.date == stringDate;
                        });

                        if (schedule) {
                            _.each(schedule.performances, function (performance) {
                                var auditorium = _.find(data, function (aud) {
                                    return aud.id == performance.auditorium;
                                });
                                var movie = _.find(movies, function (m) {
                                    return m.id == performance.movieId;
                                });
                                var formattedFrom = formatDate(performance.from);
                                var task = {
                                    id: performance.id,
                                    subject: movie.name,
                                    from: formattedFrom,
                                    to: new Date(formattedFrom.getTime() + movie.duration * 60000),
                                    data: {
                                        duration: movie.duration,
                                        rating: movie.rating,
                                        modifiers: performance.modifiers,
                                        movieId: movie.id,
                                        image: movie.image
                                    }
                                };
                                auditorium.tasks.push(task);

                            });
                        }

                        deferred.resolve(data);
                    });
                }, 30);

                return deferred.promise;
            };

            function getGanttAllFeatures() {
                var deferred = $q.defer();

                $timeout(function () {
                    $http.get('../data/ganttFeatures.json').success(function (data) {
                        deferred.resolve(data);
                    });
                }, 30);

                return deferred.promise;
            };

            function getExistingFeatures() {
                var deferred = $q.defer();

                $timeout(function () {
                    $http.get('../data/moviesCollection.json').success(function (data) {
                        deferred.resolve(data);
                    });
                }, 30);
                return deferred.promise;
            };

            function reIterateOverlappingTasks(data) {
                var overlapps = [];
                _.each(data, function (row) {
                    _.each(row.tasks, function (task) {
                        if (task.data.overlapping) {
                            var currentTask = angular.copy(task);
                            currentTask.row = {
                                id: row.id
                            };
                            currentTask.data.overlapping = false;
                            overlapps.push(currentTask);
                            task.data.overlapping = false;
                        }
                    });
                });

                _.each(overlapps, function (task) {
                    if (!task.data.overlapping) {
                        setOverlappingFlags(task, data);
                    }
                });
            };

            function setOverlappingFlags(currentTask, data, currentRow) {
                for (var i = 0; i < data.length; i++) {
                    var row = data[i];
                    for (var j = 0; j < row.tasks.length; j++) {
                        var task = row.tasks[j];

                        currentRow = currentRow || currentTask.row;
                        if (currentTask.id === task.id || row.id !== currentRow.id) {
                            continue;
                        }
                        if ((currentTask.from >= task.from && currentTask.from < task.to) || (currentTask.to > task.from && currentTask.to <= task.to)) {
                            currentTask.data.overlapping = true;
                            task.data.overlapping = true;
                        }
                    }
                }
            }

            function prepareCopyData(data, copyDate, preview) {
                var copySet = [];
                var anythingToCopy = false;
                _.each(data, function (row) {
                    var rowWithTasks = angular.copy(row);
                    if (rowWithTasks.tasks) {
                        rowWithTasks.tasks.length = 0;
                    }

                    _.each(row.tasks, function (task) {
                        if (task.data.copying) {
                            var copyTask = angular.copy(task);
                            if (preview) {
                                copyTask.data.preview = true;
                            } else {
                                delete copyTask.data.preview;
                                delete copyTask.data.unmodifiedValues;
                            }
                            delete copyTask.data.copying;
                            copyTask.from = new Date(copyDate.getFullYear(), copyDate.getMonth(), copyDate.getDate(), task.from.getHours(), task.from.getMinutes());
                            copyTask.to = new Date(copyDate.getFullYear(), copyDate.getMonth(), copyDate.getDate(), task.to.getHours(), task.to.getMinutes());
                            rowWithTasks.tasks.push(copyTask);
                            anythingToCopy = true;
                        }
                    });

                    copySet.push(rowWithTasks);
                });
                return {
                    anythingToCopy: anythingToCopy,
                    data: copySet
                };
            }

            function checkForUnsavedChanges(data) {
                var unsavedChanges = false;
                _.some(data, function (row) {
                    return _.some(row.tasks, function (task) {
                        if (task.data.preview) {
                            unsavedChanges = true;
                            return true;
                        }
                        return false;
                    });
                });

                return unsavedChanges;
            }

            function getAllSchedules() {
                return schedules;
            }

            return {
                getGanttAllFeatures: getGanttAllFeatures,
                getGanttContent: getGanttContent,
                setOverlappingFlags: setOverlappingFlags,
                reIterateOverlappingTasks: reIterateOverlappingTasks,
                prepareCopyData: prepareCopyData,
                checkForUnsavedChanges: checkForUnsavedChanges,
                getAllSchedules: getAllSchedules,
                getExistingFeatures: getExistingFeatures
            };
        }]);
})(angular.module('myApp'));