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
    testBar: {
        width: '120px',
        '& .MuiSlider-thumb': {
            visibility: 'hidden'
        },
        '& .MuiSlider-rail': {
            color: '#7500fa',
        },
        '& .MuiSlider-root': {
            color: '#7500fa',
            height: '10px',
        },
        '& .MuiSlider-track': {
            border: '0px'
        }
    },
    fileFormat: {
        '& .MuiTypography-root': {
            fontSize: '1rem',
            color: '#323232',
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
    bg50: {
        background: 'rgba(221, 236, 255,0.5)'
    },
    bg100: {
        background: 'rgba(221, 236, 255,1)'
    },
    bgf3e9ff: {
        background: '#f3e9ff'
    },
    toggleTable: {
        background: '#fff',
        borderCollapse: 'separate',
        '& .MuiTableHead-root': {
            background: '#456ea5',
            '& .MuiTableCell-root': {
                color: '#e9f2ff',
                padding: '11px 11px',
                fontWeight: 700,
            },

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
    uncompleted: {
        borderRadius: '99px',
        background: '#26a646',
        width: '80px',
        height: '30px',
        padding: '5px 10px',
        boxSizing: 'border-box',
        marginTop:'-1px',
        '& .MuiTypography-root': {
            color: '#fff !important',
            fontSize: '1rem',
            fontWeight: 700,
            lineHeight: '22px !important',
            letterSpacing: '-0.5px',
            '&:before':{
                content:"''",
                width: 14,
                height: 14,
                borderRadius: 100,
                marginRight: '6px',
                background: '#c9ffd6',
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
    rejectTag: {
        background: '#d91e50',
        marginTop:'0px',
        width: '70px',
        '& .MuiTypography-root': {
            '&:before':{
                background: '#ffc2d3',
            }
        }
    },
    extension: {
        background: '#056cf2',
        marginTop:'0px',
        width: '94px',
        display: 'flex',
        alignItems: 'center',
        '& .MuiTypography-root': {
            marginLeft: '4px',
            '&:before':{
                display: 'none'
            }
        }
    },
    beforeWork: {
        background: '#056cf2',
        marginTop:'0px',
        '& .MuiTypography-root': {
            '&:before':{
                background: '#bedaff',
            }
        }
    },
    extensionDueDate: {
        height: '13px',
        marginTop: '-3px',
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
            background: '#d9d9d9',
            border: '0px !important',
        },
        '& .MuiAvatar-colorDefault': {
            color: '#323232',
            fontSize: '0.625rem',
            fontWeight: 700,
            // background: 'transparent',
            marginLeft: '-5px !important',
            letterSpacing: '-0.5px',
        }
    },
    ArrangeUserBtn: {
        display: 'flex',
        alignItems: 'center',
        '& .MuiButtonBase-root': {
            width: '78px',
            height: '30px',
            border: '1px solid #140cf2',
            background: '#fff',
            '&.MuiButton-root:hover': {
                background: '(rgba 20 12 242, 0.1)',
            }
        },
        '& .MuiTypography-root': {
            color: '#140cf2',
            fontSize: '1rem',
            letterSpacing: '-0.5px',
            fontWeight: 700,
            marginLeft: '4px',
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
    CheckboxStyle: {
        display: 'flex',
        alignItems: 'center',
        '& .MuiButtonBase-root': {
            padding: '0px',
            marginRight: '6px',
        },
        '& .MuiTypography-root': {
            lineHeight: '18px'
        }
    },
    rejectFile: {
        '& .MuiButtonBase-root': {
            padding: 0,
            textTransform: 'none',
            '&.MuiButton-root:hover': {
                background: 'transparent'
            },
            '&:before':{
                content:"''",
                width: 8,
                height: 8,
                borderRadius: 100,
                marginRight: '6px',
                background: '#999ca9',
                display: 'inline-block',
                verticalAlign: 'middle',
                marginTop: '0px'
            }
        },
    },
    workTimeStyle: {
        display: 'flex',
        alignItems: 'center',
        '& .MuiButtonBase-root': {
            minWidth: '14px',
            height: 14,
            padding: 0,
            borderRadius: '100px',
            background: '#d91e50',
            marginRight: 8,
            '&.MuiButton-root:hover': {
                background: '#d91e50'
            }
        },
        '&:before':{
            content:"''",
            width: 1,
            height: 34,
            marginRight: '7px',
            background: '#323232',
            display: 'block',
            opacity: '30%',
        }
    },
    workTimeBlue: {
        '& .MuiButtonBase-root': {
            background: '#056cf2',
            '&.MuiButton-root:hover': {
                background: '#056cf2'
            }
        },
    },
    workTimePurple: {
        '& .MuiButtonBase-root': {
            background: '#7500fa',
            '&.MuiButton-root:hover': {
                background: '#7500fa'
            }
        },
    },
    workTimeGreen: {
        '& .MuiButtonBase-root': {
            background: '#26a646',
            '&.MuiButton-root:hover': {
                background: '#26a646'
            }
        },
    },
    workTimeOrange: {
        '& .MuiButtonBase-root': {
            background: '#f27154',
            '&.MuiButton-root:hover': {
                background: '#f27154'
            }
        },
    },
    //
    modifyWrap: {
        top: 48,
        left: 0,
        background: '#fff',
        width: '100%',
        zIndex: 999,


    },
    modifyWrapInner: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#d9d9d9',
        height: 48,
        borderRadius: '6px 6px 0 0',
        padding: '5px 20px 5px 16px',
        boxSizing: 'border-box',
    },
    topBarText: {
        display: 'flex',
        alignItems: 'center',
      '& .MuiTypography-root': {
          letterSpacing: '-0.5px',
          fontWeight: 700,
          color: '#323232',
          fontSize: '1rem !important',
          marginRight: '10px',
      },
        '& .MuiButtonBase-root': {
            padding: 0,
            color: '#d91e50',
            fontSize: '0.75rem',
            letterSpacing: '-0.5px',
            marginLeft: 8,
            '&:hover': {
                background: 'transparent'
            }
        }
    },
    translationBar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,
        boxSizing: 'border-box',
        padding: '18px 20px',
        position: 'relative',
        '& .MuiTypography-root': {
            color: '#056cf2 !important',
            fontSize: '1.25rem !important',
            fontWeight: 700,
        }
    },
    btnWrap: {
        '& .MuiButtonBase-root': {
            padding: 0,
        }
    },
    textArea: {
        width: '50%',
        // height: 317,
        minHeight: 100,
        boxSizing: 'border-box',
        borderRight: '1px solid #777',
        borderBottom: '1px solid #777',
        padding: '14px 20px',
        '& .MuiInputBase-input': {
            fontSize: '1.75rem',
            fontWeight: 500,
            lineHeight: '36px',
            color: '#323232',
        },
        '& .MuiFormControl-root': {
            width: '100%',
        },
        '& .MuiInputBase-root': {
            padding: 0,
            '&.MuiInput-root:before': {
                border: '0px',
            },
            '&.MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before': {
                border: '0px',
            },
        }
    },
    wordCount: {
        '&.MuiTypography-root': {
            fontSize: '1.25rem !important',
            letterSpacing: '-0.5px',
            textAlign: 'right !important',
            marginTop:'10px',
            color: '#777 !important'
        }
    },
    chipStyle: {
        overflowX: 'auto',
        '& .MuiChip-clickable:hover': {
            border: '1px solid #f25e3d'
        },
        '& .MuiChip-label': {
            fontSize: '1rem',
            letterSpacing: '-0.5px',
            color: '#323232',
        }
    },
    buttonArea: {
        width: '50%',
        height: 60,
        boxSizing: 'border-box',
        borderRight: '1px solid #777',
        padding: '14px 20px',
    },

    iconButtonStyle: {
        '& .MuiButtonBase-root': {
            padding: '0px',
            marginRight: '20px',
            '&.MuiButton-root:hover': {
                background: 'transparent',
                '& .MuiTypography-root': {
                    color: '#056cf2',
                },
                // '& svg': {
                //     stroke: '#056cf2'
                // },
            }
        },
        '& svg': {
            marginRight: '8px',
        },
        '& .MuiTypography-root': {
            fontSize: '1rem !important',
            letterSpacing: '-0.5px',
        }
    },
    buttonStyle: {
        '& .MuiButtonBase-root': {
            padding: '0px',
            background: '#056cf2',
            width: 70,
            height: 40,
            borderRadius: '6px',
            boxSizing: 'border-box',
            '&.MuiButton-root:hover': {
                background: '#056cf2',
            },
            '& .MuiTypography-root': {
                color: '#fff',
                fontSize: '1.125rem',
                fontWeight: 700,
            }
        },
    },
    buttonLine: {
        '&.MuiButtonBase-root':{
            marginRight: 10,
            background: 'transparent',
            '&.MuiButton-root:hover': {
                background: 'transparent',
            },
            '& .MuiTypography-root': {
                color: '#056cf2',
                fontSize: '1.125rem',
                fontWeight: 700,
            }
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




    tooltipBox:{
        position: 'absolute',
        top: 25,
        right: -20,
        zIndex: 200,
        '& p':{
            fontSize: '0.938rem',
            color: '#fff',
            letterSpacing: '-0.3px'
        },
    },
    tooltipBoxBtn:{
        position: 'absolute',
        bottom: 50,
        right: -20,
        zIndex: 200,
        '& p':{
            fontSize: '0.938rem',
            color: '#fff',
            letterSpacing: '-0.3px'
        },
    },
    tooltipArrow:{
        display: 'flex',
        justifyContent: 'flex-start',
        paddingLeft: 52
    },
    tooltipArrowBtn:{
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: 52
    },
    tooltipBoxIn:{
        position:'relative',
        top: -5,
        borderRadius: 6,
        background: '#4c4851',
        padding: '9px 10px 13px 15px',
        minWidth: 200,
        maxWidth: 290,
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
    tooltipBoxInBtn:{
        position:'relative',
        bottom: -5,
        borderRadius: 6,
        background: '#4c4851',
        padding: '9px 10px 13px 15px',
        minWidth: 200,
        maxWidth: 290,
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
        // display: 'flex',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        marginBottom: 5,
        '& p':{
            fontWeight: 'bold',
            color: '#fff'
        },
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
    tooltipBoxCheck: {
      marginTop: 10,
        background: '#fff'
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


