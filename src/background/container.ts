import "reflect-metadata";
import { Container } from "inversify";
import {
  type IApp,
  type ITPLService,
  TYPES,
  IModel,
  IExtractor,
  IAsyncQueue,
  ISampler,
  ISettings,
  IStats,
  IMessages,
  ICrawler,
} from "./types";
import { TPLBlockerService } from "./blocker";
import { App } from "./app";
import { Model } from "./model";
import { FeatureExtractor203 } from "./featureExtractor";
import { AsyncQueue } from "./asyncQueue";
import { RandomSampler } from "./sampler";
import { Settings } from "./settings";
import { Stats } from "./stats";
import { Messages } from "./messages";
import { Crawler } from "./crawler";

const container = new Container();
container.bind<ISettings>(TYPES.ISettings).to(Settings).inSingletonScope();
container
  .bind<ITPLService>(TYPES.ITPLService)
  .to(TPLBlockerService)
  .inSingletonScope();
container.bind<ICrawler>(TYPES.ICrawler).to(Crawler).inSingletonScope();
container.bind<IMessages>(TYPES.IMessages).to(Messages).inSingletonScope();
container.bind<IStats>(TYPES.IStats).to(Stats).inSingletonScope();
container.bind<IModel>(TYPES.IModel).to(Model).inSingletonScope();
container.bind<ISampler>(TYPES.ISampler).to(RandomSampler).inSingletonScope();
container
  .bind<IExtractor>(TYPES.IExtractor)
  .to(FeatureExtractor203)
  .inSingletonScope();
container
  .bind<IAsyncQueue>(TYPES.IAsyncQueue)
  .to(AsyncQueue)
  .inSingletonScope();
container.bind<IApp>(TYPES.IApp).to(App);

export { container };
