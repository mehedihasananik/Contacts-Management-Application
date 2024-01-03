import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          daisyUI
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/AddContacts">
              <a>Add Contacts</a>
            </Link>
          </li>
          <li>
            <Link to="/AllContacts">
              <a>All Contacts</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
