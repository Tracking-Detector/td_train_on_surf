import { injectable } from "inversify";
import { ISettings } from "./types";
import browser from "webextension-polyfill";
@injectable()
export class Settings implements ISettings {
  private _chunkSize = 512;
  private _epochs = 7;
  private _windowSize = 512;
  private _blockingRate = 0.8;
  private _modelActive = false;
  private _blockingActive = true;
  constructor() {
    browser.storage.local.get().then((value) => {
      this._chunkSize = value.chunkSize || this._chunkSize;
      this._epochs = value.epochs || this._epochs;
      this._windowSize = value.windowSize || this._windowSize;
      this._blockingRate = value.blockingRate || this._blockingRate;
      this._modelActive = value.modelActive || this._modelActive;
      this._blockingActive = value.blockingActive || this._blockingActive;
      browser.storage.local.set({
        chunkSize: this._chunkSize,
        epochs: this._epochs,
        windowSize: this._windowSize,
        blockingRate: this._blockingRate,
        modelActive: this._modelActive,
        blockingActive: this._blockingActive,
      });
    });
    setInterval(() => {
      browser.storage.local.get().then((value) => {
        this._chunkSize = value.chunkSize || this._chunkSize;
        this._epochs = value.epochs || this._epochs;
        this._windowSize = value.windowSize || this._windowSize;
        this._blockingRate = value.blockingRate || this._blockingRate;
        this._modelActive = value.modelActive || this._modelActive;
        this._blockingActive = value.blockingActive || this._blockingActive;
      });
    }, 400);
  }

  get chunkSize(): number {
    return this._chunkSize;
  }
  get epochs(): number {
    return this._epochs;
  }
  get windowSize(): number {
    return this._windowSize;
  }
  get blockingRate(): number {
    return this._blockingRate;
  }
  get modelActive(): boolean {
    return this._modelActive;
  }
  get blockingActive(): boolean {
    return this._blockingActive;
  }
  updateTrainingHist(lastEpochAcc: number): void {
    console.log(lastEpochAcc);
  }
}
