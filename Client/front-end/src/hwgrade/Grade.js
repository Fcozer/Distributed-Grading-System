import React, {useEffect, useState} from "react";
import {GradeApi} from "./api/GradeApi";
import {toast} from "react-toastify";
import {AppBar, Button, IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import {DataGrid} from "@mui/x-data-grid";
import {AddGrade} from "./AddGrade/AddGrade";


function Grade(){
    const [grades, setGrades] = useState( []);
    const [isAddGradeDialogOpen, setAddGradeDialogOpen] = useState(false);
    const [selectionModel, setSelectionModel] = useState();
    const gradeApi = new GradeApi();

    async function getGrades() {
        const response = await gradeApi.getGrades();
        setGrades(response.data);
    }

    useEffect(() => {
        getGrades();
    }, []);

    async function addGrade(formState) {
        const response = await gradeApi.addGrade(formState);
        const messageResponse = response.data;
        if (messageResponse.responseType === "SUCCESS") {
            toast.success(messageResponse.message);
            setAddGradeDialogOpen(false);
        }
    }
    async function deleteCell(e){
        e.preventDefault();
        const selectedIDs = selectionModel;
        try {
            const response = await gradeApi.deleteGrade(selectedIDs);
            const messageResponse = response.data;
            if (messageResponse.responseType === "SUCCESS") {
                toast.success(messageResponse.message);
                getGrades((r) => r.filter((x) => !x.id===selectedIDs));
                getGrades();
            }
            else{
                toast.error(messageResponse.message);
            }
        }catch (error) {
            toast.error("Please select id");
        }
    }

    async function handleCellChange(params, newValue) {
        const gradeIndex = grades.findIndex(grade => {
            return grade.id === params.id;
        });
        const updateGrades = [... grades];
        updateGrades[gradeIndex][params.field] = newValue;
        setGrades(updateGrades)
        const id = params.id;
        const response = await gradeApi.updateGrade(id,updateGrades[gradeIndex]);
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
            field: "grade",
            headerName: "grade",
            width: 150,
            editable: true,
        },
        {
            field: "submit_id",
            headerName: "Submit ID",
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
                            onClick={() => setAddGradeDialogOpen(true)}
                            color="inherit"
                    >
                        Add Grade
                    </Button>
                </Toolbar>
            </AppBar>
            <h2>
                GRADES
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
                          rows={grades}
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
            <AddGrade isOpen={isAddGradeDialogOpen}
                       close={() => setAddGradeDialogOpen(false)}
                       addGrade={addGrade}
            />
        </div>
    );

}
export default Grade;

