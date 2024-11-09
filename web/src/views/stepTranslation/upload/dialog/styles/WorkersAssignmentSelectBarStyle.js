export const styles = (theme) => ({
    root:{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },

    LeftBox:{
        display: 'flex',
        alignItems: 'center',
        '& p':{
            fontSize: '1rem',
            color: '#323232',
            letterSpacing: '-0.5px',
            marginLeft: 8,
            '& span':{
                marginLeft: 10,
                fontSize: '1.125rem',
                fontWeight: 'bold',
            }
        }
    },
    selectButton:{
        '&.MuiButton-root':{
            width: 76,
            height:34,
            padding:0,
            border: '1px solid #140cf2',
            background: '#fff',
            borderRadius: 6,
            fontSize: '0.938rem',
            letterSpacing: '-0.42px',
            fontWeight: 'bold',
            color: '#140cf2',
            '&:hover':{
                background: '#fff'
            },
            '&.Mui-disabled': {
                color: '#777',
                border: '1px solid #777',
            }
        }
    },
    selectButton2:{
        '&.MuiButton-root':{
            width: 90,
            height:34,
            padding:0,
            background: '#140cf2',
            borderRadius: 6,
            fontSize: '0.938rem',
            letterSpacing: '-0.42px',
            fontWeight: 'bold',
            color: '#fff',
            '&:hover':{
                background: '#5f59fc'
            },
            '&.Mui-disabled': {
                color: '#eee',
                background: '#777',
            }
        }
    },
    popoverBox:{
        '&.MuiPopper-root':{
            width: 403,
            boxShadow:'0 0 7px 0 rgba(0, 0, 0, 0.25)',
            borderRadius: 6,
            background: '#fff',
            padding:0,
            boxSizing: 'border-box',
            zIndex: 2000
        },
    },
    formStyle:{
        width: '100%',
        '& .MuiInputBase-root':{
            height: 48,
            background: '#fff !important',
            border: 0,
            borderRadius: 6,
            boxSizing:'border-box',
            paddingLeft: 10,
            paddingRight: 10,
            '&.Mui-focused':{
                border: 0,
            },
            '& input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, input:-webkit-autofill:active':{
                transition: 'background-color 5000s',
            }
        },
        '& input':{
            width: '100%',
            fontSize: '0.875rem',
            color: '#323232',
            padding: 0,
            letterSpacing: '-0.5px',
            '&::placeholder':{
                color: '#777',
                opacity:1
            }
        },
        '& .MuiInputBase-root:before, .MuiInputBase-root:after':{
            display:'none'
        },
    },
    selectBox:{
        width: '100%',
        background: '#eee',
        padding: '6px 20px',
        boxSizing: 'border-box',
        '& p':{
            fontSize: '0.813rem',
            color: '#777',
            letterSpacing: '-0.5px'
        }
    },
    listBox:{
        marginBottom: 15,
        maxHeight: 245,
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
            width: '10px',
        },
        '&::-webkit-scrollbar-thumb': {
            background: '#969696',
            borderRadius: '10px',
            backgroundClip: 'padding-box',
            border: '3px solid transparent',
        },
        '&::-webkit-scrollbar-track': {
            background: 'transparent',
            marginTop: 5,
        },
    },
    listBoxIn:{
        padding: '6px 20px',
        display: 'flex',
        alignItems: 'center',
        '& .MuiCheckbox-root':{
            padding:0,
            marginRight: 10
        },
    },
    userIdText:{
        '&.MuiTypography-root':{
            width: 300,
            fontSize: '0.875rem',
            color: '#323232',
            letterSpacing: '-0.5px',
            lineHeight: 1.4
        }
    },
    infoText:{
        '&.MuiTypography-root':{
            color: '#777',
            fontSize: '0.75rem',
            letterSpacing: '-0.5px',
            lineHeight: 1.4,

        }
    },
    moreButton:{
        '&.MuiButtonBase-root':{
            minWidth: 20,
            padding:0,
            background: 'transparent',
            color: '#140cf2',
            fontSize: '0.625rem',
            letterSpacing: '-0.5px',
            marginLeft: 5,
            '&:hover':{
                background: 'transparent'
            }
        }
    },
    ellipsisText:{
        maxWidth: 200,
        overflow:'hidden',
        textOverflow:'ellipsis',
        whiteSpace:'nowrap'
    },
    ellipsisText2:{
        maxWidth: 75,
        overflow:'hidden',
        textOverflow:'ellipsis',
        whiteSpace:'nowrap'
    },
    popoverUserListBox:{
        '&.MuiPopover-root':{
            zIndex: 2500,
        },
        '& .MuiPaper-root':{
            width: 342,
            boxShadow:'0 4px 7px 0 rgba(0, 0, 0, 0.45)',
            borderRadius: 6,
            background: '#fff',
            padding:'0 3px 0 9px',
            boxSizing: 'border-box',
        },
    },
    groupUserListScroll:{
        maxHeight: 245,
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
            width: '10px',
        },
        '&::-webkit-scrollbar-thumb': {
            background: '#969696',
            borderRadius: '10px',
            backgroundClip: 'padding-box',
            border: '3px solid transparent',
        },
        '&::-webkit-scrollbar-track': {
            background: 'transparent',
            marginTop: 5,
        },
    },
    groupUserListIn:{
        height: 48,
        borderBottom: '1px solid rgba(119, 119, 119, 0.3)',
        display: 'flex',
        alignItems: 'center',
        '& svg':{
            marginRight: 8
        }
    },
    groupUserListInText:{
        '&.MuiTypography-root':{
            fontSize: '0.875rem',
            color: '#323232',
            letterSpacing: '-0.5px',
            lineHeight: 1.4
        }
    },
    groupUserListInText2:{
        '&.MuiTypography-root':{
            fontSize: '0.75rem',
            color: '#777',
            letterSpacing: '-0.5px',
            lineHeight: 1.4
        }
    }
});


