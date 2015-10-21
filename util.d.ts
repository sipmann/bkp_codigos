declare module util {
  interface SimpleAlertOptions {
    segundos?: number;
    posicao?: String;
  }

  interface RequestOptions {
    method: String;
  }

  export function confExtend (base:JSON, novo: JSON) : JSON;

  export function simpleAlert (msg: String, configs?: SimpleAlertOptions) : void;

  export function navegar (pg: String, destino: HTMLElement) : void;

  export function request (pg: String, params?: RequestOptions) : void;
}

declare module "util" {
    export = util;
}
