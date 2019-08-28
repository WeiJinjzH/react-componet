const menu = [
    {
        text: 'Home',
        href: '',
        id: 'home',
        iconCss: '',
        buttonContainer: false,
        nodes: [
            {
                text: 'Nothing1',
                href: '',
                id: 'nothing1',
                iconCss: '',
                buttonContainer: false,
                nodes: [
                    {
                        text: 'Nothing3',
                        href: '/',
                        id: 'nothing3',
                        iconCss: '',
                        buttonContainer: true,
                        nodes: [],
                    },
                ],
            },
            {
                text: 'Nothing2',
                href: '/404',
                id: 'nothing2',
                iconCss: '',
                buttonContainer: true,
                nodes: [],
            },
        ],
    },
    {
        text: 'Nothing',
        href: '/403',
        id: 'nothing',
        iconCss: '',
        buttonContainer: true,
        nodes: [],
    },
]

export default menu
