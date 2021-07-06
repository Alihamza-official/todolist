
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ListComponent from './list.component';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Draggable from 'react-draggable';
import * as yup from 'yup';
import { Formik, Form } from "formik";


let schema = yup.object().shape({
    title: yup.string().required("Title is required "),
    description: yup.string().required("Description is required ")
    
  });

  function PaperComponent(props) {
    return (
      <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
        <Paper {...props} />
      </Draggable>
    );
  }

const LayoutComponent = ({data, deleteList, updateHandler, setRecord, addHandler}) =>  {

    const [open, setOpen] = React.useState(false);
    const initialValues = {title:"", description:""};
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
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (data) => {
        console.log('+++', data);
        setOpen(false);
        addHandler(data);
        console.log('data is ', data);
      };

    return (
        <div className={classes.root}>
        
            <Grid container spacing={3}>
                <Grid item xs={2}>
                    {/* <Paper className={classes.paper}>xs=12</Paper> */}
                </Grid>
                <Grid item xs={8}>
                <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={handleClickOpen}
                >  <AddIcon></AddIcon>  
                </Button>  
                    {
                        data.map( (item, index) => {
                            return (<ListComponent item={item} key={index} deleteList = {deleteList} updateHandler={updateHandler} setRecord={setRecord}> </ListComponent>)
                        })
                    }

                    {console.log('change comes', data)}
                </Grid>
                <Grid item xs={2}>
                    {/* <Paper className={classes.paper}>xs=6</Paper> */}
                </Grid>
               
            </Grid>



        <Dialog
            open={open}
            // onClose={handleClose}
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
                initialValues={initialValues}
                // onSubmit={(values)=>console.log({message:"onSubmit called", values})}
                onSubmit={(values)=> handleClose(values)}
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
                            <Button autoFocus color="primary" type="submit">
                                Save
                            </Button>
                        </Form>
                    )
                }}
            </Formik>
            </DialogContentText>
          </DialogContent>
        </Dialog>

        </div>
    );
}

export default LayoutComponent;
