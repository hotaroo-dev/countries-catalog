import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { asc, desc, getCountries, getCountriesByName, ICountry } from "./api";
import CountryCard from "./components/country/countryCard";
import Loading from "./components/common/loading";
import { IconArrowLeft } from "./components/icons/iconArrowLeft";
import { IconArrowRight } from "./components/icons/iconArrowRight";
import { IconSearch } from "./components/icons/iconSearch";
import { opacityVariants, tween } from "./transition";

const limit = 25;

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [countries, setCountries] = useState<ICountry[]>();
  const [searchedCountries, setSearchedCountries] = useState<ICountry[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const page = +(searchParams.get("page") ?? 0);
  const sort = searchParams.get("sort");
  const searchTerm = searchParams.get("search") ?? "";
  const offset = page * limit;
  const allCountries = searchedCountries ?? countries;
  const countriesByPage = error
    ? null
    : (allCountries?.length ?? 0) > offset + limit
      ? allCountries?.slice(offset, offset + limit)
      : allCountries?.slice(offset, allCountries.length);
  const filterdCountries = error
    ? null
    : sort
      ? sort === "asc"
        ? countriesByPage?.sort(asc)
        : countriesByPage?.sort(desc)
      : countriesByPage;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(true);
      setError(false);
      if (!searchTerm) {
        setSearchedCountries(undefined);
        setLoading(false);
        return;
      }
      getCountriesByName(searchTerm).then((data) => {
        const { status } = data as any;
        if (status === 404) setError(true);
        setSearchedCountries(data);
        setLoading(false);
      });
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  useEffect(() => {
    setLoading(true);
    getCountries().then((data) => {
      setCountries(data);
      setLoading(false);
    });
  }, []);

  const setParams = (name: string, value: string) => {
    searchParams.set(name, value);
    setSearchParams(searchParams);
  };

  return (
    <div className="container my-10">
      <h1 className="mb-4 text-3xl font-bold">Countries Catalog</h1>
      <form className="relative max-w-screen-sm" role="search">
        <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-gray-500" />
        <input
          className="w-full rounded-md border py-2.5 pl-12 pr-4 text-lg shadow-sm focus-within:outline-none"
          placeholder="search"
          type="search"
          defaultValue={searchTerm}
          onChange={(e) => {
            setParams("search", e.currentTarget.value);
          }}
        />
      </form>

      <div className="my-6 flex items-center justify-between">
        <div className="space-x-5">
          <button
            className="rounded-md border border-transparent bg-indigo-500 px-6 py-2 font-semibold text-white duration-500 hover:bg-indigo-600 active:bg-indigo-700"
            onClick={() => setParams("sort", "asc")}
          >
            Asc
          </button>
          <button
            className="rounded-md border border-transparent bg-indigo-500 px-6 py-2 font-semibold text-white duration-500 hover:bg-indigo-600 active:bg-indigo-700"
            onClick={() => setParams("sort", "desc")}
          >
            Desc
          </button>
          {sort ? (
            <button
              className="rounded-md border border-transparent px-6 py-2 font-semibold duration-300 hover:border-indigo-600 hover:bg-indigo-100 hover:text-indigo-600 active:bg-indigo-200"
              onClick={() => setParams("sort", "")}
            >
              Reset
            </button>
          ) : null}
        </div>
        <div className="space-x-5">
          <button
            className="rounded-full border border-gray-400 p-1 duration-300 hover:border-indigo-600 hover:bg-indigo-100 hover:text-indigo-600"
            onClick={() =>
              setParams("page", String(page - 1 < 0 ? 0 : page - 1))
            }
          >
            <IconArrowLeft className="text-2xl" />
          </button>
          <button
            className="rounded-full border border-gray-400 p-1 duration-300 hover:border-indigo-600 hover:bg-indigo-100 hover:text-indigo-600"
            onClick={() =>
              setParams(
                "page",
                String(
                  offset + limit > +(allCountries?.length ?? 0)
                    ? page
                    : page + 1,
                ),
              )
            }
          >
            <IconArrowRight className="text-2xl" />
          </button>
        </div>
      </div>

      <AnimatePresence initial={false} mode="wait">
        {loading ? (
          <Loading />
        ) : filterdCountries?.length ? (
          <motion.ul
            key={`${page}-${sort}-${searchTerm}`}
            variants={opacityVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={tween}
            className="grid gap-x-12 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {filterdCountries.map((country, idx) => (
              <CountryCard key={idx} country={country} />
            ))}
          </motion.ul>
        ) : (
          <p className="text-center">No data</p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
