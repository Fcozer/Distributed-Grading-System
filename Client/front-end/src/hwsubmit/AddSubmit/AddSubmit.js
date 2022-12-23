import React, {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";


export function AddSubmit(props) {
    const [formState, setFormState] = useState({});
    // const [time, setTime] = useState(new Date());
    const [file, setFile] = useState('');

    /*
    const handleChange = (newDate) => {
        setTime(newDate);
        const newState = {...formState};
        newState["time"] = newDate;
        setFormState(newState);
    };


 */
    const uploadFile = (event) => {
        setFile(event.target.value);
        const newState = {...formState};
        newState["file"] = event.target.value;
        setFormState(newState);
    }

    function onFormInputChange(event) {
        const field = event.target.name;
        const value = event.target.value;
        const newState = {...formState};
        newState[field] = value;
        setFormState(newState);
    }

    return (
        <Dialog open={props.isOpen}>
            <DialogTitle>
                SUBMIT YOUR HOMEWORK
            </DialogTitle>
            <DialogContent>
                <input value={file}
                       type="file"
                       name="file"
                       label="file"
                       onChange={uploadFile}
                />
                <TextField onChange={onFormInputChange}
                           name="homework_id"
                           label="Homework"
                           color="secondary"
                           fullWidth
                >
                </TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.close()}
                        color="secondary"
                >
                    Cancel
                </Button>
                <Button onClick={() => props.addSubmit(formState)}
                        color="success"
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
}