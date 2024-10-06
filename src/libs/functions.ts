import { ConfigService } from '@nestjs/config';

export function waitFor(configService: ConfigService) {
  const DEV_WAIT_TIME = configService.get<string>('DEV_WAIT_TIME');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, Number(DEV_WAIT_TIME));
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
