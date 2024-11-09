export const styles = (theme) => ({
    tableBox:{
        '&.MuiTable-root':{
            tableLayout: 'fixed'
        },
        '& .MuiTableCell-head':{
            fontSize: '0.875rem !important',
            color:'#e9f2ff !important',
            letterSpacing: '-0.5px',
            fontWeight: 'bold',
            padding: '0 10px !important',
            boxSizing:'border-box',
            height: '40px !important',
            background: '#456ea5 !important',
            borderBottom: '0 !important',
        },
        '& .MuiTableCell-body':{
            fontSize: '0.875rem !important',
            color:'#323232',
            background:'rgba(221, 236, 255, 0.5)',
            height: '48px !important',
            letterSpacing: '-0.5px',
            padding: '0 10px !important',
            boxSizing:'border-box',
            borderBottom: '1px solid #006fff !important',
            overflow:'hidden',
            textOverflow:'ellipsis',
            whiteSpace:'nowrap',
        }
    },
    dateText:{
        '&.MuiTableCell-body':{
            fontSize: '1rem !important',
            '@media all and (max-width: 1550px)': {
                fontSize: '0.875rem !important',
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
});