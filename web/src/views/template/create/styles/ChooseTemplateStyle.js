export const styles = (theme) => ({
    root:{
    },
    trigger: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '26px 0',
        '& .MuiTabs-flexContainer': {
            borderBottom: '1px solid #323232',
            width: 263,
        },
        '& button': {
            minWidth: 60,
            minHeight: 32,
            position: 'relative',
            opacity: 0.6,
            fontSize: '1.125rem',
            letterSpacing: '-0.5px',
            color:'#323232',
            boxSizing: 'border-box',
            padding: '8px 15px',
            '&:hover': {
                fontWeight: 600,
            },
        },
        '& button.Mui-selected': {
            fontWeight: 600,
            color: '#323232',
            opacity: 1,
            boxSizing: 'border-box',
        },
        '& .MuiTabs-indicator':{
            height: 3,
            background: '#7500fa'
        }
    },
    contentsBox:{
        display: 'grid',
        // gridTemplateColumns: 'repeat(auto-fill, minmax(20%, auto))',
        gridTemplateColumns: 'repeat(auto-fill, 290px)',
        gap: 20
    },
    templateBox:{
        width: 290,
        height: 340,
        border: '1px solid #bbb',
        boxShadow: '0 0 7px 0 rgba(0, 0, 0, 0.25)',
        borderRadius: 6,
        boxSizing: 'border-box',
        cursor: 'pointer',
    },
    imageBox:{
        height:235,
        margin: '19px 16px',

        boxSizing: 'border-box',
        display: 'flex',
        justifyContent:'center',
        alignItems:'center',
        position: 'relative',
        '& .hover-button-box':{
            display: 'none'
        },
    },
    imageBoxHover:{
        '&:hover':{
            cursor: 'default',
            '& .hover-button-box':{
                display: 'block',
            }
        },
    },
    imageBoxIn:{
        width: '100%',
        height:233,
        overflow: 'hidden',
        border: '1px solid rgba(50, 50, 50, 0.2)',
        background: 'rgba(50, 50, 50, 0.07)',
        borderRadius: 6,
        '& img':{
            width: '100%',
            height: '100%',
        }
    },
    hoverBox:{
        position: 'absolute',
        top: -20,
        left: -17,
        width: 290,
        height: 340,
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center',
        justifyContent: 'center',
        background: 'rgba(255, 255, 255, 0.8)',
        boxSizing: 'border-box',
        borderRadius: 6,
        zIndex: 199
    },
    hoverButton:{
        '&.MuiButtonBase-root':{
            width: 188,
            height: 44,
            padding: 0,
            fontSize: '1rem',
            color: '#fff',
            fontWeight: 'bold',
            letterSpacing: '-0.5px',
            background: '#7500fa',
            borderRadius: 7.5,
            boxSizing: 'border-box',
            border:'1px solid #7500fa',
            '&:hover':{
                background: '#9d4bfb',
                border:'1px solid #9d4bfb',
            },
            '&.Mui-disabled': {
                background: '#777',
                border: '1px solid #777',
                color: '#eee'
            }
        }
    },
    hoverButton2:{
        '&.MuiButtonBase-root': {
            background: '#fff',
            border: '1px solid #7500fa',
            color: '#7500fa',
            marginTop: 14,
            '&:hover': {
                background: 'rgba(117, 0, 250, 0.1)',
                border: '1px solid #7500fa',
            },
            '&.Mui-disabled': {
                color: '#777',
                border: '1px solid #777',
                background: '#fff'
            }
        }
    },
    bottomBox:{
        width: '100%',
        height: 65,
        padding: '6px 8px',
        boxSizing: 'border-box',
        background: 'rgba(202, 202, 202, 0.3)'
    },
    infoBox:{
        display: 'flex',
        justifyContent: 'flex-end',
        position: 'relative'
    },
    iconButton:{
        '&.MuiButtonBase-root':{
            padding:0,
            '&:hover':{
                background: 'transparent'
            }
        }
    },
    textBox:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& path':{
            fill: '#7500fa'
        },
    },
    AddTextBox:{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    textStyle:{
        '&.MuiTypography-root':{
            fontSize: '1rem',
            color: '#323232 !important',
            fontWeight: 500,
            letterSpacing: '-0.46px',
            marginLeft: 6
        }
    },
    dateTextStyle:{
        '&.MuiTypography-root': {
            fontSize: '0.875rem',
            color: '#777',
            fontWeight: 300,
            letterSpacing: '-0.46px'
        }
    },
    tooltipBox:{
        position: 'absolute',
        bottom: -115,
        right: -30,
        zIndex: 200,
        '& p':{
            fontSize: '0.938rem',
            color: '#fff',
            letterSpacing: '-0.3px'
        },
    },
    tooltipBox2:{
        bottom: -137,
    },
    tooltipArrow:{
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: 29
    },
    tooltipBoxIn:{
        position:'relative',
        top: -10,
        borderRadius: 6,
        background: '#4c4851',
        padding: '9px 10px 13px 15px',
        minWidth: 200,
        '& ul':{
            margin:0,
            paddingLeft:20,
            paddingRight: 10,
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
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
        '& p':{
            fontWeight: 'bold',
        },
    },
    tooltipText:{
        width: 290
    }
});