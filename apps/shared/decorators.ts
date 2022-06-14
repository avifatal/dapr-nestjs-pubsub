import { INestApplication } from '@nestjs/common';
import { DaprServer } from 'dapr-client';

export type PubsubMap = {
  [pubSubName: string]: {
    topic: string;
    target: any;
    descriptor: PropertyDescriptor;
  };
};
export const DAPR_PUB_SUB_MAP: PubsubMap = {};
export const DaprPubSubSubscribe = (
  pubSubName: string,
  topic: string,
): MethodDecorator => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    DAPR_PUB_SUB_MAP[pubSubName] = {
      topic,
      target,
      descriptor,
    };
    return descriptor;
  };
};

export const useDaprPubSubListener = async (app: INestApplication) => {
  const daprServer = app.get(DaprServer);

  for (const pubSubName in DAPR_PUB_SUB_MAP) {
    const item = DAPR_PUB_SUB_MAP[pubSubName];
    console.log(
      `Listening to the pubsub name - "${pubSubName}" on topic "${item.topic}"`,
    );
    await daprServer.pubsub.subscribe(
      pubSubName,
      item.topic,
      async (data: any) => {
        const targetClassImpl = app.get(item.target.constructor);
        await targetClassImpl[item.descriptor.value.name](data);
      },
    );
  }
};
