type ValueOf<T> = T[keyof T];
type ClassType = { new(...args: any[]): any };

// eslint-disable-next-line @typescript-eslint/ban-types
type StaticMethods<T extends ClassType> = Exclude<keyof Extract<T, Function>, 'prototype'>;
