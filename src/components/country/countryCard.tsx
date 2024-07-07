import { useState } from "react";
import { ICountry } from "../../api";
import CountryDetail from "./countryDetail";
import { AnimatePresence } from "framer-motion";

interface IProps {
  country: ICountry;
}

const Country: React.FC<IProps> = ({ country }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <li className="cursor-pointer" onClick={() => setShowModal(true)}>
        <img
          className="aspect-[5/3] w-full rounded-md border object-cover shadow-sm"
          src={country.flags.png}
          alt={country.flags.png}
        />
        <div className="mt-2.5">
          <div className="flex justify-between">
            <h1 className="text-lg font-bold leading-tight">
              {country.name.official}
            </h1>
            <p>{country.idd.root}</p>
          </div>
          <p>{country.altSpellings[1]}</p>
          <p className="text-gray-500">{country.cca2}</p>
          <p className="text-gray-500">{country.cca3}</p>
        </div>
      </li>
      <AnimatePresence initial={false}>
        {showModal && (
          <CountryDetail code={country.cca3} setShowModal={setShowModal} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Country;
