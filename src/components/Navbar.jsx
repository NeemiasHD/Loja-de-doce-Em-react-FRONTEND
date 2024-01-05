import { Link } from "react-router-dom";
import "./Navbar.css";

window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    document.querySelector(".navbar").style.backgroundColor =
      "var(--CorEscura)";
      document.querySelector(".bx.bx-menu").style.color = "var(--CorBranca)"
  } else {
    document.querySelector(".navbar").style.backgroundColor = "transparent";
    if(document.querySelector(".SubMenu").style.top == "0px"){
      document.querySelector(".bx.bx-menu").style.color = "black"
    }
  }
});

function Navbar() {
  return (
    <>
      <div className="navbar">
        <Link to={`/`}>
          <img src="src/img/foodlovelogo.png" />
        </Link>
        {/* <Link to={`/edit`}>
        <i class="bx bx-edit"></i>
      </Link>
      <Link to={`/new`}>
        <i class="bx bx-plus-circle"></i>
      </Link> */}

        <a>
          <i
            class="bx bx-menu"
            onClick={() => {
              document.querySelector(".SubMenu").style.top === "-250px"
                ? (document.querySelector(".SubMenu").style.top = "0px",
                  document.querySelector(".bx.bx-menu").style.color = "black",
                  window.scrollY>20?(document.querySelector(".bx.bx-menu").style.color = "var(--CorBranca)"):(<></>)
                )
                : (document.querySelector(".SubMenu").style.top = "-250px",
                  document.querySelector(".bx.bx-menu").style.color = "var(--CorBranca)"
                );
            }}
          ></i>
        </a>
      </div>
      <nav className="SubMenu" style={{ top: "-250px" }}>
        <li>
          <Link
            to={`/`}
            className="itemSubMenu"
            onClick={() => {
              document.querySelector(".bx.bx-menu").click();
            }}
          >
            Home
          </Link>
        </li>
        <li>
          <a
            className="itemSubMenu"
            onClick={() => {
              document.querySelector(".bx.bx-menu").click();
            }}
          >
            Cárdapio
          </a>
        </li>
        <li>
          <a
            className="itemSubMenu"
            onClick={() => {
              document.querySelector(".bx.bx-menu").click();
            }}
          >
            Promoções
          </a>
        </li>
        <li>
          <Link
            className="itemSubMenu"
            onClick={() => {
              document.querySelector(".bx.bx-menu").click();
            }}
            to={`/edit`}
          >
            Login
          </Link>
        </li>
      </nav>
    </>
  );
}

export default Navbar;
