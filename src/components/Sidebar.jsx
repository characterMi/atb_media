import { Stack } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { categories } from "../utils/constants";
import DownloadAppButton from "./DownloadBtn";

const Sidebar = ({ selectedCategory, setSelectedCategory }) => {
    const [_, setSearchParams] = useSearchParams();

    const handleClick = (category) => {
        setSearchParams({ category: category.name });

        setSelectedCategory(category.name);
    }

    return (
        <Stack
            direction="row"
            sx={{
                overflow: "auto",
                height: { xs: "auto", md: "95%" },
                flexDirection: { md: "column" }
            }}
        >
            {categories.map((category, index) => (
                <button
                    key={index}
                    className="category-btn"
                    onClick={() => handleClick(category)}
                    style={{
                        background: category.name === selectedCategory && "#fc1503",
                        color: "#fff",
                    }}
                >
                    <span style={{ color: category.name === selectedCategory ? 'white' : "red" }}>{category.icon}</span>
                    <span style={{ opacity: category.name === selectedCategory ? '1' : '0.8' }}>{category.name}</span>
                </button>
            ))}

            <div className="download-btn">
                <DownloadAppButton />
            </div>
        </Stack>
    )
}

export default Sidebar