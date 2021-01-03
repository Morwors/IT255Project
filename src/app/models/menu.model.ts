export interface IMenuList {
  menus: IMenu[];
  loaded: boolean;
  reachedEnd: boolean;

}

export interface IMenu {
  menuPhoto: string;
  timestamp: number;
  id: string;
}
