import {
  BrowserWindow,
  Menu,
  MenuItem,
  MenuItemConstructorOptions,
  nativeImage,
  Tray,
} from 'electron';
import { McStatusUpdater } from './mc-status';
import { imageUrlToNativeImage } from '../util';
export class McTray {
  private tray: Tray;
  private contextMenu: Menu;
  private mcStatus: McStatusUpdater | undefined = undefined;
  private playersContextMenu: MenuItem | undefined = undefined;
  private trayWindow: BrowserWindow | undefined = undefined;

  constructor(tray: Tray, trayWindow: BrowserWindow) {
    this.tray = tray;
    this.trayWindow = trayWindow;

    this.contextMenu = this.createContextMenu();
    this.mcStatus = new McStatusUpdater((status: McStatus) =>
      this.handleMcStatusUpdate(status),
    );

    this.init();
  }

  private init() {
    this.tray.setToolTip('McTray | 0 Players');
    this.tray.setContextMenu(this.contextMenu);

    this.tray.on('click', () => {
      if (this.trayWindow) {
        this.trayWindow.isVisible()
          ? this.trayWindow.hide()
          : this.trayWindow.show();
      }
    });
  }

  private createContextMenu() {
    this.playersContextMenu = new MenuItem({
      id: 'players',
      label: 'Current Players: 0',
      type: 'normal',
      enabled: false,
    });

    const menu = Menu.buildFromTemplate([
      this.playersContextMenu,
      {
        label: 'Quit',
        type: 'normal',
        click: () => {},
      },
    ]);

    return menu;
  }

  private createTrayWindow() {
    this.trayWindow = new BrowserWindow({
      width: 600,
      height: 400,
      show: false,
      frame: false,
      resizable: false,
    });

    this.trayWindow.loadURL('https://mc.tliy.no');

    let trayBounds = this.tray.getBounds();
    this.trayWindow.setPosition(trayBounds.x - (600 - 200), trayBounds.y - 400);
  }

  private async updateContextPlayers(players: McPlayer[]) {
    const playersItem = this.contextMenu.getMenuItemById('players');
    if (!playersItem) return;

    //Update the player count
    const playerCount = players.length;
    playersItem.label = `Current Players: ${playerCount}`;

    if (playerCount === 0) {
      this.tray.setContextMenu(this.contextMenu);
      return;
    }

    let playerList: MenuItemConstructorOptions[] = [];

    for (const player of players) {
      let playerIcon = await imageUrlToNativeImage(
        `https://crafatar.com/renders/head/${player.uuid}`,
      );

      playerList.push({
        label: player.name_raw,
        type: 'normal',
        icon: playerIcon,
      } as MenuItemConstructorOptions);
    }

    this.playersContextMenu = new MenuItem({
      label: `Current Players: ${playerCount}`,
      type: 'submenu',
      submenu: playerList,
    });

    this.contextMenu = Menu.buildFromTemplate([
      this.playersContextMenu,
      {
        label: 'Quit',
        type: 'normal',
        click: () => {},
      },
    ]);

    this.tray.setContextMenu(this.contextMenu);
  }

  private handleMcStatusUpdate(status: McStatus) {
    this.updateContextPlayers(status.players?.list || []);
    this.tray.setToolTip(`McTray | ${status.players?.online ?? 0} Players`);
  }
}
