export class McStatusUpdater {
  public status: McStatus | undefined = undefined;
  public updateInterval: NodeJS.Timeout | null = null;
  public onUpdated: (status: McStatus) => void = () => {};

  constructor(onUpdate: (status: McStatus) => void = () => {}) {
    this.onUpdated = onUpdate;
    this.updateInterval = setInterval(() => this.fetchStatus, 40000);
    this.fetchStatus();
  }

  async fetchStatus() {
    const baseUrl = 'https://api.mcstatus.io/v2/status/java/mc.tliy.no';

    try {
      const res = await fetch(baseUrl);
      const data = await res.json();
      this.status = data;

      this.onUpdated(data);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
    }
  }
}
