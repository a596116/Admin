interface Menu {
    title?: string,
    hidden?: boolean,
    icon?: string,
    isClick?: boolean,
    route?: string,
}

export interface IMenu extends Menu {
    children?: Menu[]
}