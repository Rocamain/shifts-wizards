import { DayShiftsMap, Shift, Week } from "./rota";

enum Weekday {
  SUNDAY = 0,
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
}

export const WEEKDAYS = [
  Weekday.SUNDAY,
  Weekday.MONDAY,
  Weekday.TUESDAY,
  Weekday.WEDNESDAY,
  Weekday.THURSDAY,
  Weekday.FRIDAY,
  Weekday.SATURDAY,
];

export const WEEKDAY_NAMES: { [key in Weekday]: string } = {
  [Weekday.SUNDAY]: "Sunday",
  [Weekday.MONDAY]: "Monday",
  [Weekday.TUESDAY]: "Tuesday",
  [Weekday.WEDNESDAY]: "Wednesday",
  [Weekday.THURSDAY]: "Thursday",
  [Weekday.FRIDAY]: "Friday",
  [Weekday.SATURDAY]: "Saturday",
};

export const INITIAL_WEEK: Week = new Map([
  [0, new Map<string, Shift>()],
  [1, new Map<string, Shift>()],
  [2, new Map<string, Shift>()],
  [3, new Map<string, Shift>()],
  [4, new Map<string, Shift>()],
  [5, new Map<string, Shift>()],
  [6, new Map<string, Shift>()],
]);

export const MAX_HOURS_PER_DAY = 13;

export const QUARTER_HOUR = 15 * 60; // 900 s

export const QUARTER_HOUR_MS = 15 * 60 * 1000; // 900000 ms

