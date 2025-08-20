import { PostboyGenericMessage } from "@artstesh/postboy";

export class OnYamlProcessedEvent extends PostboyGenericMessage {
  public static readonly ID = crypto.randomUUID();

  constructor(public data: any) { super() }
}
