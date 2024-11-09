import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { Box, Button, DialogActions, DialogContent, IconButton, Typography } from '@material-ui/core';
import { ReactComponent as Close } from '../../common/images/Close.svg';

const useStyles = makeStyles(theme => ({
    dialogBox: {
        '& .MuiDialogContent-root': {
            padding: 0,
        },
        '& .MuiDialogActions-root': {
            padding: 16,
        },
        '& .MuiDialog-paperScrollPaper': {
            maxHeight: '40%',
        },
    },
    dialogTitleBox: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleStyle: {
        fontFamily: 'NanumSquareRoundOTF',
        fontSize: 16,
        color: '#303030',
        fontWeight: 800,
    },
    textStyle: {
        borderTop: '1px solid #bfbfbf',
        borderBottom: '1px solid #bfbfbf',
        fontFamily: 'NanumSquareRoundOTF',
        fontSize: 14,
        color: '#303030',
        lineHeight: 2,
        padding: '16px 20px',
        wordBreak: 'keep-all',
    },
    btnStyle: {
        background: '#1A457E',
        fontFamily: 'NanumSquareRoundOTF',
        fontSize: 14,
        color: '#fff',
        padding: '8px 12px',
        '&:hover': {
            background: '#1A457E',
        },
    },
}));

export default function ConfirmDialog({ ...props }) {
    const classes = useStyles();
    const { open, title, msg, changeDialogOpen } = props;
    const handleDialogClose = () => {
        changeDialogOpen(false);
    };

    return (
        <Dialog open={open} fullWidth={true} maxWidth={'xs'} className={classes.dialogBox}>
            <DialogTitle>
                <Box className={classes.dialogTitleBox}>
                    <Typography className={classes.titleStyle}>{title}</Typography>

                    <IconButton
                        onClick={() => {
                            handleDialogClose();
                        }}
                        style={{ padding: 5 }}
                    >
                        <Close style={{ width: 20, height: 20 }} />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Typography variant="subtitle1" component="h2" className={classes.textStyle}>
                    {msg}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        handleDialogClose();
                    }}
                    className={classes.btnStyle}
                >
                    확인
                </Button>
            </DialogActions>
        </Dialog>
    );
}