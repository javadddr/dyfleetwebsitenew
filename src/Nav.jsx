import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button } from "@nextui-org/react";
import logo from "./assets/logo5.png";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Pricing", path: "/pricing" },
    { name: "Contact", path: "/contact" },
    
    { name: "Login", path: "https://www.app.dynamofleet.com/login" },
    { name: "Sign Up", path: "https://www.app.dynamofleet.com/register" },
  ];
console.log(isMenuOpen)
  const handleMenuItemClick = (path) => {
    if (path.startsWith("http")) {
      window.open(path, "_blank", "noopener noreferrer");
      
    } else {
      navigate(path);
    }
    setIsMenuOpen(false);
  };

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} isBordered  isMenuOpen={isMenuOpen}>
      <NavbarContent>
      <NavbarMenuToggle
  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
  className="sm:hidden dark"
  
/>


        <NavbarBrand>
          <img src={logo} alt="Logo" className="h-6 w-6 mr-1" />
          <p className="font-bold text-indigo-1200 ">DYNAMOFLEET</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link className="font-light text-inherit hover:text-blue-600" to="/">Home</Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="font-light text-inherit hover:text-blue-600 " to="/pricing">Pricing</Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="font-light text-lime-950 hover:text-blue-600" to="/contact">Contact</Link>
        </NavbarItem>
        <div className="border-l border-gray-300 h-8 mx-1"></div>
        <NavbarItem>
          <a className="font-light text-lime-950 hover:text-blue-600" href="https://www.app.dynamofleet.com/demo" target="_blank" rel="noopener noreferrer">Live Demo</a>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <a className="font-light text-lime-950 hover:text-blue-600 text-blue-600/100" href="https://www.app.dynamofleet.com/login" target="_blank" rel="noopener noreferrer">Login</a>
        </NavbarItem>
        <NavbarItem>
          <Button as="a" color="primary" href="https://www.app.dynamofleet.com/register" variant="flat" target="_blank" rel="noopener noreferrer">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
        <NavbarMenuItem
        key={`${item.name}-${index}`}
        onClick={() => {
          handleMenuItemClick(item.path);
          
        }}
        className="hover:text-blue-600 cursor-pointer"
      >
        {item.name === "Sign Up" ? (
          <Button as="a" color="primary" href="https://www.app.dynamofleet.com/register" variant="flat" target="_blank" rel="noopener noreferrer">
            {item.name}
          </Button>
        ) : (
          <span className="w-full text-lg">{item.name}</span>
        )}
      </NavbarMenuItem>
      
        
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
