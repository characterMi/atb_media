import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "../images/logo.png";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <Stack
      direction="row"
      p={2}
      alignItems="center"
      sx={{ position: "sticky", background: "#000", top: "0", justifyContent: "space-between", zIndex: "100" }}
    >
      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
        <img
          src={Logo}
          alt="Logo"
          height={65}
        />
      </Link>
      <SearchBar />
    </Stack>
  )
}

export default Navbar