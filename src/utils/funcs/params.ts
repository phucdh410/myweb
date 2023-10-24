import { parse, stringify } from 'qs';

interface IParamsInput {
  [key: string]: any | IParamsInput;
}
interface IParamsOutput {
  [key: string]: string | boolean | number | any[] | IParamsOutput;
}

export function formatParams(obj: IParamsInput) {
  const newObj: { [key: string]: IParamsOutput } = {};
  for (let key in obj) {
    let value: any = obj[key];

    if (value === '' || value === null || value === undefined) {
      continue;
    } else if (Array.isArray(value)) {
      if (value.length === 0) continue;
      value = [...value];
    } else if (typeof value === 'object') {
      if (Object.keys(value).length === 0) continue;
      value = formatParams(value);
    } else if (typeof value === 'boolean') {
      value = !!value;
    } else if (!isNaN(value)) {
      value = parseInt(value);
    } else if (value === 'true') {
      value = true;
    } else if (value === 'false') {
      value = false;
    }
    newObj[key] = value;
  }
  return newObj;
}

export function queryStringToObject(
  input: string,
  defaultValue?: object,
): Record<string, any> {
  const result = parse(input, { ignoreQueryPrefix: true });

  if (defaultValue) {
    return { ...defaultValue, ...result };
  }

  return result;
}

export function objectToQueryString(object: object, skipNulls = false): string {
  return stringify(object, {
    encode: true,
    arrayFormat: 'brackets',
    skipNulls: skipNulls,
  });
}
