import "./components-style.css";
import Logo from "./../assets/img/AdminLogo.png";
const Header = () => {
  return (
    <div id="header">
      <div className="header-item">
        <h4> د تخنیکی او مسلکی زده کړو اداره</h4>
      </div>
      <div className="header-item">
        <h3>مکتوب/پیشنهاد</h3>
      </div>
      <div></div>
      <img src={Logo} width="3%" className="logo" />
    </div>
  );
};

export default Header;
