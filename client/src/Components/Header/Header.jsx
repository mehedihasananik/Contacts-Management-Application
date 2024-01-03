import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-sm md:text-lg">
          Contacts Management
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/AddContacts">
              <a className="text-sm md:text-lg font-medium">Add Contacts</a>
            </Link>
          </li>
          <li>
            <Link to="/AllContacts">
              <a className="text-sm md:text-lg font-medium">All Contacts</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
