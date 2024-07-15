interface McStatus {
  online: boolean;
  host: string;
  port: number;
  ip_address: string;
  eula_blocked: boolean;
  retrieved_at: number;
  expires_at: number;
  srv_record: null | string;
  version: {
    name_raw: string;
    name_clean: string;
    name_html: string;
    protocol: number;
  };
  players?: {
    online: number;
    max: number;
    list: McPlayer[];
  };
  motd: {
    raw: string;
    clean: string;
    html: string;
  };
  icon: null | string;
  mods: string[];
  software: null | string;
  plugins: string[];
}

interface McPlayer {
  uuid: string;
  name_raw: string;
  name_clean: string;
  name_html: string;
}
