const fields = "flags,name,idd,cca2,cca3,nativeName,altSpellings";
const BASE_URL = "https://restcountries.com/v3.1";

export interface ICountry {
  flags: {
    alt: string;
    png: string;
  };
  cca2: string;
  cca3: string;
  altSpellings: string;
  name: {
    official: string;
    nativeName: {
      [key: string]: {
        official: string;
      };
    };
  };
  idd: {
    root: string;
    suffixes: string[];
  };
}

export interface ICountryDetail extends ICountry {
  region: string;
  capital: string;
  population: number;
  languages: {
    [key: string]: string;
  };
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const asc = (a: ICountry, b: ICountry) =>
  a.name.official.localeCompare(b.name.official);
const desc = (a: ICountry, b: ICountry) =>
  b.name.official.localeCompare(a.name.official);

const getCountries = async () => {
  try {
    const res = await fetch(`${BASE_URL}/all?fields=${fields}`);
    const data = await res.json();
    await sleep(300);
    return data as ICountry[];
  } catch (err) {
    // handle error
    alert(err);
  }
};

const getCountriesByName = async (name: string) => {
  try {
    const res = await fetch(`${BASE_URL}/name/${name}?fields=${fields}`);
    const data = await res.json();
    await sleep(300);
    return data as ICountry[];
  } catch (err) {
    // handle error
    alert(err);
  }
};

const getCountryByCode = async (code: string) => {
  try {
    const res = await fetch(`${BASE_URL}/alpha/${code}`);
    const data = await res.json();
    return data[0] as ICountryDetail;
  } catch (err) {
    // handle error
    alert(err);
  }
};

export { asc, desc, getCountries, getCountriesByName, getCountryByCode };
