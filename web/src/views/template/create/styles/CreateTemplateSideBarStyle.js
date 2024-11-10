export const styles = (theme) => ({
    root:{
        boxShadow: '2px 0 4px 0 rgba(0, 0, 0, 0.25)',
        width: 324,
        minHeight: 'calc(100vh - 70px)',
        background: '#fff',
        boxSizing: 'border-box',
        padding: '22px 5px',
        position:'relative',
        zIndex: 100
    },
    topBox:{
        display: 'flex',
        alignItems: 'center',
        marginBottom: 17
    },
    titleText:{
        '&.MuiTypography-root':{
            fontSize: '1rem',
            color: '#323232',
            fontWeight: 'bold',
            letterSpacing: '-0.5px',
            marginRight: 6,
            marginLeft: 5
        }
    },
    iconButton:{
        '&.MuiButtonBase-root': {
            padding: 0,
            '&:hover': {
                background: 'transparent'
            }
        }
    },
    tooltipBox:{
        position: 'absolute',
        top: -15,
        left: 20,
        zIndex: 200,
        display: 'flex',
        '& p':{
            fontSize: '0.938rem',
            color: '#fff',
            letterSpacing: '-0.3px'
        },
    },
    tooltipBox2:{
        left: 130
    },
    tooltipArrow:{
        display: 'flex',
        justifyContent: 'flex-end',
        position:'relative',
        top: 17
    },
    tooltipBoxIn:{
        position:'relative',
        left: -5,
        borderRadius: 6,
        background: '#4c4851',
        padding: '9px 10px 13px 15px',
        minWidth: 250,
        '& ul':{
            margin:0,
            paddingLeft:20,
            '& li':{
                fontSize: '0.938rem',
                color: '#fff',
                letterSpacing: '-0.3px',
                marginBottom:5,
                '&::marker':{
                    fontSize: '0.75rem'
                }
            }
        }
    },
    tooltipTitleBox:{
        marginBottom: 5,
        '& p':{
            fontWeight: 'bold',
            minWidth: 200,
        },
    },
    tooltipTitleBox2:{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
    },
    tipText:{
        '&.MuiTypography-root': {
            fontSize: '0.75rem',
            fontWeight: 500,
            width: 250
        }
    },
    tooltipButton:{
        '&.MuiButtonBase-root': {
            background: '#fff',
            borderRadius: 6,
            width: 80,
            height: 32,
            boxSizing: 'border-box',
            padding: 0,
            marginTop: 12,
            display: 'block',
            fontSize: '0.75rem',
            color: '#4c4851',
            fontWeight: 'bold',
            letterSpacing: '-0.41px',
            '&:hover': {
                background: '#fff'
            },
            '&.Mui-disabled': {
                background: '#777',
                color: '#eee'
            }
        }
    },
    cardBox:{
        width: 146,
        height: 170,
        boxSizing: 'border-box',
        boxShadow: '0 0 7px 0 rgba(0, 0, 0, 0.25)',
        background: '#fff',
        borderRadius: 5,
        border: '1px solid #bbb',
        padding: '9px 8px',
        margin: 5,
        cursor: 'pointer'
    },
    cardBoxSelect:{
        border: '2px solid #7500fa',
    },
    cardContent:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: 'calc(100% - 18px)'
    },
    cardText:{
        '&.MuiTypography-root': {
            fontSize: '1rem',
            color: '#323232',
            fontWeight: 500,
            marginTop: 6,
            letterSpacing: '-0.5px',
            marginBottom: 10,
        }
    },
    cardInfoBox: {
        display : "flex",
        justifyContent : "flex-end",
        position: 'relative'
    },

});