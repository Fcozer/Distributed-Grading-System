import React, {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";

export function AddGrade(props) {
    const [formState, setFormState] = useState({});
    // const [time, setTime] = useState(new Date());
    const [grade, setGrade] = useState('');

    const uploadFile = (event) => {
        setGrade(event.target.value);
        const newState = {...formState};
        newState["grade"] = event.target.value;
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
                GRADE HOMEWORK
            </DialogTitle>
            <DialogContent>
                <TextField onChange={onFormInputChange}
                           name="grade"
                           label="Grade"
                           color="secondary"
                           fullWidth
                >
                </TextField>
                <TextField onChange={onFormInputChange}
                           name="submit_id"
                           label="Submit"
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
                <Button onClick={() => props.addGrade(formState)}
                        color="success"
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
}