const HeaderNav = () => {
  return (
    <div className="row ">
      <div className="col text-left">
        <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <a href="#">دیشبورد</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#"></a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              User Profile
            </li>
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default HeaderNav;
