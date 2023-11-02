import { Stack } from "@mui/material"
import { categories } from "../utils/constants"

const Sidebar = ({ selectedCategory, setSelectedCategory }) => (
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
                onClick={() => setSelectedCategory(category.name)}
                style={{
                    background: category.name === selectedCategory && "#fc1503",
                    color: "#fff"
                }}
            >
                <span style={{ color: category.name === selectedCategory ? 'white' : "red" }}>{category.icon}</span>
                <span style={{ opacity: category.name === selectedCategory ? '1' : '0.8' }}>{category.name}</span>
            </button>
        ))}
    </Stack>
)

export default Sidebar