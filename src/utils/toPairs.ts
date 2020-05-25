export default function toPairs(array: Array<any>): Array<[any, any]> {
  return array.reduce((result, _, index, array) => {
    if (index % 2 === 0) {
      result.push(array.slice(index, index + 2));
    }

    return result;
  }, []);
}
