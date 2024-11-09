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
    tableBorderRight:{
        '&.MuiTableCell-root':{
            borderRight: '7px solid #eee !important'
        }
    },
    nameText:{
        '&.MuiTypography-root': {
            width: 'calc(100% - 38px - 9px)',
            fontSize: '1rem',
            color: '#056cf2',
            letterSpacing: '-0.5px',
            marginLeft: 9,
            overflow:'hidden',
            textOverflow:'ellipsis',
            whiteSpace:'nowrap',
            '@media all and (max-width: 1550px)': {
                fontSize: '0.875rem',
            },
        }
    },
    imageBox:{
        width: 36,
        height: 36,
        borderRadius: '50%',
        border: '1px solid #fff',
        background:'#cacaca',
        display: 'flex',
        alignItems:'center',
        justifyContent:'center',
        overflow:'hidden',
        '& img':{
            width: '100%',
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
        marginRight: 14,
        height: 30,
        background: '#9d1036',
        borderRadius: 99,
        boxSizing: 'border-box',
        padding: '0 8px',
        display:'flex',
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
        display: 'flex',
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
    buttonStyle:{
        '&.MuiButtonBase-root': {
            padding: 0,
            width: 78,
            height: 30,
            border: '1px solid #140cf2',
            fontSize: '1rem',
            color:'#140cf2',
            letterSpacing: '-0.5px',
            fontWeight: 'bold',
            '&:hover':{
                background: 'transparent'
            },
            '@media all and (max-width: 1550px)': {
                width: 68,
                fontSize: '0.875rem',
            },
        }
    },
    arrowButton:{
        '&.MuiButtonBase-root': {
            padding: 0,
            '&:hover':{
                background: 'transparent'
            }
        }
    },
    paginationBox:{
        '& .MuiToolbar-root':{
            position: 'relative',
            '& .MuiTablePagination-displayedRows':{
                // position:'absolute',
                // right: 40
            }
        },
        '& .MuiInputBase-root':{
            marginLeft: 0,
            marginRight: 20
        },
        '& .MuiSelect-select':{
            fontSize: '0.75rem',
            color:'#323232',
            '&:focus':{
                background:'transparent'
            }
        },
        '& .MuiTablePagination-selectLabel':{
            fontSize: '0.75rem',
            color:'#323232',
        },
        '& button':{
            padding:0,
            '&:hover':{
                background:'transparent'
            },
        }
    },
    displayRow:{
        fontSize: '0.75rem',
        color:'#323232',
        '& > span':{
            fontWeight:'bold'
        }
    },
    selectPopover:{
        '& .MuiPaper-root':{
            boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.25)',
            border: '1px solid #bbb',
            boxSizing:'border-box',
            '& *': {
                fontFamily: 'Pretendard !important',
            },
        },
        '& .MuiMenuItem-root':{
            width: '100%',
            fontSize: '0.875rem',
            color:'#323232',
            padding: '0 12px',
            boxSizing: 'border-box',
            height: 28,
            '&:hover':{
                background: '#eee'
            },
            '&.Mui-selected':{
                background: '#eee'
            },
        }
    },
    underline:{
        textDecoration: 'none'
    }
});