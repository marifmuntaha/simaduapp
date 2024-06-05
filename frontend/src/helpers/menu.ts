import {MENU_ADMINISTRATOR, MENU_ITEMS, MenuItemTypes} from '@/constants/menu'

const getMenuItems = (role: string) => {
    // NOTE - You can fetch from server and return here as well
    switch (role) {
        case '1':
            return MENU_ADMINISTRATOR
        case '2':
            return MENU_ITEMS
        case '3':
            return MENU_ITEMS
        case '4':
            return MENU_ITEMS
        case '5':
            return MENU_ITEMS
        case '6':
            return MENU_ITEMS
        case '7':
            return MENU_ITEMS
        case '8':
            return MENU_ITEMS
        case '9':
            return MENU_ITEMS
        default:
            return null
    }
}

const findAllParent = (menuItems: MenuItemTypes[], menuItem: MenuItemTypes): string[] => {
    let parents: string[] = []
    const parent = findMenuItem(menuItems, menuItem.parentKey)

    if (parent) {
        parents.push(parent.key)
        if (parent.parentKey) {
            parents = [...parents, ...findAllParent(menuItems, parent)]
        }
    }
    return parents
}

const findMenuItem = (menuItems: MenuItemTypes[] | undefined, menuItemKey: MenuItemTypes['key'] | undefined): MenuItemTypes | null => {
    if (menuItems && menuItemKey) {
        for (let i = 0; i < menuItems.length; i++) {
            if (menuItems[i].key === menuItemKey) {
                return menuItems[i]
            }
            const found = findMenuItem(menuItems[i].children, menuItemKey)
            if (found) return found
        }
    }
    return null
}

export {getMenuItems, findAllParent, findMenuItem}
