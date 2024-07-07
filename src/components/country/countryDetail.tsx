import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getCountryByCode, ICountryDetail } from "../../api";
import { bgVariants, modalVariants, tween } from "../../transition";

interface Props {
  code: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CountryDetail: React.FC<Props> = ({ code, setShowModal }) => {
  const [country, setCountry] = useState<ICountryDetail>();

  useEffect(() => {
    getCountryByCode(code).then((data) => {
      setCountry(data);
    });
  }, [code]);

  return (
    <motion.div
      variants={bgVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={tween}
      className="fixed inset-0 flex items-center bg-black/40"
      onClick={(e) => {
        if (e.currentTarget === e.target) {
          setShowModal(false);
        }
      }}
    >
      <motion.div
        variants={modalVariants}
        transition={{ ...tween, duration: 0.25 }}
        className="relative mx-auto flex h-screen w-full max-w-[450px] flex-col border bg-neutral-100 p-5 shadow-sm sm:h-min sm:rounded-2xl"
      >
        <img
          className="mx-auto aspect-[5/3] w-full object-cover"
          src={country?.flags.png}
          alt={country?.flags.png}
        />
        <div className="mb-auto">
          <h1 className="my-2.5 text-xl font-bold">{country?.name.official}</h1>
          <p>
            <span className="font-semibold">CCA2:</span> {country?.cca2}
          </p>
          <p>
            <span className="font-semibold">CCA3:</span> {country?.cca3}
          </p>
          <p>
            <span className="font-semibold">Capital:</span> {country?.capital}
          </p>
          <p>
            <span className="font-semibold">Region:</span> {country?.region}
          </p>
          {country?.altSpellings ? (
            <p>
              <span className="font-semibold">Alternative Spellings:</span>{" "}
              {Object.values(country.altSpellings).map((o, idx) =>
                idx === Object.values(country.altSpellings).length - 1
                  ? o
                  : `${o}, `,
              )}
            </p>
          ) : null}
          {country?.languages ? (
            <p>
              <span className="font-semibold">Languages:</span>{" "}
              {Object.values(country.languages).map((o) => o)}
            </p>
          ) : null}
          {country?.currencies ? (
            <p>
              <span className="font-semibold">Currencies:</span>{" "}
              {Object.values(country.currencies).map(
                (o) => `${o.name} - ${o.symbol}`,
              )}
            </p>
          ) : null}
          <p>
            <span className="font-semibold">IDD Root:</span> {country?.idd.root}
          </p>
          <p>
            <span className="font-semibold">IDD Suffixes:</span>{" "}
            {country?.idd.suffixes.map((o, idx) =>
              idx === country.idd.suffixes.length - 1 ? o : `${o}, `,
            )}
          </p>
        </div>
        <button
          className="mt-4 w-full rounded-md border bg-indigo-500 py-2 font-semibold text-white duration-300 hover:bg-indigo-600 active:bg-indigo-700"
          onClick={() => setShowModal(false)}
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
};

export default CountryDetail;
