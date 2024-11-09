export const styles = (theme) => ({
    toolbarBox:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 21
    },
    yearText:{
        '&.MuiTypography-root':{
            fontSize: '1.25rem',
            color: '#323232',
            fontWeight: 'bold',
            letterSpacing: '-0.5px',
            margin: '0 24px'
        }
    },
    iconButton:{
        '&.MuiButtonBase-root':{
            padding:0,
            '&:hover':{
                background: 'transparent'
            }
        }
    }
});


