import React, {useState} from "react";
import {AppBar, Menu, MenuItem} from "@mui/material";
import Toolbar from '@mui/material/Toolbar';
import {Avatar} from "@mui/material";
import ListLesson from "../views/lessons/ListLesson";
import {Button} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function Student() {
    const [lessons, setLessons] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <AppBar className="appbar"
                    position="static"
                    color="secondary"
            >
                <Toolbar>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <MenuIcon color="action"
                                  fontSize="large"
                        />
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}>
                            <Button color = "inherit"
                                    href="./Homework"
                            >
                                My Homeworks
                            </Button>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Button color = "inherit"
                                    href="./Submit"
                            >
                                Submit Homework
                            </Button>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Button color = "inherit"
                                    href="./Grade"
                            >
                                Grade Homework
                            </Button>
                        </MenuItem>
                    </Menu>
                    <Button href="./Login">
                        <Avatar sx={{
                            width: 32,
                            height: 32,
                            marginLeft: 180,
                            color: "black"
                        }}
                        >
                            S
                        </Avatar>
                    </Button>
                </Toolbar>
            </AppBar>
            <ListLesson lessons={lessons}/>
        </div>
    );
}

export default Student;