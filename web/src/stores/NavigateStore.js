import {makeAutoObservable} from "mobx";

const LogPrefix = '[NavigateStore]';

export default  class NavigateStore {
    constructor(props) {

        this.open = true;
        this.menuValue = 1;
        this.sideBar = false;
        this.cardEmpty = false;
        this.hidden = false;

        makeAutoObservable(this);
    }

    changeOpen = (open) => {
        this.open = open;
    }

    changeMenuValue = (menuValue) => {
        this.menuValue = menuValue;
    }

    changeSideBar = (sideBar) => {
        this.sideBar = sideBar;
    }

    changeCardEmpty = (isEmpty) => {
        this.cardEmpty = isEmpty;
    }

    changeHidden = (hidden) => {
        this.hidden = hidden;
    }
}