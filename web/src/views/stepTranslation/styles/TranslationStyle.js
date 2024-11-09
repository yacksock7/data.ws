import EmptyBackImage from "../../../common/images/EmptyBackImage.png";

export const styles = (theme) => ({
    root:{
        marginTop: 70,
        minHeight: 'calc(100vh - 70px)',
        padding: '22px 24px',
        boxSizing: 'border-box',
        background: '#eee'
    },
// stepper 박스
    stepProcess: {
        width: '100%',
        height: '170px',
        padding: '11px 14px',
        background: '#fff',
        border: '1px solid #bbb',
        boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.15)',
        borderRadius: '6px',
        marginBottom: '20px',
        boxSizing: 'border-box',
    },
    stepperStyle: {
        '& .MuiStepConnector-root': {
            top: '25px',
            left: 'calc(-50% + 35px)',
            right: 'calc(50% + 35px)',
        },
        '& .Mui-active': {
            '& svg': {
                color: '#7500fa',
                width: '49px',
                height: '49px',
                outline: 'none',
                '& .MuiStepIcon-text': {
                    fontSize: '0.75rem',
                    fontWeight: 900,
                    fill: '#fff'
                }
            }
        },
        '& .MuiStepIcon-root': {
            color: '#eeeeee',
            outline: '2px solid #cacaca',
            borderRadius: 100,
            width: '49px',
            height: '49px',
            boxSizing: 'border-box',
            '& .MuiStepIcon-text': {
                fontSize: '0.75rem',
                fontWeight: 900,
                fill: '#777777'
            }
        },
        '& .Mui-completed': {
            '& .MuiStepLabel-label': {
              color: '#7500fa',
                fontWeight: 500,
            },
            '& svg': {
                color: '#7500fa',
                width: '49px',
                height: '49px',
                outline: 'none',
                '& .MuiStepIcon-text': {
                    fontSize: '12px',
                    fontWeight: 900,
                }
            }
        },
        '& .MuiStepLabel-label': {
            marginTop: '7px !important',
        },
    },
    stepperButton: {
        width: '33.3%',
        justifyContent: 'center',
        marginTop: '8.4px',
        '& .MuiButtonBase-root': {
            background: '#7500fa',
            color: '#fff',
            minWidth: '43px',
            height: '23px',
            fontSize: '0.813rem',
            letterSpacing: '-0.41px',
            fontWeight: 500,
            lineHeight: 0,
            borderRadius: '2px',
            marginRight: 0,
        },
        '& .MuiButton-root:hover': {
            background: '#9d4bfb',
        },

    },

    stepperInfoBox: {
        '& .MuiButtonBase-root': {
            padding: '0px',
            minWidth: '24px'
        }
    },




// 번역 서브 바
    infoBar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
        height: '54px',
        marginBottom: '20px',
    },
    subTableLeft: {
        background: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
        padding: '0 60px',
        border: '1px solid #bbb',
        boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.15)',
        borderRadius: '6px',
        width: '530px',
        height: '54px',
        boxSizing: 'border-box',
    },
    subTableLeftDownload: {
        padding: '0 45px',
    },
    processDate: {
        '& .MuiTypography-root': {
            fontSize: '1rem',
            color: '#323232',
            letterSpacing: '-0.5px',
            fontWeight: 500,
            '& span': {
                marginLeft: '14px',
            }
        }

    },
    processCount: {
        '& .MuiTypography-root': {
            fontSize: '1rem',
            color: '#777',
            letterSpacing: '-0.5px',
            fontWeight: 400,
            '& span': {
                fontSize: '1.125rem',
            }
        }
    },
    subTableRight: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    selectBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    translateText: {
        '&.MuiTypography-root': {
            fontSize: '1rem',
            letterSpacing: '-0.5px',
            color: '#323232',
            fontWeight: 500,
            marginRight: '2px'
        }
    },
    languageBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 31px 0 24px',
        '& svg': {
            margin: '0 14px'
        }
    },
    language: {
        fontSize: '1.125rem',
        fontWeight: 500,
        color: '#056cf2',
        letterSpacing: '-0.5px',
    },
    // selectWrap: {
    //
    //     '&.MuiFormControl-root': {
    //         background: '#fff',
    //         borderRadius: '6px',
    //         boxSizing: 'border-box',
    //         // '& .MuiOutlinedInput-root': {
    //         //     border: '2px solid #f2b705'
    //         // }
    //     },
    //     '& .MuiInputBase-root': {
    //         borderRadius: '6px',
    //         height: '48px',
    //         width: '160px',
    //         '& .MuiSelect-root:hover': {
    //             '& .MuiOutlinedInput-notchedOutline': {
    //                 border: '2px solid #f2b705',
    //             },
    //         }
    //     },
    //     '& .MuiSelect-select': {
    //         color: '#777',
    //         fontSize: '1rem',
    //         fontWeight: 700,
    //         letterSpacing: '-0.5px',
    //         display: 'flex',
    //         alignItems: 'center',
    //         '& span': {
    //             marginLeft: '6px'
    //         }
    //     },
    //     '& svg': {
    //         marginRight: '3px'
    //     },
    //     '& .MuiOutlinedInput-notchedOutline': {
    //         border: '2px solid #f2b705 !important',
    //     },
    // },


// 추출 바
    dueDateWrap: {
        '& .MuiTypography-root': {
            fontSize: '1rem',
            color: '#323232',
            letterSpacing: '-0.5px',
            fontWeight: 500,
            '& span': {
                color: '#7500fa',
                marginLeft: '6px',
                fontSize: '0.875rem',
            }
        },
        '& svg': {
            marginLeft: '14px',
            verticalAlign: 'middle',
            paddingBottom: '2px',
        }
    },

    buttonStyle: {
        '& .MuiButtonBase-root': {
            width: '220px',
            height: '54px',
            background: '#7500fa',
            color: '#fff',
            fontSize: '1.125rem',
            fontWeight: '700',
            marginLeft: '12px',
            borderRadius: '6px',
            '&:hover':{
                background: '#9d4bfb'
            }
        }
    },
    workerBtn: {
        '& .MuiButtonBase-root': {
            background: '#140cf2',
            '&:hover':{
                background: '#5f59fc',
            }
        }
    },
    taskBtn: {
        // '& .MuiButtonBase-root': {
        //     background: '#9d4bfb',
        //     '&:hover':{
        //         background: '#9d4bfb',
        //     }
        // }
    },

    //테이블
    tableWrap: {

        '&.MuiTableContainer-root': {
            overflowX: 'visible',
            boxShadow: 'none',
        }
    },
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
    processBar: {
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
            cursor: 'Default',
        },
        '& .MuiSlider-track': {
            border: '0px'
        }
    },
    tableDueDate: {
        minWidth: '147px',
        '& .MuiTypography-root': {
            fontSize: '1rem',
            color: '#323232',
            letterSpacing: '-0.5px',
            boxSizing: 'border-box'

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
        // '& .MuiTableBody-root': {
        //     background: '#ddecff',
        // },
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
        marginLeft: '27px',
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
        width: '70px',
        '& .MuiTypography-root': {
            '&:before':{
                background: '#dcbdff',
            }
        }
    },
    return: {
        background: '#d91e50',
        marginLeft: 0,
        width: '70px',
        '& .MuiTypography-root': {
            '&:before':{
                background: '#ffc2d3',
            }
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
            textTransform: 'none'
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


