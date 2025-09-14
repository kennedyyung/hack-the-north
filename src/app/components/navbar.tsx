import { TextField, InputAdornment } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faGear, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";''

export default function NavBar() {
    return (
        <div className="p-4 flex items-center gap-4 bg-gray-100">
            <h1 className="text-3xl">
                <span className="text-blue-500 font-bold text-4xl align-middle">K</span>
                <span className="align-middle font-bold">larity</span>
            </h1>




            <div className="flex-grow flex justify-center">
                <TextField
                    placeholder="Search emails, tasks, or financial data..."
                    variant="outlined"
                    size="small"
                    className="w-2/4 max-w-2xl"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '8px',
                            backgroundColor: 'white',
                        }
                    }}
                />
            </div>

            <div className="flex items-center gap-4 ml-auto">
                <FontAwesomeIcon icon={faBell} className="text-gray-600 hover:text-gray-800 cursor-pointer" />
                <FontAwesomeIcon icon={faGear} className="text-gray-600 hover:text-gray-800 cursor-pointer" />
                <FontAwesomeIcon icon={faUser} className="text-gray-600 hover:text-gray-800 cursor-pointer" />
            </div>
        </div>
    );
}
