export const styles = (theme) => ({
    drawerBox:{
        '& .MuiBackdrop-root':{
            background:'transparent'
        },
        '& .MuiPaper-root':{
            width: 255,
            marginTop: 71,
            height: 'calc(100% - 71px)',
            boxShadow: '0 4px 7px 0 rgba(0, 0, 0, 0.25)',
            boxSizing: 'border-box',
            '& *': {
                fontFamily: 'Pretendard !important',
            },
        }
    },
    topBox:{
        display: 'flex',
        alignItems:'center',
        justifyContent:'space-between',
        background: '#f0f1f1',
        boxSizing:'border-box',
        padding: '6px 6px 6px 12px',
        marginBottom: 8,
        height: 45,
        '& p':{
            fontSize: '1.125rem',
            fontWeight: 'bold',
            color: '#0d0d0d'
        }
    },
    iconButton:{
        '&.MuiButtonBase-root': {
            padding: 0,
            '&:hover':{
                background: 'transparent'
            }
        }
    },
    filterBox:{
        width: 'calc(100% - 10px)',
        borderBottom: '1px solid rgba(119, 119, 119, 0.7)',
        paddingBottom: 8.5,
        margin: '0 5px',
        display: 'flex',
        justifyContent: 'flex-end'
    },
    contentsBox:{
        padding: '0 5px',
    },
    contentsInBox:{
        boxSizing: 'border-box',
        borderBottom: '1px solid rgba(119, 119, 119, 0.7)',
    },
    chipBox:{
        width: 38,
        height:22,
        boxSizing: 'border-box',
        border: '1px solid #056cf2',
        borderRadius: 4,
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
        '& p':{
            fontSize: '0.875rem',
            color:'#056cf2',
            fontWeight: 'bold',
        }
    },
    titleText:{
        '&.MuiTypography-root': {
            fontSize: '1rem',
            color: '#0d0d0d',
            fontWeight: 500,
            marginBottom: 10,
        }
    },
    titleText2:{
        '&.MuiTypography-root': {
            width: 'calc(100% - 14px)'
        }
    },
    newBox:{
        width: 14,
        height: 14,
        borderRadius: '50%',
        background: '#ff0000',
        marginTop: 5,
        marginRight: 4
    },
    textStyle:{
        '&.MuiTypography-root': {
            fontSize: '0.875rem',
            color: '#777'
        }
    },
    dateText:{
        '&.MuiTypography-root': {
            fontSize: '0.813rem',
            color: '#777',
            marginTop: 13
        }
    },
    popoverBox:{
        '& .MuiPaper-root':{
            boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.25)',
            border: '1px solid #bbb',
            boxSizing:'border-box',
            '& *': {
                fontFamily: 'Pretendard !important',
            },
            '& ul':{
                paddingTop: 6,
                paddingBottom: 6,
                '& li':{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
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
        }
    },
});