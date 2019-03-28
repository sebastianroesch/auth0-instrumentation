export class DecoratedBunyan {
  public child: (childOptions: any, simple: any) => any;
  public trace: (msg: any) => any;
  public debug: (msg: any) => any;
  public info: (msg: any) => any;
  public warn: (msg: any) => any;
  public error: (msg: any) => any;
  public fatal: (msg: any) => any;
  public reopenFileStreams: () => void;
}
