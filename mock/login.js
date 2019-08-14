(() => {
    return {
        '/api-manage/admin/validLogonCode/9999': {
            code: 1
        },
        '/api-manage/admin/login': {
            "message": "success",
            "data": {
              "parentMenus": [
                {
                  "id": "1",
                  "code": "customer",
                  "menuName": "客户信息",
                  "url": "",
                  "parentId": null,
                  "parentIds": null,
                  "iconCss": null,
                  "sort": 1,
                  "deleteFlag": 0,
                  "remark": "客户信息",
                  "isLeaf": 0,
                  "createTime": 1525363200000,
                  "lastUpdateTime": 1525363200000
                },
                {
                  "id": "2",
                  "code": "project",
                  "menuName": "项目管理",
                  "url": "",
                  "parentId": null,
                  "parentIds": null,
                  "iconCss": null,
                  "sort": 2,
                  "deleteFlag": 0,
                  "remark": "项目管理",
                  "isLeaf": 0,
                  "createTime": 1525363200000,
                  "lastUpdateTime": 1525363200000
                },
                {
                  "id": "3",
                  "code": "application",
                  "menuName": "进件管理",
                  "url": "",
                  "parentId": null,
                  "parentIds": null,
                  "iconCss": null,
                  "sort": 3,
                  "deleteFlag": 0,
                  "remark": "进件管理",
                  "isLeaf": 0,
                  "createTime": 1525363200000,
                  "lastUpdateTime": 1525363200000
                },
                {
                  "id": "4",
                  "code": "loan",
                  "menuName": "批单管理",
                  "url": "",
                  "parentId": null,
                  "parentIds": null,
                  "iconCss": null,
                  "sort": 4,
                  "deleteFlag": 0,
                  "remark": "批单管理",
                  "isLeaf": 0,
                  "createTime": 1525363200000,
                  "lastUpdateTime": 1525363200000
                },
                {
                  "id": "5",
                  "code": "iou",
                  "menuName": "借据管理",
                  "url": "",
                  "parentId": null,
                  "parentIds": null,
                  "iconCss": null,
                  "sort": 5,
                  "deleteFlag": 0,
                  "remark": "借据管理",
                  "isLeaf": 0,
                  "createTime": 1525363200000,
                  "lastUpdateTime": 1525363200000
                },
                {
                  "id": "6",
                  "code": "rules",
                  "menuName": "规则引擎",
                  "url": "",
                  "parentId": null,
                  "parentIds": null,
                  "iconCss": null,
                  "sort": 6,
                  "deleteFlag": 0,
                  "remark": "规则引擎",
                  "isLeaf": 0,
                  "createTime": 1525363200000,
                  "lastUpdateTime": 1525363200000
                },
                {
                  "id": "7",
                  "code": "statistic",
                  "menuName": "统计查询",
                  "url": "",
                  "parentId": null,
                  "parentIds": null,
                  "iconCss": null,
                  "sort": 7,
                  "deleteFlag": 0,
                  "remark": "统计查询",
                  "isLeaf": 0,
                  "createTime": 1525363200000,
                  "lastUpdateTime": 1525363200000
                },
                {
                  "id": "8",
                  "code": "system",
                  "menuName": "系统设置",
                  "url": "",
                  "parentId": null,
                  "parentIds": null,
                  "iconCss": null,
                  "sort": 8,
                  "deleteFlag": 0,
                  "remark": "系统设置",
                  "isLeaf": 0,
                  "createTime": 1525363200000,
                  "lastUpdateTime": 1525363200000
                },
                {
                  "id": "9",
                  "code": "message",
                  "menuName": "消息管理",
                  "url": "",
                  "parentId": null,
                  "parentIds": null,
                  "iconCss": null,
                  "sort": 9,
                  "deleteFlag": 0,
                  "remark": "消息管理",
                  "isLeaf": 0,
                  "createTime": 1525363200000,
                  "lastUpdateTime": 1525363200000
                },
                {
                  "id": "10",
                  "code": "website",
                  "menuName": "网站管理",
                  "url": "",
                  "parentId": null,
                  "parentIds": null,
                  "iconCss": null,
                  "sort": 10,
                  "deleteFlag": 0,
                  "remark": "网站管理",
                  "isLeaf": 0,
                  "createTime": 1525363200000,
                  "lastUpdateTime": 1525363200000
                }
              ],
              "childMenus": {
                "1": [
                  {
                    "isLeaf": 1,
                    "node": {
                      "id": "11",
                      "name": "资料审核",
                      "url": "/customer/",
                      "icon": null,
                      "permissionList": [
                        {
                          "code": "customer:verify:query",
                          "hasPermission": false
                        },
                        {
                          "code": "customer:verify:add",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:verify:edit",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:verify:del",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:verify:detail",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:verify:status",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:verify:import",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:verify:export",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:verify:resetPwd",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:verify:audit",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:verify:writeOff",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:verify:upload",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:verify:print",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:verify:save",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:verify:updatePwd",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:verify:history",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:verify:historyExport",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:verify:download",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:verify:cancel",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:verify:oneKeyPrint",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:verify:see",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:verify:auditRemark",
                          "hasPermission": true
                        }
                      ]
                    },
                    "childNode": []
                  },
                  {
                    "isLeaf": 1,
                    "node": {
                      "id": "12",
                      "name": "出租方",
                      "url": "/customer/",
                      "icon": null,
                      "permissionList": [
                        {
                          "code": "customer:user:query",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:user:add",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:user:edit",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:user:del",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:user:detail",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:user:status",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:user:import",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:user:export",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:user:resetPwd",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:user:audit",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:user:writeOff",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:user:upload",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:user:print",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:user:save",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:user:updatePwd",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:user:history",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:user:historyExport",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:user:download",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:user:cancel",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:user:oneKeyPrint",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:user:see",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:user:auditRemark",
                          "hasPermission": true
                        }
                      ]
                    },
                    "childNode": []
                  },
                  {
                    "isLeaf": 1,
                    "node": {
                      "id": "13",
                      "name": "承租方",
                      "url": "/customer/",
                      "icon": null,
                      "permissionList": [
                        {
                          "code": "customer:leasee:query",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:leasee:add",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:leasee:edit",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:leasee:del",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:leasee:detail",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:leasee:status",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:leasee:import",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:leasee:export",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:leasee:resetPwd",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:leasee:audit",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:leasee:writeOff",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:leasee:upload",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:leasee:print",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:leasee:save",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:leasee:updatePwd",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:leasee:history",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:leasee:historyExport",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:leasee:download",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:leasee:cancel",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:leasee:oneKeyPrint",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:leasee:see",
                          "hasPermission": true
                        },
                        {
                          "code": "customer:leasee:auditRemark",
                          "hasPermission": true
                        }
                      ]
                    },
                    "childNode": []
                  }
                ],
                "2": [
                  {
                    "isLeaf": 1,
                    "node": {
                      "id": "14",
                      "name": "项目信息",
                      "url": "/project/",
                      "icon": null,
                      "permissionList": [
                        {
                          "code": "project:info:query",
                          "hasPermission": true
                        },
                        {
                          "code": "project:info:add",
                          "hasPermission": true
                        },
                        {
                          "code": "project:info:edit",
                          "hasPermission": true
                        },
                        {
                          "code": "project:info:del",
                          "hasPermission": true
                        },
                        {
                          "code": "project:info:detail",
                          "hasPermission": true
                        },
                        {
                          "code": "project:info:status",
                          "hasPermission": true
                        },
                        {
                          "code": "project:info:import",
                          "hasPermission": true
                        },
                        {
                          "code": "project:info:export",
                          "hasPermission": true
                        },
                        {
                          "code": "project:info:resetPwd",
                          "hasPermission": true
                        },
                        {
                          "code": "project:info:audit",
                          "hasPermission": true
                        },
                        {
                          "code": "project:info:writeOff",
                          "hasPermission": true
                        },
                        {
                          "code": "project:info:upload",
                          "hasPermission": true
                        },
                        {
                          "code": "project:info:print",
                          "hasPermission": true
                        },
                        {
                          "code": "project:info:save",
                          "hasPermission": true
                        },
                        {
                          "code": "project:info:updatePwd",
                          "hasPermission": true
                        },
                        {
                          "code": "project:info:history",
                          "hasPermission": true
                        },
                        {
                          "code": "project:info:historyExport",
                          "hasPermission": true
                        },
                        {
                          "code": "project:info:download",
                          "hasPermission": true
                        },
                        {
                          "code": "project:info:cancel",
                          "hasPermission": true
                        },
                        {
                          "code": "project:info:oneKeyPrint",
                          "hasPermission": true
                        },
                        {
                          "code": "project:info:see",
                          "hasPermission": true
                        },
                        {
                          "code": "project:info:auditRemark",
                          "hasPermission": true
                        }
                      ]
                    },
                    "childNode": []
                  }
                ],
                "3": [
                  {
                    "isLeaf": 1,
                    "node": {
                      "id": "15",
                      "name": "进件信息",
                      "url": "/application/",
                      "icon": null,
                      "permissionList": [
                        {
                          "code": "project:application:query",
                          "hasPermission": true
                        },
                        {
                          "code": "project:application:add",
                          "hasPermission": true
                        },
                        {
                          "code": "project:application:edit",
                          "hasPermission": true
                        },
                        {
                          "code": "project:application:del",
                          "hasPermission": true
                        },
                        {
                          "code": "project:application:detail",
                          "hasPermission": true
                        },
                        {
                          "code": "project:application:status",
                          "hasPermission": true
                        },
                        {
                          "code": "project:application:import",
                          "hasPermission": true
                        },
                        {
                          "code": "project:application:export",
                          "hasPermission": true
                        },
                        {
                          "code": "project:application:resetPwd",
                          "hasPermission": true
                        },
                        {
                          "code": "project:application:audit",
                          "hasPermission": true
                        },
                        {
                          "code": "project:application:writeOff",
                          "hasPermission": true
                        },
                        {
                          "code": "project:application:upload",
                          "hasPermission": true
                        },
                        {
                          "code": "project:application:print",
                          "hasPermission": true
                        },
                        {
                          "code": "project:application:save",
                          "hasPermission": true
                        },
                        {
                          "code": "project:application:updatePwd",
                          "hasPermission": true
                        },
                        {
                          "code": "project:application:history",
                          "hasPermission": true
                        },
                        {
                          "code": "project:application:historyExport",
                          "hasPermission": true
                        },
                        {
                          "code": "project:application:download",
                          "hasPermission": true
                        },
                        {
                          "code": "project:application:cancel",
                          "hasPermission": true
                        },
                        {
                          "code": "project:application:oneKeyPrint",
                          "hasPermission": true
                        },
                        {
                          "code": "project:application:see",
                          "hasPermission": true
                        },
                        {
                          "code": "project:application:auditRemark",
                          "hasPermission": true
                        }
                      ]
                    },
                    "childNode": []
                  }
                ],
                "4": [
                  {
                    "isLeaf": 1,
                    "node": {
                      "id": "16",
                      "name": "批单信息",
                      "url": "/loan/",
                      "icon": null,
                      "permissionList": [
                        {
                          "code": "loan:info:query",
                          "hasPermission": true
                        },
                        {
                          "code": "loan:info:add",
                          "hasPermission": true
                        },
                        {
                          "code": "loan:info:edit",
                          "hasPermission": true
                        },
                        {
                          "code": "loan:info:del",
                          "hasPermission": true
                        },
                        {
                          "code": "loan:info:detail",
                          "hasPermission": true
                        },
                        {
                          "code": "loan:info:status",
                          "hasPermission": true
                        },
                        {
                          "code": "loan:info:import",
                          "hasPermission": true
                        },
                        {
                          "code": "loan:info:export",
                          "hasPermission": true
                        },
                        {
                          "code": "loan:info:resetPwd",
                          "hasPermission": true
                        },
                        {
                          "code": "loan:info:audit",
                          "hasPermission": true
                        },
                        {
                          "code": "loan:info:writeOff",
                          "hasPermission": true
                        },
                        {
                          "code": "loan:info:upload",
                          "hasPermission": true
                        },
                        {
                          "code": "loan:info:print",
                          "hasPermission": true
                        },
                        {
                          "code": "loan:info:save",
                          "hasPermission": true
                        },
                        {
                          "code": "loan:info:updatePwd",
                          "hasPermission": true
                        },
                        {
                          "code": "loan:info:history",
                          "hasPermission": true
                        },
                        {
                          "code": "loan:info:historyExport",
                          "hasPermission": true
                        },
                        {
                          "code": "loan:info:download",
                          "hasPermission": true
                        },
                        {
                          "code": "loan:info:cancel",
                          "hasPermission": true
                        },
                        {
                          "code": "loan:info:oneKeyPrint",
                          "hasPermission": true
                        },
                        {
                          "code": "loan:info:see",
                          "hasPermission": true
                        },
                        {
                          "code": "loan:info:auditRemark",
                          "hasPermission": true
                        }
                      ]
                    },
                    "childNode": []
                  }
                ],
                "5": [
                  {
                    "isLeaf": 1,
                    "node": {
                      "id": "17",
                      "name": "借据信息",
                      "url": "/iou/",
                      "icon": null,
                      "permissionList": [
                        {
                          "code": "iou:info:query",
                          "hasPermission": true
                        },
                        {
                          "code": "iou:info:add",
                          "hasPermission": true
                        },
                        {
                          "code": "iou:info:edit",
                          "hasPermission": true
                        },
                        {
                          "code": "iou:info:del",
                          "hasPermission": true
                        },
                        {
                          "code": "iou:info:detail",
                          "hasPermission": true
                        },
                        {
                          "code": "iou:info:status",
                          "hasPermission": true
                        },
                        {
                          "code": "iou:info:import",
                          "hasPermission": true
                        },
                        {
                          "code": "iou:info:export",
                          "hasPermission": true
                        },
                        {
                          "code": "iou:info:resetPwd",
                          "hasPermission": true
                        },
                        {
                          "code": "iou:info:audit",
                          "hasPermission": true
                        },
                        {
                          "code": "iou:info:writeOff",
                          "hasPermission": true
                        },
                        {
                          "code": "iou:info:upload",
                          "hasPermission": true
                        },
                        {
                          "code": "iou:info:print",
                          "hasPermission": true
                        },
                        {
                          "code": "iou:info:save",
                          "hasPermission": true
                        },
                        {
                          "code": "iou:info:updatePwd",
                          "hasPermission": true
                        },
                        {
                          "code": "iou:info:history",
                          "hasPermission": true
                        },
                        {
                          "code": "iou:info:historyExport",
                          "hasPermission": true
                        },
                        {
                          "code": "iou:info:download",
                          "hasPermission": true
                        },
                        {
                          "code": "iou:info:cancel",
                          "hasPermission": true
                        },
                        {
                          "code": "iou:info:oneKeyPrint",
                          "hasPermission": true
                        },
                        {
                          "code": "iou:info:see",
                          "hasPermission": true
                        },
                        {
                          "code": "iou:info:auditRemark",
                          "hasPermission": true
                        }
                      ]
                    },
                    "childNode": []
                  }
                ],
                "6": [
                  {
                    "isLeaf": 1,
                    "node": {
                      "id": "18",
                      "name": "表字段维护",
                      "url": "/rules/",
                      "icon": null,
                      "permissionList": [
                        {
                          "code": "rules:table:query",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:table:add",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:table:edit",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:table:del",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:table:detail",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:table:status",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:table:import",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:table:export",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:table:resetPwd",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:table:audit",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:table:writeOff",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:table:upload",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:table:print",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:table:save",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:table:updatePwd",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:table:history",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:table:historyExport",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:table:download",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:table:cancel",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:table:oneKeyPrint",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:table:see",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:table:auditRemark",
                          "hasPermission": true
                        }
                      ]
                    },
                    "childNode": []
                  },
                  {
                    "isLeaf": 1,
                    "node": {
                      "id": "19",
                      "name": "规则管理",
                      "url": "/rules/",
                      "icon": null,
                      "permissionList": [
                        {
                          "code": "rules:config:query",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:config:add",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:config:edit",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:config:del",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:config:detail",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:config:status",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:config:import",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:config:export",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:config:resetPwd",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:config:audit",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:config:writeOff",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:config:upload",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:config:print",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:config:save",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:config:updatePwd",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:config:history",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:config:historyExport",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:config:download",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:config:cancel",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:config:oneKeyPrint",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:config:see",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:config:auditRemark",
                          "hasPermission": true
                        }
                      ]
                    },
                    "childNode": []
                  },
                  {
                    "isLeaf": 1,
                    "node": {
                      "id": "20",
                      "name": "业务规则配置",
                      "url": "/rules/",
                      "icon": null,
                      "permissionList": [
                        {
                          "code": "rules:bizzconfig:query",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:bizzconfig:add",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:bizzconfig:edit",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:bizzconfig:del",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:bizzconfig:detail",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:bizzconfig:status",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:bizzconfig:import",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:bizzconfig:export",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:bizzconfig:resetPwd",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:bizzconfig:audit",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:bizzconfig:writeOff",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:bizzconfig:upload",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:bizzconfig:print",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:bizzconfig:save",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:bizzconfig:updatePwd",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:bizzconfig:history",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:bizzconfig:historyExport",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:bizzconfig:download",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:bizzconfig:cancel",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:bizzconfig:oneKeyPrint",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:bizzconfig:see",
                          "hasPermission": true
                        },
                        {
                          "code": "rules:bizzconfig:auditRemark",
                          "hasPermission": true
                        }
                      ]
                    },
                    "childNode": []
                  }
                ],
                "7": [
                  {
                    "isLeaf": 1,
                    "node": {
                      "id": "21",
                      "name": "注册人数分析",
                      "url": "/statistic/",
                      "icon": null,
                      "permissionList": [
                        {
                          "code": "statistic:register:query",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:register:add",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:register:edit",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:register:del",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:register:detail",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:register:status",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:register:import",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:register:export",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:register:resetPwd",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:register:audit",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:register:writeOff",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:register:upload",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:register:print",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:register:save",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:register:updatePwd",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:register:history",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:register:historyExport",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:register:download",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:register:cancel",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:register:oneKeyPrint",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:register:see",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:register:auditRemark",
                          "hasPermission": true
                        }
                      ]
                    },
                    "childNode": []
                  },
                  {
                    "isLeaf": 1,
                    "node": {
                      "id": "22",
                      "name": "放款数据分析",
                      "url": "/statistic/",
                      "icon": null,
                      "permissionList": [
                        {
                          "code": "statistic:grant:query",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:grant:add",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:grant:edit",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:grant:del",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:grant:detail",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:grant:status",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:grant:import",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:grant:export",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:grant:resetPwd",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:grant:audit",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:grant:writeOff",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:grant:upload",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:grant:print",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:grant:save",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:grant:updatePwd",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:grant:history",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:grant:historyExport",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:grant:download",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:grant:cancel",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:grant:oneKeyPrint",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:grant:see",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:grant:auditRemark",
                          "hasPermission": true
                        }
                      ]
                    },
                    "childNode": []
                  },
                  {
                    "isLeaf": 1,
                    "node": {
                      "id": "23",
                      "name": "还款统计",
                      "url": "/statistic/",
                      "icon": null,
                      "permissionList": [
                        {
                          "code": "statistic:repayment:query",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:repayment:add",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:repayment:edit",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:repayment:del",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:repayment:detail",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:repayment:status",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:repayment:import",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:repayment:export",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:repayment:resetPwd",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:repayment:audit",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:repayment:writeOff",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:repayment:upload",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:repayment:print",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:repayment:save",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:repayment:updatePwd",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:repayment:history",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:repayment:historyExport",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:repayment:download",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:repayment:cancel",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:repayment:oneKeyPrint",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:repayment:see",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:repayment:auditRemark",
                          "hasPermission": true
                        }
                      ]
                    },
                    "childNode": []
                  },
                  {
                    "isLeaf": 1,
                    "node": {
                      "id": "24",
                      "name": "行业分析",
                      "url": "/statistic/",
                      "icon": null,
                      "permissionList": [
                        {
                          "code": "statistic:industry:query",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:industry:add",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:industry:edit",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:industry:del",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:industry:detail",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:industry:status",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:industry:import",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:industry:export",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:industry:resetPwd",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:industry:audit",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:industry:writeOff",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:industry:upload",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:industry:print",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:industry:save",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:industry:updatePwd",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:industry:history",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:industry:historyExport",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:industry:download",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:industry:cancel",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:industry:oneKeyPrint",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:industry:see",
                          "hasPermission": true
                        },
                        {
                          "code": "statistic:industry:auditRemark",
                          "hasPermission": true
                        }
                      ]
                    },
                    "childNode": []
                  }
                ],
                "8": [
                  {
                    "isLeaf": 1,
                    "node": {
                      "id": "26",
                      "name": "参数设置",
                      "url": "/system/configManage",
                      "icon": null,
                      "permissionList": [
                        {
                          "code": "system.config:query",
                          "hasPermission": true
                        },
                        {
                          "code": "system.config:add",
                          "hasPermission": true
                        },
                        {
                          "code": "system.config:edit",
                          "hasPermission": true
                        },
                        {
                          "code": "system.config:del",
                          "hasPermission": true
                        },
                        {
                          "code": "system.config:detail",
                          "hasPermission": true
                        },
                        {
                          "code": "system.config:status",
                          "hasPermission": true
                        },
                        {
                          "code": "system.config:import",
                          "hasPermission": true
                        },
                        {
                          "code": "system.config:export",
                          "hasPermission": true
                        },
                        {
                          "code": "system.config:resetPwd",
                          "hasPermission": true
                        },
                        {
                          "code": "system.config:audit",
                          "hasPermission": true
                        },
                        {
                          "code": "system.config:writeOff",
                          "hasPermission": true
                        },
                        {
                          "code": "system.config:upload",
                          "hasPermission": true
                        },
                        {
                          "code": "system.config:print",
                          "hasPermission": true
                        },
                        {
                          "code": "system.config:save",
                          "hasPermission": true
                        },
                        {
                          "code": "system.config:updatePwd",
                          "hasPermission": true
                        },
                        {
                          "code": "system.config:history",
                          "hasPermission": true
                        },
                        {
                          "code": "system.config:historyExport",
                          "hasPermission": true
                        },
                        {
                          "code": "system.config:download",
                          "hasPermission": true
                        },
                        {
                          "code": "system.config:cancel",
                          "hasPermission": true
                        },
                        {
                          "code": "system.config:oneKeyPrint",
                          "hasPermission": true
                        },
                        {
                          "code": "system.config:see",
                          "hasPermission": true
                        },
                        {
                          "code": "system.config:auditRemark",
                          "hasPermission": true
                        }
                      ]
                    },
                    "childNode": []
                  },
                  {
                    "isLeaf": 1,
                    "node": {
                      "id": "27",
                      "name": "用户管理",
                      "url": "/system/operatorManage",
                      "icon": null,
                      "permissionList": [
                        {
                          "code": "system.operator:query",
                          "hasPermission": true
                        },
                        {
                          "code": "system.operator:add",
                          "hasPermission": true
                        },
                        {
                          "code": "system.operator:edit",
                          "hasPermission": true
                        },
                        {
                          "code": "system.operator:del",
                          "hasPermission": true
                        },
                        {
                          "code": "system.operator:detail",
                          "hasPermission": true
                        },
                        {
                          "code": "system.operator:status",
                          "hasPermission": true
                        },
                        {
                          "code": "system.operator:import",
                          "hasPermission": true
                        },
                        {
                          "code": "system.operator:export",
                          "hasPermission": true
                        },
                        {
                          "code": "system.operator:resetPwd",
                          "hasPermission": true
                        },
                        {
                          "code": "system.operator:audit",
                          "hasPermission": true
                        },
                        {
                          "code": "system.operator:writeOff",
                          "hasPermission": true
                        },
                        {
                          "code": "system.operator:upload",
                          "hasPermission": true
                        },
                        {
                          "code": "system.operator:print",
                          "hasPermission": true
                        },
                        {
                          "code": "system.operator:save",
                          "hasPermission": true
                        },
                        {
                          "code": "system.operator:updatePwd",
                          "hasPermission": true
                        },
                        {
                          "code": "system.operator:history",
                          "hasPermission": true
                        },
                        {
                          "code": "system.operator:historyExport",
                          "hasPermission": true
                        },
                        {
                          "code": "system.operator:download",
                          "hasPermission": true
                        },
                        {
                          "code": "system.operator:cancel",
                          "hasPermission": true
                        },
                        {
                          "code": "system.operator:oneKeyPrint",
                          "hasPermission": true
                        },
                        {
                          "code": "system.operator:see",
                          "hasPermission": true
                        },
                        {
                          "code": "system.operator:auditRemark",
                          "hasPermission": true
                        }
                      ]
                    },
                    "childNode": []
                  },
                  {
                    "isLeaf": 1,
                    "node": {
                      "id": "28",
                      "name": "角色管理",
                      "url": "/system/roleManage",
                      "icon": null,
                      "permissionList": [
                        {
                          "code": "system.role:query",
                          "hasPermission": true
                        },
                        {
                          "code": "system.role:add",
                          "hasPermission": true
                        },
                        {
                          "code": "system.role:edit",
                          "hasPermission": true
                        },
                        {
                          "code": "system.role:del",
                          "hasPermission": true
                        },
                        {
                          "code": "system.role:detail",
                          "hasPermission": true
                        },
                        {
                          "code": "system.role:status",
                          "hasPermission": true
                        },
                        {
                          "code": "system.role:import",
                          "hasPermission": true
                        },
                        {
                          "code": "system.role:export",
                          "hasPermission": true
                        },
                        {
                          "code": "system.role:resetPwd",
                          "hasPermission": true
                        },
                        {
                          "code": "system.role:audit",
                          "hasPermission": true
                        },
                        {
                          "code": "system.role:writeOff",
                          "hasPermission": true
                        },
                        {
                          "code": "system.role:upload",
                          "hasPermission": true
                        },
                        {
                          "code": "system.role:print",
                          "hasPermission": true
                        },
                        {
                          "code": "system.role:save",
                          "hasPermission": true
                        },
                        {
                          "code": "system.role:updatePwd",
                          "hasPermission": true
                        },
                        {
                          "code": "system.role:history",
                          "hasPermission": true
                        },
                        {
                          "code": "system.role:historyExport",
                          "hasPermission": true
                        },
                        {
                          "code": "system.role:download",
                          "hasPermission": true
                        },
                        {
                          "code": "system.role:cancel",
                          "hasPermission": true
                        },
                        {
                          "code": "system.role:oneKeyPrint",
                          "hasPermission": true
                        },
                        {
                          "code": "system.role:see",
                          "hasPermission": true
                        },
                        {
                          "code": "system.role:auditRemark",
                          "hasPermission": true
                        }
                      ]
                    },
                    "childNode": []
                  },
                  {
                    "isLeaf": 1,
                    "node": {
                      "id": "30",
                      "name": "菜单管理",
                      "url": "/system/menuManage",
                      "icon": null,
                      "permissionList": [
                        {
                          "code": "system.menu:query",
                          "hasPermission": true
                        },
                        {
                          "code": "system.menu:add",
                          "hasPermission": true
                        },
                        {
                          "code": "system.menu:edit",
                          "hasPermission": true
                        },
                        {
                          "code": "system.menu:del",
                          "hasPermission": true
                        },
                        {
                          "code": "system.menu:detail",
                          "hasPermission": true
                        },
                        {
                          "code": "system.menu:status",
                          "hasPermission": true
                        },
                        {
                          "code": "system.menu:import",
                          "hasPermission": true
                        },
                        {
                          "code": "system.menu:export",
                          "hasPermission": true
                        },
                        {
                          "code": "system.menu:resetPwd",
                          "hasPermission": true
                        },
                        {
                          "code": "system.menu:audit",
                          "hasPermission": true
                        },
                        {
                          "code": "system.menu:writeOff",
                          "hasPermission": true
                        },
                        {
                          "code": "system.menu:upload",
                          "hasPermission": true
                        },
                        {
                          "code": "system.menu:print",
                          "hasPermission": true
                        },
                        {
                          "code": "system.menu:save",
                          "hasPermission": true
                        },
                        {
                          "code": "system.menu:updatePwd",
                          "hasPermission": true
                        },
                        {
                          "code": "system.menu:history",
                          "hasPermission": true
                        },
                        {
                          "code": "system.menu:historyExport",
                          "hasPermission": true
                        },
                        {
                          "code": "system.menu:download",
                          "hasPermission": true
                        },
                        {
                          "code": "system.menu:cancel",
                          "hasPermission": true
                        },
                        {
                          "code": "system.menu:oneKeyPrint",
                          "hasPermission": true
                        },
                        {
                          "code": "system.menu:see",
                          "hasPermission": true
                        },
                        {
                          "code": "system.menu:auditRemark",
                          "hasPermission": true
                        }
                      ]
                    },
                    "childNode": []
                  },
                  {
                    "isLeaf": 1,
                    "node": {
                      "id": "29",
                      "name": "数据字典",
                      "url": "/system/dictManage",
                      "icon": null,
                      "permissionList": [
                        {
                          "code": "system.dict:query",
                          "hasPermission": true
                        },
                        {
                          "code": "system.dict:add",
                          "hasPermission": true
                        },
                        {
                          "code": "system.dict:edit",
                          "hasPermission": true
                        },
                        {
                          "code": "system.dict:del",
                          "hasPermission": true
                        },
                        {
                          "code": "system.dict:detail",
                          "hasPermission": true
                        },
                        {
                          "code": "system.dict:status",
                          "hasPermission": true
                        },
                        {
                          "code": "system.dict:import",
                          "hasPermission": true
                        },
                        {
                          "code": "system.dict:export",
                          "hasPermission": true
                        },
                        {
                          "code": "system.dict:resetPwd",
                          "hasPermission": true
                        },
                        {
                          "code": "system.dict:audit",
                          "hasPermission": true
                        },
                        {
                          "code": "system.dict:writeOff",
                          "hasPermission": true
                        },
                        {
                          "code": "system.dict:upload",
                          "hasPermission": true
                        },
                        {
                          "code": "system.dict:print",
                          "hasPermission": true
                        },
                        {
                          "code": "system.dict:save",
                          "hasPermission": true
                        },
                        {
                          "code": "system.dict:updatePwd",
                          "hasPermission": true
                        },
                        {
                          "code": "system.dict:history",
                          "hasPermission": true
                        },
                        {
                          "code": "system.dict:historyExport",
                          "hasPermission": true
                        },
                        {
                          "code": "system.dict:download",
                          "hasPermission": true
                        },
                        {
                          "code": "system.dict:cancel",
                          "hasPermission": true
                        },
                        {
                          "code": "system.dict:oneKeyPrint",
                          "hasPermission": true
                        },
                        {
                          "code": "system.dict:see",
                          "hasPermission": true
                        },
                        {
                          "code": "system.dict:auditRemark",
                          "hasPermission": true
                        }
                      ]
                    },
                    "childNode": []
                  }
                ],
                "9": [
                  {
                    "isLeaf": 1,
                    "node": {
                      "id": "31",
                      "name": "消息模版",
                      "url": "/message/templateManage",
                      "icon": null,
                      "permissionList": [
                        {
                          "code": "message.type:query",
                          "hasPermission": true
                        },
                        {
                          "code": "message.type:add",
                          "hasPermission": true
                        },
                        {
                          "code": "message.type:edit",
                          "hasPermission": true
                        },
                        {
                          "code": "message.type:del",
                          "hasPermission": true
                        },
                        {
                          "code": "message.type:detail",
                          "hasPermission": true
                        },
                        {
                          "code": "message.type:status",
                          "hasPermission": true
                        },
                        {
                          "code": "message.type:import",
                          "hasPermission": true
                        },
                        {
                          "code": "message.type:export",
                          "hasPermission": true
                        },
                        {
                          "code": "message.type:resetPwd",
                          "hasPermission": true
                        },
                        {
                          "code": "message.type:audit",
                          "hasPermission": true
                        },
                        {
                          "code": "message.type:writeOff",
                          "hasPermission": true
                        },
                        {
                          "code": "message.type:upload",
                          "hasPermission": true
                        },
                        {
                          "code": "message.type:print",
                          "hasPermission": true
                        },
                        {
                          "code": "message.type:save",
                          "hasPermission": true
                        },
                        {
                          "code": "message.type:updatePwd",
                          "hasPermission": true
                        },
                        {
                          "code": "message.type:history",
                          "hasPermission": true
                        },
                        {
                          "code": "message.type:historyExport",
                          "hasPermission": true
                        },
                        {
                          "code": "message.type:download",
                          "hasPermission": true
                        },
                        {
                          "code": "message.type:cancel",
                          "hasPermission": true
                        },
                        {
                          "code": "message.type:oneKeyPrint",
                          "hasPermission": true
                        },
                        {
                          "code": "message.type:see",
                          "hasPermission": true
                        },
                        {
                          "code": "message.type:auditRemark",
                          "hasPermission": true
                        }
                      ]
                    },
                    "childNode": []
                  },
                  {
                    "isLeaf": 1,
                    "node": {
                      "id": "32",
                      "name": "消息记录",
                      "url": "/message/recordsManage",
                      "icon": null,
                      "permissionList": [
                        {
                          "code": "message.records:query",
                          "hasPermission": true
                        },
                        {
                          "code": "message.records:add",
                          "hasPermission": true
                        },
                        {
                          "code": "message.records:edit",
                          "hasPermission": true
                        },
                        {
                          "code": "message.records:del",
                          "hasPermission": true
                        },
                        {
                          "code": "message.records:detail",
                          "hasPermission": true
                        },
                        {
                          "code": "message.records:status",
                          "hasPermission": true
                        },
                        {
                          "code": "message.records:import",
                          "hasPermission": true
                        },
                        {
                          "code": "message.records:export",
                          "hasPermission": true
                        },
                        {
                          "code": "message.records:resetPwd",
                          "hasPermission": true
                        },
                        {
                          "code": "message.records:audit",
                          "hasPermission": true
                        },
                        {
                          "code": "message.records:writeOff",
                          "hasPermission": true
                        },
                        {
                          "code": "message.records:upload",
                          "hasPermission": true
                        },
                        {
                          "code": "message.records:print",
                          "hasPermission": true
                        },
                        {
                          "code": "message.records:save",
                          "hasPermission": true
                        },
                        {
                          "code": "message.records:updatePwd",
                          "hasPermission": true
                        },
                        {
                          "code": "message.records:history",
                          "hasPermission": true
                        },
                        {
                          "code": "message.records:historyExport",
                          "hasPermission": true
                        },
                        {
                          "code": "message.records:download",
                          "hasPermission": true
                        },
                        {
                          "code": "message.records:cancel",
                          "hasPermission": true
                        },
                        {
                          "code": "message.records:oneKeyPrint",
                          "hasPermission": true
                        },
                        {
                          "code": "message.records:see",
                          "hasPermission": true
                        },
                        {
                          "code": "message.records:auditRemark",
                          "hasPermission": true
                        }
                      ]
                    },
                    "childNode": []
                  }
                ],
                "10": [
                  {
                    "isLeaf": 1,
                    "node": {
                      "id": "33",
                      "name": "栏目管理",
                      "url": "/website/sectionManage",
                      "icon": null,
                      "permissionList": [
                        {
                          "code": "website:section:query",
                          "hasPermission": true
                        },
                        {
                          "code": "website:section:add",
                          "hasPermission": true
                        },
                        {
                          "code": "website:section:edit",
                          "hasPermission": true
                        },
                        {
                          "code": "website:section:del",
                          "hasPermission": true
                        },
                        {
                          "code": "website:section:detail",
                          "hasPermission": true
                        },
                        {
                          "code": "website:section:status",
                          "hasPermission": true
                        },
                        {
                          "code": "website:section:import",
                          "hasPermission": true
                        },
                        {
                          "code": "website:section:export",
                          "hasPermission": true
                        },
                        {
                          "code": "website:section:resetPwd",
                          "hasPermission": true
                        },
                        {
                          "code": "website:section:audit",
                          "hasPermission": true
                        },
                        {
                          "code": "website:section:writeOff",
                          "hasPermission": true
                        },
                        {
                          "code": "website:section:upload",
                          "hasPermission": true
                        },
                        {
                          "code": "website:section:print",
                          "hasPermission": true
                        },
                        {
                          "code": "website:section:save",
                          "hasPermission": true
                        },
                        {
                          "code": "website:section:updatePwd",
                          "hasPermission": true
                        },
                        {
                          "code": "website:section:history",
                          "hasPermission": true
                        },
                        {
                          "code": "website:section:historyExport",
                          "hasPermission": true
                        },
                        {
                          "code": "website:section:download",
                          "hasPermission": true
                        },
                        {
                          "code": "website:section:cancel",
                          "hasPermission": true
                        },
                        {
                          "code": "website:section:oneKeyPrint",
                          "hasPermission": true
                        },
                        {
                          "code": "website:section:see",
                          "hasPermission": true
                        },
                        {
                          "code": "website:section:auditRemark",
                          "hasPermission": true
                        }
                      ]
                    },
                    "childNode": []
                  },
                  {
                    "isLeaf": 1,
                    "node": {
                      "id": "34",
                      "name": "文章管理",
                      "url": "/website/articleManage",
                      "icon": null,
                      "permissionList": [
                        {
                          "code": "website:article:query",
                          "hasPermission": true
                        },
                        {
                          "code": "website:article:add",
                          "hasPermission": true
                        },
                        {
                          "code": "website:article:edit",
                          "hasPermission": true
                        },
                        {
                          "code": "website:article:del",
                          "hasPermission": true
                        },
                        {
                          "code": "website:article:detail",
                          "hasPermission": true
                        },
                        {
                          "code": "website:article:status",
                          "hasPermission": true
                        },
                        {
                          "code": "website:article:import",
                          "hasPermission": true
                        },
                        {
                          "code": "website:article:export",
                          "hasPermission": true
                        },
                        {
                          "code": "website:article:resetPwd",
                          "hasPermission": true
                        },
                        {
                          "code": "website:article:audit",
                          "hasPermission": true
                        },
                        {
                          "code": "website:article:writeOff",
                          "hasPermission": true
                        },
                        {
                          "code": "website:article:upload",
                          "hasPermission": true
                        },
                        {
                          "code": "website:article:print",
                          "hasPermission": true
                        },
                        {
                          "code": "website:article:save",
                          "hasPermission": true
                        },
                        {
                          "code": "website:article:updatePwd",
                          "hasPermission": true
                        },
                        {
                          "code": "website:article:history",
                          "hasPermission": true
                        },
                        {
                          "code": "website:article:historyExport",
                          "hasPermission": true
                        },
                        {
                          "code": "website:article:download",
                          "hasPermission": true
                        },
                        {
                          "code": "website:article:cancel",
                          "hasPermission": true
                        },
                        {
                          "code": "website:article:oneKeyPrint",
                          "hasPermission": true
                        },
                        {
                          "code": "website:article:see",
                          "hasPermission": true
                        },
                        {
                          "code": "website:article:auditRemark",
                          "hasPermission": true
                        }
                      ]
                    },
                    "childNode": []
                  }
                ]
              }
            },
            "timestamp": "2018-05-10 14:53:37",
            "code": 1
          }
    }
})()