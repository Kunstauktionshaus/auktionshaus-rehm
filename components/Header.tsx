import LocalSwitcher from "./Locale-Switcher";
import Logo from "./Logo";
import NavComponent from "./Navigation";

const Header = () => {
  return (
    <header className="w-full bg-white font-montserrat p-4">
      <div className="flex justify-between items-center">
        <Logo />
        <NavComponent />
        <LocalSwitcher />
      </div>
    </header>
  );
};

export default Header;
