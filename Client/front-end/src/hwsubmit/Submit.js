import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {AppBar, Button, IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import {DataGrid} from "@mui/x-data-grid";
import {AddSubmit} from "./AddSubmit/AddSubmit";
import {SubmitApi} from "./api/SubmitApi";

function Submit() {
    const [submits, setSubmits] = useState([]);
    const [isAddSubmitDialogOpen, setAddSubmitDialogOpen] = useState(false);
    const [selectionModel, setSelectionModel] = useState();
    const submitApi = new SubmitApi();

    async function getSubmits() {
        const response = await submitApi.getSubmits();
        setSubmits(response.data);
    }

    useEffect(() => {
        getSubmits();
    }, []);

    async function addSubmit(formState) {
        const response = await submitApi.addSubmit(formState);
        const messageResponse = response.data;
        if (messageResponse.responseType === "SUCCESS") {
            toast.success(messageResponse.message);
            setAddSubmitDialogOpen(false);
        }
    }

    async function deleteCell(e){
        e.preventDefault();
        const selectedIDs = selectionModel;
        try {
            const response = await submitApi.deleteSubmit(selectedIDs);
            const messageResponse = response.data;
            if (messageResponse.responseType === "SUCCESS") {
                toast.success(messageResponse.message);
                getSubmits((r) => r.filter((x) => !x.id===selectedIDs));
                getSubmits();
            }
            else{
                toast.error(messageResponse.message);
            }
        }catch (error) {
            toast.error("Please select id");
        }
    }

    async function handleCellChange(params, newValue) {
        const submitIndex = submits.findIndex(submit => {
            return submit.id === params.id;
        });
        const updateSubmits = [... submits];
        updateSubmits[submitIndex][params.field] = newValue;
        setSubmits(updateSubmits)
        const id = params.id;
        const response = await submitApi.updateSubmit(id,updateSubmits[submitIndex]);
        const messageResponse = response.data;
    }
    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 150,
            editable: false,
        },
        {
            field: "file",
            headerName: "file",
            width: 150,
            editable: true,
        },
        {
            field: "homework_id",
            headerName: "Homework ID",
            width: 150,
            editable: true,
        },
        {
            field: "delete",
            width: 75,
            disableColumnMenu: true,
            renderHeader: () => {
                return (
                    <IconButton
                        onClick={deleteCell}
                    >
                        <DeleteIcon color="secondary" />
                    </IconButton>
                );
            }
        },
    ]
    return(
        <div>
            <AppBar className="appbar"
                    position="static"
                    color="secondary"
            >
                <Toolbar>
                    <Button className="bttn"
                            onClick={() => setAddSubmitDialogOpen(true)}
                            color="inherit"
                    >
                        Add Submit
                    </Button>
                </Toolbar>
            </AppBar>
            <h2>
                SUBMITS
            </h2>
            <Box sx={{height: 400,
                width: '80%',
                marginLeft: 15
            }}
            >
                <DataGrid sx={{boxShadow: 2,
                    border: 2,
                    borderColor:'secondary.light'
                }}
                          rows={submits}
                          columns={columns}
                          pageSize={5}
                          rowsPerPageOptions={[5]}
                          experimentalFeatures={{ newEditingApi: true }}
                          onCellEditStop={(params,event) =>handleCellChange(params, event.target.value)} //GÜncelleme iptal edilirse eski kayıtları getirir
                          checkboxSelection
                          selectionModel={selectionModel}
                          hideFooterSelectedRowCount
                          onSelectionModelChange={(selection) => {
                              if (selection.length > 1) {
                                  const selectionSet = new Set(selectionModel);
                                  const result = selection.filter((s) => !selectionSet.has(s));
                                  setSelectionModel(result);
                              }else {
                                  setSelectionModel(selection);
                              }
                          }}
                />
            </Box>
            <AddSubmit isOpen={isAddSubmitDialogOpen}
                         close={() => setAddSubmitDialogOpen(false)}
                         addSubmit={addSubmit}
            />
        </div>
    );

}
export default Submit;