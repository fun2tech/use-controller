import {
    FunctionComponentElement,
    ProviderProps,
    Context,
    Component,
    FunctionComponent,
} from 'react';

type Class = new (...args: any) => any;
type Expects<A extends any[]> = new(...args: A) => any
type BunchOf<T> = { [key: string]: T }
type BooleanValuesOf<T> = { [K in keyof T]: T[K] extends boolean | undefined ? K : never }
type KeyOfBooleanValueIn<T> = keyof Pick<T, BooleanValuesOf<T>[keyof T]>;

declare function use<I, A extends any[]> (define: new (...args: A) => I, ...args: A): Controller & I;
declare function use<I, A extends any[]> (init: (...args: A) => I, ...args: A): Controller & I;
declare function use<I> (controller: Controller): Controller;
declare function use<I> (init: I): Controller & I;

declare function get<T extends Class> (type: T): InstanceType<T>;
declare function get<T extends Class> (type: InstanceType<T>, ...args: any[]): InstanceType<T>;

export interface Subscriber<T> {
    on(...properties: string[]): Subscriber<T> & T;
    not(...properties: string[]): Subscriber<T> & T;
    only(...properties: string[]): T;
    except: never;
}

type HandleUpdatedValues<T extends object, P extends keyof T> = 
    (this: T, values: Pick<T, P>, changed: P[]) => void

type HandleUpdatedValue<T extends object, P extends keyof T> = 
    (this: T, value: T[P], changed: P) => void

declare class Controller {
    set: this;
    get: this;
    hold: boolean;

    refresh(...keys: string[]): void;
    add(key: string, initial?: any, bootup?: true): boolean;
    toggle(key: KeyOfBooleanValueIn<this>): boolean;
    
    onChange<P extends keyof this>(key: P | P[]): Promise<P[]>;
    onChange<P extends keyof this>(key: P | P[], listener: HandleUpdatedValue<this, P>): void;

    observe<P extends keyof this>(key: P | P[], listener: HandleUpdatedValue<this, P>, once?: boolean): () => void;

    export(): { [P in keyof this]: this[P] };
    export(onValue: HandleUpdatedValues<this, keyof this>, initial?: boolean): () => void;
    export<P extends keyof this>(keys: P[]): Pick<this, P>;
    export<P extends keyof this>(keys: P[], onChange: HandleUpdatedValues<this, P>, initial?: boolean): () => void;

    protected didInit?(): void;
    protected willDestroy(callback?: () => void): void;

    protected isReady?(): void;
    protected willRender?(...args: any[]): void;
    protected willMount?(...args: any[]): void;
    protected willUpdate?(...args: any[]): void;
    protected didMount?(...args: any[]): void;
    protected willUnmount?(...args: any[]): void;
    protected didFocus?(parent: Controller, as: string): void;
    protected willLoseFocus?(parent: Controller, as: string): void;
    protected willCycle?(...args: any[]): void | (() => void);

    protected elementWillRender?(...args: any[]): void;
    protected elementWillMount?(...args: any[]): void;
    protected elementWillUpdate?(...args: any[]): void;
    protected elementDidMount?(...args: any[]): void;
    protected elementWillUnmount?(...args: any[]): void;
    protected elementWillCycle?(...args: any[]): void | (() => void);

    protected componentWillRender?(...args: any[]): void;
    protected componentWillMount?(...args: any[]): void;
    protected componentWillUpdate?(...args: any[]): void;
    protected componentDidMount?(...args: any[]): void;
    protected componentWillUnmount?(...args: any[]): void;
    protected componentWillCycle?(...args: any[]): void | (() => void);

    on(): this;
    only(): this;
    not(): this;

    assign(props: Partial<this>): this;

    tap(): this;
    tap<K extends keyof this>(key?: K): this[K];

    sub(...args: any[]): this & Subscriber<this>;
    
    get Provider(): FunctionComponentElement<ProviderProps<this>>
    get Value(): FunctionComponent<{ of: string }>

    static assign <T extends Class, I extends InstanceType<T>> (this: T, values: Partial<I>): I & Subscriber<I>;

    static get Provider(): FunctionComponentElement<any>;
    static makeGlobal<T extends Class>(this: T): InstanceType<T>;
    
    static use <A extends any[], T extends Expects<A>> (this: T, ...args: A): InstanceType<T> & Subscriber<InstanceType<T>>;
    
    static sub <T extends Class> (this: T, ...args: any[]): InstanceType<T> & Subscriber<InstanceType<T>>;

    static get <T extends Class> (this: T): InstanceType<T>;
    static get <T extends Class, I extends InstanceType<T>, K extends keyof I> (this: T, key: K): I[K];

    static has <T extends Class, I extends InstanceType<T>, K extends keyof I> (this: T, key: K): Exclude<I[K], undefined>;

    static tap <T extends Class> (this: T): InstanceType<T> & Subscriber<InstanceType<T>>;
    static tap <T extends Class, I extends InstanceType<T>, K extends keyof I> (this: T, key: K, main?: boolean): I[K];

    /**
     * Easy way to iterate over data to create live controllers.
     * 
     * Equivalent to: `array.map(x => new this(x))`
     */
    static map <D, T extends new (data: D, index: number) => any>(this: T, array: D[]): InstanceType<T>[];

    static hoc <T extends Class> (this: T, fc: FunctionComponent<InstanceType<T>>): Component<any>;
    static context <T extends Class> (this: T): Context<InstanceType<T>>;
}

interface MultiProviderProps {
    using: Controller[]
}

declare const MultiProvider: FunctionComponentElement<MultiProviderProps>

export { 
    use,
    get,
    Controller,
    Controller as Singleton,
    Controller as default,
    MultiProvider as Provider
}