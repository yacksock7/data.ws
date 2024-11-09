export const styles = (theme) => ({
    root:{
        marginBottom: 40
    },
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
                padding: '0 10px',
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
                padding: '0 10px',
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
    padding:{
        '&.MuiTableCell-head':{
            padding: '0 10px 0 30px !important',
        },
        '&.MuiTableCell-body':{
            padding: '0 10px 0 30px !important',
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
});