export const SAMPLE: Week = new Map<Weekday, DayShiftsMap>([
  [
    Weekday.SUNDAY,
    new Map<string, Shift>([
      [
        "5eba2495-d931-431d-b2c2-91bbefa1cff5",
        {
          candidates: ["4", "2", "3"],
          day: 0,
          employeeRole: "TL",
          endTime: "14:00",
          id: "5eba2495-d931-431d-b2c2-91bbefa1cff5",
          startTime: "06:00",
        },
      ],
      [
        "73862b4b-3294-4050-83f0-323b80d5785e",
        {
          candidates: ["4", "2", "3", "1"],
          day: 0,
          employeeRole: "TL",
          endTime: "22:00",
          id: "73862b4b-3294-4050-83f0-323b80d5785e",
          startTime: "14:00",
        },
      ],
      [
        "a6009950-ccb9-4fca-a5c4-5a0dfc229415",
        {
          candidates: ["ctm-2", "ctm-3", "ctm-4", "ctm-5", "ctm-7", "ctm-10"],
          day: 0,
          employeeRole: "BAKER",
          endTime: "12:00",
          id: "a6009950-ccb9-4fca-a5c4-5a0dfc229415",
          startTime: "06:00",
        },
      ],
      [
        "9617ac12-fc2b-4dd6-95de-6a28b83d2408",
        {
          candidates: [
            "ctm-1",
            "ctm-2",
            "ctm-3",
            "ctm-4",
            "ctm-5",
            "ctm-6",
            "ctm-7",
            "ctm-11",
            "ctm-10",
            "ctm-8",
          ],
          day: 0,
          employeeRole: "CTM",
          endTime: "16:00",
          id: "9617ac12-fc2b-4dd6-95de-6a28b83d2408",
          startTime: "07:00",
        },
      ],
      [
        "1ae01246-edd4-4d6a-8989-1d14c59161e2",
        {
          candidates: [
            "ctm-1",
            "ctm-2",
            "ctm-3",
            "ctm-4",
            "ctm-5",
            "ctm-6",
            "ctm-7",
            "ctm-11",
            "ctm-10",
            "ctm-8",
          ],
          day: 0,
          employeeRole: "CTM",
          endTime: "22:00",
          id: "1ae01246-edd4-4d6a-8989-1d14c59161e2",
          startTime: "14:00",
        },
      ],
      [
        "1a1c5f6f-f1d5-4271-8ea1-a63824902cfe",
        {
          candidates: [
            "ctm-1",
            "ctm-2",
            "ctm-3",
            "ctm-4",
            "ctm-5",
            "ctm-6",
            "ctm-7",
            "ctm-11",
            "ctm-10",
            "ctm-8",
          ],
          day: 0,
          employeeRole: "CTM",
          endTime: "22:00",
          id: "1a1c5f6f-f1d5-4271-8ea1-a63824902cfe",
          startTime: "17:00",
        },
      ],
    ]),
  ],
  [
    Weekday.MONDAY,
    new Map<string, Shift>([
      [
        "228daebc-6dee-47aa-a690-2ab8572e7f1b",
        {
          candidates: ["4", "2", "3", "1"],
          day: 1,
          employeeRole: "TL",
          endTime: "14:00",
          id: "228daebc-6dee-47aa-a690-2ab8572e7f1b",
          startTime: "06:00",
        },
      ],
      [
        "f03b4adb-f118-4194-8f5a-85f01681b8ca",
        {
          candidates: ["4", "3", "1"],
          day: 1,
          employeeRole: "TL",
          endTime: "20:00",
          id: "f03b4adb-f118-4194-8f5a-85f01681b8ca",
          startTime: "12:00",
        },
      ],
      [
        "dec6def5-6d56-4f14-acc4-3f9c8273c9fb",
        {
          candidates: ["4", "3", "1"],
          day: 1,
          employeeRole: "TL",
          endTime: "22:00",
          id: "dec6def5-6d56-4f14-acc4-3f9c8273c9fb",
          startTime: "14:00",
        },
      ],
      [
        "ef13795e-3d8f-4bf2-8dc7-c5062952ca4b",
        {
          candidates: ["ctm-2", "ctm-3", "ctm-4", "ctm-5", "ctm-7", "ctm-10"],
          day: 1,
          employeeRole: "BAKER",
          endTime: "11:00",
          id: "ef13795e-3d8f-4bf2-8dc7-c5062952ca4b",
          startTime: "06:00",
        },
      ],
      [
        "c56f6a61-23b9-4cf9-9bc4-fe71c87319e0",
        {
          candidates: [
            "ctm-2",
            "ctm-3",
            "ctm-4",
            "ctm-5",
            "ctm-6",
            "ctm-7",
            "ctm-11",
            "ctm-10",
            "ctm-9",
            "ctm-8",
          ],
          day: 1,
          employeeRole: "CTM",
          endTime: "18:00",
          id: "c56f6a61-23b9-4cf9-9bc4-fe71c87319e0",
          startTime: "10:00",
        },
      ],
      [
        "b8711959-8290-4017-92bb-a1d35c871342",
        {
          candidates: [
            "ctm-2",
            "ctm-3",
            "ctm-4",
            "ctm-5",
            "ctm-6",
            "ctm-7",
            "ctm-11",
            "ctm-10",
            "ctm-9",
            "ctm-8",
          ],
          day: 1,
          employeeRole: "CTM",
          endTime: "22:00",
          id: "b8711959-8290-4017-92bb-a1d35c871342",
          startTime: "14:00",
        },
      ],
      [
        "127549b2-be53-4746-8598-8fa56cc66e3d",
        {
          candidates: [
            "ctm-2",
            "ctm-3",
            "ctm-4",
            "ctm-5",
            "ctm-6",
            "ctm-7",
            "ctm-11",
            "ctm-10",
            "ctm-9",
            "ctm-8",
          ],
          day: 1,
          employeeRole: "CTM",
          endTime: "22:00",
          id: "127549b2-be53-4746-8598-8fa56cc66e3d",
          startTime: "18:00",
        },
      ],
    ]),
  ],
  [
    Weekday.TUESDAY,
    new Map<string, Shift>([
      [
        "c44c2267-c253-4efa-9076-0e107dc3c514",
        {
          candidates: ["4", "2", "3", "1"],
          day: 2,
          employeeRole: "TL",
          endTime: "14:00",
          id: "c44c2267-c253-4efa-9076-0e107dc3c514",
          startTime: "06:00",
        },
      ],
      [
        "c73f84c6-7f03-45ec-bb31-54c62de59dc0",
        {
          candidates: ["4", "3"],

          day: 2,
          employeeRole: "TL",
          endTime: "22:00",
          id: "c73f84c6-7f03-45ec-bb31-54c62de59dc0",
          startTime: "14:00",
        },
      ],
      [
        "11ae7cc1-dfd8-4c40-a601-802bef7f2405",
        {
          candidates: ["ctm-2", "ctm-3", "ctm-4", "ctm-5", "ctm-10"],

          day: 2,
          employeeRole: "BAKER",
          endTime: "12:00",
          id: "11ae7cc1-dfd8-4c40-a601-802bef7f2405",
          startTime: "06:00",
        },
      ],
      [
        "7e0ffd54-1eec-47fa-8cbf-46c0e3e25bee",
        {
          day: 2,
          startTime: "09:00",
          endTime: "16:00",
          id: "7e0ffd54-1eec-47fa-8cbf-46c0e3e25bee",
          employeeRole: "CTM",
          candidates: [
            "ctm-1",
            "ctm-2",
            "ctm-3",
            "ctm-4",
            "ctm-5",
            "ctm-6",
            "ctm-11",
            "ctm-10",
            "ctm-9",
            "ctm-8",
          ],
        },
      ],
      [
        "987bcf65-dcdd-4a3e-aead-1bf31dceb5a1",
        {
          candidates: [
            "ctm-1",
            "ctm-2",
            "ctm-3",
            "ctm-4",
            "ctm-5",
            "ctm-6",
            "ctm-11",
            "ctm-10",
            "ctm-9",
            "ctm-8",
          ],

          day: 2,
          employeeRole: "CTM",
          endTime: "22:00",
          id: "987bcf65-dcdd-4a3e-aead-1bf31dceb5a1",
          startTime: "14:00",
        },
      ],
      [
        "205bb9d9-e225-4c91-a28a-fdaca8164009",
        {
          day: 2,
          startTime: "18:00",
          endTime: "22:00",
          id: "205bb9d9-e225-4c91-a28a-fdaca8164009",
          employeeRole: "CTM",
          candidates: [
            "ctm-1",
            "ctm-2",
            "ctm-3",
            "ctm-4",
            "ctm-5",
            "ctm-6",
            "ctm-11",
            "ctm-10",
            "ctm-9",
            "ctm-8",
          ],
        },
      ],
    ]),
  ],
  [
    Weekday.WEDNESDAY,
    new Map<string, Shift>([
      [
        "2a2a0929-c1c4-45ad-9949-c32cbe884236",
        {
          candidates: ["4", "2", "1"],

          day: 3,
          employeeRole: "TL",
          endTime: "14:00",
          id: "2a2a0929-c1c4-45ad-9949-c32cbe884236",
          startTime: "06:00",
        },
      ],
      [
        "f545e58d-b601-4d43-9a53-62f1e403e078",
        {
          candidates: ["4", "1"],

          day: 3,
          employeeRole: "TL",
          endTime: "22:00",
          id: "f545e58d-b601-4d43-9a53-62f1e403e078",
          startTime: "14:00",
        },
      ],
      [
        "56859902-9e16-4198-87db-f207291f0146",
        {
          candidates: ["ctm-2", "ctm-4", "ctm-5", "ctm-7", "ctm-10"],

          day: 3,
          employeeRole: "BAKER",
          endTime: "14:00",
          id: "56859902-9e16-4198-87db-f207291f0146",
          startTime: "06:00",
        },
      ],
      [
        "04b0ebe3-f0b8-4c9e-b3fb-2946b2e533de",
        {
          candidates: [
            "ctm-1",
            "ctm-2",
            "ctm-4",
            "ctm-5",
            "ctm-6",
            "ctm-7",
            "ctm-11",
            "ctm-10",
            "ctm-9",
            "ctm-8",
          ],

          day: 3,
          employeeRole: "CTM",
          endTime: "18:00",
          id: "04b0ebe3-f0b8-4c9e-b3fb-2946b2e533de",
          startTime: "10:00",
        },
      ],
      [
        "94672e49-ad57-411c-a962-56be5f1c1f56",
        {
          candidates: [
            "ctm-1",
            "ctm-2",
            "ctm-4",
            "ctm-5",
            "ctm-6",
            "ctm-7",
            "ctm-11",
            "ctm-10",
            "ctm-9",
            "ctm-8",
          ],

          day: 3,
          employeeRole: "CTM",
          endTime: "19:00",
          id: "94672e49-ad57-411c-a962-56be5f1c1f56",
          startTime: "12:00",
        },
      ],
      [
        "5f0a6884-22fc-4e6d-93fa-d50c82c704d9",
        {
          candidates: [
            "ctm-1",
            "ctm-2",
            "ctm-3",
            "ctm-4",
            "ctm-5",
            "ctm-6",
            "ctm-7",
            "ctm-11",
            "ctm-10",
            "ctm-9",
            "ctm-8",
          ],

          day: 3,
          employeeRole: "CTM",
          endTime: "22:00",
          id: "5f0a6884-22fc-4e6d-93fa-d50c82c704d9",
          startTime: "14:00",
        },
      ],
    ]),
  ],
  [
    Weekday.THURSDAY,
    new Map<string, Shift>([
      [
        "b2ef7891-7285-4518-a8f7-3ec7ff4667f2",
        {
          candidates: ["2", "3", "1"],

          day: 4,
          employeeRole: "TL",
          endTime: "14:00",
          id: "b2ef7891-7285-4518-a8f7-3ec7ff4667f2",
          startTime: "06:00",
        },
      ],
      [
        "fa6e1452-5576-41f2-8f5e-206d8f26efb9",
        {
          candidates: ["4", "2", "3", "1"],

          day: 4,
          employeeRole: "TL",
          endTime: "22:00",
          id: "fa6e1452-5576-41f2-8f5e-206d8f26efb9",
          startTime: "14:00",
        },
      ],
      [
        "b690fc4e-bec4-4187-9e7e-eb5c5b641fc4",
        {
          candidates: ["ctm-2", "ctm-3", "ctm-4", "ctm-7", "ctm-10"],

          day: 4,
          employeeRole: "BAKER",
          endTime: "12:00",
          id: "b690fc4e-bec4-4187-9e7e-eb5c5b641fc4",
          startTime: "06:00",
        },
      ],
      [
        "f91c54ef-07e5-4381-b251-94f83f1b2c3c",
        {
          candidates: [
            "ctm-1",
            "ctm-2",
            "ctm-3",
            "ctm-4",
            "ctm-6",
            "ctm-7",
            "ctm-11",
            "ctm-10",
            "ctm-9",
            "ctm-8",
          ],

          day: 4,
          employeeRole: "CTM",
          endTime: "19:30",
          id: "f91c54ef-07e5-4381-b251-94f83f1b2c3c",
          startTime: "10:30",
        },
      ],
      [
        "d706a46c-966f-4776-9dfb-7dd2d6b1dfa5",
        {
          candidates: [
            "ctm-1",
            "ctm-2",
            "ctm-3",
            "ctm-4",
            "ctm-5",
            "ctm-6",
            "ctm-7",
            "ctm-11",
            "ctm-10",
            "ctm-9",
            "ctm-8",
          ],

          day: 4,
          employeeRole: "CTM",
          endTime: "22:00",
          id: "d706a46c-966f-4776-9dfb-7dd2d6b1dfa5",
          startTime: "14:00",
        },
      ],
      [
        "3e579cea-ece5-49cb-bb14-82a383d2584b",
        {
          day: 4,
          startTime: "18:00",
          endTime: "22:00",
          id: "3e579cea-ece5-49cb-bb14-82a383d2584b",
          employeeRole: "CTM",
          candidates: [
            "ctm-1",
            "ctm-2",
            "ctm-3",
            "ctm-4",
            "ctm-5",
            "ctm-6",
            "ctm-7",
            "ctm-11",
            "ctm-10",
            "ctm-9",
            "ctm-8",
          ],
        },
      ],
    ]),
  ],
  [
    Weekday.FRIDAY,

    new Map<string, Shift>([
      [
        "cdefbd7d-5d7f-4fdd-a91f-6b0a332c3bd3",
        {
          candidates: ["2", "3", "1"],

          day: 5,
          employeeRole: "TL",
          endTime: "14:00",
          id: "cdefbd7d-5d7f-4fdd-a91f-6b0a332c3bd3",
          startTime: "06:00",
        },
      ],
      [
        "b23ccfea-be37-474d-8272-af4ad4eaec15",
        {
          candidates: ["2", "3", "1"],

          day: 5,
          employeeRole: "TL",
          endTime: "17:00",
          id: "b23ccfea-be37-474d-8272-af4ad4eaec15",
          startTime: "09:00",
        },
      ],
      [
        "2a9c7165-ac13-40df-b905-54eefe296bfb",
        {
          candidates: ["4", "2", "3", "1"],

          day: 5,
          employeeRole: "TL",
          endTime: "22:00",
          id: "2a9c7165-ac13-40df-b905-54eefe296bfb",
          startTime: "14:00",
        },
      ],
      [
        "f07b1e1b-1b62-4b1d-a246-3fcfe9121aa6",
        {
          candidates: ["ctm-2", "ctm-3", "ctm-4", "ctm-5", "ctm-7", "ctm-10"],

          day: 5,
          employeeRole: "BAKER",
          endTime: "14:00",
          id: "f07b1e1b-1b62-4b1d-a246-3fcfe9121aa6",
          startTime: "06:00",
        },
      ],
      [
        "c8c17641-32e1-46a8-b0d3-084512ad674c",
        {
          candidates: [
            "ctm-1",
            "ctm-2",
            "ctm-3",
            "ctm-4",
            "ctm-5",
            "ctm-6",
            "ctm-7",
            "ctm-11",
            "ctm-10",
            "ctm-9",
            "ctm-8",
          ],

          day: 5,
          employeeRole: "CTM",
          endTime: "15:00",
          id: "c8c17641-32e1-46a8-b0d3-084512ad674c",
          startTime: "08:00",
        },
      ],
      [
        "50960d91-ebb4-4c19-a0e6-3eb1322b60a6",
        {
          candidates: [
            "ctm-1",
            "ctm-2",
            "ctm-3",
            "ctm-4",
            "ctm-5",
            "ctm-6",
            "ctm-7",
            "ctm-11",
            "ctm-10",
            "ctm-9",
            "ctm-8",
          ],

          day: 5,
          employeeRole: "CTM",
          endTime: "22:00",
          id: "50960d91-ebb4-4c19-a0e6-3eb1322b60a6",
          startTime: "14:00",
        },
      ],
      [
        "95d69a98-3141-4f78-902b-47e692143422",
        {
          day: 5,
          startTime: "18:00",
          endTime: "22:00",
          id: "95d69a98-3141-4f78-902b-47e692143422",
          employeeRole: "CTM",
          candidates: [
            "ctm-1",
            "ctm-2",
            "ctm-3",
            "ctm-4",
            "ctm-5",
            "ctm-6",
            "ctm-7",
            "ctm-11",
            "ctm-10",
            "ctm-9",
            "ctm-8",
          ],
        },
      ],
    ]),
  ],
  [
    Weekday.SATURDAY,
    new Map<string, Shift>([
      [
        "324458b8-eab0-4f3d-90b8-3bdb523fcd0d",
        {
          candidates: ["4", "2", "3", "1"],

          day: 6,
          employeeRole: "TL",
          endTime: "14:00",
          id: "324458b8-eab0-4f3d-90b8-3bdb523fcd0d",
          startTime: "06:00",
        },
      ],
      [
        "d71a80bc-1fca-4457-9788-9d5d95caa7df",
        {
          candidates: ["4", "2", "3", "1"],

          day: 6,
          employeeRole: "TL",
          endTime: "22:00",
          id: "d71a80bc-1fca-4457-9788-9d5d95caa7df",
          startTime: "14:00",
        },
      ],
      [
        "aa4d10b9-7862-4416-acaf-da7981fe2024",
        {
          candidates: ["ctm-2", "ctm-3", "ctm-4", "ctm-5", "ctm-7", "ctm-10"],

          day: 6,
          employeeRole: "BAKER",
          endTime: "13:00",
          id: "aa4d10b9-7862-4416-acaf-da7981fe2024",
          startTime: "06:00",
        },
      ],
      [
        "9e4234b6-77d8-433c-93a2-9e482d9d3aca",
        {
          candidates: [
            "ctm-1",
            "ctm-2",
            "ctm-3",
            "ctm-4",
            "ctm-5",
            "ctm-6",
            "ctm-7",
            "ctm-10",
            "ctm-9",
            "ctm-8",
          ],

          day: 6,
          employeeRole: "CTM",
          endTime: "17:00",
          id: "9e4234b6-77d8-433c-93a2-9e482d9d3aca",
          startTime: "10:00",
        },
      ],
      [
        "b518c428-650c-42b8-9422-6ad89e96a008",
        {
          candidates: [
            "ctm-1",
            "ctm-2",
            "ctm-3",
            "ctm-4",
            "ctm-5",
            "ctm-6",
            "ctm-7",
            "ctm-10",
            "ctm-9",
            "ctm-8",
          ],

          day: 6,
          employeeRole: "CTM",
          endTime: "20:00",
          id: "b518c428-650c-42b8-9422-6ad89e96a008",
          startTime: "12:00",
        },
      ],
      [
        "8a031f4f-8ccb-4a54-86ae-68abf0ae424d",
        {
          candidates: [
            "ctm-1",
            "ctm-2",
            "ctm-3",
            "ctm-4",
            "ctm-5",
            "ctm-6",
            "ctm-7",
            "ctm-11",
            "ctm-10",
            "ctm-9",
            "ctm-8",
          ],

          day: 6,
          employeeRole: "CTM",
          endTime: "22:00",
          id: "8a031f4f-8ccb-4a54-86ae-68abf0ae424d",
          startTime: "14:00",
        },
      ],
    ]),
  ],
]);
