import LocalSwitcher from "./Locale-Switcher";
import Logo from "./Logo";
import NavComponent from "./Navigation";

const Header = () => {
  return (
    <header className="bg-white">
      <div className="p-2 flex items-center justify-between  m-auto">
        <Logo />
        <div className="flex items-center ">
          <LocalSwitcher />
        </div>
      </div>
      <NavComponent />
    </header>
  );
};

export default Header;
