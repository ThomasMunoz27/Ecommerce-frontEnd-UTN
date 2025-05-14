export const getColorStyle = (name: String) => {
        switch (name.toLowerCase()) {
            case "rojo":
                return { backgroundColor: "red" }
            case "azul":
                return { backgroundColor: "blue" }
            case "verde":
                return { backgroundColor: "green" }
            case "negro":
                return { backgroundColor: "black" }
            case "blanco":
                return { backgroundColor: "white", border: "1px solid #ccc" } 
        }
    }