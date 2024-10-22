import AuthButtonsContainer from "./AuthButtonsContainer";
import LocalSwitcher from "./Locale-Switcher";
import Logo from "./Logo";
import NavComponent from "./Navigation";

const Header = () => {
  return (
    <header className="w-full bg-white font-montserrat">
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center p-4">
        <Logo />
        <LocalSwitcher />
        <AuthButtonsContainer />
      </div>
      <NavComponent />
    </header>
  );
};

export default Header;
