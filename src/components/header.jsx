import "./components-style.css";
import Logo from "./../assets/img/AdminLogo.png";
const Header = () => {
  return (
    <div id="header">
      <div className="header-item">
        <h4> د تخنیکی او مسلکی زده کړو اداره</h4>
      </div>
      <div className="header-item p-0">
        <h3>مکتوب/پیشنهاد</h3>
      </div>
      <img src={Logo} width="65px" height="65px" className="logo" />
    </div>
  );
};

export default Header;
