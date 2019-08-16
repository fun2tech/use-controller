import {
  Context,
  createContext,
  createElement,
  FunctionComponentElement,
  MutableRefObject,
  PropsWithChildren,
  ProviderProps,
  useEffect,
  useRef,
  useState,
} from 'react';

import { invokeLifecycle } from './helper';
import { Dispatch, NEW_SUB, SpyController, useSubscriber } from './subscriber';
import { ExpectsParams, Lifecycle, UpdateTrigger } from './types.d';

const CACHE_CONTEXTS = new Map<typeof Controller, Context<Controller>>();

export interface Controller {
  /* Force compatibility with <InstanceType> */
  new (...args: any): any;
  [NEW_SUB]: (hook: UpdateTrigger) => SpyController;
}

export class Controller {
  static use<T extends ExpectsParams<A>, A extends any[]>
    (this: T, ...args: A){

    type I = InstanceType<T>;

    const update = useState(0);
    const ref = useRef(null) as MutableRefObject<I>
    let state = ref.current;

    if(state === null){
      const instance = new this(...args);
      void update;
      
      Dispatch.apply(instance);
      state = ref.current = instance as I;
    }

    useEffect(() => {
      const proto = this.prototype as Lifecycle;
      return invokeLifecycle(
        state, 
        state.didMount || proto.didMount, 
        state.willUnmount || proto.willUnmount
      );
    }, [])

    return state;
  }

  static specificContext<T extends Controller>(this: T){
    const { constructor } = this.prototype;
    let context = CACHE_CONTEXTS.get(constructor);

    if(!context){
      context = createContext(this.prototype);
      CACHE_CONTEXTS.set(constructor, context);
    }

    return context;
  }

  static hook<T extends Controller>(this: T){
    const Context = (this as any).specificContext();

    return () => 
      useContextSubscriber(Context) as InstanceType<T>;
  }

  private getSpecificContext(){
    const { constructor } = this;
    let context = CACHE_CONTEXTS.get(constructor as any) as any;

    if(!context){
      const { name } = constructor;
      throw new Error(
        `\nNo accessor for class ${name} has been declared in your app; ` +  
        `this is required before using a corresponding Provider! ` + 
        `Run \`${name}.hook()\` and/or \`${name}.specificContext()\` within a module first.\n`
      );
    }

    return context as Context<Controller>;
  }

  get Provider(): FunctionComponentElement<ProviderProps<this>> {
    const { Provider } = this.getSpecificContext();
    return <any> (
      (props: PropsWithChildren<any>) => 
      createElement(
        Provider,
        { value: this },
        props.children
      )
    )
  }

  didMount?(): void;
  willUnmount?(): void;
}