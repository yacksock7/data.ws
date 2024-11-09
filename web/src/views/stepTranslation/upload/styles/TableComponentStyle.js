import EmptyBackImage from "../../../../common/images/EmptyBackImage.png";

export const styles = (theme) => ({
    root:{
        marginTop: 70,
        minHeight: 'calc(100vh - 70px)',
        padding: '22px 24px',
        boxSizing: 'border-box',
        background: '#eee'
    },
    tableWrap: {
        '&.MuiTableContainer-root': {
            overflowX: 'visible',
            boxShadow: 'none',
        }
    },
    //테이블
    processNumbertWrap: {
        background: '#eee',
        borderRadius: '99px',
        width: '44px',
        height: '16px',
        '& .MuiTypography-root': {
            fontSize: '0.75rem',
            color: '#777',
            textAlign: 'center',
            letterSpacing: '-0.5px',
            margin: '3px 0 4px 0',
            '& span': {
                fontWeight: 700,
                color: '#7500fa'
            }
        },
    },
    processPercentWrap: {
        '& .MuiTypography-root': {
            fontSize: '0.875rem',
            color: '#323232',
            textAlign: 'center',
            letterSpacing: '-0.5px',
        }
    },

    tableDueDate: {
        minWidth: '147px',
        '& .MuiTypography-root': {
            fontSize: '1rem',
            color: '#323232',
            letterSpacing: '-0.5px',

        }
    },
    toggleBtn: {
        '& .MuiToggleButton-root': {
            backgroundColor: '#fff !important',
        },
        '& .MuiButtonBase-root': {
            border: '0px',
            padding: '0px',
            backgroundColor: '#fff',
            '& .Mui-selected': {
                backgroundColor: 'transparent',
            }
        },
        '& svg': {
            marginLeft: '4px'
        },
        '& .MuiTypography-root': {
            fontSize: '1rem',
            color: '#323232',
            letterSpacing: '-0.5px',
            fontWeight: 700,
        },


    },
    headTitle: {
        '& .MuiTableCell-root': {
            fontSize: '1rem',
            color: '#323232',
            letterSpacing: '-0.5px',
            fontWeight: 700,
            height: '42px',
            padding: '12px 11px',
            boxSizing: 'border-box',
        }
    },
    tableList: {

        '& .MuiTableCell-root': {
            padding: '5px 11px',
            boxSizing: 'border-box',
            height: '54px',
            fontSize: '1rem',
            color: '#323232',
        },
    },

    tableHover: {
        '&:hover': {
            background: '#d6e7fd'
        },
    },
    titleWrap: {
        '& .MuiTypography-root': {
            fontSize: '1rem',
            letterSpacing: '-0.5px',
            color: '#056cf2',
            marginLeft: '6px'
        },
        '& .MuiIconButton-root': {
            padding: 0,
        }
    },

    paginationButton: {
        '& .MuiIconButton-root:hover': {
            background: 'transparent'
        }
},
    toggleTable: {
        '&:hover': {
            background: '#d6e7fd'
        },
        background: '#fff',
        '& .MuiTableHead-root': {
            background: '#456ea5',
            '& .MuiTableCell-root': {
                color: '#e9f2ff',
                padding: '11px 11px',
                fontWeight: 700,
            },

        },
        '& .MuiTableBody-root': {
            background: '#ddecff',
        },
        '& .MuiTableCell-root': {
            padding: '2.5px 11px',
            borderBottom: ' 1px solid #006fff',
            lineHeight: '17px',
            color: '#323232',
            fontSize: '0.875rem',
            height: '48px',
            boxSizing: 'border-box',
        },
        '& .MuiTypography-root': {
            color: '#323232',
            fontSize: '0.875rem',
            textAlign: 'left',
            lineHeight: '17px',
        }
    },

    uploadBox: {
        marginTop: '93px',
        height: 'calc(100vh - 460px)',
        background: 'rgba(217, 217, 217, 0.5)',
        textAlign: 'center',
        '& .MuiTypography-root': {
            fontSize: '1rem',
            letterSpacing: '-0.5px',
            color: '#323232',
            paddingTop: '15%',
        }
    },
    ongoing: {
        borderRadius: '99px',
        background: '#9d1036',
        width: '80px',
        height: '30px',
        padding: '5px 10px',
        boxSizing: 'border-box',
        marginTop:'-3px',
        '& .MuiTypography-root': {
            color: '#fff',
            fontSize: '1rem',
            fontWeight: 700,
            lineHeight: '22px',
            letterSpacing: '-0.5px',
            '&:before':{
                content:"''",
                width: 14,
                height: 14,
                borderRadius: 100,
                marginRight: '6px',
                background: '#ec6287',
                display: 'inline-block',
                verticalAlign: 'middle',
                marginTop: '-4px'
            }
        }
    },
    completed: {
        background: '#7500fa',
        marginTop:'0px',
        width: '70px',
        '& .MuiTypography-root': {
            '&:before':{
                background: '#dcbdff',
            }
        }
    },
    beforeWork: {
        background: '#dddddd',
        marginTop:'0px',
        '& .MuiTypography-root': {
            '&:before':{
                background: '#9e9e9e',
            }
        }
    },
    extensionDueDate: {
        height: '9px',
        marginTop: '-1px',
        '& .MuiButtonBase-root': {
            padding: 0,
            fontSize: '0.75rem',
            letterSpacing: '-0.5px',
            color: '#d91e50',
            '&.MuiButton-root:hover': {
                background: 'transparent'
            }
        }
    },

    avatarBox: {
        '& .MuiAvatar-root': {
            width: '24px',
            height: '24px',
            background: '#cacaca',
            border: '0px !important',
        }
    },

    limitText: {
        '& .MuiTypography-root': {
           fontSize: '0.875rem',
            lineHeight: '17px',
            color: '#323232',
            textAlign: 'left',
        },
        '& .MuiButtonBase-root': {
            padding: 0,
            textTransform: 'none',
            '&.MuiButton-root:hover': {
                background: 'transparent'
            }
        }

    },
    moreText: {
        position: 'absolute',
        top:49,
        left: '10px',
        background: '#fff',
        borderRadius: '6px',
        padding: '8px 8px 12px 12px',
        zIndex: 99,
        boxShadow: '0 4px 7px 0 rgba(0, 0, 0, 0.45)',
        display: 'flex',
        justifyContent: 'space-between',
        '& svg': {
            paddingLeft: '27px',
            minWidth: '24px',
        }
    },
    rowCount: {
        '& .MuiTypography-root': {
            fontSize: '0.75rem',
            color: '#323232',
            marginRight: '6px'
        },
        '& .MuiInputBase-input': {
            padding: '0 13px 0 0',
            fontSize: '0.75rem',
            paddingTop: 1,
            paddingRight: '20px !important',
        },
        '& .MuiSelect-select': {
            paddingRight: '0px',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            border: 0,
        }
    },
    paginationBtn: {
        '& .MuiIconButton-root': {
            padding: 0,
        }
    },
    pagiNumber: {
        '& .MuiTypography-root': {
            margin: '0 12px',
            fontSize: '0.75rem',
            color: '#323232',
            '& span': {
                fontWeight: 700,
            }
        }
    },



    //등록된 템플릿이 없을때
    emptyBack:{
        width: '100%',
        height: 'calc(100vh - 70px - 44px)',
        background: '#eee',
        backgroundImage: `url(${EmptyBackImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    }

});


