export const styles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    textBtnStyle: {
        '&.MuiButton-root': {
            padding:0,
            fontSize:'1rem',
            fontWeight:400,
            color: '#7500FA',
            textDecoration: 'underline',
            '&:hover':{
                color: '#7500FA',
                textDecoration: 'underline',
                backgroundColor:'transparent',
            },
        }
    },
    popper: {
        zIndex: 1,
        // '&[x-placement*="right"] $arrow': {
        //     left: 0,
        //     marginLeft: '-0.9em',
        //     height: '3em',
        //     width: '1em',
        //     '&::before': {
        //         borderWidth: '1em 1em 1em 0',
        //         borderColor: 'transparent #fff transparent transparent',
        //     },
        // },
    },
    arrow: {
        position: 'absolute',
        fontSize: 7,
        left: 0,
        top:'calc(50% - 10px)',
        marginLeft: '-0.9em',
        height: '3em',
        width: '1em',
        '&::before': {
            content: '""',
            margin: 'auto',
            display: 'block',
            width: 0,
            height: 0,
            borderStyle: 'solid',
            borderWidth: '1em 1em 1em 0',
            borderColor: 'transparent #fff transparent transparent',
        },
    },
    paper: {
        padding: 18,
        maxWidth: 400,
        overflow: 'auto',
        boxShadow: '0 4px 15px 0 rgba(0, 0, 0, 0.4)',
        '& .MuiButton-root.Mui-disabled': {
            background: '#fff',
            color: '#88889D',
            border: '1px solid #A3A8AF',
        },
    },
    titleText: {
        '&.MuiTypography-root': {
            fontSize: '1.125rem',
            color: '#0d0d0d',
            fontWeight: 'bold',
        }
    },
    textStyle: {
        '&.MuiTypography-root':{
        fontSize: '0.875rem',
        color: '#0d0d0d',
        fontWeight: 600,
        width: 110,
        }
    },
    inputStyle: {
        width: 200,
        padding: '8px 10px',
        borderRadius: 4,
        border: '1px solid rgba(50, 50, 50, 0.8)',
        background: '#fff',
        '&:focus': {
            outline: 'none',
        },
    },
    checkIcon:{
        display:'flex',
        flexDirection:'column',
        marginBottom:12,
        '& > div':{
            display:'flex',
            alignItems:'center',
            marginBottom:4,
        }
    },
    checkText: {
        '&.MuiTypography-root': {
            fontSize: '0.813rem',
            color: '#8d909e',
            marginLeft:4,
        }
    },
    iconBtn: {
        '&.MuiIconButton-root':{
            padding: 5,
            marginLeft: 10,
            '& svg':{
                width:20,
                height:20,
            }
        }
    },
    buttonStyle:{
        '&.MuiButtonBase-root': {
            width: '100%',
            height: 40,
            borderRadius: 6,
            background: '#7500fa',
            color: '#fff',
            fontSize: '0.938rem',
            fontWeight: 'bold',
            letterSpacing: '-0.5px',
            boxSizing: 'border-box',
            '&:hover':{
                background: '#9d4bfb'
            },
            '&.Mui-disabled': {
                background: '#777',
                color: '#eee'
            }
        }
    },
});