import "./components-style.css";
const Footer = () => {
  return (
    <footer class="container-fluid pr-0 pl-0">
      <div className="footer-item" id="footer">
        <div>
          <span className="" style={{ fontWeight: "bold" }}>
            Email:{" "}
          </span>
          <span>tvet_mis@tveta.gov.af</span>
        </div>
        <div>
          د تخنیکی او مسلکی زده کړو اداره{" "}
          <span className="">
            Technical Vocational Education & Training Afghanistan
          </span>
        </div>

        <div className="developer">
          {/* <span className="mr-2 ml-4" style={{ fontWeight: "bold" }}>
                Developer:
              </span>
              <a
                href="https://samiullah-rahimi-portfolio.netlify.app/ "
                target="_blank"
              >
                Samillah Rahimi{" "}
              </a> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
