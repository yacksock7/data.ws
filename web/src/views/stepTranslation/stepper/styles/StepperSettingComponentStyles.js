import SwitchCloseIcon from "../../../../common/images/SwitchCloseIcon.svg";
import SwitchCheckIcon from "../../../../common/images/SwitchCheckIcon.svg";

export const styles = (theme) => ({
    popoverBox:{
        position:'relative',
        width: 350,
        boxShadow: '0 0 5.7px 0 rgba(0, 0, 0, 0.25)',
        border: '1px solid #323232',
        background: '#fff',
        borderRadius: 5,
        padding: '13px 13px 16px 12px',
        boxSizing: 'border-box',
    },
    iconButton:{
        '&.MuiButtonBase-root': {
            padding: 0,
            '&:hover':{
                background: 'transparent'
            }
        }
    },
    titleBox:{
        display: 'flex',
        alignItems: 'center',
        '& svg': {
            width: 24,
            height: 24,
            '& path':{
                fill: '#323232'
            }
        },
        '& p':{
            fontSize: '1rem',
            color:'#323232',
            fontWeight: 'bold',
            letterSpacing: '-0.5px',
            marginLeft: 6
        }
    },
    textStyle:{
        '&.MuiTypography-root':{
            fontSize: '0.813rem',
            color: '#777',
            letterSpacing: '-0.5px',
            marginTop: 10,
            marginBottom: 20
        }
    },
    listBox:{
        display:'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 14
    },
    nameText:{
        '&.MuiTypography-root':{
            width: 50,
            fontSize: '0.875rem',
            color: '#323232',
            fontWeight: 'bold',
            letterSpacing: '-0.5px',
            marginLeft: 6,
        }
    },
    switchBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& .MuiFormControlLabel-root': {
            marginLeft: 0,
            marginRight: 0,
        },
        '& .MuiSwitch-root': {
            width: 30,
            height: 16,
            padding: 0,
            borderRadius: 14,
            marginRight: 5
        },
        '& .MuiButtonBase-root': {
            padding: 0,
        },
        '& .MuiSwitch-thumb': {
            width: 16,
            height: 16,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '3px solid #5e5e5e',
            boxSizing: 'border-box',
            boxShadow: 'none',
            '&:before': {
                content: "''",
                width: 10,
                height: 10,
                backgroundImage: `url(${SwitchCloseIcon})`,
                backgroundSize: '100%',
                backgroundPosition: 'center',
            },
        },
        '& .MuiSwitch-track': {
            opacity: 1,
            background: '#5e5e5e',
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            opacity: 1,
            background: '#1890ff',
        },
        '& .MuiSwitch-switchBase.Mui-checked .MuiSwitch-thumb': {
            border: '3px solid #1890ff',
            background: '#fff',
            boxShadow: 'none',
            '&:before': {
                content: "''",
                width: 10,
                height: 11,
                backgroundImage: `url(${SwitchCheckIcon})`,
                backgroundSize: '100%',
            },
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(14px)',
        },
        '& .MuiTypography-root':{
            width: 31,
            fontSize: '0.75rem',
            color: '#323232',
            letterSpacing:'-0.5px',
            marginRight: 4,
        }
    },
    buttonStyle:{
        '&.MuiButtonBase-root': {
            width: 68,
            height: 32,
            boxSizing: 'border-box',
            borderRadius: 5,
            padding: 0,
            background: '#323232',
            fontSize: '0.875rem',
            color: '#fff',
            fontWeight: 'bold',
            letterSpacing: '-0.5px',
            marginTop: 6,
            '&:hover':{
                background: '#323232'
            }
        }
    }
});


