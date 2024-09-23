export function waitFor(seconds: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds);
  });
}

export function getPropName<T>(
  obj: T,
  propRef: T[keyof T],
): keyof T | undefined {
  return (Object.keys(obj) as Array<keyof T>).find(
    (key) => obj[key] === propRef,
  );
}
