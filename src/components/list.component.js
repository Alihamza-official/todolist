

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Draggable from 'react-draggable';
import TextField from '@material-ui/core/TextField';

import * as yup from 'yup';
import { Formik, Form } from "formik";

let schema = yup.object().shape({
  title: yup.string().required("Name is required "),
  description: yup.string().required("Description is required ")
  
});

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}


const ListComponent = ({item, deleteList, updateHandler, setRecord}) =>  {

    const initialValues = {name:"", description:""};
    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
        },
        paper: {
          padding: theme.spacing(2),
          textAlign: 'center',
          color: theme.palette.text.secondary,
        },
      }));

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = (id) => {
      setOpen(false);
      deleteList(id);
      console.log('id is ', id);
    };


    const handleClickOpen2 = () => {
      setOpen2(true);
    };

    const handleClose2 = (data) => {
      console.log('+++', data);
      setOpen2(false);
      updateHandler(data);
      console.log('data is ', data);
    };
    

    const handleCancel = () => {
      console.log('cancel called ');
      setOpen(false);
      
    };

    return (
        <>
             <div className={classes.root}>
            
            <Paper className={classes.paper}>
                <h1> { item.title } </h1>
                <p>  { item.description }</p>
                <Button variant="contained" color="primary" onClick={handleClickOpen2}> <EditIcon>  </EditIcon>  </Button> 
                {/* <Button variant="contained" color="secondary" onClick = {() => deleteList(item.id)}>  <DeleteIcon></DeleteIcon>  </Button>  */}
                <Button variant="contained" color="secondary" onClick={handleClickOpen}>  <DeleteIcon></DeleteIcon>  </Button>  
            </Paper>
            
            </div>

            {/* <PopupComponent> </PopupComponent> */}
          <Dialog
            open={open}
            onClose={handleClose}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
          >
          <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            Are you sure to delete ?
          </DialogTitle>
          
          <DialogActions>
            <Button autoFocus onClick={handleCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={() => handleClose(item.id)} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>


        <Dialog
            open={open2}
            onClose={handleClose}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
          >
          <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            Edit List
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
            {/* <TextField required id="standard-required" label="Required" defaultValue= {item.description} />
                <input> {item.description} </input> */}
              <Formik
                validationSchema={schema}
                initialValues={item}
                // onSubmit={(values)=>console.log({message:"onSubmit called", values})}
                onSubmit={(values)=> handleClose2(values)}
            >
                { ({ values, touched, errors, handleChange, isSubmitting, }) => {
                    return (
                        <Form>
                            <input
                                value={values.title}
                                onChange={handleChange("title")}
                            /> 
                            <p> {touched.title && errors.title ? errors.title: ""}</p>
                            <br/><br/>
                            <textarea
                                value={values.description}
                                onChange={handleChange("description")}
                            ></textarea>
                             <p> {touched.description && errors.description ? errors.description: ""}</p>
                             <br/><br/>
                            {/* <button type="submit"> Submit </button> */}
                            <Button autoFocus onClick={handleCancel} color="primary" type="submit">
                                Save
                            </Button>
                        </Form>
                    )
                }}
            </Formik>
            </DialogContentText>
          </DialogContent>
        </Dialog>
        </>
       
    );
}

export default ListComponent;

