(() => {
    return {
        '/sys/menu/getMenuTree.html': {
            "code": 1,
            "data": [
                {
                    "id": "a0f88f24408a42759589270385618808",
                    "flag": "Y",
                    "code": "set",
                    "state": {
                        "expanded": false,
                        "selected": false,
                        "checked": false
                    },
                    "sort": 0,
                    "text": "设置",
                    "nodes": [
                        {
                            "id": "434db50f546d4b87b9f340eb3905b3ba",
                            "pid": "a0f88f24408a42759589270385618808",
                            "flag": "N",
                            "code": "set:sys",
                            "state": {
                                "expanded": false,
                                "selected": false,
                                "checked": false
                            },
                            "sort": 0,
                            "text": "后台管理",
                            "nodes": [
                                {
                                    "id": "9992d409c17b4c7996e9805f894ffcc7",
                                    "pid": "434db50f546d4b87b9f340eb3905b3ba",
                                    "flag": "N",
                                    "code": "set:sys:org",
                                    "state": {
                                        "expanded": false,
                                        "selected": false,
                                        "checked": false
                                    },
                                    "sort": 0,
                                    "text": "组织机构管理",
                                    "href": "/sys/org/orgManage.html"
                                }, {
                                    "id": "542782979aad4f02ad7111f6c9e765ee",
                                    "pid": "434db50f546d4b87b9f340eb3905b3ba",
                                    "flag": "N",
                                    "code": "set:sys:user",
                                    "state": {
                                        "expanded": false,
                                        "selected": false,
                                        "checked": false
                                    },
                                    "sort": 0,
                                    "text": "后台用户管理",
                                    "href": "/sys/operator/operatorManage.html"
                                }, {
                                    "id": "31f91e34272e4eb4a7d1986de4ea150f",
                                    "pid": "434db50f546d4b87b9f340eb3905b3ba",
                                    "flag": "N",
                                    "code": "set:sys:role",
                                    "state": {
                                        "expanded": false,
                                        "selected": false,
                                        "checked": false
                                    },
                                    "sort": 0,
                                    "text": "角色管理",
                                    "href": "/sys/role/roleManage.html"
                                }, {
                                    "id": "9f0f275c5911427a9d59564b055a950c",
                                    "pid": "434db50f546d4b87b9f340eb3905b3ba",
                                    "flag": "N",
                                    "code": "set:sys:menu",
                                    "state": {
                                        "expanded": false,
                                        "selected": false,
                                        "checked": false
                                    },
                                    "sort": 0,
                                    "text": "菜单管理",
                                    "href": "/sys/menu/menuManage.html"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }
})()