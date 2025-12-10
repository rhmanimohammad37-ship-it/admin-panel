export default function useLocalstoeage() {
  const setDataInLocalstorage = (key , value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  const getDataFromLocalstorage = (key) => {
    const info = JSON.parse(localStorage.getItem(key));
    return info;
  };

  return [setDataInLocalstorage, getDataFromLocalstorage];
}
