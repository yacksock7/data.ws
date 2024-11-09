export const styles = (theme) => ({
    tableBox:{
        '&.MuiPaper-root':{
            boxShadow:'none',
            borderRadius: 0,
            '& table':{
                tableLayout: 'fixed'
            },
            '& .MuiTableCell-head':{
                fontSize: '1rem',
                color:'#323232',
                letterSpacing: '-0.5px',
                fontWeight: 'bold',
                padding: '0 5px',
                boxSizing:'border-box',
                height: 42,
                borderBottom: '1px solid rgba(119, 119, 119, 0.7)',
                '& span':{
                    fontSize: '0.875rem',
                    fontWeight: 'normal'
                },
                '@media all and (max-width: 1550px)': {
                    fontSize: '0.875rem',
                    '& span':{
                        fontSize: '0.688rem',
                    }
                },
            },
            '& .MuiTableCell-body':{
                fontSize: '1rem',
                color:'#323232',
                height: 54,
                letterSpacing: '-0.5px',
                padding: '0 5px',
                boxSizing:'border-box',
                borderBottom: '1px solid rgba(119, 119, 119, 0.7)',
                overflow:'hidden',
                textOverflow:'ellipsis',
                whiteSpace:'nowrap',
                '@media all and (max-width: 1550px)': {
                    fontSize: '0.875rem',
                },
            }
        }
    },
    borderStyle:{
        '& .MuiTableCell-head':{
            borderBottom: '0 !important',
        },
    },
    showBackground:{
        '& .MuiTableCell-body':{
            background:'#d6e7fd',
            borderBottom: '0',
        }
    },
    tableCellText:{
        '&.MuiTypography-root': {
            fontSize: '1rem',
            color:'#323232',
            letterSpacing: '-0.5px',
            fontWeight: 'bold',
            marginRight: 6,
            '@media all and (max-width: 1550px)': {
                fontSize: '0.875rem',
            },
        }
    },
    buttonStyle:{
        '&.MuiButtonBase-root': {
            padding: 0,
            background:'transparent',
            '&:hover':{
                background: 'transparent'
            },
            '& p':{
                fontSize: '1rem',
                letterSpacing: '-0.5px',
                color: '#056cf2',
                marginLeft: 6,
                '@media all and (max-width: 1550px)': {
                    fontSize: '0.875rem',
                },
            }
        }
    },
    numberBox:{
        width: 63,
        height: 27,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 13,
        background:'#eee',
        boxSizing:'border-box',
        marginRight: 11,
        '& p':{
            fontSize: '0.875rem',
            color:'#777',
            '& span':{
                color:'#7500fa',
                fontWeight: 'bold'
            }
        }
    },
    progressBox:{
        width: 80,
        '& .MuiLinearProgress-root':{
            height:6,
            background:'#eee',
            borderRadius: 3
        },
        '& .MuiLinearProgress-bar':{
            background: '#38cb89'
        }
    },
    progressText:{
        '&.MuiTypography-root': {
            fontSize: '0.875rem',
            color: '#323232',
            marginLeft: 11,
            '@media all and (max-width: 1550px)': {
                fontSize: '0.75rem',
            },
        }
    },
    chipBox:{
        height: 30,
        background: '#9d1036',
        borderRadius: 99,
        boxSizing: 'border-box',
        padding: '0 8px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent:'center',
        '& p':{
            fontSize: '1rem',
            color: '#fff',
            letterSpacing: '-0.5px',
            fontWeight: 'bold',
            marginLeft: 6,
            '@media all and (max-width: 1550px)': {
                fontSize: '0.875rem',
            },
        },
        '&:before':{
            content:"''",
            width: 14,
            height: 14,
            background:'#ec6287',
            borderRadius: '50%'
        },
    },
    chipBox2:{
        background: '#d91e50',
        '&:before':{
            background:'#ffc2d3',
        }
    },
    chipBox3:{
        background: '#7500fa',
        '&:before':{
            background:'#dcbdff',
        }
    },
    chipBox4:{
        background: '#ddd',
        '& p':{
            color: '#323232',
        },
        '&:before':{
            background:'#9e9e9e',
        }
    },
    squareChipBox:{
        height: 18,
        padding: '0 5px',
        boxSizing: 'border-box',
        background:'#26a646',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& p':{
            fontSize: '0.688rem',
            color:'#fff',
            letterSpacing: '-0.24px',
            lineHeight: 1
        }
    },
    squareChipBox2:{
        background:'#f25e3d',
    },
    squareChipBox3:{
        background:'#d91e50',
    },
    squareChipBox4:{
        background:'#9552f2',
    },
    squareChipBox5:{
        background:'#140cf2',
    },
    squareChipBox6:{
        background:'#056cf2',
    },
    arrowButton:{
        '&.MuiButtonBase-root': {
            padding: 0,
            '&:hover':{
                background: 'transparent'
            }
        }
    },
});