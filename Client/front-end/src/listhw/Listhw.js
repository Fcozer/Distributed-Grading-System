import React, {useState} from "react";
import {AppBar} from "@mui/material";
import {ListhwApi} from "./api/ListhwApi";
import {useEffect} from "react";
import {DataGrid} from '@mui/x-data-grid';
import {toast} from "react-toastify";
import {IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import {Button} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";

function Listhw() {
    const [listhws, setListhws] = useState([]);
    const [selectionModel, setSelectionModel] = useState();
    const listhwApi = new ListhwApi();

    async function getListhws() {
        const response = await listhwApi.getListhws();
        setListhws(response.data);
    }

    useEffect(() => {
        getListhws();
    }, []);
    
    async function deleteCell(e){
        e.preventDefault();
        const selectedIDs = selectionModel;
        try {
            const response = await listhwApi.deleteListhw(selectedIDs);
            const messageResponse = response.data;
            if (messageResponse.responseType === "SUCCESS") {
                toast.success(messageResponse.message);
                getListhws((r) => r.filter((x) => !x.id===selectedIDs));
                getListhws();
            }
            else{
                toast.error(messageResponse.message);
            }
        }catch (error) {
            toast.error("Please select id");
        }
    }

    async function handleCellChange(params, newValue) {
        const listhwIndex = listhws.findIndex(listhw => {
            return listhw.id === params.id;
        });
        const updateListhws = [... listhws];
        updateListhws[listhwIndex][params.field] = newValue;
        setListhws(updateListhws)
        const id = params.id;
        const response = await listhwApi.updateListhw(id,updateListhws[listhwIndex]);
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
            field: "defination",
            headerName: "Defination",
            width: 150,
            editable: true,
        },
        {
            field: "file",
            headerName: "file",
            width: 150,
            editable: true,
        },
        {
            field: "time",
            headerName: "Time",
            width: 150,
            editable: true,
        },
        {
            field: "assistant_id",
            headerName: "Assistant ID",
            width: 150,
            editable: true,
        },
        {
            field: "lesson_id",
            headerName: "Lesson ID",
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
            </AppBar>

            <h2>
                HOMEWORKS
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
                          rows={listhws}
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
        </div>
    );
}

export default Listhw;