const menu = {
    'GET /manage/menu/get-menu': {
        code: 0,
        data: [
            {
                buttonContainer: true,
                href: '/',
                iconCss: '',
                id: 'home',
                nodes: [],
                text: 'Home',
            },
            {
                buttonContainer: false,
                href: '',
                iconCss: '',
                id: 'error-page',
                text: 'Error Page',
                nodes: [
                    {
                        buttonContainer: true,
                        href: '/403',
                        iconCss: '',
                        id: '403',
                        nodes: [],
                        text: 'Error 403',
                    },
                    {
                        buttonContainer: true,
                        href: '/404',
                        iconCss: '',
                        id: '404',
                        nodes: [],
                        text: 'Error 404',
                    },
                ],
            },
        ],
        errorUrl: '',
        msg: 'success',
        success: true,
    },
}

module.exports = menu
