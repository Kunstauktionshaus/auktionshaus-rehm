import LocalSwitcher from "./Locale-Switcher";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className="bg-white">
      <div className="p-4 flex items-center justify-between  m-auto">
        <Logo />
        <LocalSwitcher />
      </div>
    </header>
  );
};

export default Header;
