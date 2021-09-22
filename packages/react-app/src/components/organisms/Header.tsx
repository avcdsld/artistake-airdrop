import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  return (
    <>
      <header className={`w-full h-14 bg-marimo-1 px-8`}>
        <div className="flex items-start text-white">
          <Link to="/">
            <img className="h-12 m-2 ml-0" src="/assets/logo.png" alt="logo" />
          </Link>
        </div>
      </header>

      <div className="w-full overflow-hidden">
        <div className="flex flex-col items-center mx-auto bg-marimo-1 p-4 pb-6">
          <p className="text-white text-2xl marimo-tracking-hero" style={{fontSize: '2em'}}>ArtiStake</p>
          <div className="p-4">
          <img className="h-80 m-2" src="/assets/logo.png" alt="ArtiStake" />
          </div>
          <p className="text-white text-xs marimo-tracking-hero">STAKING FOR CRYPTO ARTISTS</p>
        </div>
        <div className="bg-marimo-4 h-3" />
        <div className="bg-marimo-3 h-6" />
      </div>
    </>
  );
};
