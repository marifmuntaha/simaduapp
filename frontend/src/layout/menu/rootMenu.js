export const rootMenu = [
    {
        icon: "monitor",
        text: "Dashboard",
        link: "/",
    },
    {
        icon: "archived",
        text: "Master",
        active: false,
        subMenu: [
            {
                text: "Jenjang",
                link: "/master/jenjang",
            },
            {
                text: "Profil Madrasah",
                link: "/master/madrasah",
            },
            {
                text: "Rekening",
                link: "/master/rekening",
            },
            {
                text: "Grup",
                link: "/master/grup",
            },
        ],
    },
    {
        icon: "users",
        text: "Pengguna",
        active: "false",
        link: "/pengguna",
    },

    {
        icon: "setting-alt",
        text: "Pengaturan",
        active: "false",
        link: "/pengaturan",
    },
];
