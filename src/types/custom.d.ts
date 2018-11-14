declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

declare type RenderCallback<T> = (data: T) => React.ReactNode;
