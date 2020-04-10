import { FunctionComponentElement, ProviderProps } from 'react';

import { Dispatch } from './dispatch';

export type BunchOf<T> = { [key: string]: T }
export type State = LiveState & BunchOf<any>
export type Class = new(...args: any[]) => any;
export type UpdateTrigger = (beat: number) => void;
export type HandleUpdatedValue<T extends object, P extends keyof T> = 
  (this: T, value: T[P], changed: P) => void

export const UNSUBSCRIBE = "__delete_subscription__";
export const SUBSCRIBE = "__activate_subscription__";
export const RENEW_CONSUMERS = "__renew_consumers__";

export interface LiveState<State = any> {
  refresh(): void;
  add(key: string, initial?: any): void;
  export(): State;
}

export interface SpyController extends ModelController {
  [UNSUBSCRIBE]: () => void;
  [SUBSCRIBE]: () => void;
}

export declare class ModelController { 
  static global: boolean;
  static tap(): ModelController;

  local: BunchOf<any>;
  dispatch: Dispatch;

  toggle(key: string): boolean;

  didFocus?(parent: ModelController, as: string): void;
  didInit?(): void;
  didMount?(...args: any[]): void;
  willDestroy(callback?: () => void): void;
  willMount?(...args: any[]): void;
  willLoseFocus?(parent: ModelController, as: string): void;
  willRender?(...args: any[]): void;
  willUnmount?(...args: any[]): void;
  willUpdate?(...args: any[]): void;
  isReady?(): void;
  willExist(...args: any[]): () => void;

  elementDidFocus?(parent: ModelController, as: string): void;
  elementDidMount?(...args: any[]): void;
  elementWillLoseFocus?(parent: ModelController, as: string): void;
  elementWillMount?(...args: any[]): void;
  elementWillRender?(...args: any[]): void;
  elementWillUnmount?(...args: any[]): void;
  elementWillUpdate?(...args: any[]): void;
  elementWillExist(...args: any[]): () => void;

  componentDidMount?(...args: any[]): void;
  componentWillMount?(...args: any[]): void;
  componentWillRender?(...args: any[]): void;
  componentWillUnmount?(...args: any[]): void;
  componentWillUpdate?(...args: any[]): void;
  componentWillExist(...args: any[]): () => void;

  observe<P extends keyof this>(key: P | P[], listener: HandleUpdatedValue<this, P>, once?: boolean): () => void;

  not(...args: string[]): this;
  on(...args: string[]): this;
  once(): this;
  only(...args: string[]): this;

  assign(props: BunchOf<any>): this;
  refresh(keys: string[]): void;
  
  [RENEW_CONSUMERS]?: () => void;
  
  Provider: FunctionComponentElement<ProviderProps<this>>;
}