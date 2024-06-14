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
                text: "Tahun Pelajaran",
                link: "/master/tahun-pelajaran",
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
        icon: "building",
        text: "Data Institusi",
        active: "false",
        link: "/institusi",
    },
    {
        icon: "users",
        text: "Data Pengguna",
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
