(() => {
    return {
        '/test/registerNumber': {
            code: 1,
            data: {
                number: [
                    {count: 100, date: "2018-05-02"},
                    {count: 200, date: "2018-05-10"},
                    {count: 240, date: "2018-05-12"},
                    {count: 500, date: "2018-05-22"},
                    {count: 800, date: "2018-06-02"},
                    {count: 200, date: "2018-07-10"},
                    {count: 240, date: "2018-08-12"},
                    {count: 500, date: "2018-09-22"},
                ],
                percent: [
                    {count: 100, date: "2018-06-02"},
                    {count: 200, date: "2018-07-10"},
                    {count: 40, date: "2018-08-12"},
                    {count: 00, date: "2018-09-22"},
                ]
            },
        },
    }
})()
